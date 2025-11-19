
import React from 'react';
import { TutorialStep } from '../types';

interface Props {
  step: TutorialStep;
}

const IkeaBuilderViz: React.FC<Props> = ({ step }) => {
  
  // Common SVG styles for that "manual" look
  const strokeColor = "#000000";
  const strokeWidth = "2.5";
  const strokeLinecap = "round";
  const strokeLinejoin = "round";
  
  const pathProps = {
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeLinecap: strokeLinecap as "round",
    strokeLinejoin: strokeLinejoin as "round",
    fill: "none"
  };

  // The "IKEA Man" component
  const IkeaMan = ({ x, y, scale = 1, pose = "neutral" }: { x: number, y: number, scale?: number, pose?: "neutral" | "thinking" | "happy" | "working" }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Head */}
      <circle cx="0" cy="-20" r="12" {...pathProps} strokeWidth="2.5" />
      {/* Body */}
      <path d="M -10,-8 L -10,15 C -10,25 10,25 10,15 L 10,-8" {...pathProps} />
      
      {/* Arms/Legs based on Pose */}
      {pose === "neutral" && (
        <>
          <path d="M -10,0 L -20,15" {...pathProps} /> {/* Left Arm */}
          <path d="M 10,0 L 20,15" {...pathProps} />  {/* Right Arm */}
          <path d="M -5,25 L -5,45" {...pathProps} /> {/* Left Leg */}
          <path d="M 5,25 L 5,45" {...pathProps} />  {/* Right Leg */}
        </>
      )}
       {pose === "working" && (
        <>
          <path d="M -10,0 L -25,-5" {...pathProps} /> {/* Left Arm Up */}
          <path d="M 10,0 L 25,-5" {...pathProps} />  {/* Right Arm Up */}
          <path d="M -5,25 L -10,45" {...pathProps} /> {/* Left Leg */}
          <path d="M 5,25 L 10,45" {...pathProps} />  {/* Right Leg */}
        </>
      )}
      {pose === "happy" && (
        <>
           <path d="M -10,0 L -25,-15" {...pathProps} /> {/* Left Arm High */}
           <path d="M 10,0 L 25,-15" {...pathProps} />  {/* Right Arm High */}
           <path d="M -5,25 L -5,45" {...pathProps} /> 
           <path d="M 5,25 L 5,45" {...pathProps} />
        </>
      )}
    </g>
  );

  // Reusable "Screw" / Fastener
  const Screw = ({ x, y }: { x: number, y: number }) => (
     <g transform={`translate(${x}, ${y})`}>
         <line x1="-3" y1="-3" x2="3" y2="3" {...pathProps} strokeWidth="1.5" />
         <line x1="3" y1="-3" x2="-3" y2="3" {...pathProps} strokeWidth="1.5" />
         <circle cx="0" cy="0" r="5" {...pathProps} strokeWidth="1.5" />
         <line x1="0" y1="5" x2="0" y2="12" {...pathProps} strokeWidth="1.5" />
         <line x1="-3" y1="10" x2="3" y2="8" {...pathProps} strokeWidth="1.5" />
     </g>
  );

  return (
    <div className="w-full bg-white p-8 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Visual Panel */}
        <div className="border-2 border-slate-900 p-8 min-h-[300px] flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Step Number - Top Left */}
            <div className="absolute top-4 left-4 text-4xl font-black text-slate-900">
                {step === TutorialStep.BUILD_PREP && "1"}
                {step === TutorialStep.BUILD_CODE && "2"}
                {step === TutorialStep.BUILD_DEPLOY && "3"}
            </div>

            <svg viewBox="0 0 400 300" className="w-full h-full max-w-md">
                
                {/* --- SCENE 1: PREP --- */}
                {step === TutorialStep.BUILD_PREP && (
                    <>
                        {/* The Man */}
                        <IkeaMan x={80} y={150} scale={1.5} pose="neutral" />
                        
                        {/* Box: Data */}
                        <g transform="translate(220, 180)">
                             <rect x="0" y="0" width="80" height="60" {...pathProps} />
                             <line x1="0" y1="0" x2="20" y2="-20" {...pathProps} />
                             <line x1="80" y1="0" x2="100" y2="-20" {...pathProps} />
                             <line x1="20" y1="-20" x2="100" y2="-20" {...pathProps} />
                             <line x1="100" y1="-20" x2="100" y2="40" {...pathProps} />
                             <line x1="80" y1="60" x2="100" y2="40" {...pathProps} />
                             <text x="40" y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fontFamily="sans-serif">DATA</text>
                        </g>

                        {/* Item: API Key */}
                        <g transform="translate(250, 80)">
                            <path d="M 0,0 L 30,0 L 30,10 L 40,10 L 40,0 L 60,0 A 10,10 0 1 0 60,-20 L 0,-20 Z" {...pathProps} />
                            <circle cx="50" cy="-10" r="3" fill="black" />
                            <text x="80" y="-5" fontSize="12" fontFamily="sans-serif">API KEY</text>
                        </g>

                        {/* Tool: Python */}
                        <g transform="translate(150, 240) rotate(-45)">
                             <path d="M 0,0 L 10,0 L 10,30 L 0,30 Z" {...pathProps} fill="black" />
                             <path d="M -5,0 L 15,0" {...pathProps} />
                        </g>

                         {/* Arrow from man to items */}
                         <path d="M 110,120 Q 150,80 200,100" {...pathProps} markerEnd="url(#arrow)" />
                    </>
                )}

                {/* --- SCENE 2: CODE/ASSEMBLY --- */}
                {step === TutorialStep.BUILD_CODE && (
                    <>
                        {/* Component 1: LLM */}
                        <g transform="translate(50, 100)">
                            <rect x="0" y="0" width="80" height="80" rx="5" {...pathProps} />
                            <text x="40" y="45" textAnchor="middle" fontSize="16" fontWeight="bold">LLM</text>
                        </g>

                        {/* Component 2: GP */}
                        <g transform="translate(250, 100)">
                             <rect x="0" y="0" width="80" height="80" rx="5" {...pathProps} />
                             <path d="M 10,40 Q 40,10 70,40" {...pathProps} strokeWidth="1.5" />
                             <path d="M 10,50 Q 40,20 70,50" {...pathProps} strokeWidth="1.5" strokeDasharray="2,2" />
                             <text x="40" y="70" textAnchor="middle" fontSize="12" fontWeight="bold">GP</text>
                        </g>

                        {/* The Man Assembling */}
                        <IkeaMan x={190} y={200} scale={1.2} pose="working" />
                        
                        {/* Connection Wire */}
                        <path d="M 130,140 C 160,140 220,140 250,140" {...pathProps} strokeDasharray="5,5" />
                        
                        {/* Screws being tightened */}
                        <Screw x={130} y={140} />
                        <Screw x={250} y={140} />

                        {/* Don't do X mark */}
                        <g transform="translate(320, 220)">
                             <circle cx="0" cy="0" r="25" stroke="black" strokeWidth="2" fill="none" />
                             <line x1="-15" y1="-15" x2="15" y2="15" stroke="black" strokeWidth="2" />
                             <line x1="15" y1="-15" x2="-15" y2="15" stroke="black" strokeWidth="2" />
                             <text x="0" y="40" textAnchor="middle" fontSize="10">NO HARD RULES</text>
                        </g>
                    </>
                )}

                {/* --- SCENE 3: DEPLOY --- */}
                {step === TutorialStep.BUILD_DEPLOY && (
                    <>
                         {/* Server Rack / Application */}
                         <g transform="translate(200, 50)">
                             <rect x="0" y="0" width="100" height="150" {...pathProps} />
                             <line x1="10" y1="20" x2="90" y2="20" {...pathProps} strokeWidth="1" />
                             <line x1="10" y1="40" x2="90" y2="40" {...pathProps} strokeWidth="1" />
                             <circle cx="80" cy="10" r="3" fill="black" />
                             <circle cx="70" cy="10" r="3" fill="none" stroke="black" />
                             
                             {/* Graph on screen */}
                             <rect x="15" y="60" width="70" height="50" fill="#eee" stroke="none" />
                             <path d="M 20,100 L 40,90 L 60,80 L 80,70" stroke="black" strokeWidth="2" fill="none" />
                         </g>

                         {/* Happy Man */}
                         <IkeaMan x={100} y={200} scale={1.5} pose="happy" />
                         
                         {/* Thumbs Up Bubble */}
                         <g transform="translate(140, 120)">
                             <path d="M 0,0 L 20,-20 L 50,-20 L 50,10 L 20,10 L 0,20 Z" {...pathProps} fill="white" />
                             <path d="M 30,-10 L 35,-15 L 40,-5" {...pathProps} strokeWidth="2" /> 
                         </g>

                         {/* Loop Arrow */}
                         <path d="M 320,100 C 350,100 350,150 320,150 L 310,150" {...pathProps} markerEnd="url(#arrow)" />
                         <text x="330" y="170" textAnchor="middle" fontSize="10" fontWeight="bold">ITERATE</text>
                    </>
                )}
                
                {/* Definitions */}
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#000" />
                    </marker>
                </defs>
            </svg>
        </div>

        {/* Instruction List Panel */}
        <div className="flex flex-col justify-center gap-6 font-mono">
            {step === TutorialStep.BUILD_PREP && (
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">1</div>
                        <div>
                            <strong className="block text-lg mb-1">Python Environment</strong>
                            <p className="text-sm text-slate-600">Install `gollum-lib` and `torch`. Ensure CUDA support if available.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">2</div>
                        <div>
                            <strong className="block text-lg mb-1">API Credentials</strong>
                            <p className="text-sm text-slate-600">Export `OPENAI_API_KEY` or `GEMINI_API_KEY`. Keep them secret.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">3</div>
                        <div>
                            <strong className="block text-lg mb-1">Structured Data</strong>
                            <p className="text-sm text-slate-600">Clean CSV with inputs (text) and targets (numbers).</p>
                        </div>
                    </li>
                </ul>
            )}

            {step === TutorialStep.BUILD_CODE && (
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">1</div>
                        <div>
                            <strong className="block text-lg mb-1">Define Objective</strong>
                            <code className="block bg-slate-100 p-2 rounded text-xs mt-1">def score_result(output): return yield_percent</code>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">2</div>
                        <div>
                            <strong className="block text-lg mb-1">Initialize Optimizer</strong>
                            <p className="text-sm text-slate-600">Pass the LLM and the objective function to the GollumOptimizer class.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-8 h-8 flex items-center justify-center shrink-0">
                             <svg viewBox="0 0 24 24" className="w-8 h-8"><circle cx="12" cy="12" r="10" stroke="black" fill="none" strokeWidth="2"/><path d="M8 8l8 8M16 8l-8 8" stroke="black" strokeWidth="2"/></svg>
                        </div>
                        <div>
                            <strong className="block text-lg mb-1">Don't Over-Engineer</strong>
                            <p className="text-sm text-slate-600">Avoid manual prompt engineering. Let the GP optimize the prompt embeddings.</p>
                        </div>
                    </li>
                </ul>
            )}

            {step === TutorialStep.BUILD_DEPLOY && (
                 <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">1</div>
                        <div>
                            <strong className="block text-lg mb-1">Warm Start</strong>
                            <p className="text-sm text-slate-600">Seed the model with 5-10 historical examples to stabilize the latent space.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">2</div>
                        <div>
                            <strong className="block text-lg mb-1">Human-in-the-Loop</strong>
                            <p className="text-sm text-slate-600">Review high-confidence suggestions before physical execution.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 font-bold">3</div>
                        <div>
                            <strong className="block text-lg mb-1">Feedback Loop</strong>
                            <p className="text-sm text-slate-600">Feed results back into the dataset. The model gets smarter with every iteration.</p>
                        </div>
                    </li>
                </ul>
            )}
        </div>
      </div>
      <div className="mt-8 border-t-2 border-slate-200 pt-4 flex justify-between items-end">
          <div className="text-xs font-mono text-slate-500">
              DOC-ID: GLM-2025-V1<br/>
              PAGE: {step === TutorialStep.BUILD_PREP ? "1/3" : step === TutorialStep.BUILD_CODE ? "2/3" : "3/3"}
          </div>
          <div className="font-black text-2xl tracking-tighter">IKEA-LLM™</div>
      </div>
    </div>
  );
};

export default IkeaBuilderViz;
