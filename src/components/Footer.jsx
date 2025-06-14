import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>درباره ما</h3>
          <p>
            سامانه مدیریت دانشجویان دانشکده مهندسی کامپیوتر
            <br />
            ارائه خدمات آموزشی و پشتیبانی به دانشجویان عزیز
          </p>
        </div>

        <div className="footer-section">
          <h3>دسترسی سریع</h3>
          <ul>
            <li>
              <Link to="/">صفحه اصلی</Link>
            </li>
            <li>
              <Link to="/students">لیست دانشجویان</Link>
            </li>
            <li>
              <Link to="/courses">دروس ارائه شده</Link>
            </li>
            <li>
              <a href="#">تقویم آموزشی</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>تماس با ما</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> تهران، خیابان آزادی،
            دانشکده مهندسی کامپیوتر
          </p>
          <p>
            <i className="fas fa-phone"></i> ۰۲۱-۶۶۱۶۵۰۰۰
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@ce.university.ac.ir
          </p>
        </div>

        <div className="footer-section">
          <h3>شبکه‌های اجتماعی</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          تمامی حقوق محفوظ است &copy; {new Date().getFullYear()} دانشکده مهندسی
          کامپیوتر
        </p>
      </div>
    </footer>
  );
}

export default Footer;
