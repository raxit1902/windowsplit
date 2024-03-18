import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const files = [
    { id: 1, name: "index.html" },
    { id: 2, name: "App.js" },
    { id: 3, name: "App.css" },
    { id: 4, name: "Sidebar.js" },
    { id: 5, name: "Navbar.js" },
  ];

  const [activeFile, setActiveFile] = useState(1);
  return (
    <div className="sidebar_container">
      <div>
        <h5 className="mb-2">Files</h5>
        {files.map((file, i) => {
          return (
            <p
              key={i}
              className={`file ${file.id === activeFile ? "active_file" : ""}`}
              onClick={() => {
                setActiveFile(file.id);
              }}
            >
              {file.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
