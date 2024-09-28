import React, { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { motion } from 'framer-motion'
import AllEvents from '@/components/AllEvents'
import debounce from 'lodash.debounce';
import axios from 'axios'
import BranchCard from '@/components/event-card'
// const AllEvents = React.lazy(() => import('../components/AllEvents')) 



const Home = () => {

// const events = useSelector((state) => state.event.events)

const [query,setQuery] = useState('')
const [loading,setLoading] = useState(false)

const fetchSearchResults = debounce(async(searchQuery)=>{
    setLoading(true);
    try {
      const response = await axios.get('/api/event/',searchQuery);
      setResults(response.data.events);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
},300)


const token = localStorage.getItem("userToken")
const isAuthenticated = token !== null && token !== ""
  return (

    <div className='min-h-screen relative px-10'>
        <div className='absolute top-[15%] right-[20%] translate-y-[-50%] translate-x-[-50%]'>
                <div className='w-28 h-28 blur-3xl max-sm:bg-transparent bg-purple-500 rounded-3xl'></div>
            </div>
            <div className='absolute top-[20%] left-[20%] translate-y-[-50%] translate-x-[-50%]'>
                <div className='w-20 h-20 blur-3xl max-sm:bg-transparent bg-violet-500 rounded-3xl'></div>
            </div>
        
        <div className='bg-transparent w-full mb-52 '>
            <div className= ' mt-5 flex justify-center' >
        <img src="https://th.bing.com/th/id/OIP.U_AL86l48sLEcu0k2UhMzgHaHa?rs=1&pid=ImgDetMain" height={130} width={130} alt="" />
            </div>
        <h1 className='font-bold text-7xl text-center p-5 pt-10'>GCOEC<br />Where Campus Life<br />Comes <span className='gradient-text text-transparent animate-gradient' >Alive</span></h1>
        <p className='font-semibold text-md text-center text-slate-800'>Discover, Register, and Participate in Events Around Campus</p>
       
       <div className='flex justify-center mt-2 gap-5'>
        <Button variant="outline" className="bg-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-400 " >About us</Button>
        <Button className="bg-gray-900 text-white shadow-xl transition-all duration-300  hover:shadow-purple-400 " >{!isAuthenticated && "Get Started" || "Explore Events"}</Button>
       </div>
        </div>

        <div className='flex flex-wrap justify-center mt-28 gap-5 max-sm:flex-col'>
            <div className='bg-violet-100 px-2 py-1 rounded-xl w-96 max-sm:w-full flex items-center'>
                <i className="ri-search-line text-gray-400"></i>
                <input 
                    id="searchfield"
                    type="text" 
                    placeholder='Search title...' 
                    className='bg-transparent px-2 py-1 rounded-xl w-full outline-none' 
                />
            </div>
            <div className='bg-violet-100 px-2 py-1 rounded-xl w-96 max-sm:w-full flex items-center'>
                <Select className="bg-transparent" >
                    <SelectTrigger id="coordinator" className='w-full'>
                        <SelectValue placeholder="Select Category" className='bg-white' />
                    </SelectTrigger>
                    <SelectContent className="bg-white" >
                        <SelectItem value="john">Sports</SelectItem>
                        <SelectItem value="jane">Departments</SelectItem>
                        <SelectItem value="bob">Seminars</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
<div className='my-10 ' >
    <h3 className='text-center font-bold text-2xl py-5' >Organising Comittees</h3>
    <div className='flex flex-wrap gap-10 justify-center ' >
  <BranchCard title={"CSE"} />
  <BranchCard title={"Mech"} />
  <BranchCard title={"ENTC"} />
  <BranchCard title={"Civil"} />
  <BranchCard title={"Elec"} />
  <BranchCard title={"Instru"} />
    </div>
</div> 
{/* <div className='flex flex-wrap gap-16 p-10 w-full justify-center'> */}
{/* <Suspense fallback={<div>Loading...</div>} > */}
<h3 className='mt-5 text-2xl font-bold ' >Upcoming Events</h3>
<AllEvents/>
{/* </Suspense> */}

{/* </div> */}
    </div>
   
  )
}

export default Home