// import { getTransactionHistory } from '@/modules/transactions/service.server'

import { getTransactionHistory } from '@/modules/transactions/service.server'
import TransactionsTable from '@/modules/transactions/ui/TransactionsTable'

export const dynamic = 'force-dynamic' // avoid caching sensitive data

export default async function TransactionsPage() {
  const { items } = await getTransactionHistory({ limit: 50 })

  return (
    <>
      <main className='p-6 space-y-4'>
        <h1 className='text-xl'>Transactions</h1>
        <TransactionsTable items={items} />
      </main>
    </>
  )

  // return (
  //   <>
  //     <Card>
  //       <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-4'>
  //         <FormControl fullWidth size='small' className='sm:is-[140px] flex-auto max-sm:is-full'>
  //           <InputLabel id='connecting-basic-select-outlined-label'>Connecting</InputLabel>
  //           <Select
  //             label='Connecting'
  //             defaultValue=''
  //             id='connecting-basic-select-outlined'
  //             labelId='connecting-basic-select-outlined-label'
  //           >
  //             <MenuItem value=''>
  //               <em>None</em>
  //             </MenuItem>
  //             <MenuItem value={10}>Connected</MenuItem>
  //             <MenuItem value={20}>Not Connected</MenuItem>
  //           </Select>
  //         </FormControl>
  //         <FormControl fullWidth size='small' className='sm:is-[140px] flex-auto max-sm:is-full'>
  //           <InputLabel id='type-basic-select-outlined-label'>Type</InputLabel>
  //           <Select
  //             label='Type'
  //             defaultValue=''
  //             id='type-basic-select-outlined'
  //             labelId='type-basic-select-outlined-label'
  //           >
  //             <MenuItem value=''>
  //               <em>None</em>
  //             </MenuItem>
  //             <MenuItem value={10}>All</MenuItem>
  //             <MenuItem value={20}>Only me</MenuItem>
  //           </Select>
  //         </FormControl>
  //         <FormControl fullWidth size='small' className='sm:is-[140px] flex-auto max-sm:is-full'>
  //           <InputLabel id='status-basic-select-outlined-label'>Status</InputLabel>
  //           <Select
  //             label='Status'
  //             defaultValue=''
  //             id='status-basic-select-outlined'
  //             labelId='status-basic-select-outlined-label'
  //           >
  //             <MenuItem value=''>
  //               <em>None</em>
  //             </MenuItem>
  //             <MenuItem value={10}>Active</MenuItem>
  //             <MenuItem value={20}>Inactive</MenuItem>
  //           </Select>
  //         </FormControl>
  //         <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
  //           <Button
  //             variant='contained'
  //             color='primary'
  //             className='max-sm:is-full'
  //             startIcon={<i className='ri-add-line' />}

  //             // onClick={() => setCustomerUserOpen(!customerUserOpen)}
  //           >
  //             Add MCC
  //           </Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </>
  // )
}
