import React from 'react'
import ActionAreaCard from '../components/Card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Home = () => {

  return (
    <div className='min-h-screen relative bg-slate-50 px-10'>
        <div className='absolute top-[15%] right-[20%] translate-y-[-50%] translate-x-[-50%]'>
                <div className='w-28 h-28 blur-3xl max-sm:bg-transparent bg-purple-500 rounded-3xl'></div>
            </div>
            <div className='absolute top-[20%] left-[20%] translate-y-[-50%] translate-x-[-50%]'>
                <div className='w-20 h-20 blur-3xl max-sm:bg-transparent bg-violet-500 rounded-3xl'></div>
            </div>
          
        <div className='bg-slate-50 w-full mb-52'>
        <h1 className='font-bold text-7xl text-center p-5 pt-10'>Where Campus Life <br /> Comes <span className='gradient-text text-transparent animate-gradient' >Alive</span></h1>
        <p className='font-semibold text-md text-center text-slate-800'>Discover, Register, and Participate in Events Around Campus</p>
       
       <div className='flex justify-center mt-2 gap-5'>
        <Button variant="outline" >About us</Button>
        <Button className="bg-gray-900 text-white shadow-xl " >Get Started</Button>
       </div>
        </div>

        <div className='flex flex-wrap justify-center mt-28 gap-5 max-sm:flex-col'>
            <div className='bg-violet-100 px-2 py-1 rounded-xl w-96 max-sm:w-full flex items-center'>
                <i className="ri-search-line text-gray-400"></i>
                <input 
                    type="text" 
                    placeholder='Search title...' 
                    className='bg-transparent px-2 py-1 rounded-xl w-full outline-none' 
                />
            </div>
            <div className='bg-violet-100 px-2 py-1 rounded-xl w-96 max-sm:w-full flex items-center'>
                <Select className="bg-transparent" >
                    <SelectTrigger id="coordinator" className='w-full'>
                        <SelectValue placeholder="Select Category" className='bg-violet-100' />
                    </SelectTrigger>
                    <SelectContent className="bg-violet-100" >
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="jane">Jane Smith</SelectItem>
                        <SelectItem value="bob">Bob Johnson</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

<div className='flex flex-wrap gap-16 p-10 w-full justify-center'>
<ActionAreaCard/>
<ActionAreaCard/>
<ActionAreaCard/>
<ActionAreaCard/>
<ActionAreaCard/>
<ActionAreaCard/>
<ActionAreaCard/>
<ActionAreaCard/>
</div>
    </div>
  )
}

export default Home