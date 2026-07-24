import Link from "next/link";
import { Container } from "@/components/common/container";
import { APP_NAME } from "@/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight"
          >
            {APP_NAME}
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
