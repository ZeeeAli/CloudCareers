import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import Button from '../../components/base/Button';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Article content data
  const articles = {
    'remote-work-success-guide': {
      title: 'The Complete Guide to Remote Work Success',
      category: 'Remote Work',
      readTime: '8 min read',
      image: 'https://readdy.ai/api/search-image?query=remote%20work%20setup%20home%20office%20desk%20with%20laptop%2C%20modern%20workspace%20design%2C%20productivity%20focused%20environment%2C%20clean%20minimal%20background&width=800&height=400&seq=article1&orientation=landscape',
      content: `
        <h2>Introduction</h2>
        <p>Remote work has become the new normal for millions of professionals worldwide. While it offers incredible flexibility and work-life balance, it also presents unique challenges that require specific strategies to overcome.</p>
        
        <h2>Setting Up Your Remote Workspace</h2>
        <p>Your workspace is your productivity sanctuary. Invest in ergonomic furniture, proper lighting, and eliminate distractions. A dedicated workspace helps create mental boundaries between work and personal life.</p>
        
        <h2>Time Management Strategies</h2>
        <p>Use time-blocking techniques, set clear priorities, and establish regular working hours. Tools like Pomodoro timers and calendar apps can significantly improve your productivity.</p>
        
        <h2>Communication Best Practices</h2>
        <p>Over-communicate rather than under-communicate. Use video calls for complex discussions, written communication for updates, and always confirm understanding of tasks and deadlines.</p>
        
        <h2>Maintaining Work-Life Balance</h2>
        <p>Set strict boundaries for work hours, take regular breaks, and create end-of-day rituals to transition from work mode to personal time.</p>
        
        <h2>Building Relationships Remotely</h2>
        <p>Participate in virtual team building activities, schedule casual coffee chats, and be proactive about networking within your organization.</p>
        
        <h2>Conclusion</h2>
        <p>Remote work success is achievable with the right mindset, tools, and strategies. Focus on continuous improvement and adapt these practices to your unique situation.</p>
      `
    },
    'resume-tips-remote': {
      title: 'Resume Tips for Remote Job Applications',
      category: 'Resume Tips',
      readTime: '6 min read',
      image: 'https://readdy.ai/api/search-image?query=resume%20document%20professional%20job%20application%20remote%20work%20skills%20highlighting&width=800&height=400&seq=article2&orientation=landscape',
      content: `
        <h2>Why Remote Job Resumes Are Different</h2>
        <p>Remote job applications require highlighting specific skills and experiences that demonstrate your ability to work independently and effectively in a virtual environment.</p>
        
        <h2>Key Skills to Highlight</h2>
        <p>Emphasize self-motivation, time management, communication skills, technical proficiency, and experience with remote collaboration tools.</p>
        
        <h2>Formatting for ATS Systems</h2>
        <p>Use clean, simple formatting with relevant keywords. Many companies use Applicant Tracking Systems that scan for specific terms related to remote work capabilities.</p>
        
        <h2>Quantify Your Achievements</h2>
        <p>Use specific numbers and metrics to demonstrate your impact. For example: "Increased team productivity by 25% through implementation of remote collaboration tools."</p>
        
        <h2>Remote Work Experience Section</h2>
        <p>If you have previous remote work experience, create a dedicated section highlighting your achievements and the tools you used.</p>
        
        <h2>Final Tips</h2>
        <p>Keep your resume concise, proofread carefully, and tailor it to each specific remote job application.</p>
      `
    },
    'interview-preparation': {
      title: 'Remote Job Interview Preparation',
      category: 'Interview Tips',
      readTime: '10 min read',
      image: 'https://readdy.ai/api/search-image?query=remote%20job%20interview%20video%20call%20preparation%20professional%20setup&width=800&height=400&seq=article3&orientation=landscape',
      content: `
        <h2>Pre-Interview Technical Setup</h2>
        <p>Test your internet connection, camera, and microphone. Ensure you have a quiet, well-lit environment with a professional background.</p>
        
        <h2>Common Remote Interview Questions</h2>
        <p>Prepare for questions about your remote work experience, time management skills, communication preferences, and how you handle challenges independently.</p>
        
        <h2>Demonstrating Remote Work Skills</h2>
        <p>Share specific examples of how you've successfully worked remotely, managed projects independently, and collaborated with virtual teams.</p>
        
        <h2>Questions to Ask Interviewers</h2>
        <p>Ask about remote work policies, communication tools, team collaboration practices, and performance evaluation methods.</p>
        
        <h2>Follow-Up Best Practices</h2>
        <p>Send a thank-you email within 24 hours, reiterate your interest, and mention specific points from the conversation.</p>
      `
    },
    'productivity-tools': {
      title: 'Top Productivity Tools for Remote Workers',
      category: 'Productivity',
      readTime: '7 min read',
      image: 'https://readdy.ai/api/search-image?query=productivity%20tools%20apps%20remote%20work%20software%20organization%20time%20management&width=800&height=400&seq=article4&orientation=landscape',
      content: `
        <h2>Project Management Tools</h2>
        <p>Tools like Asana, Trello, and Monday.com help organize tasks, track progress, and collaborate with team members effectively.</p>
        
        <h2>Communication Platforms</h2>
        <p>Slack, Microsoft Teams, and Discord facilitate real-time communication, file sharing, and team collaboration.</p>
        
        <h2>Time Tracking Applications</h2>
        <p>Use Toggl, RescueTime, or Clockify to monitor your productivity, identify time-wasters, and optimize your work schedule.</p>
        
        <h2>Focus and Distraction Management</h2>
        <p>Forest, Freedom, and Cold Turkey help minimize distractions and maintain focus during work sessions.</p>
        
        <h2>File Organization and Sharing</h2>
        <p>Google Drive, Dropbox, and Notion provide cloud storage and collaborative document editing capabilities.</p>
      `
    },
    'work-life-balance': {
      title: 'Maintaining Work-Life Balance in Remote Work',
      category: 'Wellness',
      readTime: '9 min read',
      image: 'https://readdy.ai/api/search-image?query=work%20life%20balance%20remote%20work%20wellness%20mental%20health%20boundaries&width=800&height=400&seq=article5&orientation=landscape',
      content: `
        <h2>The Challenge of Remote Work Boundaries</h2>
        <p>Without physical separation between work and home, it's crucial to establish clear boundaries to prevent burnout and maintain mental health.</p>
        
        <h2>Creating Physical Boundaries</h2>
        <p>Designate a specific workspace, preferably in a separate room. When you're done working, physically leave that space to signal the end of your workday.</p>
        
        <h2>Time Management Strategies</h2>
        <p>Set strict start and end times for work, schedule regular breaks, and avoid checking work emails outside of business hours.</p>
        
        <h2>Mental Health and Wellness</h2>
        <p>Practice mindfulness, exercise regularly, and maintain social connections. Remote work can be isolating, so prioritize your mental well-being.</p>
        
        <h2>Communication with Family and Roommates</h2>
        <p>Clearly communicate your work schedule and boundaries to those you live with to minimize interruptions during work hours.</p>
      `
    },
    'networking-remote': {
      title: 'Building Professional Networks in Remote Work',
      category: 'Networking',
      readTime: '5 min read',
      image: 'https://readdy.ai/api/search-image?query=professional%20networking%20remote%20work%20online%20community%20relationships&width=800&height=400&seq=article6&orientation=landscape',
      content: `
        <h2>The Importance of Remote Networking</h2>
        <p>Building professional relationships is crucial for career growth, even in remote work environments. Virtual networking requires different strategies than in-person networking.</p>
        
        <h2>Leveraging Social Media</h2>
        <p>Use LinkedIn, Twitter, and industry-specific platforms to connect with professionals, share insights, and participate in relevant conversations.</p>
        
        <h2>Virtual Events and Webinars</h2>
        <p>Attend online conferences, webinars, and virtual meetups. Many events now offer virtual networking rooms and breakout sessions.</p>
        
        <h2>Online Communities and Forums</h2>
        <p>Join Slack communities, Discord servers, and industry forums where professionals gather to discuss trends and share knowledge.</p>
        
        <h2>Follow-Up and Relationship Building</h2>
        <p>After making connections, follow up with personalized messages and find ways to provide value to your network.</p>
      `
    }
  };

  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
            <Button onClick={() => navigate('/career-resources')}>Back to Career Resources</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/career-resources')}
            className="text-sm"
          >
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-arrow-left-line"></i>
            </div>
            Back to Career Resources
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              {article.category}
            </span>
            <span className="text-gray-400 text-sm">{article.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">{article.title}</h1>
        </div>

        {/* Article Image */}
        <div className="mb-8">
          <div className="aspect-video overflow-hidden bg-gray-700 rounded-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-white">
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Related Articles CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Want to Learn More?</h3>
          <p className="text-gray-400 mb-6">
            Explore more career resources and tips for remote work success
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/career-resources')}
            className="px-8"
          >
            Browse All Resources
          </Button>
        </div>
      </div>
    </div>
  );
}
