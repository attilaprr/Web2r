function TeacherCard({ teacher }) {
  return (
    <div className="teacher-card card">
      <div className="teacher-card-header">
        <div className="teacher-image-container">
          <img
            className="teacher-image"
            src={teacher.image}
            alt={teacher.name}
          />
          <div className="teacher-badge">استاد درس</div>
        </div>
        <h2 className="teacher-name">{teacher.name}</h2>
        <p className="teacher-description">{teacher.description}</p>
      </div>
      <div className="teacher-contact">
        <a href="mailto:teacher@university.ac.ir" className="contact-link">
          <i className="fas fa-envelope"></i>
          ارسال ایمیل
        </a>
        <a href="#office-hours" className="contact-link">
          <i className="fas fa-clock"></i>
          ساعات ملاقات
        </a>
      </div>
      <div className="teacher-expertise">
        <h3 className="expertise-title">زمینه‌های تخصصی</h3>
        <div className="expertise-tags">
          <span className="expertise-tag">React</span>
          <span className="expertise-tag">Node.js</span>
          <span className="expertise-tag">Web Development</span>
        </div>
      </div>
    </div>
  )
}

export default TeacherCard 