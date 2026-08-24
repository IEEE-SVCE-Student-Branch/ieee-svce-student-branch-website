"use client";

import React, { useState } from "react";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Client-side simulation of inquiry dispatch
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "general", message: "" });
    }, 800);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div className={styles.successMessage} role="alert">
          <div className={styles.successTitle}>✓ INQUIRY DISPATCHED</div>
          <p>
            Your inquiry has been logged in the IEEE SVCE institutional communication dispatch.
            The respective committee head will respond to your official email.
          </p>
        </div>
      )}

      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          FULL NAME <span className={styles.required}>*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          className={styles.input}
          placeholder="e.g. Dr. Jane Doe / John Smith"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          EMAIL ADDRESS <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          className={styles.input}
          placeholder="e.g. name@domain.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="subject" className={styles.label}>
          INQUIRY CATEGORY <span className={styles.required}>*</span>
        </label>
        <select
          id="subject"
          className={styles.select}
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        >
          <option value="general">General Institutional Inquiry</option>
          <option value="collaboration">Academic Collaboration Enquiry</option>
          <option value="sponsorship">Corporate Sponsorship & Symposium Partner</option>
          <option value="industry_workshop">Workshop / Industry Technical Session Proposal</option>
          <option value="membership">Student Membership & Chapter Registration</option>
          <option value="certificate">Certificate Verification Query</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="message" className={styles.label}>
          INQUIRY DOSSIER / MESSAGE <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className={styles.textarea}
          placeholder="Please detail your proposal, event query, or collaboration scope..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={styles.submitBtn}
        data-cursor="TRANSMIT"
      >
        {status === "submitting" ? "TRANSMITTING TO DESK..." : "TRANSMIT INQUIRY →"}
      </button>
    </form>
  );
}
