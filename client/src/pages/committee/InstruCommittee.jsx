import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect } from "react";

const teacherCommittee = [
    {
      name: "Prof. Nishant M. Yewale",
      role: "Head of Department",
      image: "/placeholder.svg?height=100&width=100",
      initials: "NMY",
    },
    {
      name: "Prof. C. M. Kadam",
      role: "Faculty In-charge IESA",
      image: "/placeholder.svg?height=100&width=100",
      initials: "CMK",
    },
  ];
  
  const studentCommittee = [
    {
      name: "Mr. Akash Tangade",
      role: "President",
      year: "Final Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "AT",
    },
    {
      name: "Ms. Yashasvi Chaudhari",
      role: "Vice President",
      year: "Third Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "YC",
    },
    {
      name: "Ms. Abhilasha Gotefode",
      role: "Secretary",
      year: "Third Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "AG",
    },
    {
      name: "Mr. Sahil Bhendarkar",
      role: "Treasurer",
      year: "Third Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "SB",
    },
    {
      name: "Mr. Pranay Chaudhari",
      role: "Treasurer",
      year: "Second Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "PC",
    },
    {
      name: "Ms. Mamta Yadav",
      role: "Ladies Representative",
      year: "Final Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "MY",
    },
    {
      name: "Mr. Pranay Makode",
      role: "Technical Coordinator",
      year: "Final Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "PM",
    },
    {
      name: "Mr. Avishkar Wadaskar",
      role: "Technical Coordinator",
      year: "Third Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "AW",
    },
    {
      name: "Mr. Aman Borsare",
      role: "Social Coordinator",
      year: "Final Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "AB",
    },
    {
      name: "Mr. Prasad Sambhare",
      role: "Social Coordinator",
      year: "Final Year",
      image: "/placeholder.svg?height=100&width=100",
      initials: "PS",
    },
  ];
  

const MotionCard = motion(Card);

function CommitteeMember({ member, index }) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white border border-green-100"
    >
      <CardHeader className="pb-0">
        <div className="flex justify-center">
          <Avatar className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 border-4 border-green-500 shadow-lg">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback className="bg-green-100 text-green-600 text-2xl font-bold">
              {member.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="text-center pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {member.name}
        </h3>
        <p className="text-md font-medium text-green-600">{member.role}</p>
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

export default function InstrumentationCommittee() {
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
          backgroundImage: "url('instrumentationDepartment.jpg')",
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
            Instrumentation Department Committee
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl sm:text-2xl text-green-100 max-w-3xl mx-auto"
          >
            Meet the innovative minds shaping the Instrumentation Engineering
            Department.
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
            INSA Committee
          </h2>
          <Card className="bg-white border border-green-100 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              About INSA
            </h3>
            <p className="text-gray-600 mb-4">
              The Instrumentation Society of Automation (INSA) is the official
              committee of the Instrumentation department. INSA aims to promote
              technical excellence and provide opportunities for students to
              excel in the field of Instrumentation Engineering.
            </p>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Key Responsibilities:
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Conducting workshops on industrial automation</li>
              <li>Organizing guest lectures by industry experts</li>
              <li>Hosting technical competitions and events</li>
              <li>Encouraging research and development initiatives</li>
              <li>Building collaboration with industries</li>
            </ul>
          </Card>
        </motion.section>
        <CommitteeSection
          title="Faculty Members"
          members={teacherCommittee}
        />
        <CommitteeSection
          title="INSA Committee Members"
          members={studentCommittee}
        />
      </div>
    </div>
  );
}
