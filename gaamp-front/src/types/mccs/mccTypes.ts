export type MCC = {
  id: number
  name: string
  customer: string
  customerId: string
  email: string
  country: string
  countryCode: string
  countryFlag?: string
  timezone: string
  currency: string
  connecting: boolean
  type: string
  mccs: number
  cids: number
  avatar: string
  createdAt: string
  status: string
}

export type MCCType = {
  mccData: MCC[]
}
