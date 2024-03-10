import React from "react";

const Model = (props) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className="model">
        <h2>{props.title}</h2>
        <p>{props.message}</p>
        <button>Okay</button>
      </div>
    </>
  );
};

export default Model;
