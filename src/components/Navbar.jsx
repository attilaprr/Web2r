import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          وب ۲
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            صفحه اصلی
          </Link>
          <Link to="/students" className="nav-link">
            دانشجویان
          </Link>
          <Link to="/courses" className="nav-link">
            دروس
          </Link>
          <a
            href="https://github.com/your-username/web-2"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            گیت‌هاب
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
