export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white ${className}`}
    >
      T
    </div>
  );
} 