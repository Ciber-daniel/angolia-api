import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./row.css";

export default function Row({ post, callback, createdAt }) {
  const [intoRow, setIntoRow] = useState(false);

  return (
    <div className="row">
      <Link
        to={{
          pathname: "/details",
          state: {
            post: post,
          },
        }}
      >
        <div
          className="row"
          onClick={() => {
            console.log("enter");
          }}
          onMouseEnter={() => {
            setIntoRow(true);
          }}
          onMouseLeave={() => {
            setIntoRow(false);
          }}
        >
          <div className="titles">
            <span className="main-texts">
              {post.storyTitle ? post.storyTitle : post.title}
            </span>
            <span className="author"> - {post.author} - </span>
          </div>
          <div className="createAt-icon-container">
            <div>
              <span className="main-texts">{createdAt}</span>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={intoRow ? "icon-container-active" : "icon-container"}
        onMouseEnter={() => {
          setIntoRow(true);
        }}
        onClick={callback}
      >
        <FaTrashAlt className="icon" />
      </div>
    </div>
  );
}
