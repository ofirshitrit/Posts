import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="nav-wrapper">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-post">Add Post</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
