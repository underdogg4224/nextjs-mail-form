import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  QuizFormData,
  AgeGroup,
  IncomeSource,
  FinancialSituation,
  TaxView,
  FinancialAccount,
  FinancialDecisionStyle,
  ProfitResponse,
  WealthBuildingView,
  QuizResult
} from '../types/quiz';
import { calculateCreatorScore } from '../utils/quizScoring';
import QuizResults from './QuizResults';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// Define the quiz schema with Zod
const quizSchema = z.object({
  ageGroup: z.enum([
    '18-25', '26-35', '36-45', '46-55', '56-65', '66+'
  ] as const),
  
  incomeSources: z.array(z.enum([
    'W2 Employee (Full-time)',
    'W2 Employee (Part-time)',
    'Business Owner with employees',
    'Self-employed/Freelancer',
    'Real Estate Investor',
    'Side Hustle Entrepreneur',
    'Retired',
    'Other'
  ] as const)).min(1, { message: 'Please select at least one income source' }),
  
  financialSituation: z.enum([
    'I typically make good money but have little saved to show for it',
    'I carefully budget and save a set percentage of my income',
    'I\'ve built systems that accumulate wealth regardless of my time input',
    'I\'m usually in debt or just breaking even'
  ] as const),
  
  taxView: z.enum([
    'I try to maximize deductions to reduce my tax bill as much as possible',
    'I focus on keeping profit high, even if it means paying more in taxes',
    'I use strategic structures to grow wealth while legally minimizing taxes',
    'I don\'t have a business, just personal expenses'
  ] as const),
  
  financialAccounts: z.array(z.enum([
    'Traditional 401(k) or IRA',
    'Roth IRA',
    'Solo 401(k)',
    'Self-directed IRA/401(k)',
    'HSA (Health Savings Account)',
    'Standard checking/savings accounts',
    'Brokerage investment accounts',
    'None of the above'
  ] as const)),
  
  decisionStyle: z.enum([
    'I rely heavily on financial advisors to manage my investments',
    'I handle all financial matters myself and rarely seek outside input',
    'I maintain control but collaborate with a network of financially sophisticated peers',
    'I avoid financial decisions because they feel overwhelming or confusing'
  ] as const),
  
  profitResponse: z.enum([
    'I reinvest almost everything back into growth',
    'I take most profits out to enjoy life and reward my hard work',
    'I strategically allocate profits between tax-advantaged accounts, investments, and lifestyle',
    'I focus on reducing taxable income through additional expenses and deductions'
  ] as const),
  
  wealthBuildingView: z.enum([
    'Building wealth requires decades of consistent saving and compound interest',
    'Wealth comes from taking big risks and making bold moves',
    'Wealth creation is primarily about structure and strategy, not just income',
    'Wealth is about who you know and connections you have'
  ] as const)
});

// Define the steps of the quiz
const quizSteps = [
  {
    id: 'ageGroup',
    title: 'Which age group do you fall into?',
    options: [
      '18-25', '26-35', '36-45', '46-55', '56-65', '66+'
    ]
  },
  {
    id: 'incomeSources',
    title: 'What best describes your current income situation? (Select all that apply)',
    options: [
      'W2 Employee (Full-time)',
      'W2 Employee (Part-time)',
      'Business Owner with employees',
      'Self-employed/Freelancer',
      'Real Estate Investor',
      'Side Hustle Entrepreneur',
      'Retired',
      'Other'
    ],
    multiple: true
  },
  {
    id: 'financialSituation',
    title: 'At the end of each year, which statement best describes your financial situation?',
    options: [
      'I typically make good money but have little saved to show for it',
      'I carefully budget and save a set percentage of my income',
      'I\'ve built systems that accumulate wealth regardless of my time input',
      'I\'m usually in debt or just breaking even'
    ]
  },
  {
    id: 'taxView',
    title: 'How do you primarily view business expenses and tax deductions?',
    options: [
      'I try to maximize deductions to reduce my tax bill as much as possible',
      'I focus on keeping profit high, even if it means paying more in taxes',
      'I use strategic structures to grow wealth while legally minimizing taxes',
      'I don\'t have a business, just personal expenses'
    ]
  },
  {
    id: 'financialAccounts',
    title: 'Which financial accounts do you currently use? (Select all that apply)',
    options: [
      'Traditional 401(k) or IRA',
      'Roth IRA',
      'Solo 401(k)',
      'Self-directed IRA/401(k)',
      'HSA (Health Savings Account)',
      'Standard checking/savings accounts',
      'Brokerage investment accounts',
      'None of the above'
    ],
    multiple: true
  },
  {
    id: 'decisionStyle',
    title: 'When it comes to financial decisions, which statement feels most true?',
    options: [
      'I rely heavily on financial advisors to manage my investments',
      'I handle all financial matters myself and rarely seek outside input',
      'I maintain control but collaborate with a network of financially sophisticated peers',
      'I avoid financial decisions because they feel overwhelming or confusing'
    ]
  },
  {
    id: 'profitResponse',
    title: 'How do you typically respond when your business or career has a highly profitable year?',
    options: [
      'I reinvest almost everything back into growth',
      'I take most profits out to enjoy life and reward my hard work',
      'I strategically allocate profits between tax-advantaged accounts, investments, and lifestyle',
      'I focus on reducing taxable income through additional expenses and deductions'
    ]
  },
  {
    id: 'wealthBuildingView',
    title: 'Which statement about wealth building resonates most with you?',
    options: [
      'Building wealth requires decades of consistent saving and compound interest',
      'Wealth comes from taking big risks and making bold moves',
      'Wealth creation is primarily about structure and strategy, not just income',
      'Wealth is about who you know and connections you have'
    ]
  }
];

const QuizForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  
  const { 
    control, 
    handleSubmit, 
    watch,
    formState: { errors, isValid }
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    mode: 'onChange',
    defaultValues: {
      incomeSources: [],
      financialAccounts: []
    }
  });
  
  const watchAllFields = watch();
  
  const onSubmit = (data: QuizFormData) => {
    const result = calculateCreatorScore(data);
    setQuizResult(result);
  };
  
  const nextStep = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Check if the current step is valid
  const isCurrentStepValid = () => {
    const currentField = quizSteps[currentStep].id as keyof QuizFormData;
    
    if (currentField === 'incomeSources' && Array.isArray(watchAllFields.incomeSources)) {
      return watchAllFields.incomeSources.length > 0;
    }
    
    if (currentField === 'financialAccounts' && Array.isArray(watchAllFields.financialAccounts)) {
      return true; // Financial accounts can be empty
    }
    
    return !!watchAllFields[currentField];
  };
  
  // If we have results, show the results component
  if (quizResult) {
    return <QuizResults result={quizResult} formData={watchAllFields} />;
  }
  
  const currentQuestion = quizSteps[currentStep];
  const isMultiple = currentQuestion.multiple || false;
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">{currentQuestion.title}</h2>
        
        <div className="space-y-3">
          <Controller
            name={currentQuestion.id as keyof QuizFormData}
            control={control}
            render={({ field }) => (
              <>
                {currentQuestion.options.map((option) => {
                  // For multiple selection (checkboxes)
                  if (isMultiple) {
                    const fieldArray = field.value as string[];
                    const isChecked = fieldArray?.includes(option);
                    
                    return (
                      <label 
                        key={option} 
                        className={`block p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-700
                          ${isChecked ? 'bg-primary/20 border-primary' : 'bg-gray-800 border-gray-700'}`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-primary rounded"
                            checked={isChecked}
                            onChange={(e) => {
                              const newValue = [...(fieldArray || [])];
                              if (e.target.checked) {
                                // Special case for "None of the above"
                                if (option === 'None of the above') {
                                  field.onChange(['None of the above']);
                                } else {
                                  // Remove "None of the above" if it exists
                                  const filteredValue = newValue.filter(v => v !== 'None of the above');
                                  filteredValue.push(option);
                                  field.onChange(filteredValue);
                                }
                              } else {
                                field.onChange(newValue.filter(v => v !== option));
                              }
                            }}
                          />
                          <span className="ml-3 text-white">{option}</span>
                        </div>
                      </label>
                    );
                  }
                  
                  // For single selection (radio buttons)
                  return (
                    <label 
                      key={option} 
                      className={`block p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-700
                        ${field.value === option ? 'bg-primary/20 border-primary' : 'bg-gray-800 border-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-primary"
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                        />
                        <span className="ml-3 text-white">{option}</span>
                      </div>
                    </label>
                  );
                })}
              </>
            )}
          />
        </div>
        
        {errors[currentQuestion.id as keyof QuizFormData] && (
          <p className="text-red-500 mt-2">
            {errors[currentQuestion.id as keyof QuizFormData]?.message as string}
          </p>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className={`btn ${currentStep === 0 ? 'btn-disabled opacity-50' : 'btn-outline'}`}
          disabled={currentStep === 0}
        >
          <FiChevronLeft className="mr-2" /> Previous
        </button>
        
        <button
          type="button"
          onClick={nextStep}
          disabled={!isCurrentStepValid()}
          className={`btn btn-primary ${!isCurrentStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {currentStep === quizSteps.length - 1 ? 'See Results' : 'Next'} <FiChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default QuizForm;