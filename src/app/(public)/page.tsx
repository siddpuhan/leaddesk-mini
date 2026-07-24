import { Container } from "@/components/common/container";
import { APP_NAME } from "@/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <Container className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A lightweight CRM to manage your leads, track interactions, and grow
          your business.
        </p>

        <div className="mt-16 w-full max-w-md rounded-lg border border-dashed p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Lead form coming in Phase 3
          </p>
        </div>
      </Container>
    </div>
  );
}
