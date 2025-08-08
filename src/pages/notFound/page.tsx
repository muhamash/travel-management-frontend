import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cyan-50 text-center p-4">
      <Ghost className="h-20 w-20 text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-bold text-muted">Page Not Found</h1>
      <p className="mt-2 text-rose-800">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}