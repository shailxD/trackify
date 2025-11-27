import { createFileRoute } from "@tanstack/react-router";

import { SignupForm } from "@/components/signup-form";
import { PublicRoute } from "@/components/route-guards";
import AuthContainer from "@/components/auth-container";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicRoute>
      <AuthContainer>
        <SignupForm />
      </AuthContainer>
    </PublicRoute>
  );
}
