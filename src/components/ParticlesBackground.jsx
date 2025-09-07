'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Load slim engine
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
          modes: { repulse: { distance: 200, duration: 0.4 } }
        },
        particles: {
          color: { value: '#60A5FA' },
          links: {
            color: '#3B82F6',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
          },
          move: { enable: true, speed: 1, outModes: 'bounce' },
          number: { value: 60, density: { enable: true, area: 800 } },
          opacity: { value: 0.4 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 4 } }
        },
        detectRetina: true
      }}
    />
  );
}
