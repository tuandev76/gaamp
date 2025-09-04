// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import MCCAccountInfo from './MCCAccountInfo'

const OverViewTab = async () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <MCCAccountInfo />
      </Grid>
    </Grid>
  )
}

export default OverViewTab
