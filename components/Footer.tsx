export default function Footer() {
  return (
    <footer className="border-t border-butter-400/15 bg-espresso-950/80 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <span className="text-lg font-extrabold text-cream-50">Samson Cafe</span>
          </div>
          <p className="text-sm text-toast-400">
            Artisan espresso, fresh pastries, and mindful breakfasts handcrafted daily.
          </p>
          <p className="text-xs text-cream-500/60">
            124 Harvest Lane, West District · Mon–Sun: 8:00 AM – 11:00 PM
          </p>
        </div>
      </div>
    </footer>
  );
}
