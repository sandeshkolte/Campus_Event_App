import React from 'react';

const OrganizingCommitteCard = ({ title, image }) => {
  return (
    <div className="relative group transition-all duration-300 h-24 w-[320px] bg-black bg-opacity-25 backdrop-blur-lg text-gray-900 rounded-3xl overflow-hidden my-2">
      <div className='absolute left-10 group-hover:text-center group-hover:left-28 transition-all duration-300'>
        <h1 className='text-4xl font-medium'>
          <span className='font-light text-sm px-1 group-hover:bg-teal-400 group-hover:text-black group-hover:cursor-pointer group-hover:font-medium group-hover:p-1 group-hover:rounded-md'>
            Explore
          </span>
          <br /> {title}
        </h1>
      </div>
      <div className='group-hover:hidden transition-all duration-300 absolute right-4 top-4 flex justify-center items-center'>
        <img className='h-16 w-30 object-cover transition-all duration-300 overflow-hidden rounded-xl' src={image} alt="image" />
      </div>
    </div>
  );
};

export default OrganizingCommitteCard;