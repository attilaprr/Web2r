import { useState, useEffect } from "react";

function StudentForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      image: "https://i.pravatar.cc/150",
      description: "",
      studentId: "",
      email: "",
      phone: "",
      major: "",
      entryYear: "",
      gpa: "",
      bio: "",
      socialMedia: {
        github: "",
        linkedin: "",
      },
      skills: {
        html: 0,
        javascript: 0,
        react: 0,
      },
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialMedia.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [field]: value,
        },
      }));
    } else if (name.startsWith("skills.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [field]: parseInt(value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name" className="form-label required">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="نام و نام خانوادگی را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentId" className="form-label required">
            شماره دانشجویی
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            required
            value={formData.studentId}
            onChange={handleChange}
            className="form-input"
            placeholder="مثال: ۹۹۱۲۳۴۵۶"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label required">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="example@university.ac.ir"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label required">
            شماره تماس
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label required">
          توضیح کوتاه
        </label>
        <input
          type="text"
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          placeholder="مثال: دانشجوی ترم ۶ مهندسی کامپیوتر"
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="major" className="form-label required">
            رشته تحصیلی
          </label>
          <input
            type="text"
            id="major"
            name="major"
            required
            value={formData.major}
            onChange={handleChange}
            className="form-input"
            placeholder="مثال: مهندسی کامپیوتر - نرم‌افزار"
          />
        </div>

        <div className="form-group">
          <label htmlFor="entryYear" className="form-label required">
            سال ورود
          </label>
          <input
            type="text"
            id="entryYear"
            name="entryYear"
            required
            value={formData.entryYear}
            onChange={handleChange}
            className="form-input"
            placeholder="مثال: ۱۳۹۹"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gpa" className="form-label required">
            معدل
          </label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            required
            step="0.01"
            min="0"
            max="20"
            value={formData.gpa}
            onChange={handleChange}
            className="form-input"
            placeholder="مثال: ۱۷.۵"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bio" className="form-label">
          بیوگرافی
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="form-input"
          rows={3}
          placeholder="یک بیوگرافی کوتاه از خود بنویسید"
        />
      </div>

      <div className="form-section">
        <h3 className="section-title">شبکه‌های اجتماعی</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="socialMedia.github" className="form-label">
              GitHub
            </label>
            <input
              type="text"
              id="socialMedia.github"
              name="socialMedia.github"
              value={formData.socialMedia.github}
              onChange={handleChange}
              className="form-input"
              placeholder="github.com/username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="socialMedia.linkedin" className="form-label">
              LinkedIn
            </label>
            <input
              type="text"
              id="socialMedia.linkedin"
              name="socialMedia.linkedin"
              value={formData.socialMedia.linkedin}
              onChange={handleChange}
              className="form-input"
              placeholder="linkedin.com/in/username"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">مهارت‌ها</h3>
        <div className="skills-grid">
          {Object.entries(formData.skills).map(([skill, value]) => (
            <div key={skill} className="form-group">
              <label htmlFor={`skills.${skill}`} className="form-label">
                {skill.toUpperCase()}
              </label>
              <input
                type="range"
                id={`skills.${skill}`}
                name={`skills.${skill}`}
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className="form-range"
              />
              <span className="range-value">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? "ویرایش اطلاعات" : "افزودن دانشجو"}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
