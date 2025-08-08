import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="nav-wrapper">
        <nav>
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === "/" ? "active-link" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/add-post" 
                className={location.pathname === "/add-post" ? "active-link" : ""}
              >
                Add Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
