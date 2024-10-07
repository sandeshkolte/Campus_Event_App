import React, { createContext, useState, useContext } from "react";

// Create the context
const MemberContext = createContext();

// Create a provider component
export const MemberProvider = ({ children }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const addMember = (Member) => {
    setSelectedMembers((prev) => [...prev, Member]);
  };

  const removeMember = (Member) => {
    setSelectedMembers((prev) => prev.filter((c) => c !== Member));
  };

  return (
    <MemberContext.Provider
      value={{ selectedMembers, addMember, removeMember }}
    >
      {children}
    </MemberContext.Provider>
  );
};

// Hook to use the MemberContext
export const useMember = () => {
  return useContext(MemberContext);
};
