import { useState, useEffect } from "react";

function CourseForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      code: "",
      title: "",
      units: 3,
      capacity: 30,
      registered: 0,
      prerequisites: [],
      description: "",
      semester: "نیمسال اول ۱۴۰۲-۱۴۰۳",
      schedule: {
        days: ["یکشنبه", "سه‌شنبه"],
        time: "۱۰:۳۰-۱۲:۰۰",
        location: "",
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
    if (name.startsWith("schedule.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [field]: value,
        },
      }));
    } else if (name === "prerequisites") {
      setFormData((prev) => ({
        ...prev,
        [name]: value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }));
    } else if (name === "days") {
      setFormData((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          days: Array.from(e.target.selectedOptions, (option) => option.value),
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
          <label htmlFor="code" className="form-label required">
            کد درس
          </label>
          <input
            type="text"
            id="code"
            name="code"
            required
            value={formData.code}
            onChange={handleChange}
            className="form-input"
            placeholder="مثال: CS-401"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title" className="form-label required">
            عنوان درس
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="عنوان درس را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label htmlFor="units" className="form-label required">
            تعداد واحد
          </label>
          <input
            type="number"
            id="units"
            name="units"
            required
            min="1"
            max="4"
            value={formData.units}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity" className="form-label required">
            ظرفیت
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            required
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label required">
          توضیحات
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          rows={3}
          placeholder="توضیحات درس را وارد کنید"
        />
      </div>

      <div className="form-section">
        <h3 className="section-title">زمان‌بندی</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="days" className="form-label required">
              روزهای برگزاری
            </label>
            <select
              id="days"
              name="days"
              multiple
              required
              value={formData.schedule.days}
              onChange={handleChange}
              className="form-input"
            >
              <option value="شنبه">شنبه</option>
              <option value="یکشنبه">یکشنبه</option>
              <option value="دوشنبه">دوشنبه</option>
              <option value="سه‌شنبه">سه‌شنبه</option>
              <option value="چهارشنبه">چهارشنبه</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="schedule.time" className="form-label required">
              ساعت برگزاری
            </label>
            <input
              type="text"
              id="schedule.time"
              name="schedule.time"
              required
              value={formData.schedule.time}
              onChange={handleChange}
              className="form-input"
              placeholder="مثال: ۱۰:۳۰-۱۲:۰۰"
            />
          </div>

          <div className="form-group">
            <label htmlFor="schedule.location" className="form-label required">
              محل برگزاری
            </label>
            <input
              type="text"
              id="schedule.location"
              name="schedule.location"
              required
              value={formData.schedule.location}
              onChange={handleChange}
              className="form-input"
              placeholder="مثال: کلاس ۱۰۱"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prerequisites" className="form-label">
              پیش‌نیازها (با کاما جدا کنید)
            </label>
            <input
              type="text"
              id="prerequisites"
              name="prerequisites"
              value={formData.prerequisites.join(", ")}
              onChange={handleChange}
              className="form-input"
              placeholder="مثال: CS-401, CS-402"
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? "ویرایش درس" : "افزودن درس"}
        </button>
      </div>
    </form>
  );
}

export default CourseForm;
