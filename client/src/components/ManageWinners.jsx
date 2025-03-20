import React, { useState } from "react";
import axios from "axios";

const ManageWinners = ({ eventId, participants }) => {
  const [winners, setWinners] = useState([]);
  const [showWinners, setShowWinners] = useState(false);

  const handleAddWinner = (userId, position) => {
    setWinners((prev) => [...prev, { userId, position }]);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/event/winners/${eventId}`, { winners, showWinners });
      alert("Winners updated successfully!");
    } catch (error) {
      console.error("Error updating winners:", error);
    }
  };

  return (
    <div>
      <h2>Manage Winners</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showWinners}
            onChange={(e) => setShowWinners(e.target.checked)}
          />
          Show Winners
        </label>
      </div>
      <div>
        <h3>Add Winners</h3>
        {participants.map((participant) => (
          <div key={participant.userId}>
            <span>{participant.fullname}</span>
            <button onClick={() => handleAddWinner(participant.userId, 1)}>1st Place</button>
            <button onClick={() => handleAddWinner(participant.userId, 2)}>2nd Place</button>
            <button onClick={() => handleAddWinner(participant.userId, 3)}>3rd Place</button>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Save Winners</button>
    </div>
  );
};

export default ManageWinners;
