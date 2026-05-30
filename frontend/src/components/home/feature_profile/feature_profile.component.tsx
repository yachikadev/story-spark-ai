import React from "react";
import { useGetProfileInfoQuery } from "../../../redux/apis/user.api";
import SSProfile from "../../ui-component/ss-profile/ss-profile";
import { Link } from "react-router-dom";

const FeatureProfileComponent = () => {
  const { data } = useGetProfileInfoQuery(undefined);

  const postsCount = data?.postsCount ?? 0;
  const followersCount = data?.followers?.length ?? 0;
  const followingCount = data?.following?.length ?? 0;

  return (
    <section className="bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 mb-8 w-full box-border shadow-sm">
      <div className="flex items-center mb-6 w-full box-border">
        <div className="shrink-0 border border-slate-200/80 dark:border-white/10 rounded-full overflow-hidden">
          <SSProfile
            name={data?.name as string}
            imageUrl={data?.profile?.avatar}
          />
        </div>
        <div className="ml-4 min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
            {data?.name || "Loading User..."}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
            {data?.email || "..."}
          </p>
        </div>
      </div>

      <div className="border-t border-b border-slate-100 dark:border-white/5 py-4 mb-6 w-full box-border select-none">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center w-full box-border">
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight truncate">
              {postsCount}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">
              Posts
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight truncate">
              {followersCount}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">
              Followers
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight truncate">
              {followingCount}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">
              Following
            </p>
          </div>
        </div>
      </div>

      <Link to="/stories" className="w-full block">
        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider select-none">
          <span>Generate Story</span>
          <i className="fa-solid fa-wand-magic-sparkles text-xs" aria-hidden="true" />
        </button>
      </Link>
    </section>
  );
};

export default FeatureProfileComponent;