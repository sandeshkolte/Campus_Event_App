import { baseUrl } from "@/common/common"
import axios from "axios"
import {useEffect, useState} from "react"

export default function useAdminInfo() {
    const [data, setData] = useState([]);  // Set the initial state as an array

    useEffect(() => {
        axios.get(baseUrl + "/api/user/userrole/?role=user,admin")
        .then((res) => {
            console.log(res.data.response); // Check if the array is fetched correctly
            setData(res.data.response);  // Save the array in the state
        })
        .catch((err) => console.error(err));
    }, [])
    return data
} 