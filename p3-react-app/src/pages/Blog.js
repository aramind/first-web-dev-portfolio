import React from "react";
import "./blog.css";

const Blog = () => {
  return (
    <div className="page page--blog">
      <p>
        Read{" "}
        <a
          href="https://aramind.github.io/blogs-for-projects/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{" "}
        if you want to learn more about this app.
      </p>
    </div>
  );
};

export default Blog;
