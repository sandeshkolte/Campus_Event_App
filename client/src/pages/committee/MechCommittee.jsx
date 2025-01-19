import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect } from "react";

const teacherCommittee = [
    {
      name: "Dr. Pranay A. Bagde",
      role: "Faculty Coordinator",
      image: "/placeholder.svg?height=100&width=100",
      initials: "PAB",
    },
    {
      name: "Dr. Lalit P. Dhole",
      role: "Head of Department",
      image: "/placeholder.svg?height=100&width=100",
      initials: "LPD",
    },
    {
      name: "Dr. Prashant V. Washimkar",
      role: "Principal",
      image: "/placeholder.svg?height=100&width=100",
      initials: "PVW",
    },
  ];
  
  const studentCommittee = [
    {
      name: "Retesh Kamdi",
      role: "President",
      image: "/placeholder.svg?height=100&width=100",
      initials: "RK",
    },
    {
      name: "Rohit Tamshettiwarr",
      role: "Vice President",
      image: "/placeholder.svg?height=100&width=100",
      initials: "RT",
    },
    {
      name: "Daksh Sandokar",
      role: "Treasurer",
      image: "/placeholder.svg?height=100&width=100",
      initials: "DS",
    },
    {
      name: "Umeshwari Dongarwar",
      role: "Secretary",
      image: "/placeholder.svg?height=100&width=100",
      initials: "UD",
    },
    {
      name: "Ninad Mendhe",
      role: "Executive Student Member",
      image: "/placeholder.svg?height=100&width=100",
      initials: "NM",
    },
    {
      name: "Shubham Katyarmal",
      role: "Executive Student Member",
      image: "/placeholder.svg?height=100&width=100",
      initials: "SK",
    },
    {
      name: "Yash Pardhi",
      role: "Executive Student Member",
      image: "/placeholder.svg?height=100&width=100",
      initials: "YP",
    },
    {
      name: "Abhay Kshirsagar",
      role: "Executive Student Member",
      image: "/placeholder.svg?height=100&width=100",
      initials: "AK",
    },
    {
      name: "Gopal Mutkalwar",
      role: "Executive Student Member",
      image: "/placeholder.svg?height=100&width=100",
      initials: "GM",
    },
    {
      name: "Sumit Raje",
      role: "Executive Student Member",
      image: "/placeholder.svg?height=100&width=100",
      initials: "SR",
    },
    {
      name: "Kshitij Pal",
      role: "Executive Student Member",
      image: "/placeholder.svg?height=100&width=100",
      initials: "KP",
    },
    {
      name: "Premlata Zode",
      role: "Ladies Representative",
      image: "/placeholder.svg?height=100&width=100",
      initials: "PZ",
    },
    {
      name: "Teena Diyewar",
      role: "Ladies Representative",
      image: "/placeholder.svg?height=100&width=100",
      initials: "TD",
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

export default function MECommittee() {
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
          backgroundImage: "url('meTeacherCommittee.jpg')",
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
            ME Department Committee
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Meet the dedicated team behind our Mechanical Engineering department
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
            MESA Committee
          </h2>
          <Card className="bg-white border border-blue-100 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              About MESA
            </h3>
            <p className="text-gray-600 mb-4">
              The Mechanical Engineering Students Association (MESA) is the organizing committee of the Mechanical Engineering department. MESA plays a pivotal role in shaping the professional and extracurricular activities for students.
            </p>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Key Responsibilities:
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Organizing technical workshops and seminars</li>
              <li>Managing departmental events and competitions</li>
              <li>Promoting innovation and research in mechanical engineering</li>
              <li>Coordinating with industries for technical collaborations</li>
              <li>Encouraging participation in professional societies and events</li>
            </ul>
          </Card>
        </motion.section>
        <CommitteeSection title="Faculty Members" members={teacherCommittee} />
        <CommitteeSection
          title="MESA Committee Members"
          members={studentCommittee}
        />
      </div>
    </div>
  );
}
