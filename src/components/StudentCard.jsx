import { Link } from "react-router-dom";

function StudentCard({ student }) {
  return (
    <div className="student-card card">
      <div className="student-card-header">
        <div className="student-image-wrapper">
          <img
            className="student-image"
            src={student?.image}
            alt={student?.name}
          />
          <div className="student-status online"></div>
        </div>
        <h3 className="student-name">{student?.name}</h3>
        <p className="student-description">{student?.description}</p>
      </div>

      <div className="student-info">
        <div className="info-item">
          <span className="info-label">شماره دانشجویی</span>
          <span className="info-value">{student?.studentId}</span>
        </div>
        <div className="info-item">
          <span className="info-label">معدل</span>
          <span className="info-value">{student?.gpa}</span>
        </div>
      </div>

      <div className="student-contact">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>{student?.email}</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <span>{student?.phone}</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-graduation-cap"></i>
            <span>{student?.major}</span>
          </div>
        </div>
      </div>

      {student.skills && (
        <div className="student-skills">
          {Object.entries(student.skills).map(([skill, value]) => (
            <div key={skill} className="skill-item">
              <span className="skill-label">{skill.toUpperCase()}</span>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {student.socialMedia && (
        <div className="student-social-links">
          {student.socialMedia.github && (
            <a
              href={`https://${student.socialMedia.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fab fa-github"></i>
              GitHub
            </a>
          )}
          {student.socialMedia.linkedin && (
            <a
              href={`https://${student.socialMedia.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fab fa-linkedin"></i>
              LinkedIn
            </a>
          )}
        </div>
      )}

      <div className="student-actions">
        <Link to={`/students/${student.id}`} className="btn btn-primary">
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  );
}

export default StudentCard;
