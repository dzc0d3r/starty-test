export function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
    </div>
  );
}
