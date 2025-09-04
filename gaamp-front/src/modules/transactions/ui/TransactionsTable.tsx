export default function TransactionsTable({
  items
}: {
  items: Array<{
    id: string
    type: string
    amount: number
    currency: string
    description?: string | null
    createdAt: string
  }>
}) {
  return (
    <div className='w-full overflow-x-auto'>
      <table className='min-w-full text-sm'>
        <thead>
          <tr className='text-left border-b'>
            <th className='py-2 pr-4'>ID</th>
            <th className='py-2 pr-4'>Type</th>
            <th className='py-2 pr-4'>Amount</th>
            <th className='py-2 pr-4'>Currency</th>
            <th className='py-2 pr-4'>Description</th>
            <th className='py-2 pr-4'>Created</th>
          </tr>
        </thead>
        <tbody>
          {items.map(t => (
            <tr key={t.id} className='border-b hover:bg-gray-50/50'>
              <td className='py-2 pr-4 font-mono'>{t.id}</td>
              <td className='py-2 pr-4'>{t.type}</td>
              <td className='py-2 pr-4'>{t.amount}</td>
              <td className='py-2 pr-4'>{t.currency}</td>
              <td className='py-2 pr-4'>{t.description ?? '—'}</td>
              <td className='py-2 pr-4'>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
