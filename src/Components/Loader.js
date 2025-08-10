import React from 'react'
import '../Styles/loader.css'

export default function Loader({text, subtext}) {
  return (
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <div>
            <div className="loading-text">
              {text}
            </div>
            <div className="loading-subtext">
              {subtext}
            </div>
          </div>
        </div>
      </div>
    );
}
