import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import anime from 'animejs';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Animate elements when component mounts
    anime({
      targets: '.animate-fade-in',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(200),
      easing: 'easeOutQuad',
      duration: 800
    });
    
    // Animate the check marks
    anime({
      targets: '.check-mark',
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: anime.stagger(300, {start: 800}),
      easing: 'easeOutQuad',
      duration: 600
    });
  }, []);
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className={`text-center mb-16 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="animate-fade-in text-5xl md:text-6xl font-bold text-white mb-6">
          ARE YOU STUCK IN THE <span className="text-primary">WEALTH LOOP</span>?
        </h1>
        
        <p className="animate-fade-in text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Take this 2-minute quiz to discover if you're operating as a "Contributor" or a "Creator" with your money.
        </p>
        
        <p className="animate-fade-in text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Most people are unknowingly trapped in financial patterns that keep them working hard but never building wealth. Find out where you stand and get a FREE personalized roadmap to financial freedom!
        </p>
        
        <button 
          onClick={onStartQuiz}
          className="animate-fade-in btn btn-primary btn-lg px-8 py-3 text-lg"
        >
          Start The Quiz <FiArrowRight className="ml-2" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="animate-fade-in bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">The Contributor Mindset</h2>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Focuses on making money (revenue) rather than keeping it (profit)</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Delegates financial decisions to advisors without understanding the strategies</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Relies on traditional retirement accounts with limited control</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Believes wealth requires decades of saving and compound interest</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Focuses on reducing taxes through deductions rather than strategic structures</p>
            </li>
          </ul>
        </div>
        
        <div className="animate-fade-in bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">The Creator Mindset</h2>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Prioritizes keeping money (profit) over just making it (revenue)</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Maintains control of financial decisions while collaborating with experts</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Uses advanced tax-advantaged structures to build wealth efficiently</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Creates systems that generate wealth regardless of time input</p>
            </li>
            <li className="flex items-start">
              <div className="check-mark flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mt-1 mr-3">
                <FiCheck />
              </div>
              <p className="text-gray-300">Strategically moves money with a network of financially sophisticated peers</p>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="animate-fade-in text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Discover Where You Stand in Just 2 Minutes
        </h2>
        
        <button 
          onClick={onStartQuiz}
          className="btn btn-primary btn-lg px-8 py-3 text-lg"
        >
          Take The Quiz Now <FiArrowRight className="ml-2" />
        </button>
        
        <p className="text-gray-400 mt-4">
          Free personalized results and action plan included!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;