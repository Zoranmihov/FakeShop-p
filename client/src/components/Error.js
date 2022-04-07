import React from "react";

export default function Error({ error }) {
  return (
    <div className="alert alert-danger text-center" role="alert">
      <h2 className="error-msg">{error}</h2>
    </div>
  );
}
