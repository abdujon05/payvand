import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon, CircuitBoard, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="container flex max-w-md flex-col items-center text-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute animate-pulse">
            <CircuitBoard className="h-32 w-32 text-primary/20" />
          </div>
          <h1 className="text-7xl font-bold">404</h1>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              System Malfunction
            </h2>
            <p className="text-muted-foreground">
              Oops! Looks like this circuit leads nowhere. The page you're looking for
              seems to have been disconnected or doesn't exist in our network.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild variant="default">
              <Link to="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </div>
          <div className="flex justify-center gap-2 text-sm text-muted-foreground">
            <code className="rounded bg-muted px-2 py-1">
              ERROR_PAGE_NOT_FOUND
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}