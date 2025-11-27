import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "@/components/login-form";
import { PublicRoute } from "@/components/route-guards";
import AuthContainer from "@/components/auth-container";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicRoute>
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </PublicRoute>
  );
}
