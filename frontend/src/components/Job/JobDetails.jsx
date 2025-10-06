// src/components/Job/JobDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [workSubmission, setWorkSubmission] = useState("");
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const handleMarkAsCompleted = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/job/complete/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Project marked as completed!");
      setJob({ ...job, isCompleted: true }); // Update the job state
    } catch (error) {
      toast.error("Failed to mark project as completed");
    }
  };

  const handleWorkSubmission = async () => {
    if (!workSubmission) {
      toast.error("Please enter your work submission");
      return;
    }
    try {
      await axios.post(
        `http://localhost:4000/api/v1/job/submit-work/${id}`,
        { work: workSubmission },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Work submitted successfully!");
      setWorkSubmission("");
    } catch (error) {
      toast.error("Failed to submit work");
    }
  };

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>PROJECT DETAILS</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Status: <span>{job.isCompleted ? "Completed" : "Open"}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Client" ? (
            <button onClick={handleMarkAsCompleted} disabled={job.isCompleted}>
              {job.isCompleted ? "Project Completed" : "Mark as Completed"}
            </button>
          ) : (
            <>
              <Link to={`/application/${job._id}`} className={job.isCompleted ? "disabled" : ""}>
                Apply Now
              </Link>
              <textarea
                value={workSubmission}
                onChange={(e) => setWorkSubmission(e.target.value)}
                placeholder="Submit your work here..."
                rows="4"
                disabled={job.isCompleted}
              ></textarea>
              <button onClick={handleWorkSubmission} disabled={job.isCompleted}>
                Submit Work
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
