import { baseUrl } from "@/common/common";
import { Button } from "@/components/ui/button";
import axios from "axios";
import debounce from "debounce";
import { ChevronsUpDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

// Custom hook to handle user search
function useSearchUsers(searchTerm) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = debounce(async (term) => {
      if (term) {
        setLoading(true);
        try {
          const response = await axios.post(`${baseUrl}/api/user/getallusers`, {
            search: term,
          });
          setData(response.data.response);
          // console.log(response.data.response);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setData([]);
      }
    }, 1000);

    fetchUsers(searchTerm);

    return () => {
      fetchUsers.clear();
    };
  }, [searchTerm]);

  return { data, loading };
}

const GroupMemberSelector = ({ setValue, selector, eventDetails }) => {
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading } = useSearchUsers(searchTerm);

  const inputRef = useRef(null);

  // const filteredTags = data.filter(
  //   (item) =>
  //     item.firstname?.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
  //     !selected.some((selectedItem) => selectedItem._id === item._id) &&
  //     !eventDetails.participants.some((participant) => participant.userId.toString() === item._id.toString())
  // );


  const filteredTags = data.map((item) => ({
    ...item,
    isDisabled: eventDetails.participants.some(
      (participant) => participant.userId.toString() === item._id.toString()
    ),
  }));
  



  const isDisable =
    !searchTerm.trim() ||
    selected.some(
      (item) => item.firstname.toLowerCase().trim() === searchTerm.toLowerCase().trim()
    );

  useEffect(() => {
    setValue(selector, selected);
  }, [selected, setValue]);

  return (
    <div className="max-w-[250px] grid place-items-center">
      <div className="relative text-sm">
        {selected?.length ? (
          <div className="w-full relative text-xs flex flex-wrap gap-1 p-2 mb-2">
            {selected.map((tag) => (
              <div
                key={tag._id}
                className="rounded-full w-fit py-1.5 px-3 bg-gray-700 text-white shadow-md font-semibold flex items-center gap-2"
              >
                {tag.firstname}
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    setSelected(selected.filter((i) => i._id !== tag._id))
                  }
                >
                  <RiCloseFill />
                </div>
              </div>
            ))}
            <div className="w-full text-right">
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setSelected([]);
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        ) : null}
        <div className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
          {/* <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" /> */}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Select Members"
            className="flex h-11 w-[250px] md:w-[280px] max-w-[330px] rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
          />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>

        {/* Menu */}
        {menuOpen && loading ?
          <div className="flex justify-center items-center" >
            <VscLoading className="text-gray-500 animate-spin-slow text-2xl text-bold" />
          </div > : (
            <div className="card absolute z-50 w-full max-h-40 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 bg-white rounded-lg">
              <ul className="w-full">
                {filteredTags.length ? (
                  filteredTags.map((tag) => (
                    <li
                      key={tag._id}
                      className={`p-2 cursor-pointer rounded-md w-full ${tag.isDisabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "hover:bg-purple-50 hover:text-purple-700"
                        }`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        if (!tag.isDisabled) {
                          setSelected((prev) => [...prev, tag]);
                          setSearchTerm("");
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <p>
                          {tag.firstname} {tag.lastname}
                        </p>
                        <h3 className="text-xs flex gap-2">
                          <div
                            className={`p-1 rounded-3xl ${tag.isDisabled ? "bg-gray-300" : "bg-purple-600 text-white"
                              }`}
                          >
                            {tag.yearOfStudy ?? "N/A"} year
                          </div>
                          <div
                            className={`p-1 rounded-3xl ${tag.isDisabled ? "bg-gray-300" : "bg-indigo-600 text-white"
                              }`}
                          >
                            {tag.branch ?? "N/A"}
                          </div>
                        </h3>
                      </div>
                      {tag.isDisabled && (
                        <p className="text-xs text-gray-500 italic">Already a participant</p>
                      )}
                    </li>
                  ))
                ) : (
                  <div>
                    {searchTerm.length !== 0 && (
                      <li className="p-2 text-rose-500">No options available</li>
                    )}
                  </div>
                )}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default GroupMemberSelector;
