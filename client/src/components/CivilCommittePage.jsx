import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect } from "react";

const teacherCommittee = [
  {
    name: "Prof. A.B. Joshi",
    role: "Head of Department",
    image: "joshi.jpg",
    initials: "ABJ",
  },
  {
    name: "Prof. M.A. Patil",
    role: "Assistant Professor",
    image: "patil.jpg",
    initials: "MAP",
  },
  {
    name: "Prof. N.S. Yadav",
    role: "Assistant Professor",
    image: "yadav.jpg",
    initials: "NSY",
  },
  {
    name: "Prof. Priya Verma",
    role: "Assistant Professor",
    image: "/placeholder.svg?height=100&width=100",
    initials: "PV",
  },
  {
    name: "Prof. Rajesh Kumar",
    role: "Assistant Professor",
    image: "/placeholder.svg?height=100&width=100",
    initials: "RK",
  },
];

const studentCommittee = [
  {
    name: "Mr. Yash V. Vihirghare",
    role: "President",
    image: "ravi.jpg",
    initials: "YV",
  },
  {
    name: "Mr. Krushna Kute",
    role: "Vice President",
    image: "neha.jpg",
    initials: "KK",
  },
  {
    name: "Mr. Sagar Kore",
    role: "Secretary",
    image: "aman.jpg",
    initials: "SK",
  },
  {
    name: "Mr. Ritik Patil",
    role: "Sports Representative",
    image: "sonali.jpg",
    initials: "RP",
  },
  {
    name: "Prassana Asutkar",
    role: "Cultural Representative",
    image: "mohit.jpg",
    initials: "PA",
  },
  {
    name: "Mr. Pratik Ingole",
    role: "Technical Representative",
    image: "priyanka.jpg",
    initials: "PI",
  },
  {
    name: "Mr. Tanmay Chahare",
    role: "Treasurer",
    image: "arvind.jpg",
    initials: "TC",
  },
  {
    name: "Ms. Sayali Wanjari",
    role: "Ladies Representative",
    image: "arvind.jpg",
    initials: "SW",
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

export default function CivilCommittee() {
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
          backgroundImage: "url('civilTeacherCommittee.jpg')",
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
            Civil Engineering Department Committee
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Meet the dedicated team behind our Civil Engineering department
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
            CESA Committee
          </h2>
          <Card className="bg-white border border-blue-100 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              About CESA
            </h3>
            <p className="text-gray-600 mb-4">
              The Civil Engineering Students' Association (CESA) is a student-led
              organization that plays an essential role in creating a dynamic
              academic and extracurricular environment for Civil Engineering
              students.
            </p>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Key Responsibilities:
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Organizing civil engineering workshops and seminars</li>
              <li>Coordinating department events and competitions</li>
              <li>Facilitating industry-academia collaborations</li>
              <li>Encouraging research and innovation among students</li>
              <li>Managing civil engineering clubs and interest groups</li>
            </ul>
          </Card>
        </motion.section>
        <CommitteeSection title="Faculty Members" members={teacherCommittee} />
        <CommitteeSection title="CESA Committee Members" members={studentCommittee} />
      </div>
    </div>
  );
}
