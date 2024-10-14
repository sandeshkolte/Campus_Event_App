import { baseUrl } from "@/common/common";
import axios from "axios";
import debounce from "debounce";
import { useEffect, useState } from "react";

export default function useSearchUsers(searchTerm) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchUsers = debounce(async (searchTerm) => {
            if (searchTerm) {
                setLoading(true); // Set loading to true when fetching starts
                try {
                    const response = await axios.post(baseUrl + "/api/user/getallusers", {
                        search: searchTerm
                    });
                    setData(response.data.response);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false); // Set loading to false when fetching is done
                }
            } else {
                setData([]); // Clear data when there's no search term
            }
        }, 300); // Adjust the debounce time as needed

        fetchUsers(searchTerm); // Call fetch function with the current searchTerm

        return () => {
            fetchUsers.clear(); // Cleanup function to clear debounce on unmount
        };
    }, [searchTerm]);

    return { data, loading }; // Return both data and loading state
}
