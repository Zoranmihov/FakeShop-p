import { React, useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    setTimeout(() => (window.location.href = "/"), 2000);
  }, []);

  return (
    <div className="row justify-content-center">
      <h1 className="text-center">Page not found. Redirecting to home</h1>
    </div>
  );
}
