import React from 'react'

const OrganizerCard = ({organizer}) => {
  return (
        <div className='group' >
    <div className='group-hover:bg-gradient-to-br from-gray-900 to-purple-900 transition-all duration-300 bg-gray-950 h-20 w-[300px] text-gray-300 flex justify-center items-center rounded-xl' >
        <div>
        <div className='text-center flex justify-center' >
            <h3 className='text-xl font-medium' >{`${organizer?.firstname} ${organizer?.lastname}`}</h3>
        </div>
        <hr className='py-1' />
        <div className='flex justify-around gap-10 text-sm font-light' >
            <p>{organizer?.branch || "NA"}</p>
            <p>{organizer?.yearOfStudy || "NA"}</p>
            <p>{organizer?.contact || "NA"}</p>
        </div>        
        </div>
    </div>
        </div>
  )
}

export default OrganizerCard