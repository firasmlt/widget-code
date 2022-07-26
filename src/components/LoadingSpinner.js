import React from "react";
import Card from "./UI/Card";

export default function LoadingSpinner() {
  return (
    <Card>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </Card>
  );
}
