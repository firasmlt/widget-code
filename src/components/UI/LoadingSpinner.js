import React from "react";
import Card from "./Card";

export default function LoadingSpinner() {
  return (
    <Card>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </Card>
  );
}
