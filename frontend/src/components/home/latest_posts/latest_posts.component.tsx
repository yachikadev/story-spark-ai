import { useNavigate } from "react-router-dom";
import { Post } from "../../../models/post";
import { useGetLatestListsQuery } from "../../../redux/apis/post.api";
import LoadingAnimation from "../../loading/loading.component";

const LatestPostsComponent = () => {
  const { data, isLoading } = useGetLatestListsQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) return <LoadingAnimation />;

  const posts = data?.posts ?? [];

  return (
    <section className="w-full box-border">
      <h2 className="mb-6 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight select-none">
        Latest Posts
      </h2>
      <div className="space-y-4 w-full box-border">
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <button
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
              className="w-full text-left bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 hover:scale-[1.005] hover:border-blue-500/20 dark:hover:border-blue-500/30 cursor-pointer outline-none select-none block box-border group"
            >
              <h3 className="mb-2 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {post.content || ""}
              </p>
            </button>
          )
        )) : (
          <div className="rounded-2xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 text-center box-border max-w-full">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-200/60 dark:border-white/5">
              <i className="fa-solid fa-newspaper text-slate-400 dark:text-slate-500 text-lg"></i>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Posts are not available inside the pipeline stream right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestPostsComponent;