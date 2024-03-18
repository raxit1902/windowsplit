import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Playground from "./components/playground/Playground";

const App = () => {
  return (
    <>
      <div className="d-flex justify-content-start">
        <div>
          <Sidebar />
        </div>
        <div className="px-3" style={{ width: "88vw" }}>
          <Playground />
        </div>
      </div>
    </>
  );
};

export default App;
