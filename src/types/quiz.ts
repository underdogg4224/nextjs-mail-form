export type AgeGroup = 
  | '18-25'
  | '26-35'
  | '36-45'
  | '46-55'
  | '56-65'
  | '66+';

export type IncomeSource = 
  | 'W2 Employee (Full-time)'
  | 'W2 Employee (Part-time)'
  | 'Business Owner with employees'
  | 'Self-employed/Freelancer'
  | 'Real Estate Investor'
  | 'Side Hustle Entrepreneur'
  | 'Retired'
  | 'Other';

export type FinancialSituation = 
  | 'I typically make good money but have little saved to show for it'
  | 'I carefully budget and save a set percentage of my income'
  | 'I\'ve built systems that accumulate wealth regardless of my time input'
  | 'I\'m usually in debt or just breaking even';

export type TaxView = 
  | 'I try to maximize deductions to reduce my tax bill as much as possible'
  | 'I focus on keeping profit high, even if it means paying more in taxes'
  | 'I use strategic structures to grow wealth while legally minimizing taxes'
  | 'I don\'t have a business, just personal expenses';

export type FinancialAccount = 
  | 'Traditional 401(k) or IRA'
  | 'Roth IRA'
  | 'Solo 401(k)'
  | 'Self-directed IRA/401(k)'
  | 'HSA (Health Savings Account)'
  | 'Standard checking/savings accounts'
  | 'Brokerage investment accounts'
  | 'None of the above';

export type FinancialDecisionStyle = 
  | 'I rely heavily on financial advisors to manage my investments'
  | 'I handle all financial matters myself and rarely seek outside input'
  | 'I maintain control but collaborate with a network of financially sophisticated peers'
  | 'I avoid financial decisions because they feel overwhelming or confusing';

export type ProfitResponse = 
  | 'I reinvest almost everything back into growth'
  | 'I take most profits out to enjoy life and reward my hard work'
  | 'I strategically allocate profits between tax-advantaged accounts, investments, and lifestyle'
  | 'I focus on reducing taxable income through additional expenses and deductions';

export type WealthBuildingView = 
  | 'Building wealth requires decades of consistent saving and compound interest'
  | 'Wealth comes from taking big risks and making bold moves'
  | 'Wealth creation is primarily about structure and strategy, not just income'
  | 'Wealth is about who you know and connections you have';

export type MindsetType = 
  | 'Deep Contributor Mindset'
  | 'Transitioning Contributor'
  | 'Emerging Creator'
  | 'Established Creator';

// New types for financial trauma assessment
export type ChildhoodMoneyMessage =
  | 'Money is scarce'
  | 'Money is hard to earn'
  | 'Money causes conflict'
  | 'Rich people are bad or corrupt'
  | 'Money is the root of all evil'
  | 'We don\'t talk about money'
  | 'Money brings freedom and opportunity';

export type FinancialFear =
  | 'Fear of not having enough'
  | 'Fear of losing what I have'
  | 'Fear of being judged for financial decisions'
  | 'Fear of having too much money'
  | 'Fear of becoming greedy or materialistic'
  | 'Fear of not having enough for healthcare'
  | 'Fear of making financial mistakes';

export type ChildhoodExperience =
  | 'Grew up with financial stability'
  | 'Experienced financial insecurity'
  | 'Witnessed financial conflicts'
  | 'Medical financial crisis'
  | 'Bankruptcy or foreclosure'
  | 'Negative experiences with wealthy people'
  | 'Positive experiences with wealth creation';

export type EmotionalResponse =
  | 'Anxiety or panic'
  | 'Avoidance or procrastination'
  | 'Guilt or shame'
  | 'Excitement or enthusiasm'
  | 'Moral conflict'
  | 'Confidence or security'
  | 'Overwhelm or confusion';

export type TraumaType = 'relationship' | 'health' | 'purpose' | 'wealth';

export type PrimaryBlocker = 'knowledge' | 'behavior' | 'mindset' | 'structure' | 'tools' | 'network';

export interface FinancialTraumaResponses {
  moneyMessages?: ChildhoodMoneyMessage[];
  financialFears?: FinancialFear[];
  childhoodExperiences?: ChildhoodExperience[];
  emotionalResponse?: EmotionalResponse;
}

export interface QuizFormData {
  ageGroup: AgeGroup;
  incomeSources: IncomeSource[];
  financialSituation: FinancialSituation;
  taxView: TaxView;
  financialAccounts: FinancialAccount[];
  decisionStyle: FinancialDecisionStyle;
  profitResponse: ProfitResponse;
  wealthBuildingView: WealthBuildingView;
  // New field for financial trauma assessment
  financialTraumaResponses?: FinancialTraumaResponses;
}

export interface QuizResult {
  creatorScore: number;
  mindsetType: MindsetType;
  insights: string[];
  // New fields for enhanced assessment
  traumaType?: TraumaType | null;
  primaryBlocker?: PrimaryBlocker | null;
}

// Business structure types for enhanced assessment
export type BusinessStructure =
  | 'sole_proprietorship'
  | 'llc'
  | 's_corporation'
  | 'c_corporation'
  | 'partnership'
  | 'multiple_entities'
  | 'none';

// Year-end approach types
export type YearEndApproach =
  | 'maximize_deductions'
  | 'strategic_planning'
  | 'no_planning'
  | 'delegate_to_accountant';

// Enhanced quiz form data for future implementation
export interface EnhancedQuizFormData extends QuizFormData {
  businessStructure?: BusinessStructure;
  yearEndApproach?: YearEndApproach;
  networkQuality?: number; // 1-10 rating of financial network
  collaborativeInvestments?: boolean;
  wealthStructureKnowledge?: number; // 1-10 self-assessment
}