# Creator Path Financial Transformation App

A modern web application that helps users transition from a contributor to a creator mindset with their finances. The app features a quiz that assesses the user's current financial patterns and provides personalized insights and recommendations.

## Features

- **Financial Mindset Quiz**: An 8-question assessment that evaluates where users fall on the contributor-creator spectrum
- **Personalized Results**: Detailed analysis of the user's financial patterns with specific insights
- **PDF Report Generation**: Downloadable personalized roadmap with actionable steps
- **Modern UI**: Dark-themed, responsive interface built with Next.js, TypeScript, and Tailwind CSS
- **Smooth Animations**: Engaging user experience with AnimeJS animations

## Tech Stack

- **Frontend**: Next.js, TypeScript, React Hook Form, Zod
- **Styling**: Tailwind CSS, DaisyUI
- **Animations**: AnimeJS
- **PDF Generation**: jsPDF
- **Form Validation**: Zod, React Hook Form

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/underdogg4224/creator-path-app.git
   cd creator-path-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
creator-path-app/
├── pages/               # Next.js pages
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── styles/              # Global styles
├── .env.example         # Environment variables example
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Key Components

- **QuizForm**: Multi-step form that collects user information about their financial patterns
- **QuizResults**: Displays personalized results and insights based on quiz answers
- **LandingPage**: Engaging introduction to the quiz with information about contributor vs. creator mindsets
- **Layout**: Common layout with header and footer used across the application

## Customization

You can customize the application by:

1. Modifying the quiz questions and scoring in `src/utils/quizScoring.ts`
2. Updating the PDF template in `src/utils/pdfGenerator.ts`
3. Changing the theme colors in `tailwind.config.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the wealth seminar concepts of contributor vs. creator financial mindsets
- Built with modern web technologies for optimal user experience