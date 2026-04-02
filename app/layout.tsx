import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ozik — Full-Stack Web Developer',
  description:
    'Aspiring full-stack developer from Indonesia. Skilled in HTML, CSS, JavaScript, React, Next.js, Laravel, Node.js, and more. Open to work and collaboration.',
  keywords: ['full-stack developer', 'web developer', 'React', 'Next.js', 'Laravel', 'Indonesia'],
  authors: [{ name: 'Ozik' }],
  openGraph: {
    title: 'Ozik — Full-Stack Web Developer',
    description: 'Aspiring full-stack developer from Indonesia building modern web applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
