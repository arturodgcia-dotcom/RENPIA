import type { DemoItem } from "../data/siteContent";
import { Button } from "./Button";

type DemoCardProps = {
  demo: DemoItem;
};

export function DemoCard({ demo }: DemoCardProps) {
  return (
    <article className="demo-card">
      <span className="demo-card__badge">{demo.badge}</span>
      <h3>{demo.title}</h3>
      <p>{demo.description}</p>
      <Button href="#agenda">Entrar al demo</Button>
    </article>
  );
}
