const SERVICES = [
  {
    icon: 'fas fa-code',
    title: 'Web Development',
    desc: 'Membangun website modern dan responsif menggunakan teknologi terkini dengan performa yang optimal.',
    features: ['Responsive Design', 'Performance Optimized', 'SEO Friendly'],
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile Development',
    desc: 'Membuat aplikasi mobile cross-platform yang berjalan smooth di iOS maupun Android.',
    features: ['Cross-Platform', 'Native Performance', 'User-Friendly'],
  },
  {
    icon: 'fas fa-palette',
    title: 'UI/UX Design',
    desc: 'Mendesain interface yang intuitif dan estetik — fokus pada pengalaman pengguna yang menyenangkan.',
    features: ['User-Centered', 'Modern Design', 'Accessibility'],
  },
  {
    icon: 'fas fa-rocket',
    title: 'Performance Optimization',
    desc: 'Optimasi website untuk kecepatan, skalabilitas, dan stabilitas dalam berbagai kondisi.',
    features: ['Fast Loading', 'Scalable', 'Reliable'],
  },
  {
    icon: 'fas fa-shopping-cart',
    title: 'E-commerce Solutions',
    desc: 'Membangun platform e-commerce yang aman dan siap mendorong penjualan secara online.',
    features: ['Secure Payments', 'Inventory Management', 'Analytics'],
  },
  {
    icon: 'fas fa-cogs',
    title: 'API Development',
    desc: 'Membuat API yang robust, scalable, dan terdokumentasi dengan baik menggunakan RESTful.',
    features: ['RESTful APIs', 'GraphQL', 'Documentation'],
  },
];

export default function Services() {
  return (
    <section id="service" className="section services">
      <div className="container mx-auto px-4">
        <h2 className="section-title">What I Do</h2>
        <p className="section-subtitle">Ini yang bisa saya bantu untuk project kamu.</p>
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
