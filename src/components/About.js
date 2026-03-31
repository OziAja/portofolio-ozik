import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container mx-auto px-4">
        <div className="about-content">

          <div className="about-image">
            <div className="image-wrapper relative w-full h-[560px]">
              <Image
                src="/images/about-profile.webp"
                alt="About Ozik"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="about-img"
              />
              <div className="experience-badge">
                <span className="badge-number">1+</span>
                <span className="badge-text">Years<br />Experience</span>
              </div>
            </div>
          </div>

          <div className="about-text">
            <h2 className="section-title" style={{ textAlign: 'left' }}>About Me</h2>
            <div className="about-description">
              <p>
                Saya seorang aspiring full-stack developer dari Indonesia yang senang membangun
                web application dan terus belajar teknologi baru. Fokus utama saya adalah
                membuat interface yang responsif dan memahami cara kerja sistem dari frontend sampai backend.
              </p>
              <p>
                Sebagian besar pengalaman saya berasal dari personal project — tempat saya berlatih
                menulis clean code dan terus improve performa aplikasi.
              </p>
            </div>

            <div className="about-highlights">
              <div className="highlight">
                <i className="fas fa-graduation-cap" aria-hidden="true" />
                <div><h4>Pendidikan</h4><p>SMKN 1 SAMBI</p></div>
              </div>
              <div className="highlight">
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                <div><h4>Lokasi</h4><p>Boyolali, Indonesia</p></div>
              </div>
              <div className="highlight">
                <i className="fas fa-briefcase" aria-hidden="true" />
                <div><h4>Pengalaman</h4><p>1+ Tahun</p></div>
              </div>
            </div>

            <div className="about-actions">
              <button className="about-btn">
                <span>Download CV</span>
                <i className="fas fa-download" aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
