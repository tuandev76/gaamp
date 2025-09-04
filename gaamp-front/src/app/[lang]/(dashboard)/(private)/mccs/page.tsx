import MCCListTable from '@/views/mccs/MCCListTable'

// Data Imports
import { getMCCData } from '@/app/server/actions'

export default async function MCCListTablePage() {
  // Vars
  const data = await getMCCData()

  return <MCCListTable mccData={data?.mccData} />
}
