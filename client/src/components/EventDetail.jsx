import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MapPin, Calendar, Clock, Plus, ArrowLeft, IndianRupee } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Organizer from "./Organizer";
import Marquee from "react-fast-marquee";
import { useCallback, useEffect, useState } from "react";
import TicketBooking from "./OpenTicket";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react"
import { CoordinatorProvider } from "@/hooks/useCoordinator";
import OrganizerCard from "./utils/OrganizerCard";
import RelatedEvents from "./RelatedEvents";

export default function EventDetails() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user=useSelector((state)=>state.auth?.userInfo)

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const navigate=useNavigate()
  const { id } = useParams();
  const events = useSelector((state) => state.event?.events);
  const eventDetails = events.find((event) => event._id === id);
  const [organizerAndCoordinator, setOrganizerAndCoordinator] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }


  const imageUrl = eventDetails?.image;
  // console.log("all events :", events);

  const EventDetails = () => (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-5xl font-bold text-white leading-tight">
        {eventDetails?.title}
      </h1>
      <p className="text-xl text-white/90">Organized By {eventDetails?.organizingBranch}</p>
      <p className="text-base text-white/80">{eventDetails?.venue}</p>
      <Button
        variant="outline"
        className="text-white bg-transparent border-none hover:bg-white/20"
      >
        <MapPin className="mr-2 h-4 w-4" /> View Map
      </Button>
    </div>
  );

  const EventCard = () => (
    <Card className="w-80 bg-white/95 backdrop-blur-sm shadow-xl">
      <div className="p-6 space-y-4">
        <EventDateTime />
        <Button
          onClick={handleBookNow}
          className="w-full bg-gray-900 hover:bg-gray-700 text-white transition-colors"
        >
          Book Now ({String(eventDetails?.price) === '0' || eventDetails?.price === '' ? (
                <span className="">FREE</span>
              ) : (
                <span className="flex items-center">
                  <IndianRupee className="w-3 h-3" strokeWidth={3} />
                  {eventDetails?.price}
                </span>
              )})
        </Button>

        <p className="text-sm text-gray-500 text-center">No Refunds</p>
      </div>
    </Card>
  );

  const EventDateTime = () => (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-gray-800">Date & Time</h2>
      <div className="flex items-center text-gray-600">
        <Calendar className="mr-2 h-5 w-5" />
        <p>
          {new Date(eventDetails?.startDate).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex items-center text-gray-600">
        <Clock className="mr-2 h-5 w-5" />
        <p>
          {" "}
          {new Date(eventDetails?.startDate).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      <Button
        variant="link"
        className="p-0 h-auto text-purple-600 hover:text-purple-700"
      >
        <Plus className="mr-2 h-4 w-4" /> Add to Calendar
      </Button>
    </div>
  );

  const preventDefault = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Apply styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Prevent touchmove events
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
    } else {
      // Remove styles and restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);

      // Remove touchmove event listener
      document.removeEventListener("touchmove", preventDefault);
    }

    return () => {
      // Cleanup: ensure scrolling is re-enabled when component unmounts
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [isDialogOpen, preventDefault]);

  const interested = [
    "Indonesia Events",
    "Jakarta Events",
    "UI",
    "Thing To Do In Jakarta",
    "Jakarta Seminar",
  ];

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
            {winner.user.branch}, {winner.user.yearOfStudy}
          </p>
        </div>
      </div>
    );
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [eventDetails]);
  useEffect(() => {
    if (eventDetails) {
      setOrganizerAndCoordinator(
        eventDetails.coordinator,
      );
      // console.log("Organizers and Coordinators: ",eventDetails.coordinator);
      // console.log("Event : ",eventDetails);
      
    }
  }, [eventDetails]);

  const handleBookNow = () => {
    if (!user) {
      // If user is not logged in, redirect to the login page
      toast.error("You Need To Login First")
    } else {
      // If user is logged in, open the ticket booking dialog
      openDialog();
    }
  };

  return (
    <>
    <div className="min-h-screen bg-white border-1 px-4 md:px-10 lg:px-20 py-8 shadow-lg">
      <header className=""></header>
      <CoordinatorProvider>
      <TicketBooking isOpen={isDialogOpen} onClose={closeDialog} eventDetails={eventDetails}/>
      </CoordinatorProvider>

      <Card className="w-full overflow-hidden">
        {/* Large and medium screen layout */}
        <div className="hidden md:block relative">
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="absolute inset-0 bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-blue-900/60 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col min-h-[350px] p-10">
            <Button
              variant="ghost"
              className="self-start text-white hover:bg-white/20 mb-8"
              onClick={(e)=> navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {/* Flex layout change on large screens */}
            <div className="flex md:flex-row flex-col justify-between items-center space-x-8">
              <EventDetails />
              <EventCard />
            </div>
          </div>
        </div>

        {/* small screen layout */}
        <div className="md:hidden">
          <div className="relative h-64 md:h-80">
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              className="absolute inset-0 bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-blue-900/60 to-transparent" />
            </div>

            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {eventDetails?.title}
              </h2>
              <p className="text-sm sm:text-base text-white/80">
              Organized By {eventDetails?.organizingBranch}
              </p>
            </div>
          </div>
          <CardHeader>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <p>{eventDetails?.venue}</p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <EventDateTime />
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" /> Add to Calendar
            </Button>
            <div className="flex">
              <Button
                onClick={handleBookNow}
                className="w-full bg-gray-900 hover:bg-gray-700 text-white transition-colors"
              >
                Book Now ({String(eventDetails?.price) === '0' || eventDetails?.price === '' ? (
                <span className="">FREE</span>
              ) : (
                <span className="flex items-center">
                  <IndianRupee className="w-3 h-3" strokeWidth={3} />
                  {eventDetails?.price}
                </span>
              )})
              </Button>
              <CoordinatorProvider>
              <TicketBooking isOpen={isDialogOpen} onClose={closeDialog} eventDetails={eventDetails} />
              </CoordinatorProvider>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center w-full">
              No Refunds
            </p>
          </CardFooter>
        </div>
      </Card>
      <main className="max-w-7xl mx-auto py-8 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="relative" >
            <h3 className="text-2xl font-semibold mb-4">Description</h3>
            <p style={{ whiteSpace: 'pre-line' }} className={`bg-background text-foreground p-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'h-auto' : 'h-96'
        }`}>{eventDetails?.description}</p>
         <div className={`absolute bottom-0 left-0 right-0 flex justify-center p-4 bg-gradient-to-t from-gray-50 to-transparent ${isExpanded ? 'relative' : ''}`}>
        <Button
          onClick={toggleExpand}
          variant="outline"
          className="flex items-center"
        >
          {isExpanded ? (
            <>
              Show Less
              <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Read More
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">Date & Time</h3>
            <p>
              <span className="font-semibold">Start Date & Time:</span>{" "}
              {new Date(eventDetails?.startDate).toLocaleString("en-US", {
                // day: "numeric",
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              {/* To{" "}
              {new Date(eventDetails?.endDate).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })} */}
            </p>

            {/* Conditionally render the end date if the day number is different */}
            {new Date(eventDetails?.startDate).getDate() !==
              new Date(eventDetails?.endDate).getDate() && (
              <p>
                <span className="font-semibold">End Date & Time:</span>{" "}
                {new Date(eventDetails?.endDate).toLocaleString("en-US", {
                  // day: "numeric",
                  weekday: "long",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                {/* To{" "}
                {new Date(eventDetails?.endDate).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })} */}
              </p>
            )}
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600 flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {eventDetails?.venue}
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">
              Organizer & Coordinator Contact Information :
            </h3>
            <div className="flex gap-2 w-full overflow-x-auto">
              {/* Left blur */}
              {/* <div className="absolute inset-y-0 left-0 w-6 md:w-10 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" /> */}
              {/* Right blur */}
              {/* <div className="absolute inset-y-0 right-0 w-6 md:w-10  bg-gradient-to-l from-white to-transparent pointer-events-none z-10" /> */}

              {/* <Marquee speed={30} gradient={false} pauseOnHover={true}> */}
                {organizerAndCoordinator.map((organizer, index) => (
                  <div className="" key={index}>
                    {/* Pass the entire organizer object instead of testOrganizer */}
                    {/* <Organizer organizer={organizer} /> */}
                    <OrganizerCard organizer={organizer} />
                  </div>
                ))}
              {/* </Marquee> */}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-semibold mb-4">Event Poster</h3>
            <div className="h-64 overflow-hidden mb-4 relative">
              <img
                src={eventDetails?.image}
                alt="event image"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <h4 className="font-semibold mb-2">{eventDetails?.title}</h4>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {eventDetails?.category?.map((item, index) => (
                <div
                  key={index}
                  className="bg-sky-50 text-gray-800 text-sm font-medium py-2 px-4 rounded-md cursor-pointer transition-colors hover:bg-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
          <section className="w-full bg-purple-100 rounded-xl" >
          <div className="p-2" >
          <h2 className="text-2xl font-semibold mb-4" >Winners</h2>
          {
                    <div className="space-y-2">
                    <h3 className="font-semibold text-center pb-2 border-b text-purple-700">Winners 
                      <br />
                      <span className='text-gray-600' >
                        *
                      {eventDetails?.title}
                      *
                      </span>
                      </h3>
                    {eventDetails?.winners.length > 0 ? (
                      
                      eventDetails?.winners.map((winner, index) => (
                        <WinnerItem key={index} winner={winner} position={winner.position} />
                      ))
                    ) : (
                      <div>No Winners Declared</div>
                    )}
                  </div>
          }
        </div>
          </section>
        </div>
      </main>
    </div>
    
    <RelatedEvents eventDetails ={eventDetails}/>
    </>
  );
}