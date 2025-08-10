import { Link, useLocation } from "react-router-dom";
import "../Styles/header.css";
import { Home as HomeIcon, Plus as PlusIcon } from "lucide-react";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <nav className="nav-bar">
          <div className="nav-buttons">
            <Link
              to="/"
              className={`btn-home ${location.pathname === "/" ? "active-link" : ""}`}
            >
              <HomeIcon size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/add-post"
              className={`btn-add-post ${
                location.pathname === "/add-post" ? "active-link" : ""
              }`}
            >
              <PlusIcon size={20} />
              <span>Add Post</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
