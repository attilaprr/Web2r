import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";
import Modal from "../components/Modal";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [filters, setFilters] = useState({
    faculty: "همه",
    gender: "همه",
    status: "همه",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3001/courses");
      if (!response.ok) throw new Error("خطا در دریافت اطلاعات");
      const data = await response.json();
      console.log(data);
      setCourses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const faculties = [
    "همه",
    ...new Set(courses.map((course) => course.faculty)),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course?.code?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFaculty =
      filters?.faculty === "همه" || course?.faculty === filters?.faculty;
    const matchesGender =
      filters?.gender === "همه" || course?.gender === filters?.gender;
    const matchesStatus =
      filters?.status === "همه" || course?.status === filters?.status;

    return matchesSearch && matchesFaculty && matchesGender && matchesStatus;
  });

  const handleSubmit = async (formData) => {
    try {
      const url = editingCourse
        ? `http://localhost:3001/courses/${editingCourse.id}`
        : "http://localhost:3001/courses";

      const response = await fetch(url, {
        method: editingCourse ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("خطا در ذخیره اطلاعات");

      await fetchCourses();
      setIsModalOpen(false);
      setEditingCourse(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این درس اطمینان دارید؟")) return;

    try {
      const response = await fetch(`http://localhost:3001/courses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("خطا در حذف درس");

      await fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
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
        <button onClick={fetchCourses} className="btn btn-primary">
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>لیست دروس ارائه شده</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="جستجو در دروس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label>دانشکده:</label>
          <select
            value={filters.faculty}
            onChange={(e) =>
              setFilters({ ...filters, faculty: e.target.value })
            }
          >
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>جنسیت:</label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="همه">همه</option>
            <option value="مختلط">مختلط</option>
            <option value="مردانه">مردانه</option>
            <option value="زنانه">زنانه</option>
          </select>
        </div>

        <div className="filter-group">
          <label>وضعیت:</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="همه">همه</option>
            <option value="فعال">فعال</option>
            <option value="غیرفعال">غیرفعال</option>
          </select>
        </div>
      </div>

      <div className="courses-stats">
        <div className="stat-item">
          <span className="stat-label">تعداد کل دروس:</span>
          <span className="stat-value">{courses.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">نتایج فیلتر شده:</span>
          <span className="stat-value">{filteredCourses.length}</span>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <p>هیچ درسی با این مشخصات یافت نشد!</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        title={editingCourse ? "ویرایش درس" : "افزودن درس جدید"}
      >
        <CourseForm onSubmit={handleSubmit} initialData={editingCourse} />
      </Modal>
    </div>
  );
}

export default Courses;
