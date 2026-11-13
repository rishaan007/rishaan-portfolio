"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Brain,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Binary,
  Database,
  GitBranch,
  Terminal,
  Layers,
  Zap,
  Code2,
  Braces,
  CircuitBoard,
  Wifi,
  Monitor,
  HardDrive,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
   DATA: Three categories of floating items along left & right edges
   ────────────────────────────────────────────────────────────────────── */

// 1. Tech-essential icons — left column
const leftIcons = [
  { Icon: Cpu, y: "4%" },
  { Icon: Brain, y: "14%" },
  { Icon: CircuitBoard, y: "24%" },
  { Icon: Database, y: "34%" },
  { Icon: Terminal, y: "44%" },
  { Icon: Code2, y: "54%" },
  { Icon: Binary, y: "64%" },
  { Icon: Layers, y: "74%" },
  { Icon: HardDrive, y: "84%" },
];

// 2. Tech-essential icons — right column
const rightIcons = [
  { Icon: Network, y: "6%" },
  { Icon: ShieldCheck, y: "16%" },
  { Icon: Sparkles, y: "26%" },
  { Icon: TrendingUp, y: "36%" },
  { Icon: GitBranch, y: "46%" },
  { Icon: Zap, y: "56%" },
  { Icon: Braces, y: "66%" },
  { Icon: Wifi, y: "76%" },
  { Icon: Monitor, y: "86%" },
];

// 3. Mathematical formulas — scattered along left edge
const leftFormulas = [
  { text: "∇f(x) = λ·g(x)", y: "9%" },
  { text: "∫₀^∞ e⁻ˣ dx = 1", y: "19%" },
  { text: "det(A − λI) = 0", y: "29%" },
  { text: "P(A|B) = P(B|A)·P(A)/P(B)", y: "39%" },
  { text: "lim_{n→∞} (1+1/n)ⁿ = e", y: "49%" },
  { text: "∑ᵢ₌₁ⁿ i = n(n+1)/2", y: "59%" },
  { text: "σ(z) = 1/(1+e⁻ᶻ)", y: "69%" },
  { text: "E = mc²", y: "79%" },
  { text: "∂L/∂θ = 0", y: "89%" },
];

// 4. Mathematical formulas — scattered along right edge
const rightFormulas = [
  { text: "O(n log n)", y: "11%" },
  { text: "Softmax(QKᵀ/√d)", y: "21%" },
  { text: "∇_θ J(θ) ≈ 𝔼[∇log π]", y: "31%" },
  { text: "H(X) = −∑ p·log p", y: "41%" },
  { text: "f(x) = Σ aₙxⁿ", y: "51%" },
  { text: "KL(P‖Q) ≥ 0", y: "61%" },
  { text: "λ₁ ≥ λ₂ ≥ … ≥ λₙ", y: "71%" },
  { text: "∮ F·ds = ∬ (∇×F)·dA", y: "81%" },
  { text: "φ = (1+√5)/2", y: "91%" },
];

// 5. DSA concepts — left edge (below/interleaved with icons)
const leftDSA = [
  { text: "// BFS → O(V+E)", y: "7%" },
  { text: "stack.push(node)", y: "17%" },
  { text: "if (left < right)", y: "27%" },
  { text: "heap.extractMin()", y: "37%" },
  { text: "dp[i][j] = max(...)", y: "47%" },
  { text: "tree.insert(key)", y: "57%" },
  { text: "merge(arr, l, m, r)", y: "67%" },
  { text: "hash(key) % size", y: "77%" },
  { text: "graph.addEdge(u,v)", y: "87%" },
];

// 6. DSA concepts — right edge
const rightDSA = [
  { text: "queue.dequeue()", y: "3%" },
  { text: "// DFS → O(V+E)", y: "13%" },
  { text: "node.left = null", y: "23%" },
  { text: "while (lo <= hi)", y: "33%" },
  { text: "return memo[n]", y: "43%" },
  { text: "trie.search(word)", y: "53%" },
  { text: "sort(arr, cmp)", y: "63%" },
  { text: "dijkstra(src, G)", y: "73%" },
  { text: "scc = tarjan(G)", y: "83%" },
];

/* ──────────────────────────────────────────────────────────────────────
   Seeded-random-ish helpers for deterministic but varied animations
   ────────────────────────────────────────────────────────────────────── */
function seededFloat(i: number, offset: number) {
  return ((((i + 1) * 7 + offset * 13) % 17) / 17);
}

