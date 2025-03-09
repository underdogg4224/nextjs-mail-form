import React, { useState } from 'react';
import Layout from '../src/components/Layout';
import LandingPage from '../src/components/LandingPage';
import QuizForm from '../src/components/QuizForm';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
    // Scroll to top when starting quiz
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Layout title={showQuiz ? 'Creator Path Quiz - Discover Your Financial Mindset' : 'Creator Path - Transform Your Financial Mindset'}>
      {showQuiz ? (
        <QuizForm />
      ) : (
        <LandingPage onStartQuiz={handleStartQuiz} />
      )}
    </Layout>
  );
}