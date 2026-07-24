interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`rounded-md bg-neutral-200 animate-pulse ${className}`}
    />
  );
}