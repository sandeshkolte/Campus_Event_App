"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IndianRupee, Calendar, MapPin, Users } from "lucide-react"

function EventCard({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[345px] md:w-96 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
        <CardHeader className="p-0">
          <div className="relative group">
            <motion.img
              src={event.image}
              alt={event.title}
              loading="lazy"
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4 bg-white rounded-full px-4 py-2 text-sm font-bold shadow-md">
              {String(event.price) === '0' || event.price === '' ? (
                <span className="text-green-600">FREE</span>
              ) : (
                <span className="flex items-center">
                  <IndianRupee className="w-3 h-3 mr-1" strokeWidth={3} />
                  {event.price}
                </span>
              )}
            </div>
            <motion.div
              className="absolute top-4 right-4 bg-purple-600 text-white rounded-full px-4 py-2 text-sm font-bold shadow-md flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-4 h-4 mr-1" />
              <span>+12 students</span>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-semibold text-purple-600">
                  {new Date(event.startDate).toLocaleString('en-US', { month: 'short' })}
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {new Date(event.startDate).toLocaleString('en-US', { day: 'numeric' })}
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-800 leading-tight mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-snug mb-3">{event.description}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(event.startDate).toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{event.venue || 'TBA'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EventCard