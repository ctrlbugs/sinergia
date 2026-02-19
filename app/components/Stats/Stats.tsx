'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  decimals: number;
  label: string;
}

const stats: Stat[] = [
  { value: 1000, suffix: '+', prefix: '', decimals: 0, label: 'Active Vendors' },
  { value: 500, suffix: '+', prefix: '', decimals: 0, label: 'Tenders' },
  { value: 99.9, suffix: '%', prefix: '', decimals: 1, label: 'Uptime' },
  { value: 100, suffix: '%', prefix: '', decimals: 0, label: 'Audit trail' },
];

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section section-gray">
      <div className="section-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatBox key={index} stat={stat} isVisible={isVisible} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBox({ stat, isVisible, delay }: { stat: Stat; isVisible: boolean; delay: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const multiplier = stat.value >= 1 ? (stat.suffix === 'K+' ? 1000 : stat.suffix === 'B+' ? 1000000000 : 1) : 1;

  useEffect(() => {
    if (!isVisible) return;

    const target = stat.value * multiplier;
    const duration = 2000;
    const startTime = Date.now() + delay;

    const animate = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOutCubic;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stat.value, multiplier, delay]);

  const formatValue = (val: number) => {
    if (stat.suffix === 'K+') {
      return `${(val / 1000).toFixed(stat.decimals)}${stat.suffix}`;
    } else if (stat.suffix === 'B+') {
      return `${stat.prefix}${(val / 1000000000).toFixed(stat.decimals)}${stat.suffix}`;
    } else {
      return `${stat.prefix}${val.toFixed(stat.decimals)}${stat.suffix}`;
    }
  };

  return (
    <div className="stat-box fade-in">
      <div className="stat-box-value">{formatValue(displayValue)}</div>
      <div className="stat-box-label">{stat.label}</div>
    </div>
  );
}

