import { DemoCard } from "../components/DemoCard";
import { demos } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";

export function DemosSection() {
  const { content } = useI18n();

  return (
    <section className="landing-section landing-section--airy landing-section--demos" id="demos">
      <div className="demos-layout">
        <div className="section-heading">
          <p className="section-heading__eyebrow">{content.demos.eyebrow}</p>
          <h2>{content.demos.title}</h2>
          <p className="section-heading__description">{content.demos.description}</p>
          <p className="agenda-note">{content.demos.note}</p>
        </div>

        <div className="demo-grid">
          {demos.map((demo) => (
            <DemoCard key={demo.title} demo={demo} />
          ))}
        </div>
      </div>
    </section>
  );
}
