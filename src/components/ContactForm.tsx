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
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("idle");

    if (!formData.name.trim()) {
      setErrorMsg("Full Name is required.");
      setStatus("error");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg("Email Address is required.");
      setStatus("error");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Message/Dossier is required.");
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");

      const recipient = "ieee@svce.ac.in";
      const subjectText = `IEEE SVCE Enquiry [${formData.subject.toUpperCase()}]: from ${formData.name}`;
      const bodyText = `Sender Name: ${formData.name}\nSender Email: ${formData.email}\nCategory: ${formData.subject}\n\nMessage:\n${formData.message}`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

      window.location.href = mailtoUrl;

      setStatus("success");
      setFormData({ name: "", email: "", subject: "general", message: "" });
    } catch {
      setErrorMsg("Could not automatically open mail application. Please email ieee@svce.ac.in directly.");
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div className={styles.successMessage} role="alert">
          <div className={styles.successTitle}>✓ MAIL CLIENT LAUNCHED</div>
          <p>
            Your enquiry has been prepared. Please complete and send the draft in your mail application to submit your query to <strong>ieee@svce.ac.in</strong>.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className={styles.errorMessage} role="alert">
          <div className={styles.errorTitle}>✗ VALIDATION ERROR</div>
          <p>{errorMsg}</p>
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
