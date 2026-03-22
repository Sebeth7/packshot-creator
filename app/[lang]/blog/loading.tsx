export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-future-dusk-900 h-64 md:h-80 w-full" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-8 bg-neutral-100 rounded-lg w-48 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-neutral-100">
              <div className="h-48 bg-neutral-200" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-neutral-200 rounded w-24" />
                <div className="h-6 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-5/6" />
                <div className="h-4 bg-neutral-200 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
