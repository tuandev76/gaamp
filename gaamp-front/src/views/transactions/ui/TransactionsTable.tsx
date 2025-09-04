// export default function TransactionsTable({
//   items
// }: {
//   items: Array<{
//     id: string
//     type: string
//     amount: number
//     currency: string
//     description?: string | null
//     createdAt: string
//   }>
// }) {
//   return (
//     <div className='w-full overflow-x-auto'>
//       <table className='min-w-full text-sm'>
//         <thead>
//           <tr className='text-left border-b'>
//             <th className='py-2 pr-4'>ID</th>
//             <th className='py-2 pr-4'>Type</th>
//             <th className='py-2 pr-4'>Amount</th>
//             <th className='py-2 pr-4'>Currency</th>
//             <th className='py-2 pr-4'>Description</th>
//             <th className='py-2 pr-4'>Created</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(t => (
//             <tr key={t.id} className='border-b hover:bg-gray-50/50'>
//               <td className='py-2 pr-4 font-mono'>{t.id}</td>
//               <td className='py-2 pr-4'>{t.type}</td>
//               <td className='py-2 pr-4'>{t.amount}</td>
//               <td className='py-2 pr-4'>{t.currency}</td>
//               <td className='py-2 pr-4'>{t.description ?? '—'}</td>
//               <td className='py-2 pr-4'>{new Date(t.createdAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

// Third-party Imports
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import classnames from 'classnames'

// Type Imports
import type { Customer } from '@/types/apps/ecommerceTypes'
import type { MCC } from '@/types/mccs/mccTypes'
import type { Locale } from '@configs/i18n'
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type PayementStatusType = {
  text: string
  color: ThemeColor
}

type StatusChipColorType = {
  color: ThemeColor
}

export const paymentStatus: { [key: number]: PayementStatusType } = {
  1: { text: 'Paid', color: 'success' },
  2: { text: 'Pending', color: 'warning' },
  3: { text: 'Cancelled', color: 'secondary' },
  4: { text: 'Failed', color: 'error' }
}

export const statusChipColor: { [key: string]: StatusChipColorType } = {
  Delivered: { color: 'success' },
  'Out for Delivery': { color: 'primary' },
  'Ready to Pickup': { color: 'info' },
  Dispatched: { color: 'warning' }
}

type MCCTypeWithAction = MCC & {
  actions?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

// Column Definitions
const columnHelper = createColumnHelper<MCCTypeWithAction>()

const TransactionsTable = ({}: { mccData?: MCC[] }) => {
  // States
  const [customerUserOpen, setCustomerUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<MCCTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'MCC',
        cell: ({ row }) => (
          <Typography
            component={Link}
            color='text.primary'
            href={getLocalizedUrl(`/mccs/${row.original.id}`, locale as Locale)}
            className='font-medium hover:text-primary'
          >
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('customer', {
        header: 'Owner',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {getAvatar({ avatar: row.original.avatar, customer: row.original.customer })}
            <div className='flex flex-col items-start'>
              <Typography
                component={Link}
                color='text.primary'
                href={getLocalizedUrl(`/apps/ecommerce/customers/details/${row.original.customerId}`, locale as Locale)}
                className='font-medium hover:text-primary'
              >
                {row.original.customer}
              </Typography>
              <Typography variant='body2'>{row.original.email}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <img src={row.original.countryFlag} height={22} />
            <Typography>{row.original.country}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('timezone', {
        header: 'Timezone',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.timezone}</Typography>
      }),
      columnHelper.accessor('currency', {
        header: 'Currency',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.currency}</Typography>
      }),
      columnHelper.accessor('customerId', {
        header: 'Customer Id',
        cell: ({ row }) => <Typography color='text.primary'>#{row.original.customerId}</Typography>
      }),
      columnHelper.accessor('connecting', {
        header: 'Connecting',
        cell: ({ row }) => (
          <Chip
            label={row.original.connecting ? 'Connected' : 'Not connected'}
            variant='tonal'
            color={row.original.connecting ? 'success' : 'warning'}
            size='small'
          />
        )
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }) => (
          <Chip
            label={row.original.type}
            variant='tonal'
            color={row.original.type === 'All' ? 'info' : 'default'}
            size='small'
          />
        )
      }),
      columnHelper.accessor('mccs', {
        header: 'MCCs',
        cell: ({ row }) => <Typography>{row.original.mccs}</Typography>
      }),
      columnHelper.accessor('cids', {
        header: 'CIDs',
        cell: ({ row }) => <Typography>{row.original.cids}</Typography>
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created date',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.createdAt}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            variant='tonal'
            color={row.original.status === 'Active' ? 'success' : 'default'}
            size='small'
          />
        )
      }),
      columnHelper.accessor('actions', {
        header: '',
        cell: ({ row }) => (
          <div className='flex items- justify-end'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary text-[22px]'
              options={[
                {
                  text: 'Edit',
                  icon: 'ri-edit-line',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Edit: ${row.original.id}`)
                    }
                  }
                },
                {
                  text: 'Check connecting',
                  icon: 'ri-phone-find-line',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Check connecting: ${row.original.id}`)
                    }
                  }
                },
                {
                  text: 'Disconnect',
                  icon: 'ri-stop-circle-line',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Disconnect: ${row.original.id}`)
                    }
                  }
                },
                {
                  text: 'Detail',
                  icon: 'ri-slideshow-view',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Detail: ${row.original.id}`, row.original)
                    }
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = (params: Pick<Customer, 'avatar' | 'customer'>) => {
    const { avatar, customer } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(customer as string)}
        </CustomAvatar>
      )
    }
  }

  return (
    <>
      <Card>
        <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search'
            className='max-sm:is-full'
          />
          <FormControl fullWidth size='small' className='sm:is-[140px] flex-auto max-sm:is-full'>
            <InputLabel id='connecting-basic-select-outlined-label'>Connecting</InputLabel>
            <Select
              label='Connecting'
              defaultValue=''
              id='connecting-basic-select-outlined'
              labelId='connecting-basic-select-outlined-label'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Connected</MenuItem>
              <MenuItem value={20}>Not Connected</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size='small' className='sm:is-[140px] flex-auto max-sm:is-full'>
            <InputLabel id='type-basic-select-outlined-label'>Type</InputLabel>
            <Select
              label='Type'
              defaultValue=''
              id='type-basic-select-outlined'
              labelId='type-basic-select-outlined-label'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>All</MenuItem>
              <MenuItem value={20}>Only me</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size='small' className='sm:is-[140px] flex-auto max-sm:is-full'>
            <InputLabel id='status-basic-select-outlined-label'>Status</InputLabel>
            <Select
              label='Status'
              defaultValue=''
              id='status-basic-select-outlined'
              labelId='status-basic-select-outlined-label'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Active</MenuItem>
              <MenuItem value={20}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
            <Button
              variant='contained'
              color='primary'
              className='max-sm:is-full'
              startIcon={<i className='ri-add-line' />}
              onClick={() => setCustomerUserOpen(!customerUserOpen)}
            >
              Add MCC
            </Button>
          </div>
        </CardContent>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='ri-arrow-up-s-line text-xl' />,
                              desc: <i className='ri-arrow-down-s-line text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component='div'
          className='border-bs'
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' }
          }}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>
    </>
  )
}

export default TransactionsTable
