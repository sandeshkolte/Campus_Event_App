"use client"

import { baseUrl } from "@/common/common"
import axios from "axios"
import { useEffect, useState } from "react"
import { Trophy, Calendar, School, GraduationCap, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

const WinnerItem = ({ winner, position }) => {
  const medals = ["🥇", "🥈", "🥉"]
  const colors = ["text-gray-900 bg-gray-50", "text-gray-500 bg-gray-50", "text-gray-600 bg-gray-50"]
  const animations = ["scale-110", "scale-105", "scale-100"]

  if (!winner?.user) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: position * 0.1 }}
      className={`flex items-center gap-4 p-4 rounded-lg mb-2 ${colors[position - 1]} transition-all hover:${animations[position - 1]}`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm">
        <span className="text-2xl">{medals[position - 1]}</span>
      </div>
      <div>
        <p className="font-bold text-lg">{`${winner.user.firstname} ${winner.user.lastname}`}</p>
        <div className="flex items-center gap-2 text-sm opacity-80">
          {winner.user.branch && (
            <div className="flex items-center gap-1">
              <School className="w-3 h-3" />
              <span>{winner.user.branch}</span>
            </div>
          )}
          {winner.user.yearOfStudy && (
            <div className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              <span>{winner.user.yearOfStudy} year</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const EventCard = ({ winnerEntry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full md:w-[350px]"
    >
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 text-white">
        <h3 className="text-xl font-bold truncate">{winnerEntry.eventId?.title || "Unnamed Event"}</h3>
        <div className="flex items-center text-purple-100 text-sm mt-1">
          <Calendar className="w-4 h-4 mr-1" />
          <span>
            Declared: {new Date(winnerEntry.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="p-4">
        {winnerEntry.winners?.length > 0 ? (
          <div className="space-y-1">
            {winnerEntry.winners
              .sort((a, b) => parseInt(a.position) - parseInt(b.position))
              .map((winner, index) => (
                <WinnerItem key={index} winner={winner} position={parseInt(winner.position, 10)} />
              ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>No winners declared yet</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const EmptyState = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-4">
    <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-200" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Winners Declared Yet</h3>
    <p className="text-gray-500 max-w-md mx-auto">Winners will appear here once they have been announced. Check back later!</p>
  </motion.div>
)

const ErrorState = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 max-w-2xl mx-auto my-8">
    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
    <div>
      <h3 className="font-semibold text-red-700">Error Loading Winners</h3>
      <p className="text-red-600">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
      >
        Try Again
      </button>
    </div>
  </div>
)

const WinnersPage = () => {
  const [winnerDetails, setWinnerDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${baseUrl}/api/winners`)

        if (response.status !== 200) {
          throw new Error("Failed to fetch winners")
        }

        setWinnerDetails(response.data || [])
        setError(null)
      } catch (error) {
        setError(error.message || "An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchWinners()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Winners Showcase</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Celebrating excellence and achievement across all events</p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <p className="text-purple-700 font-medium">Loading winners...</p>
          </div>
        ) : error ? (
          <ErrorState message={error} />
        ) : winnerDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {winnerDetails.map((winnerEntry, index) => (
              <EventCard key={winnerEntry._id || index} winnerEntry={winnerEntry} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

export default WinnersPage
