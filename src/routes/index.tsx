import { createFileRoute, Navigate } from "@tanstack/react-router";
import useAuthStore from "@/store/auth-store";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-muted-foreground">
          You are successfully logged in
        </p>
      </div>
    </div>
  );
}
