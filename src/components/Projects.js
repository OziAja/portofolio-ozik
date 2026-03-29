const PROJECTS = [
  {
    title: 'Portfolio Website',
    desc: 'Website portofolio personal yang dibangun dengan Next.js dan Tailwind CSS. Menampilkan skills, projects, dan cara menghubungi.',
    tech: ['Next.js', 'Tailwind CSS', 'JavaScript'],
    demo: '#', github: '#',
  },
  {
    title: 'Dashboard Admin',
    desc: 'Dashboard admin dengan fitur manajemen data, visualisasi statistik, dan autentikasi pengguna menggunakan Laravel dan MySQL.',
    tech: ['Laravel', 'MySQL', 'Blade', 'CSS'],
    demo: '#', github: '#',
  },
  {
    title: 'Landing Page Produk',
    desc: 'Landing page responsif untuk produk UMKM lokal. Dioptimasi untuk kecepatan loading dan konversi pengunjung.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: '#', github: '#',
  },
];

export default function Projects() {
  return (
    <section id="project" className="section projects">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Bukan sekadar daftar — ini bukti nyata yang pernah gue bangun.</p>

        <div className="projects-grid">
          {PROJECTS.map(({ title, desc, tech, demo, github }) => (
            <div key={title} className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <i className="fas fa-code project-placeholder-icon" aria-hidden="true" />
                  <span>{title}</span>
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live Demo">
                      <i className="fas fa-external-link-alt" aria-hidden="true" />
                    </a>
                    <a href={github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub">
                      <i className="fab fa-github" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="project-tech">
                  {tech.map((t) => <span key={t}>{t}</span>)}
                </div>
                <div className="project-actions">
                  <a href={demo} target="_blank" rel="noopener noreferrer" className="project-btn demo-btn">
                    <i className="fas fa-eye" aria-hidden="true" /> Live Demo
                  </a>
                  <a href={github} target="_blank" rel="noopener noreferrer" className="project-btn github-btn">
                    <i className="fab fa-github" aria-hidden="true" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
