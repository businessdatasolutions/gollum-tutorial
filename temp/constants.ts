
import { DataPoint, ChartData, TutorialStep, ExampleCard } from './types';

export const MOCK_POINTS: DataPoint[] = Array.from({ length: 80 }).map((_, i) => {
  const yieldVal = Math.random() * 100;
  // Optimized positions correlate with yield (simulating the structured latent space)
  // High yield -> Top Right, Low yield -> Bottom Left
  const noise = () => (Math.random() - 0.5) * 30;
  
  return {
    id: i,
    initialX: Math.random() * 100, // Random distribution
    initialY: Math.random() * 100,
    optimizedX: yieldVal + noise(), // Correlated distribution
    optimizedY: yieldVal + noise(),
    yield: yieldVal,
    isSelected: i < 5 // Start with a few selected points
  };
});

// Updated to match Figure 14 (Suzuki-Miyaura/BH5) and Abstract values
// 1. Convex/Accelerating curve (Slow start -> Rapid Discovery)
// 2. Target Values: Baseline ~24%, GOLLuM ~43% (per paper abstract)
// 3. Constraint: Baseline never crosses GOLLuM
export const PERFORMANCE_DATA: ChartData[] = Array.from({ length: 50 }).map((_, i) => {
  const x = i + 1;
  const progress = x / 50; // 0 to 1

  const baseNoise = (Math.random() - 0.5) * 1.5;
  const gollumNoise = (Math.random() - 0.5) * 1.5;

  // Baseline: Reaches ~24%
  // Slight convex shape to match visual of "struggling then finding some"
  const staticLLMRaw = 24 * Math.pow(progress, 1.3);
  const staticLLM = staticLLMRaw + baseNoise;

  // GOLLuM: Reaches ~43%
  // Starts similar to baseline (learning phase) then accelerates (structured phase)
  // Modeled as Baseline + Delta to ensure no crossing
  const delta = 19 * Math.pow(progress, 2); // The "LLM Advantage" grows quadratically
  let gollum = staticLLMRaw + delta + gollumNoise;

  // Strict Constraint: GOLLuM must be > Static
  if (gollum <= staticLLM) {
    gollum = staticLLM + 0.5 + Math.random() * 0.5;
  }
  
  return {
    iteration: x,
    staticLLM: Math.max(0, staticLLM), 
    gollum: Math.max(0, gollum)
  };
});

