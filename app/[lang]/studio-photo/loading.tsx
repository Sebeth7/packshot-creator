export default function StudioPhotoLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-future-dusk-900 h-72 md:h-96 w-full" />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <div className="space-y-4 max-w-2xl">
          <div className="h-8 bg-neutral-100 rounded-lg w-72" />
          <div className="h-4 bg-neutral-100 rounded w-full" />
          <div className="h-4 bg-neutral-100 rounded w-5/6" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-neutral-100">
              <div className="h-64 bg-neutral-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-neutral-200 rounded w-3/4" />
                <div className="h-4 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-4/5" />
                <div className="h-10 bg-neutral-200 rounded-xl mt-2 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
