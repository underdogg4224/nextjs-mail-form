import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { print_message } from '../utils/logger';

// Base URL for the API
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// API key for authentication
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a Supabase client with type safety
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      print_message(`Error fetching user profile: ${error.message}`, 'error');
      throw error;
    }
    
    return data;
  } catch (err) {
    print_message(`Unexpected error in getUserProfile: ${err}`, 'error');
    throw err;
  }
}

// Helper function to save quiz results
export async function saveQuizResults(
  userId: string, 
  responses: any, 
  creatorScore: number,
  mindsetType: string,
  insights: string[]
) {
  try {
    // First, save the quiz response
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .insert({
        user_id: userId,
        responses: responses,
        creator_score: creatorScore,
        mindset_type: mindsetType,
        insights: insights
      })
      .select()
      .single();
      
    if (quizError) {
      print_message(`Error saving quiz responses: ${quizError.message}`, 'error');
      throw quizError;
    }
    
    // Then, update the user's profile with the latest score
    const { error: userError } = await supabase
      .from('users')
      .update({ 
        creator_score: creatorScore,
        mindset_type: mindsetType,
        last_quiz_date: new Date().toISOString()
      })
      .eq('id', userId);
      
    if (userError) {
      print_message(`Error updating user profile: ${userError.message}`, 'error');
      throw userError;
    }
    
    // Generate and save action steps
    await generateAndSaveActionSteps(userId, mindsetType, responses);
    
    return quizData;
  } catch (err) {
    print_message(`Unexpected error in saveQuizResults: ${err}`, 'error');
    throw err;
  }
}

// Helper function to generate and save action steps
async function generateAndSaveActionSteps(
  userId: string,
  mindsetType: string,
  responses: any
) {
  try {
    // First, clear existing incomplete action steps
    const { error: clearError } = await supabase
      .from('action_steps')
      .delete()
      .eq('user_id', userId)
      .eq('is_completed', false);
      
    if (clearError) {
      print_message(`Error clearing existing action steps: ${clearError.message}`, 'error');
      throw clearError;
    }
    
    // Generate new action steps based on mindset type
    const actionSteps = generateActionSteps(mindsetType, responses);
    
    // Add user_id to each action step
    const stepsWithUserId = actionSteps.map(step => ({
      ...step,
      user_id: userId
    }));
    
    // Insert new action steps
    const { error: insertError } = await supabase
      .from('action_steps')
      .insert(stepsWithUserId);
      
    if (insertError) {
      print_message(`Error inserting action steps: ${insertError.message}`, 'error');
      throw insertError;
    }
    
    return true;
  } catch (err) {
    print_message(`Unexpected error in generateAndSaveActionSteps: ${err}`, 'error');
    throw err;
  }
}

