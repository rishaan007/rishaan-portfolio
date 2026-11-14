'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Play, RotateCcw } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'init --session',
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">
            ✔ RISHAAN KUMAR KERNEL v4.12-ARCHIVAL LOADED
          </p>
          <p className="text-[var(--gold)]">
            Host: Netaji Subhash Engineering College (NSEC) &bull; MAKAUT [B.Tech IT &apos;28]
          </p>
          <p className="text-[var(--charcoal)]">
            Type <span className="text-cyan-300 font-bold">help</span> or tap quick actions below to query the systems.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let result: React.ReactNode;

    switch (cmd) {
      case 'help':
        result = (
          <div className="space-y-1 text-xs font-mono text-[var(--espresso)]">
            <p className="text-[var(--gold)] font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-cyan-300 font-bold w-24 inline-block">projects</span> Display all 4 flagship systems</p>
            <p><span className="text-cyan-300 font-bold w-24 inline-block">skills</span> List technical toolchains &amp; models</p>
            <p><span className="text-cyan-300 font-bold w-24 inline-block">education</span> Academic credentials &amp; CGPA</p>
            <p><span className="text-cyan-300 font-bold w-24 inline-block">leadership</span> Byte Brigade &amp; SWoC roles</p>
            <p><span className="text-cyan-300 font-bold w-24 inline-block">contact</span> Direct communication dispatches</p>
            <p><span className="text-cyan-300 font-bold w-24 inline-block">clear</span> Purge terminal screen</p>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-emerald-400 font-bold">[1] ATLAS (NASA Space Apps &apos;25)</p>
            <p className="text-[var(--charcoal)] pl-3">Hybrid 1D-CNN + Transformer Kepler transit photometry detector with SHAP.</p>
            <p className="text-emerald-400 font-bold">[2] TRINETRA</p>
            <p className="text-[var(--charcoal)] pl-3">Tri-layer edge surveillance: ESP32 (FreeRTOS) + RPi Zero W (YOLOv8 + YAMNet).</p>
            <p className="text-emerald-400 font-bold">[3] SWASTHYA</p>
            <p className="text-[var(--charcoal)] pl-3">Medical document intelligence, OCR claim extraction &amp; LLM reasoning.</p>
            <p className="text-emerald-400 font-bold">[4] PRICEHUB</p>
            <p className="text-[var(--charcoal)] pl-3">Quick-commerce multi-platform price arbitrage engine (MongoDB Atlas).</p>
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[var(--gold)] font-bold">CORE CAPABILITIES:</p>
            <p className="text-cyan-300">&bull; AI / ML: CNNs, Transformers, YOLOv8, YAMNet, SHAP, PyTorch</p>
            <p className="text-emerald-300">&bull; Languages: Python, Java, JavaScript, C</p>
            <p className="text-amber-300">&bull; Web/Backend: React.js, Next.js, Node.js, Express, FastAPI, Django</p>
            <p className="text-purple-300">&bull; Embedded/Edge: ESP32, FreeRTOS, Raspberry Pi Zero W</p>
          </div>
        );
        break;

      case 'education':
        result = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">B.Tech in Information Technology</p>
            <p className="text-[var(--espresso)]">Netaji Subhash Engineering College (NSEC) &bull; MAKAUT</p>
            <p className="text-[var(--gold)]">Expected Graduation: 2028 &bull; CGPA: 7.7 / 10</p>
          </div>
        );
        break;

      case 'leadership':
        result = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[var(--gold)] font-bold">BYTE BRIGADE &bull; Co-Founder &amp; Organizer</p>
            <p className="text-[var(--charcoal)]">Established 6 tech wings (AI/ML, Web, App, DSA, Blockchain, Design) with 12+ events.</p>
            <p className="text-[var(--gold)] font-bold mt-2">SOCIAL WINTER OF CODE (SWoC S6)</p>
            <p className="text-[var(--charcoal)]">Project Administrator mentoring open-source contributors.</p>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[var(--gold)]">Email: <a href="mailto:ashim3006@gmail.com" className="underline text-cyan-300">ashim3006@gmail.com</a></p>
            <p className="text-[var(--gold)]">Phone: <a href="tel:+917586020239" className="text-cyan-300 hover:underline">+91 7586020239</a></p>
            <p className="text-[var(--gold)]">LinkedIn: <a href="https://www.linkedin.com/in/rishaankumar" target="_blank" rel="noreferrer" className="underline text-cyan-300">linkedin.com/in/rishaankumar</a></p>
            <p className="text-[var(--gold)]">GitHub: <a href="https://github.com/rishaan007" target="_blank" rel="noreferrer" className="underline text-cyan-300">github.com/rishaan007</a></p>
            <p className="text-[var(--gold)]">X / Twitter: <a href="https://x.com/therishaankumar" target="_blank" rel="noreferrer" className="underline text-cyan-300">@therishaankumar</a></p>
            <p className="text-[var(--gold)]">Instagram: <a href="https://instagram.com/therishaankumar" target="_blank" rel="noreferrer" className="underline text-cyan-300">@therishaankumar</a></p>
            <p className="text-[var(--charcoal)]">Location: Kolkata, West Bengal, India</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        result = (
          <p className="text-red-400 text-xs font-mono">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="text-cyan-300">help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: result }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <div className="w-full rounded-sm border border-[var(--gold)]/40 bg-[#0A0D14] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden font-mono flex flex-col h-[340px] sm:h-[380px]">
      {/* Terminal Titlebar with Neoclassical Brass Keystones */}
      <div className="bg-[#121622] px-4 py-2.5 border-b border-[var(--gold)]/30 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] text-[var(--gold)] font-bold tracking-wider ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>rishaan@perseus-node:~$</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--muted)]">
          <span className="hidden sm:inline">BASH 5.2</span>
          <button
            type="button"
            onClick={() => setHistory([])}
            className="p-1 hover:text-[var(--gold)] transition-colors"
            title="Clear Terminal"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <span className="text-[var(--gold)]">❯</span>
              <span>{h.command}</span>
            </div>
            <div className="pl-3.5 border-l border-[var(--gold)]/20 py-0.5">
              {h.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Chips for Fast Click-Through */}
      <div className="px-3 py-1.5 bg-[#0E121B] border-t border-[var(--gold)]/20 flex flex-wrap gap-1.5 select-none">
        {['projects', 'skills', 'education', 'leadership', 'contact', 'help'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded text-[10px] bg-[#161C28] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0B0D12] transition-colors border border-[var(--gold)]/25"
          >
            +{cmd}
          </button>
        ))}
      </div>

      {/* Terminal Input Line */}
      <div className="p-3 bg-[#080A0E] border-t border-[var(--gold)]/25 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-sm">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'projects', 'skills', 'help'..."
          className="flex-1 bg-transparent text-sm text-[var(--espresso)] font-mono focus:outline-hidden placeholder:text-[var(--muted)]/50"
        />
        <button
          type="button"
          onClick={() => executeCommand(input)}
          className="p-1.5 rounded bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0B0D12] transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
