import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Medal } from 'lucide-react'
import { useSelector } from 'react-redux';


// const winners= [
  const WinnerItem = ({ winner, position }) => {
    const medals = ['🥇', '🥈', '🥉'];
    const colors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];
  
    if (!winner?.user) return null; // Handle cases where the user field is not populated
  
    return (
      <div className="flex items-center space-x-3 p-2">
        <span className={`text-2xl ${colors[position - 1]}`}>{medals[position - 1]}</span>
        <div>
          <p className="font-semibold">{`${winner.user.firstname} ${winner.user.lastname}`}</p>
          <p className="text-sm text-gray-600">
            {winner.user.branch}, Year {winner.user.yearOfStudy}
          </p>
        </div>
      </div>
    );
  };
  

export default function WinnersPopover({ organisedEvent }) {
  const [winners, setWinners] = useState([]);

  const events = useSelector((state) => state.event?.events);
  const eventDetails = events.find((event) => event._id === organisedEvent._id);

  useEffect(() => {
    if (eventDetails?.winners) {
      // console.log("The popoover: ",eventDetails?.winners);
      
      setWinners(eventDetails.winners);
    }
  }, [eventDetails]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="" className="">
          <Medal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white">
        <div className="space-y-2">
          <h3 className="font-semibold text-center pb-2 border-b text-purple-700">Winners 
            <br />
            <span className='text-gray-600' >
              *
            {organisedEvent.title}
            *
            </span>
            </h3>
          {winners.length > 0 ? (
            
            winners.map((winner, index) => (
              <WinnerItem key={index} winner={winner} position={winner.position} />
            ))
          ) : (
            <div>No Winners Declared</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
