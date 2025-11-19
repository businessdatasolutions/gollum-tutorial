
import React, { useState, useEffect } from 'react';
import { 
  User, AlertCircle, CheckCircle2, Truck, MapPin, FileText, 
  Search, TrendingUp, Newspaper, GraduationCap, Clock, 
  Calendar, AlertTriangle, Anchor, Hammer, Building, XCircle
} from 'lucide-react';
import { TutorialStep } from '../types';

// --- HEALTHCARE: Staff Scheduling ---
const HealthcareViz = () => {
  const [phase, setPhase] = useState(0); // 0: Chaos, 1: Solving, 2: Solved
  
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nurses = [
    { id: 1, name: "Nurse A", skill: "ICU", pref: "No Nights" },
    { id: 2, name: "Nurse B", skill: "Pediatrics", pref: "Mornings" },
    { id: 3, name: "Nurse C", skill: "General", pref: "Any" },
  ];

  const shifts = [
    { id: 1, type: "Night Shift (ICU)", req: "ICU" },
    { id: 2, type: "Morning (Ped)", req: "Pediatrics" },
    { id: 3, type: "Afternoon", req: "General" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full relative overflow-hidden">
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="font-bold text-slate-800">Intelligent Staff Allocation</h3>
        <span className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
            phase === 0 ? 'bg-red-100 text-red-700' :
            phase === 1 ? 'bg-amber-100 text-amber-700' :
            'bg-emerald-100 text-emerald-700'
        }`}>
          {phase === 0 ? "⚠ Manual Scheduling (Conflicts)" : phase === 1 ? "⚙ Optimization..." : "✔ Optimized Schedule"}
        </span>
      </div>
      
      <div className="flex justify-between gap-8 relative z-10">
        {/* Left Column: Nurses */}
        <div className="flex flex-col gap-8 w-1/3 py-4">
          {nurses.map(n => (
            <div key={n.id} className="relative z-10 bg-white p-2 rounded border border-slate-200 shadow-sm flex items-center gap-2">
              <User size={16} className="text-slate-400"/>
              <div className="text-xs">
                  <div className="font-bold">{n.name}</div>
                  <div className="text-[10px] text-slate-500">{n.pref}</div>
              </div>
              {/* Anchor Point Right */}
              <div className="absolute -right-1 top-1/2 w-2 h-2 bg-slate-300 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            </div>
          ))}
        </div>

        {/* SVG Connector Layer */}
        <div className="absolute inset-0 pointer-events-none">
             {/* Using viewBox 0-100 allows us to use relative units that scale with the container */}
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 {/* CHAOS PHASE: Bad connections */}
                 {phase === 0 && (
                     <>
                        {/* Nurse A (1) -> Night Shift (1) - Conflict */}
                        <path d="M 33 20 C 50 20, 50 20, 67 20" stroke="#ef4444" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <circle cx="50" cy="20" r="1.5" fill="#ef4444" className="animate-pulse" vectorEffect="non-scaling-stroke" />

                        {/* Nurse B (2) -> Afternoon (3) - Mismatch */}
                        <path d="M 33 50 C 50 50, 50 80, 67 80" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="4" vectorEffect="non-scaling-stroke" />
                        
                        {/* Nurse C (3) -> Morning (2) */}
                        <path d="M 33 80 C 50 80, 50 50, 67 50" stroke="#cbd5e1" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                     </>
                 )}

                 {/* SOLVED PHASE: Good connections */}
                 {phase === 2 && (
                     <>
                        {/* Nurse A -> Afternoon (3) */}
                        <path d="M 33 20 C 50 20, 50 80, 67 80" stroke="#10b981" strokeWidth="3" fill="none" className="transition-all duration-1000" vectorEffect="non-scaling-stroke"/>
                        
                        {/* Nurse B -> Morning (2) */}
                        <path d="M 33 50 C 50 50, 50 50, 67 50" stroke="#10b981" strokeWidth="3" fill="none" className="transition-all duration-1000" vectorEffect="non-scaling-stroke"/>

                        {/* Nurse C -> Night (1) */}
                        <path d="M 33 80 C 50 80, 50 20, 67 20" stroke="#10b981" strokeWidth="3" fill="none" className="transition-all duration-1000" vectorEffect="non-scaling-stroke"/>
                     </>
                 )}
             </svg>
        </div>

        {/* Right Column: Shifts */}
        <div className="flex flex-col gap-8 w-1/3 py-4 items-end text-right ml-auto">
          {shifts.map(s => (
            <div key={s.id} className="relative z-10 bg-white p-2 rounded border border-slate-200 shadow-sm w-full">
               {/* Anchor Point Left */}
              <div className="absolute -left-1 top-1/2 w-2 h-2 bg-slate-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="text-xs font-bold">{s.type}</div>
              <div className="text-[10px] text-slate-500">{s.req}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TRANSPORT: Dynamic Routing ---
const TransportViz = () => {
  const [phase, setPhase] = useState(0); // 0: Congestion, 1: Search, 2: Optimized
  
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full overflow-hidden">
       <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Constraint-Aware Routing</h3>
        <span className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
             phase === 0 ? 'bg-red-100 text-red-700' : phase === 1 ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {phase === 0 ? "Traffic Jam Detected" : phase === 1 ? "Simulating 1000+ Routes" : "Optimal Path Found"}
        </span>
      </div>
      
      <div className="relative w-full h-48 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Obstacle/Jam */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-12 flex items-center justify-center z-10">
             <div className={`bg-red-500/20 rounded-full w-full h-full flex items-center justify-center animate-pulse ${phase === 2 ? 'opacity-30' : 'opacity-100'}`}>
                 <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    <AlertTriangle size={10}/> CONGESTION
                 </div>
             </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
            {/* Points (Moved inside SVG for perfect alignment) */}
            {/* Start Point (Blue) */}
            <circle cx="30" cy="100" r="12" fill="#3b82f6" fillOpacity="0.2" />
            <circle cx="30" cy="100" r="5" fill="#3b82f6" />
            
            {/* End Point (Green) */}
            <circle cx="470" cy="100" r="12" fill="#10b981" fillOpacity="0.2" />
            <circle cx="470" cy="100" r="5" fill="#10b981" />

            {/* Phase 0: Blocked Direct Route */}
            {phase === 0 && (
                <path d="M 30 100 L 470 100" stroke="#ef4444" strokeWidth="4" strokeOpacity="0.5" strokeDasharray="4" />
            )}

            {/* Phase 1: Search Space (Ghost Routes) */}
            {phase === 1 && (
                <>
                    <path d="M 30 100 C 100 100, 100 20, 250 20 S 400 100, 470 100" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.4" />
                    <path d="M 30 100 C 100 100, 100 180, 250 180 S 400 100, 470 100" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.4" />
                    <path d="M 30 100 C 150 50, 300 50, 470 100" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M 30 100 C 150 150, 300 150, 470 100" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M 30 100 L 150 100" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
                </>
            )}
            
            {/* Phase 2: Optimal Path */}
            {phase === 2 && (
                <path 
                    d="M 30 100 C 100 100, 100 30, 250 30 S 400 100, 470 100"
                    stroke="#10b981" 
                    strokeWidth="3" 
                    fill="none"
                    className="animate-draw"
                />
            )}

             {/* Truck */}
             {phase === 2 && (
                <circle r="4" fill="white">
                    <animateMotion 
                        dur="2s" 
                        repeatCount="indefinite"
                        path="M 30 100 C 100 100, 100 30, 250 30 S 400 100, 470 100"
                    />
                </circle>
             )}
        </svg>
      </div>
    </div>
  );
};

// --- ACCOUNTANCY: Audit Scanning ---
const AccountancyViz = () => {
  const [phase, setPhase] = useState(0); // 0: Data Overload, 1: Scanning, 2: Isolated
  
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Generate grid of items
  const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      isRisk: i === 14 // Specific item is risky
  }));

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Audit Risk Sampling</h3>
        <span className={`text-xs font-mono px-2 py-1 rounded ${phase === 0 ? 'bg-slate-200' : 'bg-indigo-100 text-indigo-700'}`}>
            {phase === 0 ? "Processing 50k Transactions..." : phase === 1 ? "LLM Semantic Analysis..." : "Risk Anomaly Detected"}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 relative">
        {items.map((item) => (
            <div 
                key={item.id}
                className={`
                    h-8 rounded transition-all duration-500 flex items-center justify-center
                    ${phase === 0 ? 'bg-slate-100 animate-pulse' : ''}
                    ${phase === 1 && !item.isRisk ? 'bg-slate-50 opacity-50' : ''}
                    ${phase === 1 && item.isRisk ? 'bg-red-100 ring-2 ring-red-400 scale-110 z-10' : ''}
                    ${phase === 2 && !item.isRisk ? 'bg-slate-50 opacity-20 blur-[1px]' : ''}
                    ${phase === 2 && item.isRisk ? 'bg-red-500 text-white shadow-lg scale-125 z-20' : ''}
                `}
            >
                {phase === 0 && (
                    <div className="w-4 h-1 bg-slate-300 rounded"></div>
                )}
                {(phase === 1 || phase === 2) && item.isRisk && (
                    <AlertCircle size={14} />
                )}
                 {(phase === 1 || phase === 2) && !item.isRisk && (
                    <div className="w-4 h-1 bg-slate-200 rounded"></div>
                )}
            </div>
        ))}
        
        {/* Phase 0 Chaos Overlay */}
        {phase === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-4xl font-black text-slate-900/5 animate-ping">DATA</div>
            </div>
        )}
      </div>

      <div className="mt-4 h-8 flex items-center justify-center">
          {phase === 2 && (
              <div className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-4 py-1 rounded-full">
                  <FileText size={16}/> "Shell Co. Consulting" flagged as High Risk
              </div>
          )}
      </div>
    </div>
  );
};

// --- ENGINEERING: Project Schedule ---
const EngineeringViz = () => {
  const [phase, setPhase] = useState(0); // 0: Normal, 1: Delay/Conflict, 2: Optimized
  
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full">
       <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Adaptive Scheduling</h3>
        <span className={`text-xs font-mono px-2 py-1 rounded ${phase === 1 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
            {phase === 0 ? "Plan: Standard" : phase === 1 ? "⚠ WEATHER DELAY: CONFLICT" : "✔ Schedule Re-optimized"}
        </span>
      </div>

      <div className="relative h-32 w-full bg-slate-50 rounded-lg border border-slate-100 p-4 overflow-hidden">
          {/* Time markers */}
          <div className="absolute top-0 bottom-0 left-[20%] w-px bg-slate-200 border-r border-dashed"></div>
          <div className="absolute top-0 bottom-0 left-[50%] w-px bg-slate-200 border-r border-dashed"></div>
          <div className="absolute top-0 bottom-0 left-[80%] w-px bg-slate-200 border-r border-dashed"></div>

          {/* Task 1: Foundation */}
          <div 
            className={`absolute top-4 h-6 bg-blue-500 rounded shadow-sm flex items-center px-2 text-[10px] text-white font-bold transition-all duration-700 ease-in-out
                ${phase === 0 ? 'w-[30%]' : 'w-[50%] bg-amber-500'}
            `}
          >
              Foundation {phase > 0 && "(Delayed)"}
          </div>

          {/* Task 2: Framing */}
          <div 
             className={`absolute top-14 h-6 rounded shadow-sm flex items-center px-2 text-[10px] text-white font-bold transition-all duration-700 ease-in-out
                ${phase === 0 ? 'left-[32%] w-[30%] bg-indigo-500' : phase === 1 ? 'left-[32%] w-[30%] bg-red-500 animate-shake' : 'left-[52%] w-[30%] bg-indigo-500'}
             `}
          >
              Framing
          </div>

          {/* Task 3: Roof */}
          <div 
             className={`absolute top-24 h-6 rounded shadow-sm flex items-center px-2 text-[10px] text-white font-bold transition-all duration-700 ease-in-out
                ${phase === 0 ? 'left-[64%] w-[20%] bg-purple-500' : phase === 1 ? 'left-[64%] w-[20%] bg-red-500 animate-shake' : 'left-[84%] w-[15%] bg-purple-500'}
             `}
          >
              Roof
          </div>
      </div>
      <style>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// --- TRADING: Sentiment Analysis ---
const TradingViz = () => {
  const scenarios = [
    {
      id: 1,
      headline: "TechCorp releases breakthrough AI model, beating benchmarks by 40%.",
      source: "TechWire",
      sentiment: 85,
      confidence: 94,
      action: "BUY",
      type: "positive"
    },
    {
      id: 2,
      headline: "Supply chain disruptions delay shipment of new processor units indefinitely.",
      source: "Global Logistics",
      sentiment: -78,
      confidence: 89,
      action: "SELL",
      type: "negative"
    },
    {
      id: 3,
      headline: "CEO refuses to comment on acquisition rumors during press conference.",
      source: "MarketWatch",
      sentiment: 12,
      confidence: 45,
      action: "HOLD",
      type: "neutral"
    }
  ];

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0); // 0: Idle, 1: News, 2: Analyze, 3: Execute

  useEffect(() => {
    let mounted = true;
    const runSequence = async () => {
        if(!mounted) return;
        
        // Step 0: Idle (short)
        setStep(0);
        await new Promise(r => setTimeout(r, 1000));
        if(!mounted) return;

        // Step 1: News Drops
        setStep(1);
        await new Promise(r => setTimeout(r, 2000));
        if(!mounted) return;

        // Step 2: Analyzing
        setStep(2);
        await new Promise(r => setTimeout(r, 2000));
        if(!mounted) return;

        // Step 3: Execution signal
        setStep(3);
        await new Promise(r => setTimeout(r, 4000));
        if(!mounted) return;

        // Next scenario
        setScenarioIndex(prev => (prev + 1) % scenarios.length);
    };

    runSequence();
    return () => { mounted = false; };
  }, [scenarioIndex]);

  const current = scenarios[scenarioIndex];

  const getActionColor = (action: string) => {
      switch(action) {
          case "BUY": return "text-emerald-600 bg-emerald-100 border-emerald-200";
          case "SELL": return "text-red-600 bg-red-100 border-red-200";
          default: return "text-amber-600 bg-amber-100 border-amber-200";
      }
  };

  return (
     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full flex flex-col gap-4">
       <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${step === 0 ? 'bg-slate-300' : 'bg-indigo-500 animate-pulse'}`}></div>
             <h3 className="font-bold text-slate-800">Sentiment Signal Extraction</h3>
        </div>
        <div className="flex items-center gap-2">
             <span className="text-[10px] font-mono text-slate-400 uppercase">
                Status: {step === 0 ? "Scanning..." : step === 1 ? "Ingesting" : step === 2 ? "Processing" : "Executing"}
             </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
          {/* Left: News Terminal */}
          <div className="flex-1 flex flex-col gap-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">News Feed</div>
              <div className="bg-slate-900 rounded-lg p-3 h-24 flex items-center justify-center relative overflow-hidden border border-slate-800">
                  {step >= 1 ? (
                      <div className="relative z-10 animate-fadeIn w-full">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[9px] bg-slate-700 text-slate-300 px-1 rounded font-mono">{current.source}</span>
                             <span className="text-[9px] text-slate-500 font-mono">LIVE</span>
                          </div>
                          <p className="text-xs font-mono text-green-400 leading-relaxed">
                              &gt; {current.headline}
                          </p>
                      </div>
                  ) : (
                      <div className="text-slate-600 text-xs font-mono animate-pulse">_ Waiting for wire...</div>
                  )}
                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full pointer-events-none animate-[scan_2s_linear_infinite]"></div>
              </div>
          </div>

          {/* Right: Analysis Dashboard */}
          <div className="flex-1 flex flex-col gap-2">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LLM Analysis</div>
               <div className="bg-slate-50 rounded-lg border border-slate-100 p-3 h-24 flex flex-col justify-between relative">
                    {/* Sentiment Bar */}
                    <div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                            <span>SENTIMENT SCORE</span>
                            <span>{step >= 2 ? (current.sentiment > 0 ? `+${current.sentiment}` : current.sentiment) : "0"}</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden relative">
                             <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400 z-10"></div>
                             <div 
                                className={`h-full transition-all duration-1000 ease-out ${current.sentiment > 0 ? 'bg-emerald-500' : current.sentiment < 0 ? 'bg-red-500' : 'bg-amber-500'}`}
                                style={{ 
                                    width: step >= 2 ? `${Math.abs(current.sentiment)}%` : '0%',
                                    marginLeft: step >= 2 && current.sentiment < 0 ? `${50 - Math.abs(current.sentiment)}%` : '50%'
                                }}
                             ></div>
                        </div>
                    </div>

                    {/* Decision Badge */}
                    <div className="flex items-center justify-between">
                         <div className="text-[10px] text-slate-400 font-bold">DECISION</div>
                         <div className={`px-3 py-1 rounded text-xs font-black border ${step >= 3 ? getActionColor(current.action) : 'bg-slate-100 text-slate-300 border-slate-200'}`}>
                             {step >= 3 ? current.action : "ANALYZING"}
                         </div>
                    </div>
               </div>
          </div>
      </div>

      {/* Bottom: Chart Visual */}
      <div className="h-32 bg-slate-50 rounded-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-4">
                 {Array.from({length: 48}).map((_, i) => (
                     <div key={i} className="border-r border-b border-slate-100"></div>
                 ))}
            </div>
            
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                {/* Historical Line (Static Context) */}
                <path 
                    d="M 0,50 L 15,45 L 30,55 L 45,48 L 60,52 L 75,49 L 90,54 L 105,45 L 120,55 L 135,50 L 150,50"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                
                {/* Reactive Line */}
                <path 
                    d={step >= 3 
                        ? (current.action === "BUY" 
                            ? "M 150,50 C 180,50 200,20 300,10" // Up
                            : current.action === "SELL" 
                            ? "M 150,50 C 180,50 200,80 300,90" // Down
                            : "M 150,50 C 180,50 240,50 300,50" // Flat
                          )
                        : "M 150,50 L 165,50" // Waiting
                    }
                    fill="none"
                    stroke={step >= 3 
                        ? (current.action === "BUY" ? "#10b981" : current.action === "SELL" ? "#ef4444" : "#f59e0b") 
                        : "#cbd5e1"
                    }
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    strokeDasharray={step >= 3 ? "0" : "4"}
                />
            </svg>
      </div>
    </div>
  );
};

// --- EDUCATION: Timetabling ---
const EducationViz = () => {
    const [phase, setPhase] = useState(0); // 0: Conflicts, 1: Solving, 2: Optimized

    useEffect(() => {
        const timer = setInterval(() => setPhase(p => (p + 1) % 3), 3000);
        return () => clearInterval(timer);
    }, []);

    return (
     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full">
       <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Curriculum Optimization</h3>
        <span className={`text-xs font-mono px-2 py-1 rounded ${phase === 0 ? 'bg-red-100 text-red-600' : phase === 1 ? 'bg-slate-100' : 'bg-emerald-100 text-emerald-700'}`}>
            {phase === 0 ? "⚠ 2 Double-Bookings" : phase === 1 ? "Resolving..." : "✔ Conflict Free"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 grid grid-cols-3 gap-2 text-xs font-bold text-slate-400 text-center mb-1">
                <div>MON 9AM</div><div>MON 10AM</div><div>MON 11AM</div>
            </div>

            {/* Slot 1 */}
            <div className="h-12 bg-white border border-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm">Math</div>
            
            {/* Slot 2 (Conflict Slot) */}
            <div className={`h-12 border rounded flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-500 overflow-hidden relative
                ${phase === 0 ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-slate-200 text-slate-700'}
            `}>
                {phase === 0 ? (
                    <>
                        <span className="animate-pulse">Physics</span>
                        <div className="w-full h-px bg-red-300 my-0.5"></div>
                        <span className="animate-pulse">History</span>
                    </>
                ) : (
                   "Physics"
                )}
                {phase === 0 && <XCircle size={12} className="absolute top-0 right-0 text-red-500"/>}
            </div>

            {/* Slot 3 */}
            <div className="h-12 bg-white border border-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm">Art</div>

            {/* Row 2 */}
             {/* Slot 4 (Conflict Slot) */}
             <div className={`h-12 border rounded flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-500 overflow-hidden relative
                ${phase === 0 ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-slate-200 text-slate-700'}
            `}>
                {phase === 0 ? (
                    <>
                        <span>Bio</span>
                        <div className="w-full h-px bg-red-300 my-0.5"></div>
                        <span>Chem</span>
                    </>
                ) : (
                   "Chemistry"
                )}
            </div>

            {/* Slot 5 */}
             <div className={`h-12 border rounded flex items-center justify-center text-xs font-bold transition-all duration-500
                ${phase === 0 ? 'bg-slate-50 border-dashed text-slate-400' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}
            `}>
                {phase === 0 ? "Empty" : <span className="text-emerald-600">History</span>}
            </div>

             {/* Slot 6 */}
             <div className={`h-12 border rounded flex items-center justify-center text-xs font-bold transition-all duration-500
                ${phase === 0 ? 'bg-slate-50 border-dashed text-slate-400' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}
            `}>
                {phase === 0 ? "Empty" : <span className="text-emerald-600">Biology</span>}
            </div>
      </div>
    </div>
    );
}

export const SectorVisualizations = ({ step }: { step: string }) => {
  switch (step) {
    case TutorialStep.SECTOR_HEALTH: return <HealthcareViz />;
    case TutorialStep.SECTOR_TRANSPORT: return <TransportViz />;
    case TutorialStep.SECTOR_ACCOUNTANCY: return <AccountancyViz />;
    case TutorialStep.SECTOR_ENGINEERING: return <EngineeringViz />;
    case TutorialStep.SECTOR_TRADING: return <TradingViz />;
    case TutorialStep.SECTOR_EDUCATION: return <EducationViz />;
    default: return null;
  }
};