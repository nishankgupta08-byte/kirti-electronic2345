import React from 'react';
import { Gavel, CheckCircle, AlertTriangle, Scale, BookOpen } from 'lucide-react';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[100%] bg-emerald-500 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[100%] bg-sky-500 blur-[120px] rounded-full" />
             </div>
             <Gavel className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
             <h1 className="text-4xl font-black text-white tracking-tighter">Usage Directives</h1>
             <p className="text-slate-400 font-mono text-xs uppercase tracking-[0.3em] mt-2">Standard Terms of Network Operation</p>
          </div>

          <div className="p-12 prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <BookOpen className="text-emerald-500" size={24} />
                1. Domain Usage
              </h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing kirt-electronic.com (the "Mainframe"), you acknowledge and agree to comply with these Standard Operating Procedures. This platform is strictly for professional B2B transactions between Kirt Electronic and registered retail entities.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <Scale className="text-emerald-500" size={24} />
                2. Node Responsibilities
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Retailers are responsible for maintaining the confidentiality of their access ciphers. Any activity originating from an authorized network node is the sole legal responsibility of the registered entity associated with that node.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <AlertTriangle className="text-emerald-500" size={24} />
                3. Order Commitment
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Placing an order through the platform constitutes a binding commitment to purchase the specified hardware at the listed rates. Kirt Electronic reserves the right to terminate or suspend node access in cases of payment divergence or protocol violations.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <CheckCircle className="text-emerald-500" size={24} />
                4. Intellectual Property
              </h2>
              <p className="text-slate-600 leading-relaxed">
                All schematics, digital assets, product listings, and interface designs are the exclusive property of Kirt Electronic. Unauthorized extraction or replication of platform data is strictly prohibited under digital property laws.
              </p>
            </section>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-12">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center">
                Governing Jurisdiction: Uttar Pradesh, India | Code 404-LEGAL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
