import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import StudentForm from "../components/StudentForm";

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const numericId = parseInt(id);
      const response = await fetch(
        `http://localhost:3001/students/${numericId}`
      );
      if (!response.ok) throw new Error("دانشجو یافت نشد");
      const data = await response.json();
      console.log("Fetched student data:", data);
      setStudent(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (formData) => {
    try {
      const numericId = parseInt(id);
      const response = await fetch(
        `http://localhost:3001/students/${numericId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("خطا در ویرایش اطلاعات");

      const updatedStudent = await response.json();
      setStudent(updatedStudent);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("آیا از حذف این دانشجو اطمینان دارید؟")) return;

    try {
      const numericId = parseInt(id);
      const response = await fetch(
        `http://localhost:3001/students/${numericId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("خطا در حذف دانشجو");

      navigate("/students");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h3 className="error-title">خطا</h3>
        <p className="error-message">{error}</p>
        <button
          onClick={() => navigate("/students")}
          className="btn btn-primary"
        >
          بازگشت به لیست دانشجویان
        </button>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="container">
      <div className="student-detail-card">
        <div className="student-detail-header">
          <img
            src={student.image}
            alt={student.name}
            className="student-detail-image"
          />
          <h1 className="student-detail-name">{student.name}</h1>
          <p className="student-detail-description">{student.description}</p>
        </div>

        <div className="student-detail-info">
          <div className="info-grid">
            {student?.studentId && (
              <div className="info-group">
                <label>شماره دانشجویی</label>
                <span>{student.studentId}</span>
              </div>
            )}
            {student?.major && (
              <div className="info-group">
                <label>رشته تحصیلی</label>
                <span>{student.major}</span>
              </div>
            )}
            {student?.entryYear && (
              <div className="info-group">
                <label>سال ورود</label>
                <span>{student.entryYear}</span>
              </div>
            )}
            {student?.gpa && (
              <div className="info-group">
                <label>معدل</label>
                <span>{student.gpa}</span>
              </div>
            )}
          </div>
        </div>

        {(student?.email || student?.phone) && (
          <div className="student-contact">
            <div className="contact-info">
              {student?.email && (
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>{student.email}</span>
                </div>
              )}
              {student?.phone && (
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>{student.phone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {student?.skills && Object.keys(student.skills).length > 0 && (
          <div className="student-detail-skills">
            <h3 className="section-title">مهارت‌ها</h3>
            {Object.entries(student.skills).map(([skill, value]) => (
              <div key={skill} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.toUpperCase()}</span>
                  <span className="skill-value">{value}%</span>
                </div>
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

        {student?.socialMedia &&
          (student.socialMedia.github || student.socialMedia.linkedin) && (
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

        <div className="student-detail-actions">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <i className="fas fa-edit"></i>
            ویرایش اطلاعات
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            <i className="fas fa-trash"></i>
            حذف دانشجو
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ویرایش اطلاعات دانشجو"
      >
        <StudentForm onSubmit={handleEdit} initialData={student} />
      </Modal>
    </div>
  );
}

export default StudentDetail;
