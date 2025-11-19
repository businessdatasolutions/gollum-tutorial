
import React, { useState } from 'react';
import { TutorialStep, ExampleCard } from './types';
import { MOCK_POINTS, PERFORMANCE_DATA, CONTENT, SECTOR_EXAMPLES } from './constants';
import LatentSpaceSimulation from './components/LatentSpaceSimulation';
import OptimizationChart from './components/OptimizationChart';
import { SectorVisualizations } from './components/SectorVisualizations';
import AssemblyGuideViz from './components/AssemblyGuideViz';
import { 
  BookOpen, Brain, Microscope, BarChart3, ChevronRight, CircleDot, Zap, 
  FlaskConical, Atom, Dna, Factory,
  Stethoscope, Truck, Calculator, HardHat, TrendingUp, GraduationCap,
  Users, Package, Activity, Map, Box, FileSearch, Receipt, Scale,
  CalendarClock, Ruler, PieChart, Landmark, Hammer, Database
} from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TutorialStep>(TutorialStep.INTRO);

  const steps = [
    { id: TutorialStep.INTRO, label: 'Introduction', icon: BookOpen },
    { id: TutorialStep.PROBLEM, label: 'The Challenge', icon: Microscope },
    { id: TutorialStep.SOLUTION, label: 'The Solution', icon: Brain },
    { id: TutorialStep.LATENT_SPACE, label: 'Latent Space', icon: CircleDot },
    { id: TutorialStep.RESULTS, label: 'Impact', icon: BarChart3 },
    { id: TutorialStep.APPLICATIONS, label: 'Scientific Apps', icon: FlaskConical },
    // New Business Sectors
    { id: TutorialStep.SECTOR_HEALTH, label: 'Healthcare', icon: Stethoscope },
    { id: TutorialStep.SECTOR_TRANSPORT, label: 'Transport & Logistics', icon: Truck },
    { id: TutorialStep.SECTOR_ACCOUNTANCY, label: 'Accountancy', icon: Calculator },
    { id: TutorialStep.SECTOR_ENGINEERING, label: 'Engineering', icon: HardHat },
    { id: TutorialStep.SECTOR_TRADING, label: 'Trading', icon: TrendingUp },
    { id: TutorialStep.SECTOR_EDUCATION, label: 'Education', icon: GraduationCap },
    // Builder Guide
    { id: TutorialStep.BUILD_PREP, label: 'Build: Prep', icon: Hammer },
    { id: TutorialStep.BUILD_DATA, label: 'Build: Data', icon: Database },
    { id: TutorialStep.BUILD_CODE, label: 'Build: Code', icon: Hammer },
    { id: TutorialStep.BUILD_DEPLOY, label: 'Build: Deploy', icon: Hammer },
  ];

  // Helper to resolve icon strings to components
  const getIconComponent = (key: string) => {
    const icons: Record<string, any> = {
      Users, Package, Activity,
      Map, Box, Truck,
      FileSearch, Receipt, Scale,
      CalendarClock, HardHat, Ruler,
      TrendingUp, PieChart, Zap,
      BookOpen, GraduationCap, Landmark
    };
    return icons[key] || Zap;
  };

  const renderContent = () => {
    const content = CONTENT[currentStep];
    const isSectorStep = currentStep.startsWith('SECTOR_');
    const isBuildStep = currentStep.startsWith('BUILD_');
    
    return (
      <div className="max-w-4xl mx-auto animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            {content.title}
          </h1>
          <div className="prose prose-slate text-lg text-slate-600 leading-relaxed whitespace-pre-line">
            {content.body}
          </div>
        </div>

        <div className="my-8">
          {currentStep === TutorialStep.LATENT_SPACE && (
            <LatentSpaceSimulation data={MOCK_POINTS} />
          )}
          
          {currentStep === TutorialStep.RESULTS && (
            <OptimizationChart data={PERFORMANCE_DATA} />
          )}

          {currentStep === TutorialStep.PROBLEM && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-red-50 border border-red-100 rounded-xl">
                    <h3 className="font-bold text-red-800 mb-2">LLM Optimization</h3>
                    <p className="text-sm text-red-700">"Try adding X..."</p>
                    <p className="text-xs text-red-500 mt-2 italic">Confident, but often hallucinates feasible conditions.</p>
                </div>
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                    <h3 className="font-bold text-blue-800 mb-2">Bayesian Optimization</h3>
                    <p className="text-sm text-blue-700">f(x) = GP(μ, σ)</p>
                    <p className="text-xs text-blue-500 mt-2 italic">Reliable uncertainty, but blind without good descriptors.</p>
                </div>
            </div>
          )}

           {currentStep === TutorialStep.SOLUTION && (
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-4 text-indigo-900 font-mono text-sm">
                    <span>LLM(x)</span>
                    <span className="text-slate-400">→</span>
                    <span>Embedding</span>
                    <span className="text-slate-400">→</span>
                    <span>GP(μ, σ)</span>
                </div>
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-indigo-300 to-transparent my-2"></div>
                <p className="text-indigo-800 font-medium mt-2">Gradient Backpropagation</p>
                <p className="text-xs text-indigo-600 mt-1">GP Uncertainty adjusts LLM weights</p>
            </div>
          )}

          {currentStep === TutorialStep.APPLICATIONS && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                  <FlaskConical size={20} /> 
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Synthetic Chemistry</h3>
                <p className="text-sm text-slate-600">Optimizing complex reaction conditions (e.g., Buchwald-Hartwig) to maximize yield and reduce waste in pharmaceutical manufacturing.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <Atom size={20} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Materials Science</h3>
                <p className="text-sm text-slate-600">Accelerating the discovery of new catalysts, polymers, and crystal structures for energy storage and capture.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  <Dna size={20} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Drug Discovery</h3>
                <p className="text-sm text-slate-600">Navigating the vast chemical space to identify potent molecular candidates with optimal properties like solubility and binding affinity.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                   <Factory size={20} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Process Engineering</h3>
                <p className="text-sm text-slate-600">Fine-tuning industrial parameters (temperature, pressure, flow rates) to improve efficiency and safety in chemical plants.</p>
              </div>
            </div>
          )}

          {/* Sector Visualization Header */}
          {isSectorStep && (
             <div className="mb-8">
                <SectorVisualizations step={currentStep} />
             </div>
          )}

          {/* Builder Visualizations */}
          {isBuildStep && (
             <div className="mb-8">
                 <AssemblyGuideViz step={currentStep} />
             </div>
          )}

          {/* Render specific sector examples if available */}
          {SECTOR_EXAMPLES[currentStep] && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {SECTOR_EXAMPLES[currentStep].map((example, idx) => {
                const IconComponent = getIconComponent(example.iconKey);
                return (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                            <IconComponent size={20} />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">
                            {example.process}
                        </span>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">{example.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{example.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-200">
            <button
                disabled={steps.findIndex(s => s.id === currentStep) === 0}
                onClick={() => {
                    const idx = steps.findIndex(s => s.id === currentStep);
                    if (idx > 0) setCurrentStep(steps[idx - 1].id);
                }}
                className="px-4 py-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 font-medium transition-colors"
            >
                Back
            </button>
            
            {steps.findIndex(s => s.id === currentStep) < steps.length - 1 ? (
                 <button
                    onClick={() => {
                        const idx = steps.findIndex(s => s.id === currentStep);
                        if (idx < steps.length - 1) setCurrentStep(steps[idx + 1].id);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-transform active:scale-95 shadow-lg shadow-slate-200"
                >
                    Next Chapter <ChevronRight size={18} />
                </button>
            ) : (
                <div className="px-6 py-3 text-green-600 font-bold flex items-center gap-2 bg-green-50 rounded-full animate-pulse">
                    Tutorial Complete <span className="text-xl">🎉</span>
                </div>
            )}
           
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full hidden lg:flex flex-col z-10 overflow-hidden">
        <div className="p-6 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Brain size={24} />
                <span className="font-bold text-lg tracking-tight">GOLLuM</span>
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Interactive Paper</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isPast = steps.findIndex(s => s.id === currentStep) > idx;
            const isSector = step.id.startsWith('SECTOR_');
            const isBuild = step.id.startsWith('BUILD_');

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                } ${isSector || isBuild ? 'ml-3 w-[calc(100%-0.75rem)] border-l-2 border-transparent hover:border-slate-200' : ''}`}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-md shrink-0 ${isActive ? 'bg-white text-indigo-600 shadow-sm' : isPast ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={14} />
                </div>
                <span className="truncate">{step.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100 text-[10px] text-slate-400 shrink-0 leading-relaxed">
            Ranković, B., & Schwaller, P. (2025). <span className="italic">GOLLuM: Gaussian Process Optimized LLMs--Reframing LLM Finetuning through Bayesian Optimization.</span> arXiv preprint arXiv:2504.06265.
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed w-full bg-white z-20 border-b border-slate-200 p-4 flex justify-between items-center">
        <span className="font-bold text-slate-800">GOLLuM Interactive</span>
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{steps.find(s => s.id === currentStep)?.label}</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-12 px-6 pb-12 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
