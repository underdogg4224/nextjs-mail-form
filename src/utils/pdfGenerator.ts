import { jsPDF } from 'jspdf';
import { QuizFormData, QuizResult } from '../types/quiz';

// Generate a PDF report based on quiz results
export const generatePDF = (formData: QuizFormData, result: QuizResult): string => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(22);
  doc.setTextColor(33, 33, 33);
  doc.text('Your Creator Path Roadmap', 105, 20, { align: 'center' });
  
  // Add subtitle with score
  doc.setFontSize(16);
  doc.setTextColor(79, 70, 229); // Primary color
  doc.text(`Creator Score: ${result.creatorScore}/100`, 105, 30, { align: 'center' });
  
  // Add mindset type
  doc.setFontSize(18);
  doc.setTextColor(33, 33, 33);
  doc.text(`You are currently operating with a`, 105, 40, { align: 'center' });
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129); // Secondary color
  doc.text(`${result.mindsetType}`, 105, 48, { align: 'center' });
  
  // Add divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 55, 190, 55);
  
  // Add insights section
  doc.setFontSize(16);
  doc.setTextColor(33, 33, 33);
  doc.text('YOUR PERSONALIZED INSIGHTS:', 20, 65);
  
  doc.setFontSize(12);
  doc.setTextColor(66, 66, 66);
  
  let yPosition = 75;
  result.insights.forEach((insight, index) => {
    // Split long text into multiple lines
    const lines = doc.splitTextToSize(insight, 170);
    doc.text(`${index + 1}. ${lines[0]}`, 20, yPosition);
    
    // Handle multi-line insights
    if (lines.length > 1) {
      for (let i = 1; i < lines.length; i++) {
        yPosition += 6;
        doc.text(`   ${lines[i]}`, 20, yPosition);
      }
    }
    
    yPosition += 10;
  });
  
  // Add divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  
  // Add next steps section based on score
  doc.setFontSize(16);
  doc.setTextColor(33, 33, 33);
  doc.text('YOUR NEXT STEPS:', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(66, 66, 66);
  
  let nextSteps: string[] = [];
  
  if (result.creatorScore <= 30) {
    // Deep Contributor Mindset
    nextSteps = [
      'Begin tracking your profit, not just your revenue',
      'Open your first self-directed investment account',
      'Start building your financial education with books on wealth structures',
      'Identify potential "financial friends" who think differently about money',
      'Consider starting a side business to practice creator-side thinking'
    ];
  } else if (result.creatorScore <= 60) {
    // Transitioning Contributor
    nextSteps = [
      'Transition from traditional retirement accounts to self-directed structures',
      'Begin implementing basic tax strategies with a qualified professional',
      'Focus on building business profit rather than just revenue',
      'Start moving money with financial friends on small, low-risk projects',
      'Consider a Solo 401(k) if you have self-employment income'
    ];
  } else if (result.creatorScore <= 90) {
    // Emerging Creator
    nextSteps = [
      'Implement more advanced tax strategies with a tax architect',
      'Consider ROBS (Rollover as Business Startup) structures if appropriate',
      'Begin family banking structure planning',
      'Expand your financial network to include more sophisticated investors',
      'Explore private investment opportunities with your financial friends'
    ];
  } else {
    // Established Creator
    nextSteps = [
      'Optimize your existing structures for maximum efficiency',
      'Consider establishing family office structures',
      'Implement advanced legacy planning strategies',
      'Mentor others in creator-side thinking',
      'Explore international wealth protection strategies'
    ];
  }
  
  nextSteps.forEach((step, index) => {
    doc.text(`${index + 1}. ${step}`, 20, yPosition);
    yPosition += 8;
  });
  
  // Add divider
  yPosition += 2;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  
  // Add resources section
  doc.setFontSize(16);
  doc.setTextColor(33, 33, 33);
  doc.text('RECOMMENDED RESOURCES:', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(66, 66, 66);
  
  const resources = [
    'Book: "Tax-Free Wealth" by Tom Wheelwright',
    'Book: "Rich Dad Poor Dad" by Robert Kiyosaki',
    'Website: www.creatorpath.com for additional strategies',
    'Podcast: The Creator Path Podcast for weekly insights',
    'Community: Join our Creator Path community for networking'
  ];
  
  resources.forEach((resource, index) => {
    doc.text(`• ${resource}`, 20, yPosition);
    yPosition += 8;
  });
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text('© 2025 Creator Path - Your journey from Contributor to Creator', 105, 280, { align: 'center' });
  
  // Generate PDF as base64 string
  return doc.output('datauristring');
};