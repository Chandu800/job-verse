import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import MainLayout from "./Layouts/MainLayout";
import JobsPage from "./Pages/JobsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import JobPage, { jobLoader } from "./Pages/JobPage";
import AddJobPage from "./Pages/AddJobPage";
import EditJobPage from "./Pages/EditJobPage";
import { API_CONFIG } from './config';

const App = () => {
  // Add a new job (POST request)
  const addJob = async (newJob) => {
    try {
      // First, get the current data
      const getCurrentData = await fetch(`https://api.jsonbin.io/v3/b/${API_CONFIG.binId}`, {
        headers: {
          "X-Master-Key": API_CONFIG.masterKey,
        },
      });
      
      if (!getCurrentData.ok) {
        throw new Error(`Failed to fetch current data. Status: ${getCurrentData.status}`);
      }
      
      const currentData = await getCurrentData.json();
      const jobs = Array.isArray(currentData.record) ? currentData.record : [];
      
      // Add new job with a unique ID
      const jobWithId = {
        ...newJob,
        id: Date.now().toString(), // Generate a unique ID
      };
      
      // Update the bin with all jobs including the new one
      const response = await fetch(`https://api.jsonbin.io/v3/b/${API_CONFIG.binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_CONFIG.masterKey,
        },
        body: JSON.stringify([...jobs, jobWithId]),
      });

      if (!response.ok) {
        throw new Error(`Failed to add job. Status: ${response.status}`);
      }

      return jobWithId;
    } catch (error) {
      console.error("Error adding job:", error);
      throw error;
    }
  };

  // Delete a job
  const deleteJob = async (id) => {
    try {
      // First, get the current data
      const getCurrentData = await fetch(`https://api.jsonbin.io/v3/b/${API_CONFIG.binId}`, {
        headers: {
          "X-Master-Key": API_CONFIG.masterKey,
        },
      });
      
      if (!getCurrentData.ok) {
        throw new Error(`Failed to fetch current data. Status: ${getCurrentData.status}`);
      }
      
      const currentData = await getCurrentData.json();
      const jobs = Array.isArray(currentData.record) ? currentData.record : [];
      
      // Filter out the job to delete
      const updatedJobs = jobs.filter(job => job.id !== id);
      
      // Update the bin with the filtered jobs
      const response = await fetch(`https://api.jsonbin.io/v3/b/${API_CONFIG.binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_CONFIG.masterKey,
        },
        body: JSON.stringify(updatedJobs),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete job. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  };

  // Update an existing job
  const updateJob = async (updatedJob) => {
    try {
      // First, get the current data
      const getCurrentData = await fetch(`https://api.jsonbin.io/v3/b/${API_CONFIG.binId}`, {
        headers: {
          "X-Master-Key": API_CONFIG.masterKey,
        },
      });
      
      if (!getCurrentData.ok) {
        throw new Error(`Failed to fetch current data. Status: ${getCurrentData.status}`);
      }
      
      const currentData = await getCurrentData.json();
      const jobs = Array.isArray(currentData.record) ? currentData.record : [];
      
      // Update the specific job
      const updatedJobs = jobs.map(job => 
        job.id === updatedJob.id ? updatedJob : job
      );
      
      // Update the bin with all jobs including the updated one
      const response = await fetch(`https://api.jsonbin.io/v3/b/${API_CONFIG.binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_CONFIG.masterKey,
        },
        body: JSON.stringify(updatedJobs),
      });

      if (!response.ok) {
        throw new Error(`Failed to update job. Status: ${response.status}`);
      }

      return updatedJob;
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path="/job/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;