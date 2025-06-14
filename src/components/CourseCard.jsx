import React, { useState } from "react";
import "./CourseCard.css";

function CourseCard({ course }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    return status === "فعال" ? "status-active" : "status-inactive";
  };

  const getCapacityColor = (registered, capacity) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return "capacity-critical";
    if (percentage >= 70) return "capacity-warning";
    return "capacity-normal";
  };

  return (
    <div className={`course-card ${isExpanded ? "expanded" : ""}`}>
      <div className="course-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="course-main-info">
          <h3 className="course-name">{course.name}</h3>
          <span className="course-code">{course.code}</span>
        </div>
        <div className="course-badges">
          <span className={`status-badge ${getStatusColor(course.status)}`}>
            {course.status}
          </span>
          <span className="gender-badge">{course.gender}</span>
        </div>
      </div>

      <div className="course-basic-info">
        <div className="info-item">
          <i className="fas fa-user-tie"></i>
          <span>{course.professor}</span>
        </div>
        <div className="info-item">
          <i className="fas fa-university"></i>
          <span>{course.faculty}</span>
        </div>
        <div className="info-item">
          <i className="fas fa-clock"></i>
          <span>
            {course.schedule.days.join(" - ")} / {course.schedule.time}
          </span>
        </div>
      </div>

      <div className="capacity-bar-container">
        <div
          className={`capacity-bar ${getCapacityColor(
            course.registered,
            course.capacity
          )}`}
          style={{ width: `${(course.registered / course.capacity) * 100}%` }}
        ></div>
        <span className="capacity-text">
          {course.registered} / {course.capacity} نفر
        </span>
      </div>

      {isExpanded && (
        <div className="course-details">
          <div className="details-section">
            <h4>توضیحات درس:</h4>
            <p>{course.description}</p>
          </div>

          <div className="details-section">
            <h4>پیش‌نیازها:</h4>
            {course.prerequisites.length > 0 ? (
              <ul className="prerequisites-list">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            ) : (
              <p>بدون پیش‌نیاز</p>
            )}
          </div>

          <div className="course-actions">
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i>
              انتخاب واحد
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-info-circle"></i>
              جزئیات بیشتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
