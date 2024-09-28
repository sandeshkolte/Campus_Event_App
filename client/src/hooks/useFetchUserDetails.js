import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice'; // Adjust this import based on your Redux slice
import { useSelector } from 'react-redux';// Assuming you need to access the userId from the state
import { baseUrl } from '@/common/common';

const useFetchUserDetails = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const result = await axios.post(baseUrl + `/api/user/getuser/?userid=${userId}`);
          if (result.status === 200) {
            const userDetails = result.data.response;
            dispatch(login(userDetails));
          }
        }

        // You can uncomment this if you want to rehydrate user info from localStorage:
        // const userInfo = localStorage.getItem('userInfo');
        // if (userInfo) {
        //   dispatch(login(JSON.parse(userInfo)));
        // }

      } catch (err) {
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [userId, baseUrl, dispatch]);
};

export default useFetchUserDetails;
