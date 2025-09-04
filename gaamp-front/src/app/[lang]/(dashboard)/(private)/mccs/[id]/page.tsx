// React Imports
import type { ReactElement } from 'react'

// Next Imports
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// Type Imports
import type { Locale } from '@/configs/i18n'

// Component Imports
import MCCDetails from '@/views/mccs/details/MCCDetails'

// Vars
const OverViewTab = dynamic(() => import('@/views/mccs/details/overview'))
const SubAccountsTab = dynamic(() => import('@/views/mccs/details/sub-accounts'))

const tabContentList = (): { [key: string]: ReactElement } => ({
  overview: <OverViewTab />,
  subAccounts: <SubAccountsTab />
})

export default async function Page(props: { params: Promise<{ id: string; lang: Locale }> }) {
  const params = await props.params

  console.log({ params })

  // const mcc = await getMCCById(params.id)
  const mcc = {}

  if (!mcc) notFound()

  return (
    <>
      <MCCDetails tabContentList={tabContentList()} />
    </>
  )
}
