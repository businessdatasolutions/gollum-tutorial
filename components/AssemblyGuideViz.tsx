import React from 'react';
import { TutorialStep } from '../types';
import { Database, Binary, ScanEye } from 'lucide-react';

interface Props {
  step: TutorialStep;
}

const AssemblyGuideViz: React.FC<Props> = ({ step }) => {
  
  // Common SVG styles for technical manual look
  const strokeColor = "#000000";
  const strokeWidth = "2.5";
  const strokeLinecap = "round";
  const strokeLinejoin = "round";
  const fontStyle = { fontFamily: "monospace", fontWeight: "bold" };
  
  const pathProps = {
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeLinecap: strokeLinecap as "round",
    strokeLinejoin: strokeLinejoin as "round",
    fill: "none"
  };

  // Generic "Builder Figure" component
  const AssemblyFigure = ({ x, y, scale = 1, pose = "neutral", mirror = false }: { x: number, y: number, scale?: number, pose?: "neutral" | "inspecting" | "connecting" | "presenting" | "blocking", mirror?: boolean }) => (
    <g transform={`translate(${x}, ${y}) scale(${mirror ? -scale : scale}, ${scale})`}>
      {/* Head */}
      <circle cx="0" cy="-25" r="12" {...pathProps} strokeWidth="2.5" />
      
      {/* Body */}
      <path d="M -10,-10 L -10,20 C -10,30 10,30 10,20 L 10,-10" {...pathProps} />
      
      {/* Poses */}
      {pose === "neutral" && (
        <>
          <path d="M -10,0 L -20,20" {...pathProps} /> {/* Left Arm */}
          <path d="M 10,0 L 20,20" {...pathProps} />  {/* Right Arm */}
        </>
      )}

      {pose === "inspecting" && ( // Holding something up to look at
        <>
           <path d="M -10,0 L -25,-10" {...pathProps} /> {/* Left Arm Up */}
           <path d="M 10,0 L 20,20" {...pathProps} />   {/* Right Arm Down */}
           {/* Magnifying glass handle implication */}
           <line x1="-25" y1="-10" x2="-30" y2="-15" {...pathProps} strokeWidth="2" />
        </>
      )}

      {pose === "connecting" && ( // Reaching out forward/up
        <>
           <path d="M -10,0 L -25,5" {...pathProps} /> 
           <path d="M 10,0 L 30,-10" {...pathProps} /> {/* Reaching arm */}
        </>
      )}

      {pose === "presenting" && ( // Arms wide
        <>
           <path d="M -10,0 L -25,10" {...pathProps} /> 
           <path d="M 10,0 L 25,10" {...pathProps} /> 
        </>
      )}
      
      {pose === "blocking" && ( // Arms out to stop/check
        <>
           <path d="M -10,0 L -30,0" {...pathProps} /> 
           <path d="M 10,0 L 30,0" {...pathProps} /> 
        </>
      )}

      {/* Legs */}
      <path d="M -6,30 L -6,55" {...pathProps} /> 
      <path d="M 6,30 L 6,55" {...pathProps} /> 
    </g>
  );

  return (
    <div className="w-full bg-white p-8 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Visual Panel */}
        <div className="border-2 border-slate-900 p-6 min-h-[320px] flex items-center justify-center bg-slate-50 relative overflow-hidden select-none">
            {/* Step Number */}
            <div className="absolute top-4 left-4 w-10 h-10 border-2 border-slate-900 rounded-full flex items-center justify-center text-2xl font-black text-slate-900 bg-white z-10">
                {step === TutorialStep.BUILD_PREP && "1"}
                {step === TutorialStep.BUILD_DATA && "2"}
                {step === TutorialStep.BUILD_CODE && "3"}
                {step === TutorialStep.BUILD_DEPLOY && "4"}
            </div>

            <svg viewBox="0 0 400 300" className="w-full h-full max-w-md">
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#000" />
                    </marker>
                </defs>

                {/* --- SCENE 1: GATHER PARTS --- */}
                {step === TutorialStep.BUILD_PREP && (
                    <>
                        {/* Title */}
                        <text x="200" y="40" textAnchor="middle" fontSize="12" {...fontStyle}>PART LIST: LOCAL/OPEN</text>

                        {/* 1. Transformers Box */}
                        <g transform="translate(50, 100)">
                            <rect x="0" y="0" width="60" height="60" rx="4" {...pathProps} />
                            {/* Transformer Icon */}
                            <path d="M 15,30 L 30,15 L 45,30 L 30,45 Z" fill="none" stroke="black" strokeWidth="2" />
                            <text x="30" y="85" textAnchor="middle" fontSize="10" {...fontStyle}>HF/LOCAL</text>
                        </g>

                        {/* 2. BoTorch/GP Cylinder */}
                        <g transform="translate(135, 100)">
                            <path d="M 0,10 C 0,0 60,0 60,10 L 60,50 C 60,60 0,60 0,50 Z" {...pathProps} />
                            <path d="M 0,10 C 0,20 60,20 60,10" {...pathProps} strokeWidth="1.5" />
                            <path d="M 10,40 Q 30,20 50,40" stroke="black" strokeWidth="1.5" fill="none" />
                            <text x="30" y="85" textAnchor="middle" fontSize="10" {...fontStyle}>BOTORCH</text>
                        </g>

                        {/* 3. LoRA Chip */}
                        <g transform="translate(220, 115)">
                            <rect x="0" y="0" width="40" height="30" {...pathProps} />
                            <line x1="5" y1="30" x2="5" y2="35" {...pathProps} strokeWidth="2"/>
                            <line x1="15" y1="30" x2="15" y2="35" {...pathProps} strokeWidth="2"/>
                            <line x1="25" y1="30" x2="25" y2="35" {...pathProps} strokeWidth="2"/>
                            <line x1="35" y1="30" x2="35" y2="35" {...pathProps} strokeWidth="2"/>
                            <text x="20" y="60" textAnchor="middle" fontSize="10" {...fontStyle}>PEFT</text>
                            <text x="20" y="70" textAnchor="middle" fontSize="10" {...fontStyle}>(LoRA)</text>
                        </g>
                        
                        {/* 4. Python Tool */}
                        <g transform="translate(290, 100)">
                             <path d="M 10,0 C 0,0 0,20 10,20 L 30,20 L 30,10 L 15,10" {...pathProps} strokeWidth="2" />
                             <path d="M 30,40 C 40,40 40,20 30,20 L 10,20 L 10,30 L 25,30" {...pathProps} strokeWidth="2" />
                             <circle cx="15" cy="5" r="2" fill="black" />
                             <circle cx="25" cy="35" r="2" fill="black" />
                             <text x="20" y="85" textAnchor="middle" fontSize="10" {...fontStyle}>PYTHON</text>
                        </g>

                        {/* Figure */}
                        <AssemblyFigure x={200} y={220} scale={1.3} pose="presenting" />
                        <text x="200" y="290" textAnchor="middle" fontSize="10" {...fontStyle} fill="#64748b">(NO API KEYS REQUIRED)</text>
                    </>
                )}

                 {/* --- SCENE 2: DATA PREP (NURSES) --- */}
                 {step === TutorialStep.BUILD_DATA && (
                    <>
                         <text x="200" y="30" textAnchor="middle" fontSize="12" {...fontStyle}>DATA EXTRACTION & SCORING</text>

                         {/* Left: Sources */}
                         <g transform="translate(50, 100)">
                             <rect x="0" y="0" width="50" height="60" rx="2" {...pathProps} />
                             <line x1="10" y1="15" x2="40" y2="15" stroke="black" strokeWidth="2"/>
                             <line x1="10" y1="30" x2="40" y2="30" stroke="black" strokeWidth="2"/>
                             <line x1="10" y1="45" x2="40" y2="45" stroke="black" strokeWidth="2"/>
                             <text x="25" y="-10" textAnchor="middle" fontSize="10" {...fontStyle}>SOURCE</text>
                             <text x="25" y="75" textAnchor="middle" fontSize="9" fill="#64748b">Workday</text>
                             <text x="25" y="85" textAnchor="middle" fontSize="9" fill="#64748b">ShiftLogs</text>
                         </g>

                         {/* Arrow Right */}
                         <path d="M 110,130 L 140,130" {...pathProps} markerEnd="url(#arrow)" />

                         {/* Center: The CSV Document (Main Focus) */}
                         <g transform="translate(150, 70)">
                             <rect x="0" y="0" width="140" height="140" fill="white" stroke="black" strokeWidth="2" rx="2" />
                             <path d="M 0,30 L 140,30" stroke="black" strokeWidth="2" />
                             
                             {/* Header */}
                             <rect x="5" y="5" width="130" height="20" fill="#f1f5f9" rx="2" />
                             <text x="10" y="18" fontSize="9" fontFamily="monospace" fontWeight="bold">nurse_data.csv</text>

                             {/* Content Rows */}
                             <g transform="translate(10, 50)" fontSize="7" fontFamily="monospace">
                                 <text x="0" y="0" fill="#94a3b8">INPUT</text>
                                 <text x="100" y="0" fill="#94a3b8">SCORE</text>
                                 
                                 <text x="0" y="15">Nurse A {'->'} Night</text>
                                 <text x="105" y="15" fill="#16a34a" fontWeight="bold">0.98</text>
                                 <line x1="0" y1="22" x2="120" y2="22" stroke="#e2e8f0" strokeWidth="1" />

                                 <text x="0" y="35">Nurse B {'->'} Night</text>
                                 <text x="105" y="35" fill="#dc2626" fontWeight="bold">0.12</text>
                                 <line x1="0" y1="42" x2="120" y2="42" stroke="#e2e8f0" strokeWidth="1" />
                                 
                                 <text x="0" y="55">Nurse C {'->'} Day</text>
                                 <text x="105" y="55" fill="#d97706" fontWeight="bold">0.75</text>
                             </g>
                         </g>

                         {/* Figure Inspecting */}
                         <AssemblyFigure x={340} y={140} scale={1.2} pose="inspecting" mirror={true} />
                         <text x="340" y="230" textAnchor="middle" fontSize="10" {...fontStyle} fill="#64748b">MAP CONTEXT TO Y</text>
                    </>
                 )}


                {/* --- SCENE 3: DEEP KERNEL ARCHITECTURE --- */}
                {step === TutorialStep.BUILD_CODE && (
                    <>
                        <text x="200" y="30" textAnchor="middle" fontSize="12" {...fontStyle}>ARCH: DEEP KERNEL</text>

                        {/* LLM Block (Left) */}
                        <g transform="translate(50, 100)">
                             <rect x="0" y="0" width="80" height="100" rx="4" {...pathProps} />
                             <text x="40" y="55" textAnchor="middle" fontSize="14" fontWeight="bold">LLM</text>
                             {/* LoRA Module attached on the right side */}
                             <rect x="70" y="20" width="30" height="40" rx="2" {...pathProps} fill="white" strokeWidth="2" />
                             <text x="85" y="45" textAnchor="middle" fontSize="8" fontWeight="bold">LoRA</text>
                        </g>

                        {/* Arrow: Embeddings (Spanning the gap) */}
                        <g transform="translate(160, 150)">
                             <line x1="0" y1="0" x2="90" y2="0" {...pathProps} markerEnd="url(#arrow)" />
                             <text x="45" y="-10" textAnchor="middle" fontSize="9" {...fontStyle}>VECTOR</text>
                        </g>

                        {/* GP Block (Right) */}
                        <g transform="translate(260, 100)">
                             <rect x="0" y="0" width="80" height="100" rx="4" {...pathProps} />
                             {/* Curve */}
                             <path d="M 10,70 C 30,30 50,30 70,70" stroke="black" strokeWidth="2" fill="none" />
                             <text x="40" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">GP</text>
                        </g>
                        
                        {/* Backprop Arrow (Looping back) */}
                        {/* Start from GP bottom (300, 200) -> Down -> Left -> Up -> LLM Bottom (90, 200) */}
                        <path d="M 300,200 L 300,240 L 90,240 L 90,200" {...pathProps} strokeDasharray="4,4" markerEnd="url(#arrow)" />
                        <text x="195" y="255" textAnchor="middle" fontSize="10" {...fontStyle}>MARGINAL LIKELIHOOD GRADIENTS</text>

                        {/* Figure connecting the pieces (Above the arrow) */}
                        <AssemblyFigure x={195} y={90} scale={1} pose="connecting" />
                    </>
                )}

                {/* --- SCENE 4: DIAMOND FLOW --- */}
                {step === TutorialStep.BUILD_DEPLOY && (
                    <>
                        <text x="200" y="30" textAnchor="middle" fontSize="12" {...fontStyle}>PROCESS: DIAMOND LOOP</text>
                        
                        {/* 1. TOP: MODEL */}
                        <g transform="translate(160, 50)">
                            <rect x="0" y="0" width="80" height="50" rx="4" {...pathProps} fill="white" />
                            <text x="40" y="30" textAnchor="middle" fontSize="12" fontWeight="bold">MODEL</text>
                        </g>

                        {/* Arrow Top -> Right */}
                        <path d="M 240,75 L 280,75 L 280,100" {...pathProps} markerEnd="url(#arrow)" />

                        {/* 2. RIGHT: CANDIDATE & HUMAN */}
                        <g transform="translate(250, 110)">
                             {/* The "Card" being inspected */}
                             <rect x="0" y="0" width="60" height="80" rx="2" {...pathProps} fill="white" />
                             <text x="30" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">?</text>
                             <line x1="10" y1="50" x2="50" y2="50" stroke="black" strokeWidth="2" />
                             <line x1="10" y1="60" x2="40" y2="60" stroke="black" strokeWidth="2" />
                             <text x="30" y="95" textAnchor="middle" fontSize="9" {...fontStyle}>CANDIDATE</text>
                        </g>

                        {/* Human Gatekeeper */}
                        <AssemblyFigure x={350} y={160} scale={1.2} pose="blocking" mirror={true} />
                        <text x="350" y="100" textAnchor="middle" fontSize="9" {...fontStyle}>GATEKEEPER</text>

                        {/* Arrow Right -> Bottom */}
                        <path d="M 280,190 L 280,210 L 240,210" {...pathProps} markerEnd="url(#arrow)" />

                        {/* 3. BOTTOM: LAB */}
                        <g transform="translate(160, 200)">
                             <rect x="0" y="0" width="80" height="50" {...pathProps} />
                             <path d="M 20,0 L 20,50" stroke="black" strokeWidth="1" />
                             <path d="M 60,0 L 60,50" stroke="black" strokeWidth="1" />
                             <text x="40" y="30" textAnchor="middle" fontSize="12" fontWeight="bold">LAB</text>
                        </g>

                        {/* Arrow Bottom -> Left */}
                        <path d="M 160,225 L 120,225 L 120,190" {...pathProps} markerEnd="url(#arrow)" />

                        {/* 4. LEFT: DATA */}
                        <g transform="translate(90, 120)">
                             <rect x="0" y="0" width="60" height="60" {...pathProps} />
                             {/* Stack effect */}
                             <line x1="10" y1="10" x2="50" y2="10" stroke="black" strokeWidth="2" />
                             <line x1="10" y1="25" x2="50" y2="25" stroke="black" strokeWidth="2" />
                             <line x1="10" y1="40" x2="50" y2="40" stroke="black" strokeWidth="2" />
                             <text x="30" y="75" textAnchor="middle" fontSize="9" {...fontStyle}>HISTORY</text>
                        </g>

                        {/* Arrow Left -> Top */}
                        <path d="M 120,120 L 120,75 L 150,75" {...pathProps} markerEnd="url(#arrow)" />
                        <text x="90" y="90" textAnchor="middle" fontSize="9" {...fontStyle}>UPDATE</text>

                    </>
                )}
            </svg>
        </div>

        {/* Instruction List Panel */}
        <div className="flex flex-col justify-center gap-6 font-mono">
            {step === TutorialStep.BUILD_PREP && (
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">1</div>
                        <div>
                            <strong className="block text-lg mb-1">Gather Libraries</strong>
                            <p className="text-sm text-slate-600">
                                You need <span className="font-bold">BoTorch</span> (reasoning), <span className="font-bold">Transformers</span> (language), and <span className="font-bold">PEFT</span> (adapters).
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">2</div>
                        <div>
                            <strong className="block text-lg mb-1">Environment</strong>
                            <p className="text-sm text-slate-600">
                                Set up a Python environment with CUDA support if available. No complex feature engineering libraries required.
                            </p>
                        </div>
                    </li>
                </ul>
            )}

            {step === TutorialStep.BUILD_DATA && (
                <>
                    <ul className="space-y-4">
                         <li className="flex items-start gap-4">
                            <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">1</div>
                            <div>
                                <strong className="block text-lg mb-1">Export & Clean</strong>
                                <p className="text-sm text-slate-600">
                                    Pull raw logs from HR Systems (Workday) or Shift Calendars. Create simple (Context, Score) pairs in a CSV.
                                </p>
                            </div>
                        </li>
                    </ul>

                    {/* Data Sourcing Intel (Updated with Nurse Case) */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Nurse Scheduling: Scoring Intel</div>
                        
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-0.5 text-indigo-600"><Binary size={16}/></div>
                                <div>
                                    <strong className="block text-sm text-emerald-800 mb-1">Automated Scoring (Preferred)</strong>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Calculated from Roster:
                                        <ul className="list-disc list-inside mt-1 ml-1 space-y-1 text-slate-500">
                                            <li>Variance in coverage (Shift Gaps)</li>
                                            <li>Total Overtime Costs ($)</li>
                                            <li>Skill Mix Ratio (Junior/Senior)</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="mt-0.5 text-indigo-600"><ScanEye size={16}/></div>
                                <div>
                                    <strong className="block text-sm text-amber-800 mb-1">Human Scoring</strong>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Expert review (1-10) for subjective goals:
                                        <ul className="list-disc list-inside mt-1 ml-1 space-y-1 text-slate-500">
                                            <li>"Team Synergy" Perception</li>
                                            <li>Fairness of Rotation</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {step === TutorialStep.BUILD_CODE && (
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">1</div>
                        <div>
                            <strong className="block text-lg mb-1">Connect the Blocks</strong>
                            <p className="text-sm text-slate-600">
                                Subclass <code className="bg-slate-100 px-1 rounded">SingleTaskGP</code>. Pipe the text input through the LLM to generate the input vector for the GP.
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">2</div>
                        <div>
                            <strong className="block text-lg mb-1">The Feedback Wire</strong>
                            <p className="text-sm text-slate-600">
                                Configure the optimizer to update the LoRA weights based on the GP's Marginal Log Likelihood (MLL).
                            </p>
                        </div>
                    </li>
                </ul>
            )}

            {step === TutorialStep.BUILD_DEPLOY && (
                 <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">1</div>
                        <div>
                            <strong className="block text-lg mb-1">The Diamond Loop</strong>
                            <p className="text-sm text-slate-600">Model → Candidate → Lab → History → Update. This cycle ensures continuous improvement.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">2</div>
                        <div>
                            <strong className="block text-lg mb-1">Human Gatekeeper</strong>
                            <p className="text-sm text-slate-600">The human stands between the Suggestion and the Lab. Reject hallucinations before they waste resources.</p>
                        </div>
                    </li>
                </ul>
            )}
        </div>
      </div>
      <div className="mt-8 border-t-2 border-slate-200 pt-4 flex justify-between items-end">
          <div className="text-xs font-mono text-slate-500">
              DOC-ID: GLM-2025-V1<br/>
              PAGE: {step === TutorialStep.BUILD_PREP ? "1/4" : step === TutorialStep.BUILD_DATA ? "2/4" : step === TutorialStep.BUILD_CODE ? "3/4" : "4/4"}
          </div>
          <div className="font-black text-2xl tracking-tighter">GOLLuM-GUIDE™</div>
      </div>
    </div>
  );
};

export default AssemblyGuideViz;