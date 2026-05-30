import React, { useState } from "react";
import { useCreateReviewMutation } from "../../../redux/apis/review.api";

const StarRating = ({ rating, setRating }: { rating: number; setRating: (n: number) => void }) => (
  <div className="flex gap-1 select-none">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className={`text-2xl transition-colors duration-150 cursor-pointer focus:outline-none ${
          star <= rating ? "text-amber-400" : "text-slate-200 dark:text-slate-800"
        }`}
        aria-label={`Rate ${star} star`}
      >
        ★
      </button>
    ))}
  </div>
);

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!role.trim()) newErrors.role = "Role is required";
    if (!feedback.trim()) newErrors.feedback = "Review is required";
    if (feedback.length > 500) newErrors.feedback = "Max 500 characters";
    if (rating === 0) newErrors.rating = "Please select a rating";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await createReview({ name, role, feedback, rating }).unwrap();
      setSuccess(true);
      setName(""); setRole(""); setFeedback(""); setRating(0); setErrors({});
    } catch {
      setErrors({ submit: "Failed to submit review. Please try again." });
    }
  };

  return (
    <div className="mt-12 max-w-xl mx-auto bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm w-full box-border relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-blue-600/5 rounded-full blur-[60px] pointer-events-none select-none" />
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight relative z-10 select-none">
        Share Your Experience
      </h3>

      {success && (
        <div aria-live="polite" className="mb-5 p-4 border border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-600 dark:text-emerald-400 rounded-xl text-xs sm:text-sm font-semibold tracking-tight">
          Thank you! Your review has been submitted for approval.
        </div>
      )}

      {errors.submit && (
        <div aria-live="polite" className="mb-5 p-4 border border-red-500/20 bg-red-500/[0.02] text-red-600 dark:text-red-400 rounded-xl text-xs sm:text-sm font-semibold tracking-tight">
          {errors.submit}
        </div>
      )}

      <div className="space-y-4 relative z-10 w-full box-border">
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-400 mb-1.5 uppercase tracking-wider select-none">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-150 box-border"
          />
          {errors.name && <p id="name-error" className="text-red-500 text-xs font-semibold mt-1 tracking-tight">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="role" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-400 mb-1.5 uppercase tracking-wider select-none">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-150 box-border"
          />
          {errors.role && <p id="role-error" className="text-red-500 text-xs font-semibold mt-1 tracking-tight">{errors.role}</p>}
        </div>

        <div>
          <label htmlFor="feedback" className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-400 mb-1.5 uppercase tracking-wider select-none">
            Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            maxLength={500}
            aria-invalid={!!errors.feedback}
            aria-describedby={errors.feedback ? "feedback-error" : undefined}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-150 box-border resize-none leading-relaxed"
          />
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold font-mono text-right mt-1 select-none">{feedback.length}/500</p>
          {errors.feedback && <p id="feedback-error" className="text-red-500 text-xs font-semibold mt-0.5 tracking-tight">{errors.feedback}</p>}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-400 mb-1.5 uppercase tracking-wider select-none">
            Rating <span className="text-red-500">*</span>
          </label>
          <StarRating rating={rating} setRating={setRating} />
          {errors.rating && <p className="text-red-500 text-xs font-semibold mt-1 tracking-tight">{errors.rating}</p>}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/10 transition-all duration-150 active:scale-[0.98] disabled:opacity-50 select-none uppercase tracking-wider cursor-pointer mt-2"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;