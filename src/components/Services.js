const SERVICES = [
  { icon: 'fas fa-code',          title: 'Web Development',        desc: 'Bikin website responsif dan modern menggunakan teknologi terbaru dengan performa optimal.',            features: ['Responsive Design', 'Performance Optimized', 'SEO Friendly'] },
  { icon: 'fas fa-mobile-alt',    title: 'Mobile Development',     desc: 'Membangun aplikasi mobile cross-platform yang berjalan mulus di iOS dan Android.',                   features: ['Cross-Platform', 'Native Performance', 'User-Friendly'] },
  { icon: 'fas fa-palette',       title: 'UI/UX Design',           desc: 'Mendesain antarmuka yang intuitif dan estetik untuk pengalaman pengguna terbaik.',                    features: ['User-Centered', 'Modern Design', 'Accessibility'] },
  { icon: 'fas fa-rocket',        title: 'Performance Optimization', desc: 'Optimasi website untuk kecepatan, skalabilitas, dan reliabilitas dalam kondisi apapun.',           features: ['Fast Loading', 'Scalable', 'Reliable'] },
  { icon: 'fas fa-shopping-cart', title: 'E-commerce Solutions',   desc: 'Membangun platform e-commerce aman yang mendorong penjualan dan pengalaman belanja.',                features: ['Secure Payments', 'Inventory Management', 'Analytics'] },
  { icon: 'fas fa-cogs',          title: 'API Development',        desc: 'Membuat API robust dan scalable menggunakan RESTful dengan dokumentasi lengkap.',                     features: ['RESTful APIs', 'GraphQL', 'Documentation'] },
];

export default function Services() {
  return (
    <section id="service" className="section services">
      <div className="container mx-auto px-4">
        <h2 className="section-title">What I Do</h2>
        <p className="section-subtitle">Layanan yang bisa gue bantu untuk project lo.</p>
        <div className="services-grid">
          {SERVICES.map(({ icon, title, desc, features }) => (
            <div key={title} className="service-card">
              <div className="service-icon"><i className={icon} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="service-features">
                {features.map((f) => <span key={f}>{f}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
