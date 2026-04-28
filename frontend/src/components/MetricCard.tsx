type MetricCardProps = {
  label: string;
  value: string;
  tone: "cyan" | "violet" | "emerald";
};

export function MetricCard({ label, value, tone }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
