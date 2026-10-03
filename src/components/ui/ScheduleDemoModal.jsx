import React, { useState } from 'react';
import { X, Building2, Mail, User, Phone, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Factory } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScheduleDemoModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Plant Manager / Operations VP',
    linesCount: '2-4 Lines',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-dark-950 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 bg-dark-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Schedule Enterprise Plant Assessment
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Connect your assembly line to DigitalTwin.ai. Our industrial solutions engineering team will evaluate your station topology, sensor coverage, and deliver a zero-downtime pilot plan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-800 focus:border-cyan-400 text-slate-100 text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@oem-motors.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-800 focus:border-cyan-400 text-slate-100 text-xs font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Company / OEM *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Automotive Group"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-800 focus:border-cyan-400 text-slate-100 text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Assembly Footprint
                  </label>
                  <select
                    value={formData.linesCount}
                    onChange={(e) => setFormData({ ...formData, linesCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-800 focus:border-cyan-400 text-slate-100 text-xs font-mono outline-none"
                  >
                    <option>1 Pilot Line (30-50 Stns)</option>
                    <option>2-4 Lines (Single Plant)</option>
                    <option>5+ Lines (Multi-Site Fleet)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Plant Notes or Sensor Challenges
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Mixed legacy Allen-Bradley PLC-5 and Siemens S7. High bottleneck frequency at Body Framing station."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-800 focus:border-cyan-400 text-slate-100 text-xs font-mono outline-none resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero-disruption guarantee: Non-invasive passive optical tap deployment.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-xs uppercase font-mono tracking-wider shadow-xl shadow-cyan-500/25 transition-all active:scale-95"
              >
                Request Enterprise Plant Pilot &rarr;
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Pilot Assessment Request Received</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our Manufacturing Solutions team has received your plant parameters for <strong>{formData.company}</strong> and will reach out within 2 business hours.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
