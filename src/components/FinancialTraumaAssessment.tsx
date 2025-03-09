import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  FinancialTraumaResponses,
  ChildhoodMoneyMessage,
  FinancialFear,
  ChildhoodExperience,
  EmotionalResponse
} from '../types/quiz';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// Define the schema for the financial trauma assessment
const traumaAssessmentSchema = z.object({
  moneyMessages: z.array(z.string()).min(1, { message: 'Please select at least one childhood money message' }),
  financialFears: z.array(z.string()).min(1, { message: 'Please select at least one financial fear' }),
  childhoodExperiences: z.array(z.string()).min(1, { message: 'Please select at least one childhood experience' }),
  emotionalResponse: z.string().min(1, { message: 'Please select your primary emotional response to financial matters' })
});

interface FinancialTraumaAssessmentProps {
  onComplete: (data: FinancialTraumaResponses) => void;
  onBack: () => void;
  initialData?: FinancialTraumaResponses;
}

const FinancialTraumaAssessment: React.FC<FinancialTraumaAssessmentProps> = ({ 
  onComplete, 
  onBack,
  initialData 
}) => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid }
  } = useForm<FinancialTraumaResponses>({
    resolver: zodResolver(traumaAssessmentSchema),
    mode: 'onChange',
    defaultValues: {
      moneyMessages: initialData?.moneyMessages || [],
      financialFears: initialData?.financialFears || [],
      childhoodExperiences: initialData?.childhoodExperiences || [],
      emotionalResponse: initialData?.emotionalResponse || ''
    }
  });

  const onSubmit = (data: FinancialTraumaResponses) => {
    onComplete(data);
  };

  // Options for each question
  const moneyMessageOptions: ChildhoodMoneyMessage[] = [
    'Money is scarce',
    'Money is hard to earn',
    'Money causes conflict',
    'Rich people are bad or corrupt',
    'Money is the root of all evil',
    'We don\'t talk about money',
    'Money brings freedom and opportunity'
  ];

  const financialFearOptions: FinancialFear[] = [
    'Fear of not having enough',
    'Fear of losing what I have',
    'Fear of being judged for financial decisions',
    'Fear of having too much money',
    'Fear of becoming greedy or materialistic',
    'Fear of not having enough for healthcare',
    'Fear of making financial mistakes'
  ];

  const childhoodExperienceOptions: ChildhoodExperience[] = [
    'Grew up with financial stability',
    'Experienced financial insecurity',
    'Witnessed financial conflicts',
    'Medical financial crisis',
    'Bankruptcy or foreclosure',
    'Negative experiences with wealthy people',
    'Positive experiences with wealth creation'
  ];

  const emotionalResponseOptions: EmotionalResponse[] = [
    'Anxiety or panic',
    'Avoidance or procrastination',
    'Guilt or shame',
    'Excitement or enthusiasm',
    'Moral conflict',
    'Confidence or security',
    'Overwhelm or confusion'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Financial Trauma Assessment</h2>
        <p className="text-gray-300 mb-8">
          Understanding your subconscious patterns with money is crucial for financial transformation.
          Please answer these questions as honestly as possible to identify potential financial trauma patterns.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Childhood Money Messages */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Which messages about money did you hear growing up? (Select all that apply)
          </h3>
          
          <Controller
            name="moneyMessages"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {moneyMessageOptions.map((option) => {
                  const isSelected = field.value?.includes(option);
                  
                  return (
                    <label 
                      key={option} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-700
                        ${isSelected ? 'bg-primary/20 border-primary' : 'bg-gray-800 border-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded"
                          checked={isSelected}
                          onChange={(e) => {
                            const newValue = [...(field.value || [])];
                            if (e.target.checked) {
                              newValue.push(option);
                            } else {
                              const index = newValue.indexOf(option);
                              if (index !== -1) {
                                newValue.splice(index, 1);
                              }
                            }
                            field.onChange(newValue);
                          }}
                        />
                        <span className="ml-3 text-white">{option}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          />
          
          {errors.moneyMessages && (
            <p className="text-red-500 mt-2">{errors.moneyMessages.message}</p>
          )}
        </div>

        {/* Financial Fears */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Which financial fears do you experience most often? (Select all that apply)
          </h3>
          
          <Controller
            name="financialFears"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {financialFearOptions.map((option) => {
                  const isSelected = field.value?.includes(option);
                  
                  return (
                    <label 
                      key={option} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-700
                        ${isSelected ? 'bg-primary/20 border-primary' : 'bg-gray-800 border-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded"
                          checked={isSelected}
                          onChange={(e) => {
                            const newValue = [...(field.value || [])];
                            if (e.target.checked) {
                              newValue.push(option);
                            } else {
                              const index = newValue.indexOf(option);
                              if (index !== -1) {
                                newValue.splice(index, 1);
                              }
                            }
                            field.onChange(newValue);
                          }}
                        />
                        <span className="ml-3 text-white">{option}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          />
          
          {errors.financialFears && (
            <p className="text-red-500 mt-2">{errors.financialFears.message}</p>
          )}
        </div>

        {/* Childhood Experiences */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Which financial experiences shaped your childhood? (Select all that apply)
          </h3>
          
          <Controller
            name="childhoodExperiences"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {childhoodExperienceOptions.map((option) => {
                  const isSelected = field.value?.includes(option);
                  
                  return (
                    <label 
                      key={option} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-700
                        ${isSelected ? 'bg-primary/20 border-primary' : 'bg-gray-800 border-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded"
                          checked={isSelected}
                          onChange={(e) => {
                            const newValue = [...(field.value || [])];
                            if (e.target.checked) {
                              newValue.push(option);
                            } else {
                              const index = newValue.indexOf(option);
                              if (index !== -1) {
                                newValue.splice(index, 1);
                              }
                            }
                            field.onChange(newValue);
                          }}
                        />
                        <span className="ml-3 text-white">{option}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          />
          
          {errors.childhoodExperiences && (
            <p className="text-red-500 mt-2">{errors.childhoodExperiences.message}</p>
          )}
        </div>

        {/* Emotional Response */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            What is your primary emotional response when dealing with financial matters?
          </h3>
          
          <Controller
            name="emotionalResponse"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {emotionalResponseOptions.map((option) => (
                  <label 
                    key={option} 
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-700
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
                ))}
              </div>
            )}
          />
          
          {errors.emotionalResponse && (
            <p className="text-red-500 mt-2">{errors.emotionalResponse.message}</p>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-outline"
          >
            <FiChevronLeft className="mr-2" /> Back to Quiz
          </button>
          
          <button
            type="submit"
            disabled={!isValid}
            className={`btn btn-primary ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Complete Assessment <FiChevronRight className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialTraumaAssessment;