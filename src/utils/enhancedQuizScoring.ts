import { 
  QuizFormData, 
  QuizResult, 
  MindsetType,
  FinancialAccount,
  TraumaType,
  PrimaryBlocker
} from '../types/quiz';
import { print_message } from './logger';

/**
 * Calculate creator score based on quiz answers with enhanced trauma assessment
 * 
 * @param data - The quiz form data
 * @returns QuizResult with score, mindset type, insights, trauma type, and primary blocker
 */
export const calculateEnhancedCreatorScore = (data: QuizFormData): QuizResult => {
  let score = 0;
  const insights: string[] = [];
  
  // Age group scoring (minimal impact)
  // Older individuals may have more experience but also more entrenched habits
  switch (data.ageGroup) {
    case '18-25':
      score += 5; // Young, more adaptable
      break;
    case '26-35':
    case '36-45':
      score += 7; // Prime age for wealth building
      break;
    case '46-55':
      score += 6; // Established but still adaptable
      break;
    case '56-65':
    case '66+':
      score += 4; // May have more entrenched financial habits
      break;
  }
  
  // Income sources (multiple selection possible)
  // Creator mindset is associated with business ownership and multiple income streams
  if (data.incomeSources.includes('Business Owner with employees')) {
    score += 15;
  }
  if (data.incomeSources.includes('Real Estate Investor')) {
    score += 12;
  }
  if (data.incomeSources.includes('Self-employed/Freelancer')) {
    score += 10;
  }
  if (data.incomeSources.includes('Side Hustle Entrepreneur')) {
    score += 8;
  }
  if (data.incomeSources.includes('W2 Employee (Full-time)')) {
    score += 3;
  }
  if (data.incomeSources.includes('W2 Employee (Part-time)')) {
    score += 4;
  }
  
  // Multiple income streams is a creator trait
  if (data.incomeSources.length > 1) {
    score += 5;
    insights.push('You have multiple income streams, which is a positive creator trait.');
  } else if (data.incomeSources.length === 1 && data.incomeSources[0] === 'W2 Employee (Full-time)') {
    score -= 5;
    insights.push('Relying solely on W2 employment is a strong contributor pattern.');
  }
  
  // Financial situation scoring
  switch (data.financialSituation) {
    case 'I\'ve built systems that accumulate wealth regardless of my time input':
      score += 25;
      insights.push('You\'ve already established wealth systems that work without your direct time input - a key creator characteristic.');
      break;
    case 'I carefully budget and save a set percentage of my income':
      score += 15;
      insights.push('Your disciplined saving approach is positive, but consider moving beyond just saving to strategic wealth structures.');
      break;
    case 'I typically make good money but have little saved to show for it':
      score += 5;
      insights.push('The pattern of earning but not retaining wealth is a classic contributor trap.');
      break;
    case 'I\'m usually in debt or just breaking even':
      score += 0;
      insights.push('Your current financial situation suggests you're caught in a survival loop that needs to be addressed before creator strategies can be fully implemented.');
      break;
  }
  
  // Tax view scoring
  switch (data.taxView) {
    case 'I use strategic structures to grow wealth while legally minimizing taxes':
      score += 20;
      break;
    case 'I focus on keeping profit high, even if it means paying more in taxes':
      score += 10;
      break;
    case 'I try to maximize deductions to reduce my tax bill as much as possible':
      score += 5;
      insights.push('Focusing primarily on deductions rather than strategic tax planning is a contributor pattern.');
      break;
    case 'I don\'t have a business, just personal expenses':
      score += 0;
      insights.push('Operating without business structures limits your wealth-building options significantly.');
      break;
  }
  
  // Financial accounts scoring
  const advancedAccounts: FinancialAccount[] = [
    'Self-directed IRA/401(k)',
    'Solo 401(k)',
    'HSA (Health Savings Account)'
  ];
  
  const basicAccounts: FinancialAccount[] = [
    'Traditional 401(k) or IRA',
    'Roth IRA',
    'Brokerage investment accounts'
  ];
  
  const advancedCount = data.financialAccounts.filter(account => 
    advancedAccounts.includes(account)
  ).length;
  
  const basicCount = data.financialAccounts.filter(account => 
    basicAccounts.includes(account)
  ).length;
  
  score += advancedCount * 7;
  score += basicCount * 3;
  
  if (advancedCount > 0) {
    insights.push('Your use of advanced financial accounts shows creator-side thinking.');
  } else if (basicCount > 0) {
    insights.push('You have basic investment accounts, but could benefit from more sophisticated financial structures.');
  } else {
    insights.push('The absence of investment accounts is limiting your wealth-building potential.');
  }
  
  // Decision style scoring
  switch (data.decisionStyle) {
    case 'I maintain control but collaborate with a network of financially sophisticated peers':
      score += 20;
      break;
    case 'I handle all financial matters myself and rarely seek outside input':
      score += 10;
      insights.push('While self-reliance is good, creators know the value of strategic collaboration with financial peers.');
      break;
    case 'I rely heavily on financial advisors to manage my investments':
      score += 5;
      insights.push('Delegating financial decisions completely is a contributor pattern that limits your control and understanding.');
      break;
    case 'I avoid financial decisions because they feel overwhelming or confusing':
      score += 0;
      insights.push('Financial avoidance is a common pattern that keeps people trapped in contributor cycles.');
      break;
  }
  
  // Profit response scoring
  switch (data.profitResponse) {
    case 'I strategically allocate profits between tax-advantaged accounts, investments, and lifestyle':
      score += 20;
      break;
    case 'I reinvest almost everything back into growth':
      score += 10;
      insights.push('Reinvesting in growth is good, but balance with personal wealth building is key to creator thinking.');
      break;
    case 'I focus on reducing taxable income through additional expenses and deductions':
      score += 5;
      insights.push('Focusing on deductions rather than strategic allocation is a contributor pattern.');
      break;
    case 'I take most profits out to enjoy life and reward my hard work':
      score += 3;
      insights.push('Consuming most profits without strategic allocation limits long-term wealth building.');
      break;
  }
  
  // Wealth building view scoring
  switch (data.wealthBuildingView) {
    case 'Wealth creation is primarily about structure and strategy, not just income':
      score += 15;
      break;
    case 'Wealth is about who you know and connections you have':
      score += 10;
      break;
    case 'Wealth comes from taking big risks and making bold moves':
      score += 5;
      insights.push('While calculated risks matter, sustainable wealth building is more about structure than big gambles.');
      break;
    case 'Building wealth requires decades of consistent saving and compound interest':
      score += 3;
      insights.push('The traditional "save for decades" approach is a contributor mindset that overlooks more efficient wealth-building strategies.');
      break;
  }
  
  // Financial trauma assessment (new)
  let traumaType: TraumaType | null = null;
  
  // Analyze patterns to determine trauma type
  if (data.financialTraumaResponses) {
    const { 
      moneyMessages, 
      financialFears, 
      childhoodExperiences, 
      emotionalResponse 
    } = data.financialTraumaResponses;
    
    // Relationship trauma indicators
    if (
      (moneyMessages && moneyMessages.includes('Money causes conflict')) ||
      (financialFears && financialFears.includes('Fear of being judged for financial decisions')) ||
      (emotionalResponse && emotionalResponse === 'Guilt or shame')
    ) {
      traumaType = 'relationship';
      insights.push('Your financial patterns show signs of relationship-based financial trauma, which may be affecting your wealth-building decisions.');
    }
    
    // Health trauma indicators
    else if (
      (financialFears && financialFears.includes('Fear of not having enough for healthcare')) ||
      (emotionalResponse && emotionalResponse === 'Anxiety or panic') ||
      (childhoodExperiences && childhoodExperiences.includes('Medical financial crisis'))
    ) {
      traumaType = 'health';
      insights.push('Your responses indicate health-related financial trauma, which often manifests as excessive caution with money.');
    }
    
    // Purpose trauma indicators
    else if (
      (moneyMessages && moneyMessages.includes('Money is the root of all evil')) ||
      (financialFears && financialFears.includes('Fear of becoming greedy or materialistic')) ||
      (emotionalResponse && emotionalResponse === 'Moral conflict')
    ) {
      traumaType = 'purpose';
      insights.push('Your financial patterns suggest purpose-based financial trauma, where wealth conflicts with your sense of meaning or values.');
    }
    
    // Wealth trauma indicators
    else if (
      (moneyMessages && moneyMessages.includes('Rich people are bad or corrupt')) ||
      (financialFears && financialFears.includes('Fear of having too much money')) ||
      (childhoodExperiences && childhoodExperiences.includes('Negative experiences with wealthy people'))
    ) {
      traumaType = 'wealth';
      insights.push('Your responses indicate wealth-based financial trauma, where subconscious beliefs about wealth may be limiting your financial growth.');
    }
  }
  
  // Determine primary blocker based on responses
  let primaryBlocker: PrimaryBlocker | null = null;
  
  if (data.decisionStyle === 'I avoid financial decisions because they feel overwhelming or confusing') {
    primaryBlocker = 'knowledge';
  } else if (data.financialSituation === 'I typically make good money but have little saved to show for it') {
    primaryBlocker = 'behavior';
  } else if (traumaType) {
    primaryBlocker = 'mindset';
  } else if (data.incomeSources.length === 1 && data.incomeSources[0] === 'W2 Employee (Full-time)') {
    primaryBlocker = 'structure';
  } else if (data.financialAccounts.length === 0 || 
            (data.financialAccounts.length === 1 && data.financialAccounts[0] === 'Standard checking/savings accounts')) {
    primaryBlocker = 'tools';
  } else if (data.decisionStyle === 'I handle all financial matters myself and rarely seek outside input') {
    primaryBlocker = 'network';
  }
  
  // Normalize score to 0-100 range
  const normalizedScore = Math.min(Math.max(Math.round(score), 0), 100);
  
  // Determine mindset type based on score
  let mindsetType: MindsetType;
  if (normalizedScore <= 30) {
    mindsetType = 'Deep Contributor Mindset';
  } else if (normalizedScore <= 60) {
    mindsetType = 'Transitioning Contributor';
  } else if (normalizedScore <= 90) {
    mindsetType = 'Emerging Creator';
  } else {
    mindsetType = 'Established Creator';
  }
  
  // Ensure we have at least 3 insights
  if (insights.length < 3) {
    // Add generic insights based on score
    if (normalizedScore <= 30) {
      insights.push('Your financial patterns show strong contributor tendencies that may be limiting your wealth-building potential.');
    } else if (normalizedScore <= 60) {
      insights.push('You show some creator tendencies but still operate with many contributor patterns.');
    } else if (normalizedScore <= 90) {
      insights.push('You have strong creator instincts but could benefit from more advanced wealth structures.');
    } else {
      insights.push('You demonstrate sophisticated creator thinking in most aspects of your financial life.');
    }
  }
  
  // Limit to 3 most important insights
  const limitedInsights = insights.slice(0, 3);
  
  print_message(`Enhanced quiz score calculated: ${normalizedScore}`, 'info');
  if (traumaType) {
    print_message(`Financial trauma type identified: ${traumaType}`, 'info');
  }
  if (primaryBlocker) {
    print_message(`Primary blocker identified: ${primaryBlocker}`, 'info');
  }
  
  return {
    creatorScore: normalizedScore,
    mindsetType,
    insights: limitedInsights,
    traumaType,
    primaryBlocker
  };
};