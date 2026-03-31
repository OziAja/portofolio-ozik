"use client";
import { useState, useCallback } from 'react';

const INITIAL = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSending(true);
    // TODO: ganti dengan API call nyata
    await new Promise((r) => setTimeout(r, 800));
    alert('Pesan berhasil terkirim!');
    setForm(INITIAL);
    setSending(false);
  }, []);

  return (
    <section id="contact" className="section contact">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Ada project seru atau sekadar ingin ngobrol? Jangan ragu untuk menghubungi.</p>

        <div className="contact-content">

          <div className="contact-info">
            {[
              { icon: 'fas fa-envelope', title: 'Email',    sub: 'ozik@example.com', href: 'mailto:ozik@example.com',       label: 'Kirim Email' },
              { icon: 'fab fa-whatsapp', title: 'WhatsApp', sub: '+62 123 456 7890',  href: 'https://wa.me/621234567890',    label: 'Kirim Pesan', ext: true },
              { icon: 'fab fa-github',   title: 'GitHub',   sub: 'github.com/ozik',   href: 'https://github.com',            label: 'Lihat Profil', ext: true },
            ].map(({ icon, title, sub, href, label, ext }) => (
              <div key={title} className="contact-item">
                <div className="contact-icon"><i className={icon} aria-hidden="true" /></div>
                <div className="contact-details">
                  <h3>{title}</h3>
                  <p>{sub}</p>
                  <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input type="text"  name="name"    value={form.name}    onChange={handleChange} placeholder="Nama Kamu"  required />
              </div>
              <div className="form-group">
                <input type="email" name="email"   value={form.email}   onChange={handleChange} placeholder="Email Kamu" required />
              </div>
              <div className="form-group">
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tulis pesanmu di sini..." required />
              </div>
              <button type="submit" className="submit-btn" disabled={sending}>
                <span>{sending ? 'Mengirim...' : 'Kirim Pesan'}</span>
                <i className={`fas fa-${sending ? 'spinner fa-spin' : 'paper-plane'}`} aria-hidden="true" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
