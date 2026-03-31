const SKILLS = {
  frontend: [
    { icon: 'devicon-html5-plain colored',       name: 'HTML',         context: 'Struktur halaman & landing page responsif',           level: 'intermediate' },
    { icon: 'devicon-css3-plain colored',        name: 'CSS',          context: 'Styling, Flexbox, Grid, dan animasi',                 level: 'intermediate' },
    { icon: 'devicon-javascript-plain colored',  name: 'JavaScript',   context: 'Form validation, DOM manipulation, fetch API',        level: 'beginner' },
    { icon: 'devicon-react-original colored',    name: 'React',        context: 'Komponen UI, state management, custom hooks',         level: 'beginner' },
    { icon: 'devicon-nextjs-plain',              name: 'Next.js',      context: 'Routing, SSR, optimasi performa web',                 level: 'beginner' },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind CSS', context: 'Utility-first styling, dark mode, fully responsive',  level: 'intermediate' },
  ],
  backend: [
    { icon: 'devicon-nodejs-plain colored',  name: 'Node.js',    context: 'Runtime server-side, handle request & response',   level: 'beginner' },
    { icon: 'devicon-express-original',      name: 'Express.js', context: 'Membangun REST API & middleware sederhana',         level: 'beginner' },
    { icon: 'devicon-fastapi-plain colored', name: 'REST API',   context: 'Desain endpoint, integrasi frontend-backend',       level: 'beginner' },
    { icon: 'devicon-laravel-plain colored', name: 'Laravel',    context: 'CRUD app, auth, Blade template + MySQL',            level: 'beginner', tag: '(Full-Stack)' },
  ],
  api: [
    { icon: 'devicon-fastapi-plain colored', name: 'RESTful API', context: 'Konsumsi & develop API untuk web application', level: 'beginner' },
  ],
  db: [
    { icon: 'devicon-mongodb-plain colored', name: 'MongoDB', context: 'NoSQL database untuk proyek berbasis Node.js',     level: 'beginner' },
    { icon: 'devicon-mysql-plain colored',   name: 'MySQL',   context: 'Relational database untuk proyek Laravel & PHP',  level: 'beginner' },
    { icon: 'devicon-git-plain colored',     name: 'Git',     context: 'Version control, branching, collaboration',       level: 'intermediate' },
    { icon: 'devicon-docker-plain colored',  name: 'Docker',  context: 'Containerisasi app & setup dev environment',      level: 'basic' },
  ],
};

function SkillItem({ icon, name, context, level, tag }) {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">
          <i className={icon} aria-hidden="true" />
          {name}
          {tag && <span className="skill-tag">{tag}</span>}
        </span>
        <span className="skill-context">{context}</span>
      </div>
      <span className={`skill-badge ${level}`}>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
    </div>
  );
}

function SkillCard({ title, items }) {
  return (
    <div className="skill-card">
      <h3 className="skill-category">{title}</h3>
      {items.map((s) => <SkillItem key={s.name} {...s} />)}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="skills-title">Skills &amp; Expertise</h2>
        <p className="skills-subtitle">Full-Stack Web Development • Beginner Level</p>

        <div className="skills-grid">
          <SkillCard title="Frontend Development"  items={SKILLS.frontend} />
          <SkillCard title="Backend Development"   items={SKILLS.backend} />
          <SkillCard title="API & Integration"     items={SKILLS.api} />
          <SkillCard title="Database & Tools"      items={SKILLS.db} />
        </div>

        <div className="skills-legend">
          <span><span className="legend-dot beginner-dot" /> <strong>Beginner</strong>: Familiar, sudah pernah build project</span>
          <span><span className="legend-dot intermediate-dot" /> <strong>Intermediate</strong>: Comfortable, bisa build fitur mandiri</span>
          <span><span className="legend-dot basic-dot" /> <strong>Basic</strong>: Paham fundamental-nya</span>
        </div>
        <p className="skills-footer">Terus belajar dan membangun web application dengan teknologi modern</p>
      </div>
    </section>
  );
}
