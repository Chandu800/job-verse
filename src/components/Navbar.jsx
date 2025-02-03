import logo from "../assets/images/logo.png"
import { NavLink } from "react-router-dom"

const Navbar = () => {

  const linkClass = ({ isActive }) => 
    isActive ? "bg-black text-white hover:bg-gray-900 hover:text-whtie rounded-md px-3 mx-1 lg:mx-2 py-2" 
    : "text-white hover:bg-gray-900 hover:text-whtie rounded-md px-3 mx-1 lg:mx-2 py-2"

	return (
    <>
      <nav>
        <div className="bg-indigo-700 border-b border-indigo-500 mx-auto max-w-full px-2 sm:px-6 lg:px-8 flex h-[60px] items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">

            <NavLink to="/" className="flex flex-shrink-1 items-center mr-4" >
              <img className="h-6 w-auto" src={logo} alt="JobVerse logo" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">Job Verse</span>
            </NavLink>
            <div className="flex space-2 md:ml-auto">
              <NavLink to="/" className = {linkClass}>Home</NavLink>
              <NavLink to="/jobs" className = {linkClass}>Jobs</NavLink>
              <NavLink to="/add-job" className = {linkClass}>Add Job</NavLink>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar