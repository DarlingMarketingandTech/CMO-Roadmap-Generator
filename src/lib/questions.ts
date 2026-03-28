import type { IntakeAnswers } from './types';

export interface Question {
  id: keyof IntakeAnswers;
  label: string;
  description: string;
  type: 'single' | 'multi';
  options: { value: string; label: string; description?: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'businessType',
    label: 'What type of business do you run?',
    description: 'Select the category that best describes your organization.',
    type: 'single',
    options: [
      { value: 'b2b-saas', label: 'B2B SaaS / Software', description: 'Software product sold to other businesses' },
      { value: 'local-service', label: 'Local Service Business', description: 'Services delivered in a specific geography' },
      { value: 'healthcare', label: 'Healthcare / Wellness', description: 'Medical, dental, therapy, or wellness' },
      { value: 'ecommerce', label: 'E-commerce / DTC', description: 'Online store selling products direct to consumer' },
      { value: 'professional-service', label: 'Professional Services', description: 'Law, accounting, consulting, finance' },
      { value: 'agency', label: 'Agency / Consulting', description: 'Marketing, design, or strategy agency' },
      { value: 'nonprofit', label: 'Nonprofit / Mission-Driven', description: 'Charitable or mission-driven organization' },
      { value: 'other', label: 'Other', description: 'Something else entirely' },
    ],
  },
  {
    id: 'businessStage',
    label: 'What stage is your business at?',
    description: 'This helps us calibrate the complexity and pace of your roadmap.',
    type: 'single',
    options: [
      { value: 'pre-launch', label: 'Pre-Launch', description: 'Not yet live — building toward launch' },
      { value: 'early', label: 'Early Stage', description: '0–2 years old, under $1M ARR or equivalent' },
      { value: 'growth', label: 'Growth Stage', description: '2–5 years, $1M–$10M ARR, scaling fast' },
      { value: 'established', label: 'Established', description: '$10M+ ARR or 5+ years in business' },
      { value: 'enterprise', label: 'Enterprise', description: 'Large organization with complex structure' },
    ],
  },
  {
    id: 'primaryGoal',
    label: 'What is your primary goal for the next 90 days?',
    description: 'Pick the single most important outcome you want from your marketing.',
    type: 'single',
    options: [
      { value: 'more-leads', label: 'Generate More Leads', description: 'Fill the top of the funnel with qualified prospects' },
      { value: 'more-bookings', label: 'Increase Bookings / Appointments', description: 'Drive more calls, demos, or in-person visits' },
      { value: 'roi-clarity', label: 'Understand Marketing ROI', description: 'Know what is and is not working, and why' },
      { value: 'brand-awareness', label: 'Build Brand Awareness', description: 'Increase visibility and recognition in your market' },
      { value: 'retention', label: 'Improve Retention / LTV', description: 'Keep customers longer and increase lifetime value' },
      { value: 'launch', label: 'Launch a New Product or Brand', description: 'Bring something new to market successfully' },
    ],
  },
  {
    id: 'bottleneck',
    label: 'What is your biggest marketing bottleneck right now?',
    description: 'Be honest — identifying the real constraint unlocks the best roadmap.',
    type: 'single',
    options: [
      { value: 'unclear-messaging', label: 'Unclear Messaging / Positioning', description: "People don't understand what you do or why they should care" },
      { value: 'no-leads', label: 'Not Enough Leads', description: 'Pipeline is dry or inconsistent' },
      { value: 'messy-stack', label: 'Disorganized Marketing Stack', description: 'Tools are disconnected, data is unreliable' },
      { value: 'poor-conversion', label: 'Poor Conversion Rates', description: 'Traffic exists but visitors are not converting' },
      { value: 'no-reporting', label: 'Lack of Reporting / ROI Visibility', description: 'You have no idea what marketing is actually producing' },
      { value: 'team-capacity', label: 'Team Capacity / Bandwidth', description: 'Too much to do, not enough people or time' },
    ],
  },
  {
    id: 'activeChannels',
    label: 'Which marketing channels are currently active?',
    description: 'Select all that apply. Choose "None" if you are just getting started.',
    type: 'multi',
    options: [
      { value: 'seo', label: 'SEO / Organic Search', description: 'Content, blog, or technical SEO' },
      { value: 'paid-search', label: 'Paid Search', description: 'Google Ads, Bing Ads, PPC' },
      { value: 'social-media', label: 'Social Media', description: 'Organic or paid social channels' },
      { value: 'email', label: 'Email Marketing', description: 'Newsletters, sequences, or campaigns' },
      { value: 'content', label: 'Content Marketing', description: 'Blog, video, podcast, or guides' },
      { value: 'events', label: 'Events / Webinars', description: 'In-person or virtual events' },
      { value: 'referral', label: 'Referral / Partnerships', description: 'Word-of-mouth or affiliate programs' },
      { value: 'none', label: 'None Yet', description: 'Just getting started with marketing' },
    ],
  },
  {
    id: 'stackMaturity',
    label: 'How would you describe your marketing technology stack?',
    description: 'Be candid — this shapes how we approach your systems phase.',
    type: 'single',
    options: [
      { value: 'none', label: 'No Formal Stack', description: 'Using spreadsheets or no tools at all' },
      { value: 'basic', label: 'Basic Tools Only', description: 'Email platform and maybe a basic CRM' },
      { value: 'messy', label: 'Messy / Disconnected', description: 'Many tools that do not talk to each other' },
      { value: 'solid', label: 'Solid but Could Be Better', description: 'Good foundation with some gaps' },
      { value: 'advanced', label: 'Advanced and Well-Integrated', description: 'Mature stack with strong data flow' },
    ],
  },
  {
    id: 'teamCapacity',
    label: 'What is your available team capacity for marketing?',
    description: 'This determines the scope and complexity of your recommended roadmap.',
    type: 'single',
    options: [
      { value: 'founder-only', label: 'Just Me (Founder / Owner)', description: 'Marketing is one of many hats I wear' },
      { value: 'small-team', label: 'Small Team (1–2 people)', description: 'A small but dedicated group' },
      { value: 'dedicated-marketer', label: 'Dedicated Marketer(s)', description: 'One or more full-time marketing roles' },
      { value: 'full-team', label: 'Full Marketing Team', description: 'Multiple specialists across functions' },
    ],
  },
];
