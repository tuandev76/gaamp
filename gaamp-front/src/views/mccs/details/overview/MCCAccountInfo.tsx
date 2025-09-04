'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

type Data = {
  name: string
  owner: string
  email: string
  country: string
  timezone: string
  currency: string
  customerId: string
  creditLine: string
  connecting: boolean
  type: string
  mccs: string
  cids: string
  createdAt: string
  status: string
}

// Vars
const initialData: Data = {
  name: '879861.boston',
  owner: 'Stanfield Baser',
  email: 'sbaser0@boston.com',
  country: 'australia',
  timezone: 'gmt+10',
  currency: 'usd',
  customerId: '#879861',
  creditLine: '15000',
  connecting: true,
  type: 'all',
  mccs: '5',
  cids: '22',
  createdAt: '8/16/2025',
  status: 'enable'
}

const MCCAccountInfo = () => {
  // States
  const [formData, setFormData] = useState<Data>(initialData)

  // const [isEditing, setIsEditing] = useState(false)

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Name'
                value={formData.name}
                placeholder='John'
                onChange={e => handleFormChange('name', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type='text'
                label='Customer Id'
                value={formData.customerId}
                placeholder='123456'
                onChange={e => handleFormChange('customerId', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type='number'
                label='Credit Line'
                value={formData.creditLine}
                placeholder='10,000'
                onChange={e => handleFormChange('creditLine', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  label='Country'
                  value={formData.country}
                  onChange={e => handleFormChange('country', e.target.value)}
                >
                  <MenuItem value='usa'>USA</MenuItem>
                  <MenuItem value='uk'>UK</MenuItem>
                  <MenuItem value='australia'>Australia</MenuItem>
                  <MenuItem value='germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                disabled
                label='Owner'
                value={formData.owner}
                placeholder='Doe'
                onChange={e => handleFormChange('owner', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                disabled
                label='Email'
                value={formData.email}
                placeholder='john.doe@gmail.com'
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth disabled>
                <InputLabel>TimeZone</InputLabel>
                <Select
                  label='TimeZone'
                  value={formData.timezone}
                  onChange={e => handleFormChange('timezone', e.target.value)}
                  MenuProps={{ PaperProps: { style: { maxHeight: 250 } } }}
                >
                  <MenuItem value='gmt+10'>(GMT+10:00) Australia</MenuItem>
                  <MenuItem value='gmt-09'>(GMT-09:00) Alaska</MenuItem>
                  <MenuItem value='gmt-08'>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                  <MenuItem value='gmt-07'>(GMT-07:00) Chihuahua, La Paz, Mazatlan</MenuItem>
                  <MenuItem value='gmt-06'>(GMT-06:00) Central America</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth disabled>
                <InputLabel>Currency</InputLabel>
                <Select
                  label='Currency'
                  value={formData.currency}
                  onChange={e => handleFormChange('currency', e.target.value)}
                >
                  <MenuItem value='usd'>USD</MenuItem>
                  <MenuItem value='euro'>EUR</MenuItem>
                  <MenuItem value='pound'>VND</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth disabled>
                <InputLabel>Connecting</InputLabel>
                <Select
                  label='Connecting'
                  value={formData.connecting}
                  onChange={e => handleFormChange('connecting', e.target.value)}
                >
                  <MenuItem value='true'>Connected</MenuItem>
                  <MenuItem value='false'>Not connected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth disabled>
                <InputLabel>Type</InputLabel>
                <Select label='Type' value={formData.type} onChange={e => handleFormChange('type', e.target.value)}>
                  <MenuItem value='all'>All</MenuItem>
                  <MenuItem value='onlyMe'>Only me</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                disabled
                type='number'
                label='MCCs'
                value={formData.mccs}
                placeholder='123456'
                onChange={e => handleFormChange('mccs', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                disabled
                type='number'
                label='CIDs'
                value={formData.cids}
                placeholder='123456'
                onChange={e => handleFormChange('cids', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                disabled
                type='text'
                label='Created At'
                value={formData.createdAt}
                placeholder='123456'
                onChange={e => handleFormChange('createdAt', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth disabled>
                <InputLabel>Status</InputLabel>
                <Select
                  label='Status'
                  value={formData.status}
                  onChange={e => handleFormChange('status', e.target.value)}
                >
                  <MenuItem value='enable'>Enable</MenuItem>
                  <MenuItem value='disable'>Disable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }} className='flex gap-4 flex-wrap justify-end'>
              <Button variant='contained' type='submit'>
                Save Changes
              </Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default MCCAccountInfo
