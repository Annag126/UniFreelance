import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How UniFreelance Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Create your account to start exploring freelance opportunities. It's free and only takes a few minutes!
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Project/Post a Project</p>
              <p>
                Browse through various projects or post your own to find the perfect match. Our platform connects talents with opportunities.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Projects/Recruit Suitable Candidates</p>
              <p>
                Apply for projects that match your skills or recruit freelancers for your needs. Build your network and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
