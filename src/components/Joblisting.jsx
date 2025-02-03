import location from "../assets/images/placeholder.png"
import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"

const Joblisting = ({ job }) => {

  const [expandDescription, setExpandDescription] = useState(false)

  let description = job.description

  if (!expandDescription) {
    description = description.slice(0, 100) + '...'
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative p-4">
      <div className="mb-6">
        <div className="text-gray-600 my-1">{job.type}</div>
        <h3 className="text-xl font-bold ">{job.title}</h3>
      </div>
							
      <div className="mb-5">{description} 
        <span onClick={() => setExpandDescription((prev) => (!prev))} className="text-indigo-500 text-sm hover:text-indigo-700 cursor-pointer">
          {expandDescription ? ' See less' : ' See more'}
        </span> 
      </div>
      <h3 className="text-indigo-500 border-b pb-5 border-gray-200  mb-2">{job.salary} / Year</h3>
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="text-orange-700 mb-3">
          <img src={location} className="w-[18px] inline mb-1 mr-1"/>
          {job.location}
        </div>
        <Link to={`/job/${job.id}`} className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm transition duration-200 ease-in-out">Read More</Link>
      </div>
		</div>
  )
}

export default Joblisting