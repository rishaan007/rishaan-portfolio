'use client';

import React, { useState } from 'react';
import { ShoppingBag, TrendingDown, ArrowUpDown, Database, Check } from 'lucide-react';

export function PricehubVisualizer() {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const items = [
    {
      name: 'Organic Whole Milk 1L',
      prices: [
        { store: 'Blinkit', price: 68, fastest: '11 mins', best: false },
        { store: 'Zepto', price: 64, fastest: '8 mins', best: true },
        { store: 'Instamart', price: 66, fastest: '14 mins', best: false },
        { store: 'Amazon Fresh', price: 70, fastest: '2 hours', best: false },
      ],
      saving: '₹6 (8.6%)',
    },
    {
      name: 'Arabica Dark Roast Coffee 250g',
      prices: [
        { store: 'Blinkit', price: 420, fastest: '12 mins', best: false },
        { store: 'Zepto', price: 435, fastest: '9 mins', best: false },
        { store: 'Instamart', price: 410, fastest: '15 mins', best: false },
        { store: 'Amazon Fresh', price: 389, fastest: 'Next Day', best: true },
      ],
      saving: '₹46 (10.5%)',
    },
  ];

  const current = items[selectedProduct];

  return (
    <div className="relative w-full rounded-sm border border-[var(--gold)]/40 bg-gradient-to-b from-[#161214] via-[#20191c] to-[#0f0c0d] text-[#F5F0E6] p-5 shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--gold)]/25 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-bold">
            Multi-Platform Commerce Matrix
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
          <Database className="w-3 h-3" />
          <span>MongoDB Atlas Sync</span>
        </div>
      </div>

      {/* Product tabs */}
      <div className="flex gap-2 mb-3">
        {items.map((it, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedProduct(idx)}
            className={`px-3 py-1.5 text-xs rounded transition-all font-serif ${
              selectedProduct === idx
                ? 'bg-[var(--burgundy)] text-[var(--gold)] border border-[var(--gold)]/50 font-bold'
                : 'bg-black/30 text-white/60 hover:text-white border border-white/10'
            }`}
          >
            {it.name}
          </button>
        ))}
      </div>

      {/* Store Pricing Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {current.prices.map((st, i) => (
          <div
            key={i}
            className={`p-2.5 rounded border relative ${
              st.best
                ? 'bg-emerald-950/40 border-emerald-400/80 text-emerald-200'
                : 'bg-black/40 border-white/10 text-white/80'
            }`}
          >
            {st.best && (
              <span className="absolute -top-1.5 right-2 text-[8px] font-mono bg-emerald-500 text-black px-1.5 py-0.2 rounded-full font-bold">
                LOWEST
              </span>
            )}
            <span className="text-[10px] font-mono text-white/50 block">{st.store}</span>
            <span className="text-base font-serif font-bold text-white block mt-0.5">
              ₹{st.price}
            </span>
            <span className="text-[9px] font-mono text-white/40 block mt-0.5">
              ETA: {st.fastest}
            </span>
          </div>
        ))}
      </div>

      {/* Savings Metric Ticker */}
      <div className="p-2.5 rounded bg-[var(--burgundy)]/40 border border-[var(--gold)]/25 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <TrendingDown className="w-4 h-4" />
          <span>Max Calculated Delta Savings: {current.saving}</span>
        </div>
        <span className="text-[10px] text-white/50 font-mono">Node.js Scraper API</span>
      </div>
    </div>
  );
}
