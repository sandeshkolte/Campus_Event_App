import { baseUrl } from '@/common/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WinnerItem = ({ winner, position }) => {
  const medals = ['🥇', '🥈', '🥉'];
  const colors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

  if (!winner?.user) return null; // Handle cases where the user field is not populated

  return (
    <div className="flex items-center space-x-3 p-2">
      <span className={`text-2xl ${colors[position - 1]}`}>{medals[position - 1]}</span>
      <div>
        <p className="font-semibold">{`${winner.user.firstname} ${winner.user.lastname}`}</p>
        <p className="text-sm text-gray-600">
          {winner.user.branch || "NA"}, {winner.user.yearOfStudy || "NA"} year
        </p>
      </div>
    </div>
  );
};

const WinnersPage = () => {
  const [winnerDetails, setWinnerDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all winners from backend
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/winners`); // Endpoint to get all winners

        // Check if response is successful and data is not empty
        if (response.status !== 200 || !response.data || response.data.length === 0) {
          // setError('No winners found or failed to fetch winners');
        }

        setWinnerDetails(response.data);
      } catch (error) {
        console.error(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center pb-4 text-purple-700">
        Declared Winners
      </h2>
      <div className="bg-white p-4">
        <div className='w-full overflow-x-auto'>
          <ul className='events flex md:flex-wrap gap-8 md:gap-16 p-6 md:p-10 w-max md:w-full md:justify-center'>
            {winnerDetails.length > 0 ? (
              winnerDetails.map((winnerEntry, index) => (
                <div key={index} className="m-5 bg-slate-50 p-5 rounded-md">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {winnerEntry.eventId?.title || 'No event title'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Declared on: {new Date(winnerEntry.createdAt).toLocaleDateString()}
                  </p>
                  <hr className='border-b-2' />
                  {winnerEntry.winners?.length > 0 ? (
                    winnerEntry.winners.map((winner, index) => (
                      <WinnerItem
                        key={index}
                        winner={winner}
                        position={parseInt(winner.position, 10)}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-600">No winners for this event</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">No Winners Declared</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WinnersPage;
