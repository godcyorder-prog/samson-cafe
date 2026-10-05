"use client";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30 text-3xl">
        ⚠️
      </div>
      <h2 className="mb-2 text-xl font-bold text-cream-50">Something went wrong</h2>
      <p className="mb-6 max-w-md text-toast-400">{message}</p>
      <button type="button" onClick={onRetry} className="btn-primary">
        Try Again
      </button>
    </div>
  );
}
