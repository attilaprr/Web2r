import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import TeacherCard from "../components/TeacherCard";
import StudentCard from "../components/StudentCard";
import StudentForm from "../components/StudentForm";

function Home() {
  const [courseInfo, setCourseInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/courseInfo").then((res) => res.json()),
      fetch("http://localhost:3001/students").then((res) => res.json()),
    ])
      .then(([courseData, studentsData]) => {
        setCourseInfo(courseData);
        setStudents(studentsData);
        setLoading(false);
      })
      .catch((err) => {
        setError("خطا در دریافت اطلاعات");
        setLoading(false);
      });
  }, []);

  console.log({ courseInfo, students });

  const handleAddStudent = async (studentData) => {
    try {
      const res = await fetch("http://localhost:3001/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      if (!res.ok) throw new Error("خطا در افزودن دانشجو");
      const newStudent = await res.json();
      setStudents((prev) => [...prev, newStudent]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding student:", error);
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
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">خطا</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!courseInfo) return null;

  console.log({ students });

  return (
    <div className="home-page">
      <Hero courseInfo={courseInfo} />

      <div className="container">
        <section className="teacher-section">
          <h2 className="section-title">استاد درس</h2>
          <TeacherCard teacher={courseInfo.teacher} />
        </section>

        <section className="students-section">
          <div className="section-header">
            <h2 className="section-title">دانشجویان</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary"
            >
              افزودن دانشجو
            </button>
          </div>

          <div className="students-grid">
            {students?.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
            {students?.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>هنوز دانشجویی ثبت نشده است</h3>
                <p>برای افزودن دانشجوی جدید روی دکمه بالا کلیک کنید</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">افزودن دانشجوی جدید</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>
            <StudentForm onSubmit={handleAddStudent} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
