import React, { useState, useEffect } from "react";
import "../Styles/popup.css";
import Confetti from "react-confetti";

export default function SuccessPopup({ showPopup, setShowPopup }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return (
    <div>
      {showPopup && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={300}
            recycle={true}
          />
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowPopup(false)}>x</button>
              <h2>Success!</h2>
              <p>The post upload successfully.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
