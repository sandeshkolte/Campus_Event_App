import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect } from "react";

const teacherCommittee = [
  {
    name: "Prof. A.B. Kale",
    role: "Head of Department",
    image: "kalesirphoto.jpg",
    initials: "ABK",
  },
  {
    name: "Prof. M.S. Patil",
    role: "Assistant Professor",
    image: "patilsirphoto.jpg",
    initials: "MSP",
  },
  {
    name: "Prof. R.T. Deshmukh",
    role: "Assistant Professor",
    image: "deshmukhsirphoto.jpg",
    initials: "RTD",
  },
  {
    name: "Prof. N.P. Gaikwad",
    role: "Assistant Professor",
    image: "/placeholder.svg?height=100&width=100",
    initials: "NPG",
  },
  {
    name: "Prof. S.L. Joshi",
    role: "Assistant Professor",
    image: "/placeholder.svg?height=100&width=100",
    initials: "SLJ",
  },
];

const studentCommittee = [
  {
    name: "Mr. Aditya Gore",
    role: "President",
    image: "anjali.jpg",
    initials: "AG",
  },
  {
    name: "Ms. Shruti Morey",
    role: "Event Co-Ordinator",
    image: "rohit.jpg",
    initials: "SM",
  },
  {
    name: "Mr. Rishabh Katre",
    role: "Secretary",
    image: "kartik.jpg",
    initials: "RK",
  },
  {
    name: "Mr. Prajwal Kadaskar",
    role: "Treasurer",
    image: "akshay.jpg",
    initials: "PK",
  },
];

const MotionCard = motion(Card);

function CommitteeMember({ member, index }) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white border border-blue-100"
    >
      <CardHeader className="pb-0">
        <div className="flex justify-center">
          <Avatar className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 border-4 border-blue-500 shadow-lg">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
              {member.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="text-center pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {member.name}
        </h3>
        <p className="text-md font-medium text-blue-600">{member.role}</p>
      </CardContent>
    </MotionCard>
  );
}

function CommitteeSection({ title, members }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="mt-16 px-4"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
        {title}
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member, index) => (
          <CommitteeMember key={index} member={member} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

export default function EntcCommittee() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, []);
  return (
    <div className="min-h-screen mt-20 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-cover bg-center h-[60vh] flex items-center justify-center relative"
        style={{
          backgroundImage: "url('etesaTeacherCommittee.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
          >
            ETESA Department Committee
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Meet the passionate team behind our Electronics & Telecommunication
            Engineering department
          </motion.p>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
            ETESA Committee
          </h2>
          <Card className="bg-white border border-blue-100 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              About ETESA
            </h3>
            <p className="text-gray-600 mb-4">
              The Electronics and Telecommunication Engineering Students
              Association (ETESA) is the organizing committee of the E&T
              department. ETESA strives to create an engaging and enriching
              academic environment for its students.
            </p>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Key Responsibilities:
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Organizing workshops and seminars on emerging technologies</li>
              <li>Hosting technical and cultural events</li>
              <li>Facilitating industry connections and internships</li>
              <li>Encouraging research and development activities</li>
              <li>Supporting student-led clubs and initiatives</li>
            </ul>
          </Card>
        </motion.section>
        <CommitteeSection title="Faculty Members" members={teacherCommittee} />
        <CommitteeSection
          title="ETESA Committee Members"
          members={studentCommittee}
        />
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
            Circuits & Signals Club
          </h2>
          <Card className="bg-white border border-blue-100 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              About Circuits & Signals
            </h3>
            <p className="text-gray-600 mb-4">
              The Circuits & Signals Club is a student-driven platform under
              the E&T department that focuses on innovation and practical
              applications in electronics and telecommunication.
            </p>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Key Responsibilities:
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Conducting hands-on sessions on circuit design</li>
              <li>Hosting electronics hackathons and competitions</li>
              <li>Organizing expert talks and panel discussions</li>
              <li>Promoting collaborative projects in IoT and communication</li>
              <li>Encouraging participation in national-level competitions</li>
            </ul>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
