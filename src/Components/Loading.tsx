import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      className="spinner-border align-self-center text-light mt-2"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loading;
