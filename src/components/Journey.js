const MILESTONES = [
  {
    year: '2023',
    title: 'Mulai dari Nol',
    desc: 'Belajar HTML & CSS dari scratch. Pertama kali bikin halaman web statis dan langsung ketagihan.',
    icon: 'fas fa-seedling',
  },
  {
    year: '2023',
    title: 'JavaScript & DOM',
    desc: 'Mulai paham logika pemrograman. Belajar manipulasi DOM, event handling, dan fetch API.',
    icon: 'fas fa-code',
  },
  {
    year: '2024',
    title: 'Framework Pertama',
    desc: 'Mulai explore React dan Laravel. Ngerti konsep komponen, routing, dan pola MVC.',
    icon: 'fas fa-layer-group',
  },
  {
    year: '2024',
    title: 'Database & Backend',
    desc: 'Belajar MySQL, MongoDB, dan REST API. Berhasil bikin CRUD app yang nyambung end-to-end.',
    icon: 'fas fa-database',
  },
  {
    year: '2025',
    title: 'Fullstack Project',
    desc: 'Selesaikan project fullstack pertama — Next.js di frontend, Laravel/Node.js di backend, deploy ke production.',
    icon: 'fas fa-rocket',
  },
  {
    year: 'Now',
    title: 'Terus Berkembang',
    desc: 'Masih terus belajar dan ngoprek. Fokus ke performa, best practice, dan code yang lebih clean.',
    icon: 'fas fa-infinity',
  },
];

export default function Journey() {
  return (
    <section id="journey" className="journey-section">
      <div className="journey-container">
        <h2 className="journey-title">My Journey</h2>
        <p className="journey-subtitle">Dari blank page sampai fullstack app — ini perjalanannya.</p>

        <div className="timeline">
          {MILESTONES.map(({ year, title, desc, icon }, i) => (
            <div key={title} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="timeline-year">{year}</div>
                <div className="timeline-icon"><i className={icon} aria-hidden="true" /></div>
                <h3 className="timeline-title">{title}</h3>
                <p className="timeline-desc">{desc}</p>
              </div>
              <div className="timeline-dot" />
            </div>
          ))}
          <div className="timeline-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
