// src/components/FeedbackForm.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    rating: "",
    comments: ""
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/feedback", feedback, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Feedback submitted successfully!");
      setFeedback({ rating: "", comments: "" });
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className="feedbackForm">
      <h2>We value your feedback!</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="rating">Rating:</label>
          <select name="rating" value={feedback.rating} onChange={handleChange} required>
            <option value="" disabled>Select rating</option>
            <option value="1">1 - Very Dissatisfied</option>
            <option value="2">2 - Dissatisfied</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Satisfied</option>
            <option value="5">5 - Very Satisfied</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="comments">Comments:</label>
          <textarea
            name="comments"
            value={feedback.comments}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
