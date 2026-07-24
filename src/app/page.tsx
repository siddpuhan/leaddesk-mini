import { Container } from "@/components/common/container";
import { APP_NAME } from "@/constants";

export default function Home() {
  return (
    <Container className="flex flex-col items-center justify-center py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {APP_NAME}
      </h1>
      <p className="mt-4 max-w-2xl text-center text-lg text-muted-foreground">
        A lightweight CRM to manage your leads, track interactions, and grow
        your business.
      </p>
    </Container>
  );
}