// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Types Imports
import type { MCC } from '@/types/mccs/mccTypes'

type Props = {
  open: boolean
  handleClose: () => void
  setData: (data: MCC[]) => void
  mccData?: MCC[]
}

type FormValidateType = {
  name: string
  customerId: string
  creditLine: string
  country: string
}

type countryType = {
  country: string
}

export const country: { [key: string]: countryType } = {
  india: { country: 'India' },
  australia: { country: 'Australia' },
  france: { country: 'France' },
  brazil: { country: 'Brazil' },
  us: { country: 'United States' },
  china: { country: 'China' }
}

const AddMCCDrawer = (props: Props) => {
  // Props
  const { open, handleClose, setData, mccData } = props

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      name: '',
      customerId: '',
      creditLine: '',
      country: ''
    }
  })

  const onSubmit = (data: FormValidateType) => {
    console.log(data)

    if (mccData && mccData.length > 0) {
      const firstMCCData = mccData[0]

      const newData: MCC = {
        ...firstMCCData,
        id: mccData.length + 1
      }

      setData([...(mccData ?? []), newData])
      resetForm({ name: '', customerId: '', creditLine: '', country: '' })
      handleClose()
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm({ name: '', customerId: '', creditLine: '', country: '' })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between p-5'>
        <Typography variant='h5'>Create a MCC</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='ri-close-line text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
        <div className='p-5'>
          <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-5'>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Name'
                  placeholder='7354814.examplewebsite.user'
                  {...(errors.name && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='customerId'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Customer Id'
                  placeholder='7354814'
                  {...(errors.customerId && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='creditLine'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Credit Line'
                  placeholder='20000'
                  {...(errors.creditLine && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <FormControl fullWidth>
              <InputLabel id='country' error={Boolean(errors.country)}>
                Country
              </InputLabel>
              <Controller
                name='country'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select label='Country*' {...field} error={Boolean(errors.country)}>
                    <MenuItem value='india'>India</MenuItem>
                    <MenuItem value='australia'>Australia</MenuItem>
                    <MenuItem value='france'>France</MenuItem>
                    <MenuItem value='brazil'>Brazil</MenuItem>
                    <MenuItem value='us'>USA</MenuItem>
                    <MenuItem value='china'>China</MenuItem>
                  </Select>
                )}
              />
              {errors.country && <FormHelperText error>This field is required.</FormHelperText>}
            </FormControl>
            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit' fullWidth>
                Add
              </Button>
            </div>
          </form>
        </div>
      </PerfectScrollbar>
    </Drawer>
  )
}

export default AddMCCDrawer
