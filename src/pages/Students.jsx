import { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3001/students");
      if (!response.ok) throw new Error("خطا در دریافت اطلاعات");
      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const url = editingStudent
        ? `http://localhost:3001/students/${editingStudent.id}`
        : "http://localhost:3001/students";

      const response = await fetch(url, {
        method: editingStudent ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("خطا در ذخیره اطلاعات");

      await fetchStudents();
      setIsModalOpen(false);
      setEditingStudent(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این دانشجو اطمینان دارید؟")) return;

    try {
      const response = await fetch(`http://localhost:3001/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("خطا در حذف دانشجو");

      await fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <button onClick={fetchStudents} className="btn btn-primary">
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="students-page">
      <div className="students-header">
        <h1>لیست دانشجویان</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="جستجو بر اساس نام..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        <button
          onClick={() => {
            setEditingStudent(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary"
        >
          <i className="fas fa-plus"></i>
          افزودن دانشجو
        </button>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <p>دانشجویی با این نام یافت نشد!</p>
        </div>
      ) : (
        <div className="students-grid">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        title={editingStudent ? "ویرایش اطلاعات دانشجو" : "افزودن دانشجو جدید"}
      >
        <StudentForm onSubmit={handleSubmit} initialData={editingStudent} />
      </Modal>
    </div>
  );
}

export default Students;
