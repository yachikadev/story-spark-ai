import { Post } from "../../../models/post";
import { useGetFeaturedListsQuery } from "../../../redux/apis/post.api";
import LoadingAnimation from "../../loading/loading.component";
import { useNavigate } from "react-router-dom";

const FeatureComponent = () => {
  const { data, isLoading, isError } = useGetFeaturedListsQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) return <LoadingAnimation />;

  if (isError) {
    return (
      <div className="w-full box-border mb-12">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-5 text-center text-sm font-semibold text-red-500 dark:text-red-400">
          Failed to load featured posts from the ecosystem database.
        </div>
      </div>
    );
  }

  const featuredPosts = data?.posts ?? [];

  return (
    <section className="w-full box-border mb-12">
      <h2 className="mb-6 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight select-none">
        Featured Posts
      </h2>

      {featuredPosts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6 w-full box-border">
          {featuredPosts.map((post: Post) => (
            <button
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
              className="w-full text-left bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 hover:scale-[1.005] hover:border-blue-500/20 dark:hover:border-blue-500/30 cursor-pointer outline-none select-none flex flex-col justify-between box-border group"
            >
              <div className="w-full box-border">
                <h3 className="mb-2 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {post.content || ""}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider select-none">
                View Feature
                <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-0.5"></i>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 text-center box-border max-w-full">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-200/60 dark:border-white/5">
            <i className="fa-solid fa-star text-slate-400 dark:text-slate-500 text-lg"></i>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            No featured nodes are highlighted inside the stream right now.
          </p>
        </div>
      )}
    </section>
  );
};

export default FeatureComponent;