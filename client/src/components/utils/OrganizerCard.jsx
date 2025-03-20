import React from 'react'

const OrganizerCard = ({organizer}) => {
  return (
        <div className='group' >
    <div className='group-hover:bg-gradient-to-br from-gray-200 to-gray-500 transition-all duration-300 bg-gray-200 h-20 w-[300px] text-gray-900 flex justify-center items-center rounded-xl' >
        <div>
        <div className='text-center flex justify-center' >
            <h3 className='text-xl font-medium' >{`${organizer?.firstname} ${organizer?.lastname}`}</h3>
        </div>
        <hr className='py-1' />
        <div className='flex justify-around gap-10 text-sm font-light' >
            <p>{organizer?.branch || "NA"}</p>
            <p>{organizer?.yearOfStudy || "NA"} year</p>
            <p>{organizer?.contact || "NA"}</p>
        </div>        
        </div>
    </div>
        </div>
  )
}

export default OrganizerCard