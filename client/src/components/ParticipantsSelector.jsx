import { baseUrl } from "@/common/common";
import { Button } from "@/components/ui/button";
import axios from "axios";
import debounce from "debounce";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

// Custom hook to handle participant search
function useSearchParticipants(searchTerm, eventId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParticipants = debounce(async (term) => {
      if (term) {
        setLoading(true);
        try {
          const response = await axios.post(`${baseUrl}/api/user/get-participants/${eventId}`, {
            search: term,
          });
          setData(response.data.response);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setData([]);
      }
    }, 500);

    fetchParticipants(searchTerm);

    return () => {
      fetchParticipants.clear();
    };
  }, [searchTerm, eventId]);

  return { data, loading };
}

const ParticipantsSelector = ({ setValue, selector, eventId }) => {
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading } = useSearchParticipants(searchTerm, eventId);

  const inputRef = useRef(null);

  const filteredTags = data.filter(
    (item) =>
      item.firstname?.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
      (!selected || selected._id !== item._id)
  );

  useEffect(() => {
    setValue(selector, selected);
  }, [selected, setValue]);

  return (
    <div className="max-w-[250px] grid ">
      <div className="relative text-sm">
        {selected ? (
          <div className="w-full relative text-xs flex flex-wrap gap-1 p-2">
            <div
              key={selected._id}
            //   className="rounded-full w-fit py-1.5 px-3 bg-gray-700 text-white shadow-md font-semibold flex items-center gap-2"
            >
              <div className="flex w-[280px] max-w-[330px] p-3 rounded-md h-11 text-sm bg-gray-100 justify-between">
                        <p>
                          {selected.firstname} {selected.lastname}
                        </p>
                        <div className="text-xs text-white flex gap-2">
                          <div className="bg-purple-600 p-1 rounded-3xl">
                            {selected.yearOfStudy ?? "N/A"}
                          </div>
                          <div className="bg-indigo-600 p-1 rounded-3xl">
                            {selected.branch ?? "N/A"}
                          </div>
                        </div>
                        <div
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setSelected(null)}
              >
                <RiCloseFill />
              </div>
                      </div>
              
            </div>
            <div className="w-full text-right">
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setSelected(null);
                  inputRef.current?.focus();
                }}
              >
                Clear
              </span>
            </div>
          </div>
        ) : <>
        
        <div className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search participants"
            className="flex h-11 w-[280px] max-w-[330px] rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
          />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
        </>}
        

        {menuOpen && (
          <div className="card absolute z-50 w-full max-h-40 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 bg-white rounded-lg">
            {loading ? (
              <div className="flex justify-center items-center">
                <VscLoading className="text-gray-500 animate-spin-slow text-2xl text-bold" />
              </div>
            ) : (
              <ul className="w-full">
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <li
                      key={tag._id}
                      className="p-2 cursor-pointer hover:bg-purple-50 hover:text-purple-700 rounded-md w-full"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSelected(tag);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex justify-between">
                        <p>
                          {tag.firstname} {tag.lastname}
                        </p>
                        <div className="text-xs text-white flex gap-2">
                          <div className="bg-purple-600 p-1 rounded-3xl">
                            {tag.yearOfStudy ?? "N/A"}
                          </div>
                          <div className="bg-indigo-600 p-1 rounded-3xl">
                            {tag.branch ?? "N/A"}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  searchTerm.length > 0 && (
                    <li className="p-2 text-rose-500">No options available</li>
                  )
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsSelector;