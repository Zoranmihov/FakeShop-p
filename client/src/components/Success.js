import React from "react";

export default function Success({ success }) {
  return (
    <div className="alert alert-success text-center" role="alert">
      <h2>{success}</h2>
    </div>
  );
}
