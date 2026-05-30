import { useGetReviewsQuery } from "../../../redux/apis/review.api";
import { Review } from "../../../models/review";
import ReviewForm from "./ReviewForm";

const WriterFeedbackComponent = () => {
  const { data: feedbackData = [], isLoading } = useGetReviewsQuery({});

  if (isLoading) {
    return (
      <div className="w-full text-center py-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 text-slate-500 dark:text-slate-400 text-sm font-medium">
          <i className="fa-solid fa-circle-notch animate-spin"></i>
          Loading user feedback modules...
        </div>
      </div>
    );
  }

  return (
    <section className="w-full box-border py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border relative z-10">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/10 dark:border-white/10 bg-blue-500/5 text-blue-600 dark:text-blue-400 mb-4 select-none shadow-sm dark:shadow-none">
            <i className="fa-solid fa-comment-dots text-xs"></i>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Writers Say
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
            Real evaluations shared by active creators collaborating inside the automated fiction workspace pipelines.
          </p>
        </div>

        {feedbackData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full box-border items-stretch mb-16">
            {feedbackData.map((writer: Review) => (
              <div 
                key={writer._id ?? writer.name} 
                className="w-full text-left bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 hover:scale-[1.005] hover:border-blue-500/20 dark:hover:border-blue-500/30 flex flex-col justify-between box-border group"
              >
                <div className="w-full box-border">
                  <div className="mb-4 flex items-center w-full box-border">
                    <img 
                      className="h-11 w-11 rounded-full object-cover border border-slate-200/80 dark:border-white/10 shrink-0 select-none" 
                      src={writer.imgSrc || "https://i.pravatar.cc/150?img=33"} 
                      alt={writer.name} 
                    />
                    <div className="ml-3.5 min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-tight truncate">
                        {writer.name}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                        {writer.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-0.5 mb-3 select-none text-amber-400 text-sm">
                    {Array.from({ length: Math.min(writer.rating || 5, 5) }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    "{writer.feedback}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 text-center box-border max-w-xl mx-auto mb-16">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-200/60 dark:border-white/5">
              <i className="fa-solid fa-quote-right text-slate-400 dark:text-slate-500 text-lg"></i>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              No approved reviews are indexed inside the operational directory cluster node.
            </p>
          </div>
        )}

        <div className="w-full box-border relative z-20">
          <ReviewForm />
        </div>
      </div>
    </section>
  );
};

export default WriterFeedbackComponent;