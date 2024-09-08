import { Navigate, Outlet } from 'react-router-dom'

const  ProtectedRoute = () => {

    // const navigate= useNavigate()
  // const authStatus = useSelector((state) => state.auth.status)
  // const [loader, setloader] = useState(true)

// useEffect(() => {
// if(authentication && authStatus!==authentication) {
//     navigate('/login')
// }else if(!authentication && authStatus!==authentication) {
//     navigate('/')
// }
// setloader(false)
// }, [authStatus,navigate,authentication])

const token= localStorage.getItem("userToken")

  const isAuthenticated = token !== null && token !== ""
  return isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/> 
}

export default ProtectedRoute