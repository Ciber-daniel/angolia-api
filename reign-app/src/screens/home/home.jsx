import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
// components
import Row from "../../components/row/row";
import AppBar from "../../components/appBar/appBar";
import NotFound from "../../components/notFound/not-found";
// services
import { date, handleRemove } from "../../services/services";
import { findPosts } from "../../services/api-services";
// styles
import "./home.css";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findPosts(setRows, setLoading);
  }, []);

  return (
    <div className="home">
      <AppBar />
      <div className="table">
        <div className="row-container">
          {loading ? (
            <div className="loader">
              <Loader type="Oval" color="#ccc" height="5rem" width="5rem" />
            </div>
          ) : rows.length - 1 === 0 ? (
            <div>
              <NotFound />
            </div>
          ) : (
            rows.map((post) => {
              if (post.storyTitle !== "" || post.title !== "") {
                if (post.storyTitle !== null || post.title !== null) {
                  return (
                    <Row
                      key={post._id}
                      callback={() => {
                        handleRemove(post._id, rows, setRows);
                      }}
                      createdAt={date(post.created_at)}
                      post={post}
                    />
                  );
                } else {
                  return "";
                }
              } else {
                return "";
              }
            })
          )}
        </div>
      </div>
    </div>
  );
}
