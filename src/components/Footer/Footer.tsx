import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between'>
        <Link href="/" className='bg-white rounded-md px-2 py-1 font-bold text-xl'>AAHAR</Link>
        <div className='bg-white rounded-md px-4 py-1 font-semibold'>Made With ❤️ By Aahar</div>
    </div>
  )
}

export default Footer