/* ──────────────────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────────────────── */
export function TechHoverIcons() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden select-none"
    >
      {/* ═══════════════ LEFT RAIL ═══════════════ */}
      <div className="absolute left-0 top-0 h-full w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
        {/* Tech Icons — left */}
        {leftIcons.map(({ Icon, y }, i) => {
          const dur = 5 + seededFloat(i, 0) * 6;
          const delay = seededFloat(i, 1) * 4;
          const xDrift = 4 + seededFloat(i, 2) * 12;
          return (
            <motion.div
              key={`li-${i}`}
              className="absolute text-[var(--gold)]/40 hover:text-[var(--gold)] transition-colors duration-500"
              style={{ top: y, left: `${20 + seededFloat(i, 3) * 60}%` }}
              animate={{
                y: [0, -(8 + seededFloat(i, 4) * 16), 0],
                x: [0, xDrift, 0],
                rotate: [0, 6, -6, 0],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
            </motion.div>
          );
        })}

        {/* Math Formulas — left */}
        {leftFormulas.map(({ text, y }, i) => {
          const dur = 7 + seededFloat(i, 5) * 8;
          const delay = 1 + seededFloat(i, 6) * 5;
          return (
            <motion.span
              key={`lf-${i}`}
              className="absolute font-mono text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]
                         text-cyan-400/25 whitespace-nowrap tracking-wider"
              style={{ top: y, left: `${5 + seededFloat(i, 7) * 40}%` }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.08, 0.3, 0.08],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              {text}
            </motion.span>
          );
        })}

        {/* DSA Snippets — left */}
        {leftDSA.map(({ text, y }, i) => {
          const dur = 8 + seededFloat(i, 8) * 7;
          const delay = 2 + seededFloat(i, 9) * 4;
          return (
            <motion.span
              key={`ld-${i}`}
              className="absolute font-mono text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px]
                         text-emerald-400/20 whitespace-nowrap tracking-widest"
              style={{ top: y, left: `${10 + seededFloat(i, 10) * 50}%` }}
              animate={{
                y: [0, -10, 0],
                x: [0, 6, 0],
                opacity: [0.06, 0.25, 0.06],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              {text}
            </motion.span>
          );
        })}
      </div>

      {/* ═══════════════ RIGHT RAIL ═══════════════ */}
      <div className="absolute right-0 top-0 h-full w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
        {/* Tech Icons — right */}
        {rightIcons.map(({ Icon, y }, i) => {
          const dur = 5 + seededFloat(i, 11) * 6;
          const delay = seededFloat(i, 12) * 4;
          const xDrift = -(4 + seededFloat(i, 13) * 12);
          return (
            <motion.div
              key={`ri-${i}`}
              className="absolute text-[var(--gold)]/40 hover:text-[var(--gold)] transition-colors duration-500"
              style={{ top: y, right: `${20 + seededFloat(i, 14) * 60}%` }}
              animate={{
                y: [0, -(8 + seededFloat(i, 15) * 16), 0],
                x: [0, xDrift, 0],
                rotate: [0, -6, 6, 0],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
            </motion.div>
          );
        })}

        {/* Math Formulas — right */}
        {rightFormulas.map(({ text, y }, i) => {
          const dur = 7 + seededFloat(i, 16) * 8;
          const delay = 1 + seededFloat(i, 17) * 5;
          return (
            <motion.span
              key={`rf-${i}`}
              className="absolute font-mono text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]
                         text-cyan-400/25 whitespace-nowrap tracking-wider"
              style={{ top: y, right: `${5 + seededFloat(i, 18) * 40}%` }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.08, 0.3, 0.08],
                rotate: [1, -1, 1],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              {text}
            </motion.span>
          );
        })}

        {/* DSA Snippets — right */}
        {rightDSA.map(({ text, y }, i) => {
          const dur = 8 + seededFloat(i, 19) * 7;
          const delay = 2 + seededFloat(i, 20) * 4;
          return (
            <motion.span
              key={`rd-${i}`}
              className="absolute font-mono text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px]
                         text-emerald-400/20 whitespace-nowrap tracking-widest"
              style={{ top: y, right: `${10 + seededFloat(i, 21) * 50}%` }}
              animate={{
                y: [0, -10, 0],
                x: [0, -6, 0],
                opacity: [0.06, 0.25, 0.06],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              {text}
            </motion.span>
          );
        })}
      </div>

      {/* ═══════════════ CONNECTING PARTICLES ═══════════════
           Tiny pulsing dots that run vertically along both edges,
           giving a "data flowing through wires" feel.             */}
      {[...Array(12)].map((_, i) => {
        const isLeft = i < 6;
        const idx = isLeft ? i : i - 6;
        const yStart = `${8 + idx * 16}%`;
        const dur = 3 + seededFloat(i, 22) * 4;
        const delay = seededFloat(i, 23) * 6;
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400/60"
            style={{
              top: yStart,
              ...(isLeft
                ? { left: `${2 + seededFloat(i, 24) * 4}%` }
                : { right: `${2 + seededFloat(i, 25) * 4}%` }),
            }}
            animate={{
              y: [0, 40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.6, 0.8],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}

      {/* ═══════════════ VERTICAL GUIDE LINES ═══════════════
           Faint glowing vertical lines along each edge               */}
      <motion.div
        className="absolute left-[3%] sm:left-[4%] top-0 bottom-0 w-px
                   bg-gradient-to-b from-transparent via-[var(--gold)]/10 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[3%] sm:right-[4%] top-0 bottom-0 w-px
                   bg-gradient-to-b from-transparent via-[var(--gold)]/10 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
