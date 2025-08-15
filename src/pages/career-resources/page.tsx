import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function CareerResources() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 'remote-work-success-guide',
      title: 'The Complete Guide to Remote Work Success',
      excerpt: 'Master the art of working remotely with proven strategies for productivity, communication, and work-life balance.',
      category: 'Remote Work',
      readTime: '8 min read',
      image: 'https://readdy.ai/api/search-image?query=remote%20work%20setup%20home%20office%20desk%20with%20laptop%2C%20modern%20workspace%20design%2C%20productivity%20focused%20environment%2C%20clean%20minimal%20background&width=400&height=250&seq=article1&orientation=landscape',
      content: 'remote-work-success-guide'
    },
    {
      id: 'resume-tips-remote',
      title: 'Resume Tips for Remote Job Applications',
      excerpt: 'Learn how to craft a resume that highlights your remote work skills and stands out to remote-first companies.',
      category: 'Resume Tips',
      readTime: '6 min read',
      image: 'https://readdy.ai/api/search-image?query=resume%20document%20professional%20job%20application%20remote%20work%20skills%20highlighting&width=400&height=250&seq=article2&orientation=landscape',
      content: 'resume-tips-remote'
    },
    {
      id: 'interview-preparation',
      title: 'Remote Job Interview Preparation',
      excerpt: 'Essential tips and strategies to ace your remote job interviews and land your dream remote position.',
      category: 'Interview Tips',
      readTime: '10 min read',
      image: 'https://readdy.ai/api/search-image?query=remote%20job%20interview%20video%20call%20preparation%20professional%20setup&width=400&height=250&seq=article3&orientation=landscape',
      content: 'interview-preparation'
    },
    {
      id: 'productivity-tools',
      title: 'Top Productivity Tools for Remote Workers',
      excerpt: 'Discover the best tools and apps that remote professionals use to stay productive and organized.',
      category: 'Productivity',
      readTime: '7 min read',
      image: 'https://readdy.ai/api/search-image?query=productivity%20tools%20apps%20remote%20work%20software%20organization%20time%20management&width=400&height=250&seq=article4&orientation=landscape',
      content: 'productivity-tools'
    },
    {
      id: 'work-life-balance',
      title: 'Maintaining Work-Life Balance in Remote Work',
      excerpt: 'Practical strategies to create healthy boundaries and maintain work-life balance while working remotely.',
      category: 'Wellness',
      readTime: '9 min read',
      image: 'https://readdy.ai/api/search-image?query=work%20life%20balance%20remote%20work%20wellness%20mental%20health%20boundaries&width=400&height=250&seq=article5&orientation=landscape',
      content: 'work-life-balance'
    },
    {
      id: 'networking-remote',
      title: 'Building Professional Networks in Remote Work',
      excerpt: 'How to build and maintain professional relationships in a remote work environment.',
      category: 'Networking',
      readTime: '5 min read',
      image: 'https://readdy.ai/api/search-image?query=professional%20networking%20remote%20work%20online%20community%20relationships&width=400&height=250&seq=article6&orientation=landscape',
      content: 'networking-remote'
    }
  ];

  const tools = [
    {
      name: 'Resume Builder',
      description: 'Create a professional remote-work focused resume with our AI-powered builder.',
      icon: 'ri-file-text-line',
      type: 'Free Tool',
      url: 'https://www.resume.com/resume-builder/'
    },
    {
      name: 'Cover Letter Generator',
      description: 'Generate compelling cover letters tailored for remote job applications.',
      icon: 'ri-mail-line',
      type: 'Free Tool',
      url: 'https://www.coverletternow.com/'
    },
    {
      name: 'Interview Practice',
      description: 'Practice common remote job interview questions with AI feedback.',
      icon: 'ri-mic-line',
      type: 'Free Tool',
      url: 'https://www.interviewbit.com/'
    },
    {
      name: 'Salary Calculator',
      description: 'Research remote job salaries and negotiate better compensation.',
      icon: 'ri-calculator-line',
      type: 'Free Tool',
      url: 'https://www.glassdoor.com/Salaries/index.htm'
    }
  ];

  const handleReadArticle = (articleId: string) => {
    navigate(`/career-resources/article/${articleId}`);
  };

  const handleToolClick = (toolUrl: string) => {
    window.open(toolUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Career{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Resources
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to succeed in your remote work journey
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
            <Button variant="outline" size="sm">
              View All Articles
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="overflow-hidden group animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Card className="h-full flex flex-col">
                  <div className="aspect-video overflow-hidden mb-4 bg-gray-700 rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-auto"
                    onClick={() => handleReadArticle(article.id)}
                  >
                    Read Article
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Career Tools</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful tools to accelerate your remote career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="text-center group animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Card className="h-full flex flex-col">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-blue-400">
                    <i className={`${tool.icon} text-3xl`}></i>
                  </div>
                  <div className="mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${tool.type === 'Free Tool'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {tool.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full mt-auto"
                    onClick={() => handleToolClick(tool.url)}
                  >
                    Try Now
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest remote work tips, job opportunities, and career insights
            delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="primary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}