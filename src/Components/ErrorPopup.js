import React from "react";
import "../Styles/form.css";

export default function ErrorPopup({ showErrorPopup, setShowErrorPopup }) {
  return (
    <div>
      {showErrorPopup && (
        <div className="popup-overlay" onClick={() => setShowErrorPopup(false)}>
          <div className="popup-content" id="error-popup" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowErrorPopup(false)}>x</button>
             <h2>Error occurred</h2>
            <p>Something went wrong. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  );
}
