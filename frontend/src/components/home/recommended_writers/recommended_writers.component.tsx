import { useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../../services/auth.service";
import { useToggleFollowMutation } from "../../../redux/apis/user.api";

const writers = [
  { id: "roni-sarkar-id", name: "Roni Sarkar", role: "AI Writer", image: "https://avatars.githubusercontent.com/u/76697055?v=4" },
  { id: "sarah-lee-id", name: "Sarah Lee", role: "Content Creator", image: "https://i.pravatar.cc/150?img=5" },
  { id: "john-doe-id", name: "John Doe", role: "Story Writer", image: "https://i.pravatar.cc/150?img=8" },
];

const RecommendedWritersComponent = () => {
  const [following, setFollowing] = useState<string[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toggleFollowMutation, { isLoading }] = useToggleFollowMutation();

  const toggleFollow = async (authorId: string) => {
    if (!isLoggedIn()) {
      return setShowLoginModal(true);
    }
    try {
      await toggleFollowMutation(authorId).unwrap();
      setFollowing((prev) => 
        prev.includes(authorId) ? prev.filter((id) => id !== authorId) : [...prev, authorId]
      );
    } catch {
      // Fail silently or handle error appropriately without comments
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full box-border shadow-sm">
        <h3 className="mb-5 text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 select-none">
          Recommended Writers
        </h3>
        <div className="space-y-3 w-full box-border">
          {writers.map((writer) => {
            const isFollowing = following.includes(writer.id);
            return (
              <div 
                key={writer.id} 
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 p-3 w-full box-border transition-all duration-200 hover:border-slate-300 dark:hover:border-white/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img 
                    className="h-10 w-10 rounded-full object-cover shrink-0 select-none border border-slate-200 dark:border-white/10" 
                    src={writer.image} 
                    alt={writer.name} 
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate tracking-tight">{writer.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{writer.role}</p>
                  </div>
                </div>
                <button 
                  disabled={isLoading} 
                  onClick={() => toggleFollow(writer.id)} 
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-150 active:scale-[0.97] disabled:opacity-50 select-none cursor-pointer uppercase tracking-wider ${
                    isFollowing
                      ? "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm shadow-blue-500/10"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm select-none">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-xl box-border text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Authentication Required</h4>
            <p className="mb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              You need to log in or sign up to follow creators within the platform ecosystem network.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-end w-full">
              <button 
                onClick={() => setShowLoginModal(false)} 
                className="w-full sm:w-auto order-2 sm:order-1 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer uppercase tracking-wider"
              >
                Close
              </button>
              <Link to="/login" className="w-full sm:w-auto order-1 sm:order-2">
                <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/10 cursor-pointer uppercase tracking-wider text-center">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendedWritersComponent;