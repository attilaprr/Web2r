import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero({ courseInfo }) {
  return (
    <div className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="highlight">درس {courseInfo.title}</span>
            <br />
            دانشکده مهندسی کامپیوتر
          </h1>

          <p className="hero-description">{courseInfo.description}</p>

          <div className="hero-buttons">
            <Link to="/courses" className="hero-button primary">
              <i className="fas fa-book-open"></i>
              مشاهده دروس
            </Link>
            <Link to="/students" className="hero-button secondary">
              <i className="fas fa-users"></i>
              لیست دانشجویان
            </Link>
          </div>
        </div>

        <div className="teacher-card">
          <div className="teacher-header">
            <img
              src={courseInfo.teacher.image}
              alt={courseInfo.teacher.name}
              className="teacher-image"
            />
            <div className="teacher-info">
              <h3 className="teacher-name">{courseInfo.teacher.name}</h3>
              <p className="teacher-title">{courseInfo.teacher.description}</p>
            </div>
          </div>

          <div className="teacher-details">
            <div className="detail-item">
              <i className="fas fa-envelope"></i>
              <span>{courseInfo.teacher.email}</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <span>ساعات مشاوره: {courseInfo.teacher.officeHours}</span>
            </div>
          </div>

          <div className="teacher-expertise">
            <h4>تخصص‌ها:</h4>
            <div className="expertise-tags">
              {courseInfo.teacher.expertise.map((skill, index) => (
                <span key={index} className="expertise-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">15+</span>
            <span className="stat-label">درس ارائه شده</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <i className="fas fa-user-graduate"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">200+</span>
            <span className="stat-label">دانشجوی فعال</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">10+</span>
            <span className="stat-label">استاد مجرب</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
