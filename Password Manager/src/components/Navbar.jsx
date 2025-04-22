import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around text-center h-13 p-1.5 border-b border-green-300 text-white items-center'>
        <div><span className="font-bold text-2xl">&lt;PAS</span><span className='font-bold text-2xl text-green-300'>Saves/&gt; </span><span className='text-xs'>by @pHarsh9</span></div>
      <span><img className='cursor-pointer' width={30} src="./src/assets/github.svg" alt="" /></span>
    </nav>
  )
}

export default Navbar
