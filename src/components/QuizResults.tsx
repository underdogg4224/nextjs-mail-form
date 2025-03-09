import React, { useEffect, useRef } from 'react';
import { QuizFormData, QuizResult } from '../types/quiz';
import { generatePDF } from '../utils/pdfGenerator';
import { FiDownload, FiCalendar, FiArrowRight } from 'react-icons/fi';
import anime from 'animejs';

interface QuizResultsProps {
  result: QuizResult;
  formData: QuizFormData;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, formData }) => {
  const scoreRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate the score counter
    if (scoreRef.current) {
      anime({
        targets: scoreRef.current,
        innerHTML: [0, result.creatorScore],
        easing: 'easeInOutExpo',
        round: 1,
        duration: 2000
      });
    }
    
    // Animate the content fade in
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(200, {start: 500}),
        easing: 'easeOutQuad',
        duration: 800
      });
    }
  }, [result.creatorScore]);
  
  const handleDownload = () => {
    const pdfDataUri = generatePDF(formData, result);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = 'Creator-Path-Roadmap.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get color based on score
  const getScoreColor = () => {
    if (result.creatorScore <= 30) return 'text-red-500';
    if (result.creatorScore <= 60) return 'text-yellow-500';
    if (result.creatorScore <= 90) return 'text-green-500';
    return 'text-blue-500';
  };
  
  // Get background color based on score
  const getScoreBgColor = () => {
    if (result.creatorScore <= 30) return 'bg-red-500/10';
    if (result.creatorScore <= 60) return 'bg-yellow-500/10';
    if (result.creatorScore <= 90) return 'bg-green-500/10';
    return 'bg-blue-500/10';
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">YOUR RESULTS</h1>
        
        <div className="flex flex-col items-center justify-center my-8">
          <div className={`w-40 h-40 rounded-full ${getScoreBgColor()} flex items-center justify-center mb-4 border-4 border-opacity-30 ${getScoreColor().replace('text', 'border')}`}>
            <div className="text-center">
              <div ref={scoreRef} className={`text-5xl font-bold ${getScoreColor()}`}>0</div>
              <div className="text-gray-400 text-sm">out of 100</div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white">
            You are currently operating with a
          </h2>
          <h3 className={`text-3xl font-bold ${getScoreColor()} mt-2`}>
            {result.mindsetType}
          </h3>
        </div>
      </div>
      
      <div ref={contentRef} className="space-y-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">YOUR PERSONALIZED INSIGHTS:</h3>
          <ul className="space-y-4">
            {result.insights.map((insight, index) => (
              <li key={index} className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                  {index + 1}
                </div>
                <p className="text-gray-300">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">WHAT'S NEXT?</h3>
          <p className="text-gray-300 mb-6">
            Download your FREE "Creator Path Roadmap" with specific steps to break free from the contributor loop and start building true wealth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleDownload}
              className="btn btn-primary flex-1"
            >
              <FiDownload className="mr-2" /> Download Roadmap
            </button>
            
            <button className="btn btn-outline flex-1">
              <FiCalendar className="mr-2" /> Book Free Strategy Call
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">WANT TO LEARN MORE?</h3>
          <p className="text-gray-300 mb-6">
            Join our community of like-minded individuals who are on the path from contributor to creator. Get access to exclusive resources, workshops, and networking opportunities.
          </p>
          
          <button className="btn btn-secondary w-full">
            Join Creator Path Community <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
      
      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>© 2025 Creator Path - Your journey from Contributor to Creator</p>
      </div>
    </div>
  );
};

export default QuizResults;