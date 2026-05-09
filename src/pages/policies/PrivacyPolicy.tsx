import React from 'react';
import { Shield, Lock, Eye, FileText, Bell } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[100%] bg-sky-500 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[100%] bg-indigo-500 blur-[120px] rounded-full" />
             </div>
             <Shield className="w-16 h-16 text-sky-400 mx-auto mb-6" />
             <h1 className="text-4xl font-black text-white tracking-tighter">Privacy Protocol</h1>
             <p className="text-slate-400 font-mono text-xs uppercase tracking-[0.3em] mt-2">Data Protection Tier 1 Enforcement</p>
          </div>

          <div className="p-12 prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <Eye className="text-sky-500" size={24} />
                1. Data Acquisition
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Kirt Electronic ("we", "our", or "us") operates as a B2B platform. We collect specific telemetry data from our registered retailers, including business identifiers, communication protocols, and operational addresses necessary for supply chain fulfillment.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <Lock className="text-sky-500" size={24} />
                2. Encryption & Security
              </h2>
              <p className="text-slate-600 leading-relaxed">
                All data transmitted through our mainframe is encrypted using industry-standard SSL/TLS protocols. We utilize Firebase's advanced infrastructure to ensure that administrative and retailer data remains isolated and protected from unauthorized injection or extraction.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <FileText className="text-sky-500" size={24} />
                3. Information Utilization
              </h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2 font-medium"><span className="text-sky-500">▶</span> Processing hardware procurement orders.</li>
                <li className="flex gap-2 font-medium"><span className="text-sky-500">▶</span> Verifying retailer network node authenticity.</li>
                <li className="flex gap-2 font-medium"><span className="text-sky-500">▶</span> Coordinating logistics for inventory distribution.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <Bell className="text-sky-500" size={24} />
                4. Communication Protocols
              </h2>
              <p className="text-slate-600 leading-relaxed">
                By registering on our platform, retailers agree to receive critical operational updates via assigned communication channels (Email/SMS) regarding order confirmation, shipment tracking, and administrative clearance.
              </p>
            </section>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-12">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center">
                Last Revision Alpha: May 2024 | Version 2.0.4 - Enterprise Edition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
