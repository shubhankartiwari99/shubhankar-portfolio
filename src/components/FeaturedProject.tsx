"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { getAllProjects } from '@/data/projects';

export default function FeaturedProject() {
  const projects = getAllProjects();
  const featuredProject = projects.find(p => p.featured);

  const stats = [
    { label: 'Instability Drop', value: '82%', color: 'var(--accent)' },
    { label: 'False Positives', value: '0.0%', color: '#22c55e' },
    { label: 'Conf. Uplift', value: '+0.07', color: '#f59e0b' },
    { label: 'Intervention', value: '~35%', color: '#f87171' },
  ];

  return (
    <section className="py-20 px-5 sm:px-6" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <div className="text-center mb-16">
<h2 className="text-3xl sm:text-4xl font-bold mb-4">Project Spotlight</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            {featuredProject?.shortDescription ? featuredProject.shortDescription.split('.')[0] : 'Featured project'}
          </p>
          <p className="text-xl mt-4 max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
            {featuredProject?.title || 'Featured Project'}
          </p>
        </div>

        <div 
          className="group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl" 
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
        >
          <div className="relative h-64 lg:h-80 overflow-hidden">
            <Image
              src={featuredProject?.image || '/og_final.png'}
              alt={featuredProject?.title || 'Featured project'}
              fill
              className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="p-8 lg:p-12 relative -mt-12 lg:-mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
                  {featuredProject?.title || 'Featured Project'}
                </h3>
                
                <ul className="space-y-3 mb-8" style={{ color: 'var(--muted)' }}>
                  {(featuredProject?.highlights || []).slice(0, 4).map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-mono text-sm mt-0.5 w-4 flex-shrink-0" style={{ color: 'var(--accent)' }}>•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mb-8 p-4 rounded-xl border" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-dim)' }}>
                  <p className="font-semibold text-lg mb-1" style={{ color: 'var(--accent)' }}>
                    ↓ Instability reduced by 82% on degenerate prompts
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    Adaptive control mitigates entropy collapse and repetition loops.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={featuredProject?.github || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 font-medium rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg)',
                      boxShadow: '0 0 20px var(--accent-glow)'
                    }}
                  >
                    <Github size={18} />
                    View Repo
                  </Link>
                  <Link
                    href={featuredProject?.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 font-medium rounded-xl border transition-all duration-300 hover:scale-105"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  >
                    Kaggle Notebook
                    <ExternalLink size={18} />
                  </Link>
                </div>

                {/* Removed awkward truncated description */}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl text-center hover:bg-white/5 transition-colors" style={{ backgroundColor: 'var(--border)' }}>
                    <div className="font-mono text-lg font-bold mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--muted-fg)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