export const CONTENT = {
  INTRO: {
    title: "LLMs for Scientific Discovery",
    body: `Scientific discovery increasingly depends on efficient experimental optimization to navigate vast design spaces. 
    
    While Large Language Models (LLMs) possess vast scientific knowledge, they often lack the reliability required for high-stakes decision making. This tutorial explores "GOLLuM" (Gaussian Process Optimized LLMs), a framework that transforms LLMs into uncertainty-calibrated optimizers.`
  },
  PROBLEM: {
    title: "The Reliability Gap",
    body: `Current approaches force a trade-off:
    
    1. **Traditional Bayesian Optimization (BO):** Reliable and uncertainty-aware, but requires extensive manual feature engineering (e.g., chemical fingerprints).
    2. **Direct LLM Prompting:** Accessible and knowledgeable, but prone to hallucinations and overconfidence.
    
    Static LLM embeddings often fail to capture the specific nuances of a new experimental domain, leading to a "rough" optimization landscape.`
  },
  SOLUTION: {
    title: "The GOLLuM Framework",
    body: `GOLLuM bridges the gap by treating the LLM not as a static black box, but as a learnable component within a probabilistic system.
    
    It uses the **Marginal Likelihood** of a Gaussian Process (GP) to backpropagate gradients into the LLM (or a lightweight adapter like LoRA).
    
    Effectively, the uncertainty of the GP teaches the LLM how to organize its "mind" (latent space) to better represent the experiment.`
  },
  LATENT_SPACE: {
    title: "Reshaping the Latent Space",
    body: `This is the core mechanism. In a standard LLM, experiments with different outcomes might be embedded randomly or based on textual similarity only.
    
    **Interactive Demo:**
    The visualization below represents the LLM's "Mental Map" of chemical reactions. 
    - **Blue/Purple:** High Yield
    - **Orange/Yellow:** Low Yield
    
    Click "Fine-tune" to see how the GP's objective forces the LLM to cluster successful experiments together, creating a smoother surface for optimization.`
  },
  RESULTS: {
    title: "Performance & Impact",
    body: `By structuring the latent space, GOLLuM allows the optimizer to "reason" about the chemical space more effectively.
    
    In benchmarks like the Buchwald-Hartwig reactions, this approach nearly doubles the discovery rate of high-yielding conditions compared to static embeddings or traditional descriptors (reaching ~43% vs ~24%).
    
    It creates an interpretable, data-driven map of chemical reality without explicit instruction.`
  },
  APPLICATIONS: {
    title: "Scientific Applications",
    body: `GOLLuM's strength lies in its versatility. Because it uses natural language as a universal interface, it can optimize processes across vastly different scientific domains without requiring domain-specific feature engineering.

    From drug discovery to sustainable energy, uncertainty-calibrated LLMs are accelerating the pace of innovation.`
  },
  SECTOR_HEALTH: {
    title: "Healthcare Providers",
    body: `Healthcare operations involve complex scheduling, resource allocation, and procurement challenges where constraints are often described in unstructured text (patient notes, doctor preferences, supply specifications).
    
    Uncertainty-calibrated LLMs can optimize these processes by understanding the nuances of medical requirements while reliably navigating trade-offs.`
  },
  SECTOR_TRANSPORT: {
    title: "Transportation & Warehousing",
    body: `Logistics is a high-dimensional optimization problem involving dynamic constraints. Traditional systems struggle with qualitative constraints ("avoid residential areas at night"). 
    
    GOLLuM-like frameworks can interpret these natural language constraints and optimize routing and storage efficiency.`
  },
  SECTOR_ACCOUNTANCY: {
    title: "Accountancy & Finance",
    body: `In finance, optimization isn't just about numbers—it's about risk and compliance, which are often defined in legal texts and regulations. 
    
    Calibrated LLMs can optimize audit processes and portfolio construction by balancing quantitative returns against qualitative risk factors described in financial reports.`
  },
  SECTOR_ENGINEERING: {
    title: "Engineering & Construction",
    body: `Engineering projects require optimizing design parameters and schedules against technical specifications and site reports.
    
    By treating technical documents as inputs to the optimization loop, we can minimize project risks and optimize material procurement.`
  },
  SECTOR_TRADING: {
    title: "Trading & Investment",
    body: `Modern trading requires synthesizing vast amounts of unstructured data (news, sentiment, earnings call transcripts) with hard market data.
    
    Optimization here focuses on finding the optimal trading strategy parameters that align with the current market narrative as interpreted by the LLM.`
  },
  SECTOR_EDUCATION: {
    title: "Education Sector",
    body: `Educational institutions face complex resource allocation problems. Optimizing curriculums and schedules requires balancing learning objectives (text) with logistical constraints.
    
    This approach allows for data-driven improvements to student outcomes based on qualitative feedback.`
  },
  // Builder Chapters
  BUILD_PREP: {
    title: "1. Gather Your Parts",
    body: `Before you begin assembly, ensure you have all the necessary components. 
    
    You do not need a PhD in Machine Learning. You need a Python environment and three key libraries.`
  },
  BUILD_DATA: {
    title: "2. Prepare Your Data",
    body: `The most critical step is translating your business reality into training pairs.
    
    We need to convert unstructured context (emails, logs, notes) into a structured score. This defines what "Good" looks like to the model.`
  },
  BUILD_CODE: {
    title: "3. Assembly (The Loop)",
    body: `Constructing the optimization loop requires connecting the LLM (the interpreter) to the Gaussian Process (the reasoner).
    
    Do not hard-code rules. Let the gradient descent align the components.`
  },
  BUILD_DEPLOY: {
    title: "4. Deployment",
    body: `Once assembled, the system needs to be integrated into your workflow. 
    
    Start with a "Human-in-the-Loop" configuration before enabling full autonomy.`
  }
};

