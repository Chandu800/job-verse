import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { API_CONFIG } from '../config';

// Loader function for fetching job details
export const jobLoader = async ({ params }) => {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${API_CONFIG.binId}`, {
      headers: {
        "X-Master-Key": API_CONFIG.masterKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch job. Status: ${response.status}`);
    }

    const data = await response.json();
    const jobs = Array.isArray(data.record) ? data.record : [];
    const job = jobs.find(job => job.id === params.id);
    
    if (!job) {
      throw new Error(`Job with ID ${params.id} not found`);
    }

    return job;
  } catch (error) {
    console.error("Error loading job:", error);
    throw error;
  }
};

const JobPage = ({ deleteJob }) => {
  const job = useLoaderData();
  const navigate = useNavigate();

  // Handle delete job
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this job?');
      if (confirmed) {
        await deleteJob(job.id);
        navigate('/jobs');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Job Header */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <div className="mt-2">
            <p className="text-xl text-gray-600">{job.company.name}</p>
            <p className="text-gray-500">{job.location}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Job Overview</h2>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Type: </span>
                  {job.type}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Salary: </span>
                  {job.salary}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">Job Description</h2>
            <p className="mt-2 text-gray-600 whitespace-pre-line">{job.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">About {job.company.name}</h2>
            <p className="mt-2 text-gray-600">{job.company.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email: </span>
                <a href={`mailto:${job.company.contactEmail}`} className="text-blue-500 hover:underline">
                  {job.company.contactEmail}
                </a>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone: </span>
                <a href={`tel:${job.company.contactPhone}`} className="text-blue-500 hover:underline">
                  {job.company.contactPhone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            to={`/edit-job/${job.id}`}
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg text-center font-bold transition-colors w-full sm:w-auto hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Edit Job
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-3 rounded-lg text-center font-bold transition-colors w-full sm:w-auto hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete Job
          </button>
          <Link
            to="/jobs"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg text-center font-bold transition-colors w-full sm:w-auto hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
