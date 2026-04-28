import type { DemoItem } from "../data/siteContent";
import { Button } from "./Button";

type DemoCardProps = {
  demo: DemoItem;
};

export function DemoCard({ demo }: DemoCardProps) {
  return (
    <article className="demo-card">
      <span className="demo-card__badge">{demo.badge}</span>
      <div className="demo-card__preview">
        <div className="demo-card__screen">
          <div className="demo-card__screen-bar" />
          <div className="demo-card__screen-grid">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <h3>{demo.title}</h3>
      <p>{demo.description}</p>
      <Button href="#agenda">Entrar al demo</Button>
    </article>
  );
}
