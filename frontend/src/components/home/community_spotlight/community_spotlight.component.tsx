import { useNavigate } from "react-router-dom";
import { Post } from "../../../models/post";
import { useGetLatestListsQuery } from "../../../redux/apis/post.api";
import LoadingAnimation from "../../loading/loading.component";
import SSProfile from "../../ui-component/ss-profile/ss-profile";

const CommunitySpotlightComponent = () => {
  const { data, isLoading, isError } = useGetLatestListsQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) return <LoadingAnimation />;
  
  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 box-border">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-5 text-center text-sm font-semibold text-red-500 dark:text-red-400">
          Failed to load spotlight stories from the ecosystem database.
        </div>
      </div>
    );
  }

  const spotlightPosts = data?.posts ?? [];

  return (
    <section className="w-full box-border py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border">
        <div className="mb-8 max-w-2xl text-left px-0.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/10 dark:border-white/10 bg-blue-500/5 text-blue-600 dark:text-blue-400 mb-4 select-none shadow-sm dark:shadow-none">
            <i className="fa-solid fa-star text-xs"></i>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Curated Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Community Spotlight
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Explore highly engaging interactive story modules written by collaborative system authors.
          </p>
        </div>

        {spotlightPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 w-full box-border">
            {spotlightPosts.slice(0, 6).map((post: Post) => {
              const authorName = post.author?.name || "Unknown User";
              return (
                <button
                  key={post._id}
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="w-full text-left bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 hover:scale-[1.01] hover:border-blue-500/20 dark:hover:border-blue-500/30 cursor-pointer outline-none select-none flex flex-col justify-between box-border group"
                >
                  <div className="w-full box-border">
                    <div className="mb-4 flex items-center gap-3 w-full box-border">
                      <div className="shrink-0 border border-slate-200/80 dark:border-white/10 rounded-full overflow-hidden">
                        <SSProfile name={authorName} size="h-8 w-8 text-xs" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 truncate tracking-tight">
                          {authorName}
                        </p>
                      </div>
                    </div>
                    <h3 className="mb-2 text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider select-none">
                    Read Story
                    <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-0.5"></i>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-10 sm:p-14 text-center box-border max-w-full">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-5 border border-slate-200/60 dark:border-white/5 select-none">
              <i className="fa-solid fa-layer-group text-slate-400 dark:text-slate-500 text-xl"></i>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">
              No Spotlight Stories available
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto leading-normal">
              Check back shortly as system engines process content records into the stream.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunitySpotlightComponent;