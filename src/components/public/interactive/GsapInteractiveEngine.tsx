'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function GsapInteractiveEngine() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorAuraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDotRef.current;
    const aura = cursorAuraRef.current;
    if (!dot || !aura) return;

    // Fast, responsive GSAP quickTo setters for 60fps tracking
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });

    const xAuraTo = gsap.quickTo(aura, 'x', { duration: 0.38, ease: 'power3.out' });
    const yAuraTo = gsap.quickTo(aura, 'y', { duration: 0.38, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xAuraTo(e.clientX);
      yAuraTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // GSAP Sonar Click Ripple
    const handleWindowClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className =
        'fixed pointer-events-none z-50 rounded-full border border-cyan-400/80 bg-gradient-to-r from-[var(--gold)]/20 via-cyan-400/10 to-transparent';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = '0px';
      ripple.style.height = '0px';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.6)';
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        width: 75,
        height: 75,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });
    };

    window.addEventListener('click', handleWindowClick);

    // GSAP Magnetic button interactions
    const magneticElements = document.querySelectorAll<HTMLElement>(
      '.gsap-magnetic, button:not([disabled]), a.btn-classical-primary, a.btn-classical-secondary'
    );

    const handleElementMouseEnter = () => {
      gsap.to(aura, {
        scale: 2.4,
        backgroundColor: 'rgba(212, 175, 55, 0.14)',
        borderColor: 'rgba(212, 175, 55, 0.75)',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1.8,
        backgroundColor: '#38BDF8',
        boxShadow: '0 0 12px #38BDF8',
        duration: 0.2,
      });
    };

    const handleElementMouseLeave = (el: HTMLElement) => {
      gsap.to(aura, {
        scale: 1,
        backgroundColor: 'rgba(212, 175, 55, 0.04)',
        borderColor: 'rgba(212, 175, 55, 0.25)',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#D4AF37',
        boxShadow: '0 0 10px #D4AF37',
        duration: 0.2,
      });
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    const handleElementMouseMove = (e: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.22;
      const deltaY = (e.clientY - centerY) * 0.22;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementMouseEnter);
      el.addEventListener('mouseleave', () => handleElementMouseLeave(el));
      el.addEventListener('mousemove', (e) => handleElementMouseMove(e, el));
    });

    // GSAP Interactive Card Spotlight & 3D Tilt
    const cardElements = document.querySelectorAll<HTMLElement>('.gsap-card, .texture-paper');

    const handleCardMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle tilt on card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power1.out',
      });
    };

    const handleCardMouseLeave = (card: HTMLElement) => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    cardElements.forEach((card) => {
      card.addEventListener('mousemove', (e) => handleCardMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleCardMouseLeave(card));
    });

    // GSAP Scroll Reveal for Section Titles
    const revealElements = document.querySelectorAll<HTMLElement>('.gsap-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 30, filter: 'blur(4px)' },
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.85,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleWindowClick);
      observer.disconnect();
      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', () => handleElementMouseLeave(el));
      });
      cardElements.forEach((card) => {
        card.removeEventListener('mouseleave', () => handleCardMouseLeave(card));
      });
    };
  }, []);

  return (
    <>
      {/* GSAP Ambient Gold Aura (Large Glowing Halo) */}
      <div
        ref={cursorAuraRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[var(--gold)]/25 bg-[var(--gold)]/[0.04] pointer-events-none z-50 blur-xs transition-opacity duration-300 hidden md:block"
      />

      {/* GSAP Sharp Gold Pointer Dot with Cyan Core */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--gold)] shadow-[0_0_12px_#D4AF37] pointer-events-none z-50 hidden md:block"
      />
    </>
  );
}
