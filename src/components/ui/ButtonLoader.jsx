export default function ButtonLoader() {
  return (
    <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden">
      <div className="animate-loading origin-left-right h-full w-full bg-theme-light-main dark:bg-theme-dark-main" />
    </div>
  );
}
