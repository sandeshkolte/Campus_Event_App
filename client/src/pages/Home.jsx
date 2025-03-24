import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { motion } from 'framer-motion'
import AllEvents from "@/components/AllEvents";
import BranchCard from "@/components/event-card";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import RevealAnimation from "@/components/utils/RevealAnimation";
import OrganizersComponent from "@/components/OrganizersComponent";
import OrganizingCommitteCard from "@/components/utils/OrganizingCommitteCard";
import { Link, useNavigate } from "react-router-dom";
// const AllEvents = React.lazy(() => import('../components/AllEvents'))

const Home = () => {
  const events = useSelector((state) => state.event?.events)

  const token = localStorage.getItem("userToken");
  const isAuthenticated = token !== null && token !== "";
  return (
    <div className="min-h-screen relative ">
      
      <section className="bg-white relative md:overflow" >
      <div className='hidden sm:block absolute -bottom-32 -left-5 h-72 w-72 rounded-full bg-[#b3f5d2b3] blur-2xl animate-shapeChange'></div>
<div className='hidden sm:block absolute -top-32 -right-5 h-72 w-72 rounded-full bg-[#bbb3f588] blur-2xl animate-shapeChange'></div>
                      
      <RevealAnimation>
      {/* <div className="absolute -z-50 bottom-10 right-[0%] translate-y-[-50%] translate-x-[-50%]">
        <div className="w-56 h-56 blur-[200px] max-sm:bg-transparent bg-blue-500 rounded-3xl"></div>
      </div>
      <div className="absolute -z-50 bottom-10 left-[10%] translate-y-[-50%] translate-x-[-50%]">
        <div className="w-56 h-56 blur-[200px] max-sm:bg-transparent bg-blue-500 rounded-3xl"></div>
      </div> */}

      <div className=" w-full mb-10 md:mb-52 ">
        <div className="mt-5 flex justify-center">
          <img
            src="https://th.bing.com/th/id/OIP.U_AL86l48sLEcu0k2UhMzgHaHa?rs=1&pid=ImgDetMain"
            height={130}
            width={130}
            alt="logo"
            className="h-20 w-20 md:h-32 md:w-32 rounded-full "
          />
        </div>
        <h1 className="font-semibold z-50 text-7xl md:text-8xl text-center p-5 pt-10">
          GCOEC
          <br />
          Where Campus Life
          <br />
          Comes{" "}
          <span className="gradient-text text-transparent animate-gradient">
            Alive
          </span>
        </h1>
        
        <p className="font-normal text-md text-center text-black">
          Discover, Register, and Participate in Events Around Campus
        </p>

        <div className="flex justify-center mt-2 gap-5">
          <Button
            variant="outline"
            className="bg-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-400 "
          >
            About us
          </Button>
          <Button className="bg-gray-900 text-white shadow-xl transition-all duration-300  hover:shadow-purple-400 ">
            {(!isAuthenticated && "Get Started") || "Explore Events"}
          </Button>
        </div>
      </div>
      </RevealAnimation>
      </section>

      {/* <div className="flex flex-wrap justify-center mt-28 gap-5 max-sm:flex-col">
        <div className="bg-violet-100 px-2 py-1 rounded-xl w-96 max-sm:w-full flex items-center">
          <i className="ri-search-line text-gray-400"></i>
          <input
            id="searchfield"
            type="text"
            placeholder="Search title..."
            className="bg-transparent px-2 py-1 rounded-xl w-full outline-none"
          />
        </div>
        <div className="bg-violet-100 px-2 py-1 rounded-xl w-96 max-sm:w-full flex items-center">
          <Select className="bg-transparent">
            <SelectTrigger id="coordinator" className="w-full">
              <SelectValue placeholder="Select Category" className="bg-white" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="john">Sports</SelectItem>
              <SelectItem value="jane">Departments</SelectItem>
              <SelectItem value="bob">Seminars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}
      <div className="py-10 h-screen bg-gray-50">
      <div className="flex justify-center mb-5 md:mb-10 md:mt-20" >
      <div className="bg-zinc-950 w-fit text-gray-300 p-3 rounded-2xl text-center mt-5" >
        <RevealAnimation>

      <h3 className=" font-light text-2xl md:mx-10">Organizing Committe</h3>
        </RevealAnimation>
      </div>
      </div>
        <RevealAnimation>
          <section className="flex justify-center items-center py-10" >
            <div className=" grid grid-cols-2 gap-10 md:flex md:justify-center md:flex-wrap md:gap-16  md:w-full md:p-10" >
              <Link to='/cse-committee'> <OrganizingCommitteCard title={'CSE'} image={'asces_logo.jpg'} /></Link>
            <Link to='/entc-committee'> <OrganizingCommitteCard title={'ENTC'} image={'etesa_logo.png'} /></Link>
            <Link to='/instru-committee'>  <OrganizingCommitteCard title={'INSTRU'} image={'iesa_logo.jpg'} /></Link>
            <Link to='/mech-committee'>  <OrganizingCommitteCard title={'MECH'} image={'mesa_logo.png'} /></Link>
            <Link to='/civil-committe'>  <OrganizingCommitteCard title={'CIVIL'} image={'https://tse1.mm.bing.net/th?id=OIP.m6XBhAkjIMlmW5IykwxjqwHaHa&rs=1&pid=ImgDetMain'} /></Link>
            <Link to='/elec-committee'>   <OrganizingCommitteCard title={'ELECT'} image={'eesa_logo.jpg'} /></Link>
            </div>
          </section>
          {/* <OrganizersComponent/> */}
        {/* <div className="relative overflow-hidden mx-6 md:mx-10 "> */}
          {/* Left blur */}
          {/* <div className="absolute inset-y-0 left-0 w-6 md:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" /> */}
          {/* Right blur */}
          {/* <div className="absolute inset-y-0 right-0 w-6 md:w-16  bg-gradient-to-l from-white to-transparent pointer-events-none z-10" /> */}

          {/* <Marquee speed={30} gradient={false} pauseOnHover={true} className="flex whitespace-nowrap">
            <div className="mx-1 md:mx-5">
              <BranchCard title={"CSE"} />
            </div>
            <div className="mx-1 md:mx-5">
              <BranchCard title={"Mech"} />
            </div>
            <div className="mx-1 md:mx-5">
              <BranchCard title={"ENTC"} />
            </div>
            <div className="mx-1 md:mx-5">
              <BranchCard title={"Civil"} />
            </div>
            <div className="mx-1 md:mx-5">
              <BranchCard title={"Elec"} />
            </div>
            <div className="mx-1 md:mx-5">
              <BranchCard title={"Instru"} />
            </div>
          </Marquee> */}
        {/* </div> */}
        </RevealAnimation>
        <div className="flex gap-10 justify-center"></div>
      </div>
      <section className="bg-white md:flex md:justify-center md:flex-wrap md:gap-16 md:w-full md:p-10" >
      <div className="flex justify-center" >
      <div className="bg-zinc-950 w-fit text-gray-300 p-3 rounded-2xl text-center my-5" >
      <h3 className="font-light text-2xl md:mx-10 ">Upcoming Events</h3>
      </div>
      </div>
      <RevealAnimation>
      { events.length !=0 ?      <AllEvents /> :
       <div  className="my-5 mx-6 md:mx-10 flex justify-center items-center h-52 border border-gray-300 rounded-xl">
        <div>
        <h3 className="font-semibold text-center text-3xl text-gray-800" >No events yet</h3>
        <h3 className="text-center text-lg text-gray-800 ">come back later!</h3>
        </div>
      </div>
      }
      </RevealAnimation>
      </section>
      {/* </Suspense> */}

      {/* </div> */}
    </div>
  );
};

export default Home;