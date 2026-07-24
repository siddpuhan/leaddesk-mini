import { Container } from "@/components/common/container";
import { FOOTER_TEXT, FOOTER_LINK } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t py-6">
      <Container>
        <p className="text-center text-sm text-muted-foreground">
          {FOOTER_TEXT.split("Training Task")[0]}
          <a
            href={FOOTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            Digital Heroes
          </a>
          {" Training Task"}
        </p>
      </Container>
    </footer>
  );
}
