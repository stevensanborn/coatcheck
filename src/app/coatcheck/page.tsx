import Link from 'next/link';
import React from 'react'

export default function Page() {
  return <div>
    
    
    <h1 className='text-2xl my-10 font-bold'>Coat Check</h1>  

    <div className='flex justify-center'>
      <Link href='/coatcheck/create'>
      <button className='bg-blue-500 text-white p-2 rounded-md' > Get Started</button>
      </Link>
    </div>


  </div>;
}
