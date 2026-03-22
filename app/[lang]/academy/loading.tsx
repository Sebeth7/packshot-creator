export default function AcademyLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-future-dusk-900 h-72 md:h-96 w-full" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-8 bg-neutral-100 rounded-lg w-56 mb-4" />
        <div className="h-4 bg-neutral-100 rounded w-96 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-neutral-100">
              <div className="h-52 bg-neutral-200" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-4/5" />
                <div className="h-4 bg-neutral-200 rounded w-3/5" />
                <div className="h-10 bg-neutral-200 rounded-xl mt-4 w-36" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
