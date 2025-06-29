"use client";
import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  FlameKindling, 
  BookOpen,
  Send,
  Globe,
  MessageCircle,
  Flame,
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "WhatsApp",
      description: "Chat with us instantly",
      value: "+92 304 4767165",
      link: "https://api.whatsapp.com/send?phone=03044767165",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a detailed message",
      value: "contact@flareprep.com",
      link: "mailto:detroitzubairkhan123@gmail.com",
      color: "from-red-500 to-rose-600"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Connect professionally",
      value: "FlarePrep LinkedIn",
      link: "https://www.linkedin.com/in/zubair-khan-65a17a286/",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: FlameKindling,
      title: "Community",
      description: "Join our WhatsApp group",
      value: "FlarePrep Community",
      link: "https://chat.whatsapp.com/FdximA88cIRFysOnwxRfc5",
      color: "from-orange-500 to-red-600"
    }
  ];

  const socialLinks = [
    { icon: Instagram, link: "https://www.instagram.com/flareprep?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", name: "Instagram" },
    { icon: Youtube, link: "https://www.youtube.com/@flareprep", name: "YouTube" },
    { icon: Facebook, link: "https://www.facebook.com/profile.php?id=61563112982377", name: "Facebook" },
    { icon: BookOpen, link: "https://drive.google.com/drive/folders/1j9SDgreJRAUvoqpEHqiZTMhlPAXZonM4", name: "Resources" }
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full filter blur-2xl animate-ping delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-red-400 font-mono text-sm">CONTACT INTERFACE</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
            GET IN TOUCH
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ready to ignite your potential? Connect with FlarePrep and lead a way forward with the flare of change.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-red-500" />
                Connect With Us
              </h2>
              
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-1">{method.description}</p>
                        <p className="text-red-400 font-mono text-sm">{method.value}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Send className="w-5 h-5 text-red-400" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-red-500" />
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-110"
                  >
                    <social.icon className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Send className="w-8 h-8 text-red-500" />
              Send Message
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-300">Name</div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-red-500 focus:outline-none text-white placeholder-gray-500 transition-colors backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-300">Email</div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-red-500 focus:outline-none text-white placeholder-gray-500 transition-colors backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-300">Subject</div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-red-500 focus:outline-none text-white placeholder-gray-500 transition-colors backdrop-blur-sm"
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-300">Message</div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 focus:border-red-500 focus:outline-none text-white placeholder-gray-500 transition-colors resize-none backdrop-blur-sm"
                  placeholder="Tell us more about your project or inquiry..."
                ></textarea>
              </div>
              
              <div onSubmit={handleSubmit}>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;