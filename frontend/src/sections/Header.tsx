import { ButtonLink } from "../components/ButtonLink";

const menuItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#soluciones", label: "Soluciones" },
  { href: "#demos", label: "Demos" },
  { href: "#noticias", label: "Noticias IA" },
  { href: "#desarrollo-medida", label: "Desarrollo a la medida" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#inicio" aria-label="RENPIA inicio">
        <span className="brand-lockup__mark">R</span>
        <span>
          <strong>RENPIA</strong>
          <small>Reingenieria + IA</small>
        </span>
      </a>

      <nav className="site-nav" aria-label="Principal">
        {menuItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <ButtonLink href="#formulario" variant="secondary">
          Solicitar diagnostico
        </ButtonLink>
        <ButtonLink href="#agenda">Agendar demo</ButtonLink>
      </div>
    </header>
  );
}
