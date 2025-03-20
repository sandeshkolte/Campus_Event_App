// import React from "react";
// import { Image } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const EventTickets = ({ ticket }) => {
//   return (
//     <div className="w-full mx-auto">
//       {/* List view for small screens */}
//       <div className="md:hidden">
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="flex items-start p-2 pt-3 border-b">
//             <img
//               src={ticket.image}
//               alt={ticket.title}
//               className="w-20 h-20 object-cover rounded mr-4"
//             />
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {ticket.title}
//               </h3>
//               <div className="flex justify-between items-center mt-1">
//                 <p className="text-sm text-gray-600">
//                   Buyer: <span className="font-medium">{ticket.buyerName}</span>
//                 </p>
//                 <p className="text-sm font-medium text-gray-800">
//                   ${ticket.price.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="p-2 flex gap-2">
//             <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 mb-2">
//               Show Screenshot
//               <Image className="w-4 h-4 ml-2" />
//             </Button>
//             <Select>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Ticket Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="confirm">Confirm Ticket</SelectItem>
//                 <SelectItem value="reject">Reject Ticket</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Card view for medium and large screens */}
//       <Card className="hidden md:block bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
//         <div className="flex">
//           {/* Event Image */}
//           <div className="w-24 h-24 relative">
//             <img
//               src={ticket.image}
//               alt={ticket.title}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Event Details */}
//           <div className="flex flex-1 justify-between items-center gap-5 p-4">
//             {/* Left Section */}
//             <div className="flex flex-col gap-2">
//               <CardHeader className="p-0">
//                 <CardTitle className="text-lg font-bold text-gray-800">
//                   {ticket.title}
//                 </CardTitle>
//                 <p className="text-sm text-gray-600">
//                   Buyer:{" "}
//                   <span className="font-medium text-gray-800">
//                     {ticket.buyerName}
//                   </span>
//                 </p>
//                 <p className="text-sm text-gray-600">
//                 Price:{" "}
//                 <span className="font-medium text-gray-800">
//                   ${ticket.price.toFixed(2)}
//                 </span>
//               </p>
//               </CardHeader>

              
//             </div>

//             {/* Right Section */}
//             <CardContent className="p-0 flex items-center gap-5">
//               <Button className="bg-gray-800 text-white hover:bg-gray-700 text-sm">
//                 Show Screenshot
//                 <Image className="w-4 h-4 ml-2" />
//               </Button>

//               <Select>
//                 <SelectTrigger className="w-[180px] text-sm">
//                   <SelectValue placeholder="Ticket Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="confirm">Confirm Ticket</SelectItem>
//                   <SelectItem value="reject">Reject Ticket</SelectItem>
//                 </SelectContent>
//               </Select>
//             </CardContent>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default function VerifyTicket() {
//   const sampleTicket = {
//     id: "1",
//     title: "Summer Music Festival",
//     image: "https://dcmsblog.uk/wp-content/uploads/2014/09/events.jpg",
//     buyerName: "John Doe",
//     price: 99.99,
//   };

//   return <EventTickets ticket={sampleTicket} />;
// }
