export default function IndustrieLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-future-dusk-900 h-72 md:h-96 w-full" />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <div className="space-y-4 max-w-2xl">
          <div className="h-8 bg-neutral-100 rounded-lg w-64" />
          <div className="h-4 bg-neutral-100 rounded w-full" />
          <div className="h-4 bg-neutral-100 rounded w-5/6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-neutral-100 rounded-2xl p-8 space-y-3">
              <div className="h-10 w-10 bg-neutral-200 rounded-xl" />
              <div className="h-6 bg-neutral-200 rounded w-3/4" />
              <div className="h-4 bg-neutral-200 rounded w-full" />
              <div className="h-4 bg-neutral-200 rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
