import toast from "react-hot-toast";

// Toast Success
export const notifySuccess = (message) => {
  toast.success(message, { id: "success" });
};

// Toast Promise
export const notifyPromise = (promise) => {
  toast.promise(
    promise,
    {
      loading: "Uploading...",
      success: <p className="">Done!</p>,
      error: <p>Oops, something went wrong.</p>,
    },
    {
      className:
        "bg-theme-light-bg-primary text-theme-light-text-primary dark:bg-theme-dark-bg-quad dark:text-theme-dark-text-primary text-sm font-semibold",
      iconTheme: {
        primary: "#eab208",
        secondary: "#FFFFFF",
      },
    }
  );
};

// Toast Warning
export const notifyDuplicate = (message) =>
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto flex h-12 w-fit max-w-[350px] items-center justify-center gap-2 rounded-lg bg-theme-light-bg-primary px-[10px] py-2 text-sm font-semibold leading-snug text-theme-light-text-primary shadow-toast dark:bg-theme-dark-bg-quad dark:text-theme-dark-text-primary`}
      >
        <span className="h-6 w-6 rounded-full bg-toast-light-warning text-center text-base text-theme-light-text-secondary">
          !
        </span>
        <p>{message}</p>
      </div>
    ),
    { id: "duplicate", icon: "!" }
  );

// Toast Error
export const notifyError = (message) => toast.error(message, { id: "error" });
