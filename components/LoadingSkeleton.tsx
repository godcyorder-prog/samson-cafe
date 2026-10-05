export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-surface animate-pulse p-5">
          <div className="mb-4 h-36 w-36 rounded-2xl bg-espresso-800" />
          <div className="mb-2 h-4 w-20 rounded bg-espresso-800" />
          <div className="mb-1 h-5 w-32 rounded bg-espresso-800" />
          <div className="mb-3 h-6 w-16 rounded bg-espresso-800" />
          <div className="h-10 w-full rounded-full bg-espresso-800" />
        </div>
      ))}
    </div>
  );
}
