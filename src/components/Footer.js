export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">Ozik<span className="footer-logo-accent">Dev</span></span>
            <p className="footer-tagline">
              Fullstack Developer — bikin web cepat, responsif, dan gampang dipakai.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Navigasi</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#project">Projects</a></li>
              <li><a href="#journey">Journey</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Kontak</h4>
            <ul>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:arrozikinkholifahk@gmail.com">arrozikinkholifahk@gmail.com</a>
              </li>
              <li>
                <i className="fab fa-github"></i>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com/ozik</a>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">linkedin.com/in/ozik</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <span className="footer-logo-accent">OzikDev</span>. All Rights Reserved.</p>
          <div className="footer-socials">
            <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
