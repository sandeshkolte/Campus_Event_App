import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Image, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "@/common/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const EventCard = ({ event }) => (
  <Card className="overflow-hidden bg-white mb-4 transition-shadow duration-300 hover:shadow-lg">
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-48 h-48 relative">
        <img
          src={
            event.image ||
            "https://th.bing.com/th/id/OIP.GPFEY6kfgxbsja6gmrW6rwAAAA?rs=1&pid=ImgDetMain"
          }
          alt={event.title}
          className="w-full h-full object-center"
          width={192}
          height={192}
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {event.status}
        </Badge>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4 flex-grow">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {new Date(event?.startDate).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {event.venue}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Tickets Sold
              </span>
              <span className="text-sm font-medium text-gray-800">
                {event.soldTickets}/{event.totalTickets}
              </span>
            </div>
            {/* //progressbar */}
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-black rounded"
                style={{
                  width: `${(event.soldTickets / event.totalTickets) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  </Card>
);

const ParticipantCard = ({ user, onStatusChange, event }) => {
  const [isGroupEvent, setIsGroupEvent] = useState(event?.isGroupEvent);

  const [paymentStatus, setPaymentStatus] = useState(
    user.participant.paymentStatus
  );

  const handleStatusChange = (value) => {
    setPaymentStatus(value);
    if (!isGroupEvent) {
      onStatusChange(user?.response._id, value);
    } else {
      onStatusChange(user?.groupName, value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full mx-auto"
    >
      <div className="w-full mx-auto">
        {/* List view for small screens */}
        <div className="md:hidden">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="flex items-center p-2 pt-3 border-b">
              <img
                src={
                  isGroupEvent
                    ? user?.user?.response.image
                    : user?.response.image
                }
                alt={isGroupEvent ? user.groupName : user?.response.firstname}
                className="w-20 h-20 object-cover rounded-full mr-4"
              />
              <div className="">
                <h3 className="text-lg font-semibold text-gray-800">
                  {isGroupEvent && user.groupName}{" "}
                  {!isGroupEvent && user?.response.firstname}{" "}
                  {!isGroupEvent && user?.response.lastname}
                </h3>
              </div>
            </div>
            <div className="p-2 flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 mb-2">
                    Show Screenshot
                    <Image className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%]">
                  <DialogHeader>
                    <DialogTitle>Payment Screenshot</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center justify-center">
                    <img
                      src={
                        user.participant.paymentScreenshot || "/placeholder.svg"
                      }
                      alt="Payment Screenshot"
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={paymentStatus} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Pending">Pending Ticket</SelectItem>
                  <SelectItem value="Confirmed">Confirm Ticket</SelectItem>
                  <SelectItem value="Rejected">Reject Ticket</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Card view for medium and large screens */}
        <Card className="hidden md:block bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
          <div className="flex">
            {/* User Image */}
            <div className="w-20 h-20 p-2 relative">
              <img
                src={
                  isGroupEvent
                    ? user?.user?.response.image
                    : user?.response.image
                }
                alt={isGroupEvent ? user.groupName : user?.response.firstname}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* User Details */}
            <div className="flex flex-1 justify-between items-center gap-5 p-4">
              {/* Left Section */}
              <div className="flex flex-col gap-2">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-bold text-gray-800">
                    {isGroupEvent && user.groupName}{" "}
                    {!isGroupEvent && user?.response.firstname}{" "}
                    {!isGroupEvent && user?.response.lastname}
                  </CardTitle>
                </CardHeader>
              </div>

              {/* Right Section */}
              <CardContent className="p-0 flex items-center gap-5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 text-white hover:bg-gray-700 mb-2">
                      Show Screenshot
                      <Image className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Payment Screenshot</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-6">
                      <img
                        src={
                          user.participant.paymentScreenshot ||
                          "/placeholder.svg"
                        }
                        alt="Payment Screenshot"
                        className="max-w-full max-h-[80vh] object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue placeholder={paymentStatus} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Pending">Pending Ticket</SelectItem>
                    <SelectItem value="Confirmed">Confirm Ticket</SelectItem>
                    <SelectItem value="Rejected">Reject Ticket</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default function TicketStatusChangingPage() {
  const [participants, setParticipants] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.userInfo?._id);
  const activeEvents = useSelector((state) => state.event?.activeEvents);
  const event = activeEvents?.find((event) => event._id === id) || null;
  const [participantDetails, setParticipantsDetails] = useState([]);
  const [change, setChange] = useState(false);
  const [groupUsoerInfo, setGroupUserInfo] = useState([]);
  const [isGroupEvent, setIsGroupEvent] = useState(false);

  // Fetch user information for a given userId
  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/getuser/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (event && !event.isGroupEvent) {
        // For individual event
        if (event.participants && event.participants.length > 0) {
          const userDetailsPromises = event.participants.map(
            async (participant) => {
              return await fetchUserInfo(participant.userId);
            }
          );
          const userDetails = await Promise.all(userDetailsPromises);
          setParticipants(userDetails.filter((user) => user !== null));
        }
      } else if (event && event.isGroupEvent) {
        setIsGroupEvent(true);
        // For group event
        if (event.participants && event.participants.length > 0) {
          const groupParticipants = await Promise.all(
            event.participants.map(async (participant) => {
              const user = await fetchUserInfo(participant.userId);
              return { groupName: participant.groupName, user };
            })
          );

          const uniqueGroupParticipants = groupParticipants.reduce(
            (acc, current) => {
              const existingGroup = acc.find(
                (entry) => entry.groupName === current.groupName
              );
              if (!existingGroup) {
                acc.push(current);
              }
              return acc;
            },
            []
          );

          setGroupUserInfo(uniqueGroupParticipants);
        }
      }
    };

    if (event) {
      fetchData();
    }
  }, [event, change]);

  const handleStatusChange = async (ParticipantIdorGroupName, newStatus) => {
    try {
      let response;

      if (!isGroupEvent) {
        // Payload for individual event
        const individualPayload = {
          eventId: event._id,
          participantId: ParticipantIdorGroupName,
          newStatus: newStatus,
          userId: userId,
        };

        // API call for individual event
        response = await axios.post(
          `${baseUrl}/api/event/update-payment-status`,
          individualPayload
        );
      } else {
        const groupPayload = {
          eventId: event._id,
          groupName: ParticipantIdorGroupName,
          userId: userId,
          newStatus: newStatus,
        };

        // console.log("is is group groupPayload:", groupPayload);

        // API call for group event
        response = await axios.post(
          `${baseUrl}/api/event/update-group-payment-status`,
          groupPayload
        );
      }
      // console.log("this is group consolin after axios call",response)
      if (response.status === 200) {
        setChange((prev) => !prev); // Trigger re-filtering
        // console.log("Payment status updated successfully:", response.data);
      } else {
        console.error("Failed to update payment status:", response.data);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  useEffect(() => {
    if (!participants || !id || !statusFilter) {
      return;
    }

    if (!event?.isGroupEvent) {
      const filteredDetails = participants
        .map((user) => {
          const participant = user.response.myevents?.find(
            (e) => e.eventId === id
          );
          return { ...user, participant };
        })
        .filter((user) => user.participant?.paymentStatus === statusFilter);
      setParticipantsDetails(filteredDetails);
    } else {
      const filteredDetails = groupUsoerInfo
        .map((user) => {
          const participant = user?.user?.response?.myevents?.find(
            (e) => e.eventId === id
          );
          return { ...user, participant };
        })
        .filter((user) => user?.participant?.paymentStatus === statusFilter);
    
      setParticipantsDetails(filteredDetails);
    }
  }, [participants, id, statusFilter, change, groupUsoerInfo]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 md:mb-8 text-gray-800">
          Tickets Payments Verification
        </h1>

        <Card className="bg-white rounded-lg shadow-md p-2 sm:p-4 md:p-6 mb-4 md:mb-8">
          {event ? <EventCard event={event} /> : <p>Event not found.</p>}

          <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
            {["Pending", "Confirmed", "Rejected"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                className={`${
                  statusFilter === status
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </Card>

        <AnimatePresence>
          <motion.div
            className="space-y-4 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {participantDetails.length > 0 ? (
              participantDetails.map((user) => {
                const key = isGroupEvent
                  ? `${user.user.response._id}-${user.groupName}`
                  : `${user.response._id}-${user.response.firstname}`;

                return (
                  <ParticipantCard
                    key={key}
                    user={user}
                    onStatusChange={handleStatusChange}
                    event={event}
                  />
                );
              })
            ) : (
              <div>Nothing Available Here</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}