// Helper function to generate action steps based on mindset type
function generateActionSteps(mindsetType: string, responses: any) {
  const steps = [];
  
  // Deep Contributor Mindset (0-30)
  if (mindsetType === 'Deep Contributor Mindset') {
    steps.push({
      title: 'Track Your Profit, Not Just Revenue',
      description: 'Set up a simple system to track how much money you actually keep, not just how much you make.',
      category: 'financial_basics',
      priority: 1,
      is_completed: false
    });
    
    steps.push({
      title: 'Open Your First Self-Directed Account',
      description: 'Research and open a self-directed IRA or Roth IRA with a reputable custodian.',
      category: 'accounts',
      priority: 2,
      is_completed: false
    });
    
    steps.push({
      title: 'Build Your Financial Education',
      description: 'Read "Tax-Free Wealth" by Tom Wheelwright to understand how the tax code can work for you.',
      category: 'education',
      priority: 3,
      is_completed: false
    });
    
    steps.push({
      title: 'Find Your First Financial Friend',
      description: 'Identify someone in your network who thinks differently about money and schedule a conversation.',
      category: 'network',
      priority: 4,
      is_completed: false
    });
  }
  
  // Transitioning Contributor (31-60)
  else if (mindsetType === 'Transitioning Contributor') {
    steps.push({
      title: 'Transition to Self-Directed Structures',
      description: 'Begin moving traditional retirement accounts to self-directed structures for more control.',
      category: 'accounts',
      priority: 1,
      is_completed: false
    });
    
    steps.push({
      title: 'Implement Basic Tax Strategies',
      description: 'Consult with a tax professional about entity structures and basic tax planning.',
      category: 'tax',
      priority: 2,
      is_completed: false
    });
    
    steps.push({
      title: 'Focus on Business Profit',
      description: 'Implement a profit-first approach in your business or side hustle.',
      category: 'business',
      priority: 3,
      is_completed: false
    });
    
    steps.push({
      title: 'Start Moving Money with Financial Friends',
      description: 'Identify a small, low-risk project to invest in with your financial network.',
      category: 'network',
      priority: 4,
      is_completed: false
    });
  }
  
  // Emerging Creator (61-90)
  else if (mindsetType === 'Emerging Creator') {
    steps.push({
      title: 'Implement Advanced Tax Strategies',
      description: 'Work with a tax architect to develop a comprehensive tax strategy.',
      category: 'tax',
      priority: 1,
      is_completed: false
    });
    
    steps.push({
      title: 'Consider ROBS Structure',
      description: 'Evaluate if a Rollover as Business Startup (ROBS) structure is appropriate for your situation.',
      category: 'accounts',
      priority: 2,
      is_completed: false
    });
    
    steps.push({
      title: 'Begin Family Banking Planning',
      description: 'Research and plan a family banking structure for generational wealth transfer.',
      category: 'legacy',
      priority: 3,
      is_completed: false
    });
    
    steps.push({
      title: 'Expand Your Financial Network',
      description: 'Join or create a mastermind group of financially sophisticated peers.',
      category: 'network',
      priority: 4,
      is_completed: false
    });
  }
  
  // Established Creator (91-100)
  else {
    steps.push({
      title: 'Optimize Existing Structures',
      description: 'Review and optimize your current wealth structures for maximum efficiency.',
      category: 'optimization',
      priority: 1,
      is_completed: false
    });
    
    steps.push({
      title: 'Establish Family Office Structures',
      description: 'Consider setting up formal family office structures for comprehensive wealth management.',
      category: 'legacy',
      priority: 2,
      is_completed: false
    });
    
    steps.push({
      title: 'Implement Advanced Legacy Planning',
      description: 'Work with estate planning attorneys to implement sophisticated legacy strategies.',
      category: 'legacy',
      priority: 3,
      is_completed: false
    });
    
    steps.push({
      title: 'Mentor Others',
      description: 'Begin mentoring others in creator-side thinking and wealth building.',
      category: 'network',
      priority: 4,
      is_completed: false
    });
  }
  
  // Add custom steps based on specific responses
  if (responses.incomeSources && responses.incomeSources.includes('W2 Employee (Full-time)')) {
    steps.push({
      title: 'Explore Side Business Opportunities',
      description: 'Start a side business to practice creator-side thinking and create additional income streams.',
      category: 'business',
      priority: 2,
      is_completed: false
    });
  }
  
  if (responses.financialAccounts && !responses.financialAccounts.includes('Self-directed IRA/401(k)')) {
    steps.push({
      title: 'Learn About Self-Directed Accounts',
      description: 'Attend a workshop or webinar about self-directed retirement accounts and their benefits.',
      category: 'education',
      priority: 2,
      is_completed: false
    });
  }
  
  return steps;
}

// Helper function to get user's action steps
export async function getUserActionSteps(userId: string) {
  try {
    const { data, error } = await supabase
      .from('action_steps')
      .select('*')
      .eq('user_id', userId)
      .order('priority', { ascending: true });
      
    if (error) {
      print_message(`Error fetching action steps: ${error.message}`, 'error');
      throw error;
    }
    
    return data;
  } catch (err) {
    print_message(`Unexpected error in getUserActionSteps: ${err}`, 'error');
    throw err;
  }
}

// Helper function to update action step completion status
export async function updateActionStepStatus(stepId: string, isCompleted: boolean) {
  try {
    const { data, error } = await supabase
      .from('action_steps')
      .update({ is_completed: isCompleted })
      .eq('id', stepId)
      .select()
      .single();
      
    if (error) {
      print_message(`Error updating action step: ${error.message}`, 'error');
      throw error;
    }
    
    return data;
  } catch (err) {
    print_message(`Unexpected error in updateActionStepStatus: ${err}`, 'error');
    throw err;
  }
}

// Helper function to get user's quiz history
export async function getUserQuizHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('quiz_responses')
      .select('id, created_at, creator_score, mindset_type')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      print_message(`Error fetching quiz history: ${error.message}`, 'error');
      throw error;
    }
    
    return data;
  } catch (err) {
    print_message(`Unexpected error in getUserQuizHistory: ${err}`, 'error');
    throw err;
  }
}

// Helper function to get educational content based on mindset type
export async function getEducationalContent(mindsetType: string) {
  try {
    const { data, error } = await supabase
      .from('educational_content')
      .select('*')
      .eq('target_mindset', mindsetType)
      .order('priority', { ascending: true });
      
    if (error) {
      print_message(`Error fetching educational content: ${error.message}`, 'error');
      throw error;
    }
    
    return data;
  } catch (err) {
    print_message(`Unexpected error in getEducationalContent: ${err}`, 'error');
    throw err;
  }
}