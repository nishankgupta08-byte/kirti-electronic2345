import React from 'react';
import { Store, Truck, RotateCcw, CreditCard, ShieldCheck } from 'lucide-react';

const MerchantPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[100%] bg-amber-500 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[100%] bg-sky-500 blur-[120px] rounded-full" />
             </div>
             <Store className="w-16 h-16 text-amber-400 mx-auto mb-6" />
             <h1 className="text-4xl font-black text-white tracking-tighter">Retailer Protocol</h1>
             <p className="text-slate-400 font-mono text-xs uppercase tracking-[0.3em] mt-2">Commercial Engagement Policy</p>
          </div>

          <div className="p-12 prose prose-slate max-w-none">
            <p className="text-slate-500 leading-relaxed font-medium mb-10 text-center italic">
              This policy outlines the operational standards for all retail nodes within the Kirt Electronic distribution network.
            </p>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <ShieldCheck className="text-amber-500" size={24} />
                1. Node Verification
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Network access is granted only after a thorough verification of business credentials. Kirt Electronic maintains a manual approval sequence to ensure only authorized hardware vendors can access wholesale hardware pricing.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <CreditCard className="text-amber-500" size={24} />
                2. Transaction Matrix
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Wholesale pricing is exclusive to registered retailers. Payments must be settled through authorized channels within the specified credit windows assigned to your node. Late settlement may result in temporary quarantine of network ordering capabilities.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <Truck className="text-amber-500" size={24} />
                3. Deployment & Logistics
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Kirt Electronic handles hardware deployment through proprietary logistic partners. Delivery windows are estimates based on stock synchronization. Retailers are responsible for verifying hardware integrity upon receipt at their node.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight mb-6">
                <RotateCcw className="text-amber-500" size={24} />
                4. Exchange Protocols
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Hardware returns are only accepted in cases of manufacturer-level divergence (defects). All return requests must be initialized through the administrative dashboard within 48 hours of delivery. Hardware must remain in original synchronization (unopened packaging) for exchange eligibility.
              </p>
            </section>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-12">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center">
                Contact Technical Liaison: support@kirtelectronic.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantPolicy;
