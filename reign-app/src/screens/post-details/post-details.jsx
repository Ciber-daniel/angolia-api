import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
// components
import AppBar from "../../components/appBar/appBar";
import NotFound from "../../components/notFound/not-found";
// styles
import "./post-details.css";

export default function PostDetails() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <AppBar />
      <div className="post-details">
        <div className="details">
          <div className="main-titles">
            <div className="post-titles">
              <h1>{location.state.post.title}</h1>
              <span> - {location.state.post.author} - </span>
            </div>
            <div className="back-icon-container">
              <FaArrowLeft
                className="back-icon"
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
          </div>
          <div className="description-container">
            <span>Description</span>
          </div>
          <div className="description">
            {location.state.post.description ? (
              <p>{location.state.post.description}</p>
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
