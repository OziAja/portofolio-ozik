"use client";
import { useEffect } from "react";

export default function useGSAP() {
  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.innerWidth < 768;

      // ── Set semua hero element ke opacity 0 dulu ─────────────
      // Matiin CSS animation bawaan yang konflik
      const heroSelectors = [
        ".greeting", ".hero-title", ".hero-subtitle",
        ".hero-value", ".hero-desc", ".hero-stats",
        ".social-links", ".hero-actions", ".image-container"
      ];
      heroSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "none";
          el.style.animation = "none";
        });
      });

      ctx = gsap.context(() => {

        // ── SCROLL PROGRESS BAR ──────────────────────────────────
        const progressBar = document.querySelector(".scroll-progress");
        if (progressBar) {
          gsap.to(progressBar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          });
        }

        // ── HERO ANIMASI MASUK ───────────────────────────────────
        const playHero = () => {
          const textEls = gsap.utils.toArray([
            ".greeting", ".hero-title", ".hero-subtitle",
            ".hero-value", ".hero-desc", ".hero-stats",
            ".social-links", ".hero-actions"
          ]);

          const imgEl = document.querySelector(".image-container");

          // Force visible dulu sebelum animasi
          textEls.forEach(el => { el.style.opacity = "0"; });
          if (imgEl) imgEl.style.opacity = "0";

          // Teks stagger masuk dari bawah
          gsap.fromTo(textEls,
            { opacity: 0, y: isMobile ? 20 : 30 },
            {
              opacity: 1, y: 0,
              duration: isMobile ? 0.5 : 0.65,
              stagger: 0.07,
              ease: "power2.out",
            }
          );

          // Foto masuk
          if (imgEl) {
            gsap.fromTo(imgEl,
              isMobile
                ? { opacity: 0, y: 20 }
                : { opacity: 0, x: 40, scale: 0.95 },
              {
                opacity: 1, x: 0, y: 0, scale: 1,
                duration: 0.7,
                delay: 0.15,
                ease: "power2.out",
              }
            );
          }
        };

        // Cek apakah loading udah selesai (window flag, reset tiap refresh)
        if (window.__loadingDone) {
          // Loading sudah selesai sebelum GSAP init
          gsap.delayedCall(0.1, playHero);
        } else {
          // Tunggu event dari Loading.js
          window.addEventListener("loading-done", () => {
            gsap.delayedCall(0.1, playHero);
          }, { once: true });

          // Fallback: kalau event ga ketrigger dalam 1.5 detik, paksa muncul
          gsap.delayedCall(3, () => {
            const stillHidden = document.querySelector(".greeting[style*='opacity: 0']");
            if (stillHidden) playHero();
          });
        }

        // ── HERO KELUAR saat scroll ke about ────────────────────
        ScrollTrigger.create({
          trigger: "#about",
          start: "top 80%",
          onEnter: () => {
            gsap.to([
              ".greeting", ".hero-title", ".hero-subtitle",
              ".hero-value", ".hero-desc", ".hero-stats",
              ".social-links", ".hero-actions"
            ], {
              opacity: 0,
              y: -20,
              duration: 0.35,
              stagger: 0.03,
              ease: "power2.in",
            });
          },
          onLeaveBack: () => {
            gsap.to([
              ".greeting", ".hero-title", ".hero-subtitle",
              ".hero-value", ".hero-desc", ".hero-stats",
              ".social-links", ".hero-actions"
            ], {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.04,
              ease: "power2.out",
            });
          },
        });

        // ── HELPERS ──────────────────────────────────────────────
        const onEnter = (elOrSel, from, to, start = "top 88%") => {
          const el = typeof elOrSel === "string"
            ? document.querySelector(elOrSel)
            : elOrSel;
          if (!el) return;
          gsap.fromTo(el, from, {
            ...to,
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none reset",
            },
          });
        };

        const onEnterEach = (selector, from, to, start = "top 90%") => {
          document.querySelectorAll(selector).forEach((el) => {
            gsap.fromTo(el, from, {
              ...to,
              clearProps: "transform",
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none reset",
              },
            });
          });
        };

        const onEnterBatch = (selector, from, to, triggerSel, stagger = 0.1, start = "top 85%") => {
          const els = document.querySelectorAll(selector);
          const trigger = document.querySelector(triggerSel);
          if (!els.length || !trigger) return;
          gsap.fromTo(els, from, {
            ...to, stagger,
            clearProps: "transform",
            scrollTrigger: {
              trigger,
              start,
              toggleActions: "play none none reset",
            },
          });
        };

        // ── SECTION TITLES ───────────────────────────────────────
        gsap.utils.toArray(
          ".section-title, .skills-title, .journey-title, .section-subtitle, .journey-subtitle, .skills-subtitle"
        ).forEach((el) => {
          onEnter(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        });

        // ── ABOUT ────────────────────────────────────────────────
        if (!isMobile) {
          onEnter(".about-image",
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
            "top 82%"
          );
          onEnter(".about-text",
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
            "top 82%"
          );
        } else {
          onEnterEach(".about-image, .about-text",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }

        document.querySelectorAll(".highlight").forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 },
            {
              opacity: 1, x: 0, y: 0,
              duration: 0.5, ease: "power2.out",
              delay: i * 0.08,
              clearProps: "transform",
              scrollTrigger: {
                trigger: ".about-highlights",
                start: "top 88%",
                toggleActions: "play none none reset",
              },
            }
          );
        });

        // ── SKILLS ───────────────────────────────────────────────
        if (isMobile) {
          onEnterEach(".skill-card",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        } else {
          onEnterBatch(".skill-card",
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.1)" },
            ".skills-grid", 0.1
          );
        }

        // ── SERVICES ─────────────────────────────────────────────
        if (isMobile) {
          onEnterEach(".service-card",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        } else {
          onEnterBatch(".service-card",
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.1)" },
            ".services-grid", 0.09
          );
        }

        // ── PROJECTS ─────────────────────────────────────────────
        if (isMobile) {
          onEnterEach(".project-card",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        } else {
          onEnterBatch(".project-card",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
            ".projects-grid", 0.12
          );
        }

        // ── TIMELINE ─────────────────────────────────────────────
        if (isMobile) {
          onEnterEach(".timeline-item",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        } else {
          onEnterEach(".timeline-item.left",
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
            "top 88%"
          );
          onEnterEach(".timeline-item.right",
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
            "top 88%"
          );
        }

        // ── CONTACT ──────────────────────────────────────────────
        if (!isMobile) {
          onEnter(".contact-info",
            { opacity: 0, x: -45 },
            { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
            "top 83%"
          );
          onEnter(".contact-form",
            { opacity: 0, x: 45 },
            { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
            "top 83%"
          );
        } else {
          onEnterEach(".contact-info, .contact-form",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }

        document.querySelectorAll(".contact-item").forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              duration: 0.45, ease: "power2.out",
              delay: i * 0.1,
              clearProps: "transform",
              scrollTrigger: {
                trigger: ".contact-info",
                start: "top 85%",
                toggleActions: "play none none reset",
              },
            }
          );
        });

        // ── FOOTER ───────────────────────────────────────────────
        onEnter(".footer-top",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "top 92%"
        );
        onEnter(".footer-bottom",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power2.out" },
          "top 95%"
        );

        // ── [data-gsap] GENERIC ──────────────────────────────────
        gsap.utils.toArray("[data-gsap='fade-up']").forEach((el) => {
          onEnter(el,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }
          );
        });

        gsap.utils.toArray("[data-gsap='fade-left']").forEach((el) => {
          onEnter(el,
            isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 60 },
            { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power2.out" }
          );
        });

        gsap.utils.toArray("[data-gsap='fade-right']").forEach((el) => {
          onEnter(el,
            isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -60 },
            { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power2.out" }
          );
        });

        gsap.utils.toArray("[data-gsap='scale-in']").forEach((el) => {
          onEnter(el,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.3)" }
          );
        });

        gsap.utils.toArray("[data-gsap='stagger']").forEach((parent) => {
          Array.from(parent.querySelectorAll(":scope > *")).forEach((child, i) => {
            gsap.fromTo(child,
              { opacity: 0, y: 25 },
              {
                opacity: 1, y: 0,
                duration: 0.5, ease: "power2.out",
                delay: i * 0.08,
                clearProps: "transform",
                scrollTrigger: {
                  trigger: parent,
                  start: "top 88%",
                  toggleActions: "play none none reset",
                },
              }
            );
          });
        });

        // ── PARALLAX HERO (desktop only) ─────────────────────────
        if (!isMobile) {
          const heroImg = document.querySelector(".image-container");
          if (heroImg) {
            gsap.to(heroImg, {
              y: 30,
              ease: "none",
              scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: 2,
              },
            });
          }
        }

      }); // end gsap.context
    };

    init();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (ctx) ctx.revert();
        init();
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
}
