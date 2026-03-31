export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">Ozik<span className="footer-logo-accent">Dev</span></span>
            <p className="footer-tagline">
              Fullstack Developer — membangun web yang cepat, responsif, dan mudah digunakan.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Navigasi</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#project">Projects</a></li>
              <li><a href="#service">Services</a></li>
              <li><a href="#journey">Journey</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Kontak</h4>
            <ul>
              <li>
                <i className="fas fa-envelope" aria-hidden="true" />
                <a href="mailto:arrozikinkholifahk@gmail.com">arrozikinkholifahk@gmail.com</a>
              </li>
              <li>
                <i className="fab fa-github" aria-hidden="true" />
                <a href="https://github.com/OzikAja" target="_blank" rel="noopener noreferrer">github.com/OzikAja</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <span className="footer-logo-accent">OzikDev</span>. All Rights Reserved.</p>
          <div className="footer-socials">
            <a href="https://github.com/OzikAja" aria-label="GitHub"><i className="fab fa-github" /></a>
            <a href="https://www.instagram.com/rrzkn_13?igsh=b3pxc2Iwd2FteDI1" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="https://wa.me/6285601546818" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
