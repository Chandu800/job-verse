import { Link } from "react-router-dom"

const Alljobs = () => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
        <Link to="/jobs" className="block bg-black text-white text-center rounded-lg py-4 hover:bg-neutral-800 transition duration-200 ease-in-out">View all Jobs</Link>
    </section>
  )
}

export default Alljobs