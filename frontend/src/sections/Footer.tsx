export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__columns">
        <div className="site-footer__brand">
          <div className="site-footer__brandmark">R</div>
          <div>
            <strong>RENPIA</strong>
            <p>Consultoria, automatizacion y sistemas inteligentes para empresas.</p>
          </div>
        </div>
        <div>
          <h3>Soluciones</h3>
          <a href="#soluciones">SprintPilot</a>
          <a href="#soluciones">ComerCia</a>
          <a href="#soluciones">Nervia</a>
          <a href="#soluciones">JornadaLaboral360</a>
        </div>
        <div>
          <h3>Demos</h3>
          <a href="#demos">Demo SprintPilot</a>
          <a href="#demos">Demo ComerCia</a>
        </div>
        <div>
          <h3>Noticias IA</h3>
          <a href="#noticias">Blog RENPIA</a>
          <a href="#noticias">Tendencias</a>
          <a href="#noticias">Ventajas competitivas</a>
        </div>
        <div>
          <h3>Contacto</h3>
          <a href="mailto:hola@renpia.com">hola@renpia.com</a>
          <a href="https://wa.me/525512345678">WhatsApp +52 55 1234 5678</a>
          <a href="https://www.renpia.com">www.renpia.com</a>
          <span>Ciudad de Mexico, MX</span>
        </div>
      </div>

      <div className="site-footer__bottom">
        <strong>RENPIA | Reingenieria de Procesos con Inteligencia Artificial</strong>
      </div>
    </footer>
  );
}
