
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-extrabold text-green-primary">404</h1>
          <h2 className="mt-6 text-3xl font-bold">Page not found</h2>
          <p className="mt-2 text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="mt-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mr-4"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-green-primary hover:bg-green-dark"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};
