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
                I'm an aspiring full-stack developer from Indonesia who enjoys building web applications
                and learning new technologies. I focus on creating responsive interfaces and understanding
                how systems work from frontend to backend.
              </p>
              <p>
                Most of my experience comes from personal projects, where I practice writing clean code
                and improving performance.
              </p>
            </div>

            <div className="about-highlights">
              <div className="highlight">
                <i className="fas fa-graduation-cap" aria-hidden="true" />
                <div><h4>Education</h4><p>SMKN 1 SAMBI</p></div>
              </div>
              <div className="highlight">
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                <div><h4>Location</h4><p>Boyolali, ID</p></div>
              </div>
              <div className="highlight">
                <i className="fas fa-briefcase" aria-hidden="true" />
                <div><h4>Experience</h4><p>1+ Years</p></div>
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
