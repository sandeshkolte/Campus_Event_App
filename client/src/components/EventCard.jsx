"use client";

import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IndianRupee, Calendar, MapPin, Users } from "lucide-react";

function EventCard({ event }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true }); // Trigger animation only once
  const controls = useAnimation();

  // Start animation when the card is in the viewport
  if (inView) {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
      transitionDelay: 0.5,
    });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="mb-6" // Optional margin for spacing between cards
    >
      <Card className="w-full h-[300px] md:w-96 md:h-96 group overflow-hidden md:rounded-xl md:shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out bg-white border border-white/20">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden md:rounded-t-xl">
            <motion.img
              src={event.image}
              alt={event.title}
              loading="lazy"
              className="w-full h-36 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4 bg-white rounded-full px-4 py-2 text-sm font-bold shadow-md">
              {String(event.price) === "0" || event.price === "" ? (
                <span className="text-green-600">FREE</span>
              ) : (
                <span className="flex items-center">
                  <IndianRupee className="w-3 h-3 mr-1" strokeWidth={3} />
                  {event.price}
                </span>
              )}
            </div>
            <motion.div
              className="absolute top-4 right-4 backdrop-blur-md bg-opacity-50 bg-purple-600 text-white rounded-full px-4 py-2 text-sm font-bold shadow-md flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-4 h-4 mr-1" />
              <span>{event.participants.length}</span>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-semibold text-purple-600">
                  {new Date(event.startDate).toLocaleString("en-US", {
                    month: "short",
                  })}
                </div>
                <div className="md:text-2xl font-bold text-purple-800">
                  {new Date(event.startDate).toLocaleString("en-US", {
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className=" text-lg md:text-xl font-bold text-gray-800 leading-tight mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-snug mb-3">
                {event.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-orange-500" />
                  <span className="line-clamp-1">
                    {new Date(event.startDate).toLocaleString("en-US", {
                      weekday: "short",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-sky-500" />
                  <span className="line-clamp-1">{event.venue || "TBA"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default EventCard;
