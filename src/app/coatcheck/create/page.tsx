
import React from 'react'

export default function Page() {
  return <div>

    <h1 className='text-2xl my-10 font-bold'>Create Coat Check</h1>


    <div className='flex flex-col gap-4'>

      <div className='flex flex-col gap-2'>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' className='border border-gray-300 rounded-md p-2' />
      </div>
    </div>

    <button className='bg-blue-500 text-white p-2 rounded-md'>Create Coat Check</button>

  </div>;
}
