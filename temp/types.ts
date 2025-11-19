
export interface DataPoint {
  id: number;
  initialX: number;
  initialY: number;
  optimizedX: number;
  optimizedY: number;
  yield: number; // 0 to 100
  isSelected: boolean;
}

export enum TutorialStep {
  INTRO = 'INTRO',
  PROBLEM = 'PROBLEM',
  SOLUTION = 'SOLUTION',
  LATENT_SPACE = 'LATENT_SPACE',
  RESULTS = 'RESULTS',
  APPLICATIONS = 'APPLICATIONS',
  SECTOR_HEALTH = 'SECTOR_HEALTH',
  SECTOR_TRANSPORT = 'SECTOR_TRANSPORT',
  SECTOR_ACCOUNTANCY = 'SECTOR_ACCOUNTANCY',
  SECTOR_ENGINEERING = 'SECTOR_ENGINEERING',
  SECTOR_TRADING = 'SECTOR_TRADING',
  SECTOR_EDUCATION = 'SECTOR_EDUCATION',
  // New Builder Steps
  BUILD_PREP = 'BUILD_PREP',
  BUILD_DATA = 'BUILD_DATA',
  BUILD_CODE = 'BUILD_CODE',
  BUILD_DEPLOY = 'BUILD_DEPLOY'
}

export interface ChartData {
  iteration: number;
  staticLLM: number;
  gollum: number;
}

export interface ExampleCard {
  title: string;
  process: string;
  description: string;
  iconKey: string;
}
