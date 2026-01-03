"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactForm() {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate network request (2 seconds)
    // In a real app, you would fetch('/api/send-email', ...)
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  if (status === "success") {
    return (
      <div className="bg-[#93C572]/10 border border-[#93C572] rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-[#93C572] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
          {t("success_title")}
        </h3>
        <p className="text-muted-foreground">{t("success_desc")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-bold text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-3xl shadow-lg border border-stone-100"
    >
      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide"
        >
          {t("name_label")}
        </label>
        <input
          type="text"
          id="name"
          required
          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          placeholder="John Doe"
        />
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide"
        >
          {t("email_label")}
        </label>
        <input
          type="email"
          id="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          placeholder="john@example.com"
        />
      </div>

      {/* Subject Input */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide"
        >
          {t("subject_label")}
        </label>
        <select
          id="subject"
          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
        >
          <option>Allgemeine Anfrage / General</option>
          <option>Event / Catering</option>
          <option>Feedback</option>
          <option>Jobs</option>
        </select>
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide"
        >
          {t("message_label")}
        </label>
        <textarea
          id="message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl hover:bg-primary-hover transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {status === "loading" ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("sending")}
          </>
        ) : (
          t("submit_btn")
        )}
      </button>
    </form>
  );
}
