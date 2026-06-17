import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[72px] font-bold text-primary leading-none">404</p>
        <h1 className="mt-4 text-[20px] font-semibold text-foreground">
          Page Not Found
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center h-10 px-6 text-[14px] font-medium bg-primary text-primary-foreground rounded-xl transition-subtle hover:opacity-80"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
