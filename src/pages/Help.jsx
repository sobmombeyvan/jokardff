import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { HelpCircle, Mail, MessageSquare, BookOpen, Video } from 'lucide-react';

const Help = () => {
  const helpSections = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials to help you get started with Jokard.',
      link: '#'
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides to master all features of Jokard.',
      link: '#'
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Live Chat',
      description: 'Get instant help from our support team via live chat.',
      link: '#'
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'Email Support',
      description: 'Send us an email and we\'ll get back to you within 24 hours.',
      link: '#'
    }
  ];

  const faqs = [
    {
      question: 'How do I create my first digital business card?',
      answer: 'Creating your first digital business card is easy! Simply go to the Dashboard, click "Add New Card", and follow the step-by-step wizard to customize your card.'
    },
    {
      question: 'Can I customize the design of my business card?',
      answer: 'Yes! Jokard offers multiple templates and customization options including colors, fonts, layouts, and the ability to upload your own images and logos.'
    },
    {
      question: 'How do I share my digital business card?',
      answer: 'You can share your card via QR code, direct link, or by embedding it in your email signature. The QR code can be downloaded and printed on physical materials.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, Jokard is fully responsive and works great on mobile devices. You can also access your dashboard and manage your cards from any device with a web browser.'
    },
    {
      question: 'Can I track who views my business card?',
      answer: 'Yes! With our analytics feature, you can see how many people have viewed your card, where they\'re located, and other useful insights about your card\'s performance.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center rounded-xl h-16 w-16 bg-primary mb-4 mx-auto">
            <HelpCircle className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions and get the most out of Jokard
          </p>
        </div>

        {/* Help Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {helpSections.map((section, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {section.icon}
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Still need help?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our support team is here to help!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Contact us via email at <a href="mailto:support@jokard.com" className="text-primary hover:underline">support@jokard.com</a>
              </p>
              <p className="text-gray-600">
                Or use our <a href="/contact" className="text-primary hover:underline">contact form</a> for a quick response.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
