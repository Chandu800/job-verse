// Joblistings.jsx

import { useState, useEffect } from "react";
import Joblisting from "./Joblisting";
import Spinner from "./Spinner";

const Joblistings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = "https://api.jsonbin.io/v3/b/679c6267ad19ca34f8f751b8/latest"; // Your API URL

      try {
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-Master-Key": "$2a$10$xtWjL8pguO67NVk0cUzLuuBRSKatFL0uZtlb/opnxmpwbCaXcbVMC"
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        const jobList = data.record || []; // Extract jobs array from JSONBin response

        setJobs(isHome ? jobList.slice(0, 3) : jobList); // Show only 3 jobs on the home page
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-indigo-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Joblisting job={job} key={job.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Joblistings;
