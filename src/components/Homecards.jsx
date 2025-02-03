import { Link } from "react-router-dom"

const Homecards = () => {
  return (
    <section className="py-6">
      <div className="container-xl lg:container m-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-[16px] font-bold">For Developers</h2>
          <p className="mt-2 mb-4">Browse your jobs and start your career today</p>
          <Link className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition duration-200 ease-in-out" to="/jobs">Browse Jobs</Link>
        </div>  
        <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
          <h2 className="text-[16px] font-bold">For Employers</h2>
          <p className="mt-2 mb-4">List your job to find the perfect developer for the role</p>
          <Link className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 transition duration-200 ease-in-out" to="/add-job">Add Job</Link>
        </div>
      </div>  
    </section>
  )
}

export default Homecards