import { Outlet } from "react-router-dom"
import { ToastContainer, Bounce } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer/>
    </>
  )
}

export default MainLayout