'use client'

// Next Imports
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
      Go Back
    </button>
  )
}