export const SECTOR_EXAMPLES: Record<string, ExampleCard[]> = {
  [TutorialStep.SECTOR_HEALTH]: [
    {
      title: "Staff Scheduling",
      process: "HR / Operations",
      description: "Optimizing nurse and doctor shifts by matching skills descriptions in personnel files with patient acuity notes, reducing burnout and improving care coverage.",
      iconKey: "Users"
    },
    {
      title: "Surgical Inventory",
      process: "Procurement",
      description: "Optimizing the procurement of surgical kits by analyzing procedure descriptions to predict specific tool needs, minimizing waste and emergency orders.",
      iconKey: "Package"
    },
    {
      title: "Patient Flow",
      process: "Logistics",
      description: "Optimizing bed allocation by analyzing admission notes to predict length-of-stay variance and potential isolation requirements.",
      iconKey: "Activity"
    }
  ],
  [TutorialStep.SECTOR_TRANSPORT]: [
    {
      title: "Constraint-Based Routing",
      process: "Logistics",
      description: "Optimizing delivery routes where constraints are inputs like 'delivery dock is in the alley' or 'avoid school zones during pickup times'.",
      iconKey: "Map"
    },
    {
      title: "Warehouse Slotting",
      process: "Warehousing",
      description: "Optimizing the placement of goods by analyzing product descriptions and retrieval frequency, placing heavy/fragile items optimally.",
      iconKey: "Box"
    },
    {
      title: "Fleet Maintenance",
      process: "Operations",
      description: "Optimizing maintenance schedules by analyzing driver defect reports (text) to prioritize repairs that impact safety most.",
      iconKey: "Truck"
    }
  ],
  [TutorialStep.SECTOR_ACCOUNTANCY]: [
    {
      title: "Audit Risk Sampling",
      process: "Audit",
      description: "Optimizing the selection of transactions for audit by analyzing the text in transaction notes for high-risk keywords and anomalies.",
      iconKey: "FileSearch"
    },
    {
      title: "Expense Classification",
      process: "Finance",
      description: "Optimizing the rules for tax categorization by learning from descriptions of expenses, reducing manual review time.",
      iconKey: "Receipt"
    },
    {
      title: "Compliance Monitoring",
      process: "Regulatory",
      description: "Optimizing the set of internal controls to test based on new regulatory text updates and internal policy documents.",
      iconKey: "Scale"
    }
  ],
  [TutorialStep.SECTOR_ENGINEERING]: [
    {
      title: "Project Scheduling",
      process: "Project Management",
      description: "Optimizing construction timelines by analyzing site daily reports to predict delays and re-sequence tasks dynamically.",
      iconKey: "CalendarClock"
    },
    {
      title: "Material Procurement",
      process: "Procurement",
      description: "Optimizing supplier selection by matching technical specifications in blueprints with supplier capability statements.",
      iconKey: "HardHat"
    },
    {
      title: "Design Tuning",
      process: "R&D",
      description: "Optimizing CAD parameters for new parts where the objective function includes meeting constraints defined in a requirements document.",
      iconKey: "Ruler"
    }
  ],
  [TutorialStep.SECTOR_TRADING]: [
    {
      title: "Sentiment Strategies",
      process: "Algorithmic Trading",
      description: "Optimizing the parameters of a trading algorithm (e.g., stop-loss limits) dynamically based on real-time news sentiment analysis.",
      iconKey: "TrendingUp"
    },
    {
      title: "Portfolio Construction",
      process: "Investment",
      description: "Optimizing asset allocation by treating annual report 'Risk Factors' sections as inputs to the risk model.",
      iconKey: "PieChart"
    },
    {
      title: "Execution Algorithms",
      process: "Operations",
      description: "Optimizing trade execution speeds to minimize slippage based on market commentary and liquidity descriptions.",
      iconKey: "Zap"
    }
  ],
  [TutorialStep.SECTOR_EDUCATION]: [
    {
      title: "Curriculum Design",
      process: "Academic Operations",
      description: "Optimizing the sequence of course modules by analyzing learning objectives and student feedback text to maximize engagement.",
      iconKey: "BookOpen"
    },
    {
      title: "Faculty Scheduling",
      process: "HR",
      description: "Optimizing the timetable by matching professor research interests (text) with course descriptions and availability.",
      iconKey: "GraduationCap"
    },
    {
      title: "Grant Allocation",
      process: "Finance",
      description: "Optimizing the distribution of research funds by analyzing the potential impact described in grant proposals.",
      iconKey: "Landmark"
    }
  ]
};
