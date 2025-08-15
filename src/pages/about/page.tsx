import Navigation from '../../components/feature/Navigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function About() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20CEO%20portrait%2C%20confident%20female%20leader%2C%20modern%20corporate%20headshot%2C%20business%20attire%2C%20friendly%20smile&width=300&height=300&seq=team1&orientation=squarish',
      bio: 'Former VP at Google with 15 years of experience building remote teams and scaling tech companies.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://readdy.ai/api/search-image?query=professional%20male%20tech%20executive%20portrait%2C%20Asian%20CTO%20headshot%2C%20modern%20business%20professional%2C%20confident%20technology%20leader&width=300&height=300&seq=team2&orientation=squarish',
      bio: 'Ex-Netflix engineer passionate about creating tools that connect talent with opportunities worldwide.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://readdy.ai/api/search-image?query=professional%20Hispanic%20business%20woman%20portrait%2C%20product%20manager%20headshot%2C%20modern%20corporate%20professional%2C%20warm%20smile&width=300&height=300&seq=team3&orientation=squarish',
      bio: 'Design-thinking advocate with extensive experience in user experience and product development.'
    },
    {
      name: 'David Kim',
      role: 'Head of Operations',
      image: 'https://readdy.ai/api/search-image?query=professional%20Korean%20business%20man%20portrait%2C%20operations%20executive%20headshot%2C%20modern%20corporate%20leader%2C%20professional%20attire&width=300&height=300&seq=team4&orientation=squarish',
      bio: 'Operations expert who has helped scale remote-first companies from startup to enterprise level.'
    }
  ];

  const values = [
    {
      icon: 'ri-global-line',
      title: 'Remote-First Culture',
      description: 'We believe the future of work is location-independent, connecting talent globally.'
    },
    {
      icon: 'ri-team-line',
      title: 'Diversity & Inclusion',
      description: 'Building an inclusive platform that welcomes professionals from all backgrounds.'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology and user feedback.'
    },
    {
      icon: 'ri-heart-line',
      title: 'People-Centered',
      description: 'Every decision we make prioritizes the success and happiness of our community.'
    }
  ];

  const stats = [
    { label: 'Companies Trust Us', value: '500+' },
    { label: 'Jobs Posted Monthly', value: '2,000+' },
    { label: 'Successful Placements', value: '10,000+' },
    { label: 'Countries Represented', value: '50+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20office%20environment%20with%20diverse%20team%20collaboration%2C%20remote%20work%20culture%2C%20contemporary%20workspace%20design%2C%20professional%20business%20atmosphere%2C%20teamwork%20and%20innovation&width=1920&height=600&seq=about-hero&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Connecting Talent with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're on a mission to make remote work accessible to everyone, everywhere.
            Building the future of distributed teams, one connection at a time.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
          </div>

          <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
            <p>
              RemoteJobs was born from a simple observation: the most talented people don't always live
              where the best opportunities exist. In 2020, as the world shifted to remote work, we saw
              an unprecedented opportunity to connect exceptional talent with innovative companies,
              regardless of geographic boundaries.
            </p>

            <p>
              What started as a small project to help our network find remote opportunities has grown
              into a platform serving thousands of professionals and hundreds of companies worldwide.
              We've facilitated over 10,000 successful job placements and helped shape the remote work
              culture at companies across 50+ countries.
            </p>

            <p>
              Today, we continue to innovate and expand our platform, always keeping our core mission
              at heart: making remote work accessible, equitable, and successful for everyone involved.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Card className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-blue-400">
                    <i className={`${value.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Impact by Numbers</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate professionals working remotely from around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Card className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-700">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you're looking for your next remote opportunity or want to build
            a distributed team, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="text-lg px-8 py-4">
              Browse Jobs
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};