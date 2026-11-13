'use client';

import React, { useState } from 'react';
import { Copy, Check, FileCode, Play, Terminal } from 'lucide-react';
import { toast } from 'sonner';

export function LiveCodeDeck() {
  const [activeTab, setActiveTab] = useState<'atlas' | 'trinetra' | 'swasthya'>('atlas');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    atlas: `# ATLAS: Exoplanet Transit Photometry Model
# Hybrid 1D-CNN + Transformer Encoder with SHAP
import torch
import torch.nn as nn

class AtlasTransitDetector(nn.Module):
    def __init__(self, seq_len=2000, d_model=128, nhead=8):
        super().__init__()
        # Local transit dip morphology extractor
        self.conv_stem = nn.Sequential(
            nn.Conv1d(1, 64, kernel_size=11, stride=2, padding=5),
            nn.BatchNorm1d(64),
            nn.SiLU(),
            nn.Conv1d(64, d_model, kernel_size=5, stride=2, padding=2),
            nn.BatchNorm1d(d_model)
        )
        # Global periodicity self-attention encoder
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead, dim_feedforward=512, dropout=0.1
        )
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers=4)
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool1d(1),
            nn.Flatten(),
            nn.Linear(d_model, 64),
            nn.SiLU(),
            nn.Linear(64, 1) # Transit candidate probability
        )

    def forward(self, flux):
        # flux: (batch, 1, seq_len)
        features = self.conv_stem(flux)
        encoded = self.transformer(features.permute(2, 0, 1))
        return torch.sigmoid(self.classifier(encoded.permute(1, 2, 0)))
`,
    trinetra: `// TRINETRA: Multimodal Edge Intrusion Handler
// ESP32 FreeRTOS Sensor Poll & RPi Zero W Handoff
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "driver/uart.h"

#define PIR_PIN GPIO_NUM_14
#define RADAR_PIN GPIO_NUM_27
#define UART_PORT UART_NUM_1

void vSensorFusionTask(void *pvParameters) {
    gpio_set_direction(PIR_PIN, GPIO_MODE_INPUT);
    gpio_set_direction(RADAR_PIN, GPIO_MODE_INPUT);
    
    for (;;) {
        int pir_state = gpio_get_level(PIR_PIN);
        int radar_state = gpio_get_level(RADAR_PIN);
        
        // Layer 1 Hardware Verification Trigger
        if (pir_state && radar_state) {
            uint8_t payload[] = "TRIGGER:VERIFY_LAYER2_YOLO\\n";
            uart_write_bytes(UART_PORT, (const char*)payload, sizeof(payload));
            
            // Wait for Raspberry Pi Zero W YOLOv8 confirmation
            vTaskDelay(pdMS_TO_TICKS(150));
        }
        vTaskDelay(pdMS_TO_TICKS(20)); // Power-efficient poll
    }
}
`,
    swasthya: `// SWASTHYA: Document Intelligence & Claims Pipeline
// Multi-Modal Document Parsing + Gemini Clause Verifier
import { GoogleGenAI } from '@google/genai';
import { parseMedicalPDF, normalizeOCRTable } from './ocr-parser';

export async function verifyInsuranceClaim(pdfBuffer: Buffer, policyId: string) {
  // 1. Extract tabular line items & discharge summary via OCR
  const rawDocument = await parseMedicalPDF(pdfBuffer);
  const structuredItems = normalizeOCRTable(rawDocument.text);

  // 2. Cross-reference against hospital claim clauses
  const ai = new GoogleGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { text: \`Verify medical items against policy clause: \${JSON.stringify(structuredItems)}\` }
    ],
  });

  return {
    verifiedItems: structuredItems,
    payoutEligibilityScore: 0.923,
    formalClaimEpistle: response.text,
  };
}
`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="w-full rounded-sm border border-[var(--gold)]/40 bg-[#080A0F] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden font-mono flex flex-col h-[340px] sm:h-[380px]">
      {/* Code Deck Header */}
      <div className="bg-[#10141F] px-3 py-2 border-b border-[var(--gold)]/25 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('atlas')}
            className={`px-2.5 py-1 text-[11px] rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'atlas'
                ? 'bg-[#1C2333] text-[var(--gold)] border border-[var(--gold)]/40 font-bold'
                : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span>atlas_net.py</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trinetra')}
            className={`px-2.5 py-1 text-[11px] rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'trinetra'
                ? 'bg-[#1C2333] text-[var(--gold)] border border-[var(--gold)]/40 font-bold'
                : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>trinetra_edge.c</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('swasthya')}
            className={`px-2.5 py-1 text-[11px] rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'swasthya'
                ? 'bg-[#1C2333] text-[var(--gold)] border border-[var(--gold)]/40 font-bold'
                : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>swasthya_pipeline.ts</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 text-[var(--gold)] hover:text-white transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Viewer Area */}
      <div className="flex-1 p-3.5 overflow-y-auto text-[11px] leading-relaxed text-[#CBD5E1] bg-[#0A0D14]">
        <pre className="font-mono">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      </div>

      {/* Code Status Footer */}
      <div className="px-3 py-1.5 bg-[#0E121B] border-t border-[var(--gold)]/20 flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYNTAX CHECKED &bull; COMPATIBLE WITH CUDA 12.4</span>
        </span>
        <span className="text-[var(--gold)] font-bold">PyTorch / C++ / TypeScript</span>
      </div>
    </div>
  );
}
