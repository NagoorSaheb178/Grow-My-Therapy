'use client';

import { useState } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Clock, Heart, Brain, Users } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full py-6 text-left flex justify-between items-center hover:bg-gray-50 px-4 transition-colors"
    >
      <span className="font-medium text-gray-900 pr-4">{question}</span>
      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-4 pb-6 text-gray-600 leading-relaxed">
        {answer}
      </div>
    )}
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: '',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us what brings you here';
    }

    if (!formData.preferredTime.trim()) {
      newErrors.preferredTime = 'Please specify your preferred contact time';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you for your message! Dr. Blake will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      preferredTime: '',
      consent: false
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="(323) 555-0192"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          What brings you here? *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell us about what's bringing you to therapy..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <div>
        <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
          Preferred time to reach you *
        </label>
        <input
          type="text"
          id="preferredTime"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            errors.preferredTime ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Weekday mornings, evenings after 6pm"
        />
        {errors.preferredTime && <p className="mt-1 text-sm text-red-600">{errors.preferredTime}</p>}
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className={`mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded ${
            errors.consent ? 'border-red-500' : ''
          }`}
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I agree to be contacted by Dr. Serena Blake regarding my inquiry *
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: "Do you accept insurance?",
      answer: "No, I do not accept insurance directly. However, I provide a detailed superbill that you can submit to your insurance company for potential reimbursement. Many clients find they can recover a significant portion of their session fees through out-of-network benefits."
    },
    {
      question: "Are online sessions available?",
      answer: "Yes, I offer virtual sessions via Zoom on Mondays, Wednesdays, and Fridays from 1 PM to 5 PM. Online therapy can be just as effective as in-person sessions and offers greater flexibility for busy schedules."
    },
    {
      question: "What is your cancellation policy?",
      answer: "I require 24-hour notice for cancellations. Sessions cancelled with less than 24 hours notice will be charged the full session fee. This policy helps ensure that appointment times remain available for all clients."
    },
    {
      question: "What are your session fees?",
      answer: "Individual therapy sessions are $200 per 50-minute session. Couples therapy sessions are $240 per 50-minute session. Payment is due at the time of service, and I accept cash, check, or credit card."
    },
    {
      question: "How do I know if therapy is right for me?",
      answer: "Therapy can be beneficial for anyone looking to better understand themselves, work through challenges, or improve their overall well-being. I offer a brief phone consultation to discuss your needs and determine if we're a good fit."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-sm flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-light text-gray-900">Dr. Serena Blake</div>
                <div className="text-xs text-gray-500">PsyD, Clinical Psychologist</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-teal-600 transition-colors">About</a>
              <a href="#services" className="text-gray-600 hover:text-teal-600 transition-colors">Services</a>
              <a href="#faq" className="text-gray-600 hover:text-teal-600 transition-colors">FAQ</a>
              <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://cognizant.scene7.com/is/content/cognizant/Ocean-Homepage-1468x512')"
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <h1 className="font-serif font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-2" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
            Psychological Care for
          </h1>
          <h1 className="font-serif font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
            Change, Insight, and Well-Being
          </h1>
          <h2 className="font-serif text-white/90 text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-normal" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
            Offering individual psychotherapy for adults via telehealth in Los Angeles and most U.S. states through PSYPACT participation
          </h2>
          <button
            className="bg-[#A9BDBA] hover:bg-[#8CA6A3] text-white text-sm md:text-base lg:text-lg px-8 py-3 rounded-full font-bold tracking-widest uppercase shadow-lg transition-colors"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Schedule a Consultation
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image + Name/Title for mobile */}
            <div className="flex flex-col items-center md:hidden mb-10">
              <div className="w-[370px] h-[480px] overflow-hidden bg-gray-200 border border-gray-200 shadow-md mx-auto">
                <img 
                  src="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg"
                  alt="Dr. Serena Blake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <div className="text-2xl font-serif font-bold text-gray-900">Dr. Serena Blake</div>
                <div className="text-sm text-gray-500">PsyD, Clinical Psychologist</div>
              </div>
            </div>
            {/* About text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight font-serif" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>About</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-serif" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                <p>
                  Finding time and opportunities to care for ourselves can be incredibly challenging in today's busy and demanding world. I believe therapy offers a dedicated space for self-care, providing the support and tools needed to improve this essential practice.
                </p>
                <p>
                  Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, with eight years of experience and over 500 client sessions. She blends evidence-based approaches like cognitive-behavioral therapy and mindfulness with compassionate, personalized care to help you overcome anxiety, strengthen relationships, and heal from trauma.
                </p>
                <p>
                  Whether you meet in her Maplewood Drive office or connect virtually via Zoom, Dr. Blake is committed to creating a safe, supportive space for you to thrive. Her integrative approach draws from cognitive-behavioral therapy, mindfulness-based interventions, and person-centered therapy, always tailored to each individual's unique needs and circumstances.
                </p>
              </div>
              <div className="pt-8">
                <p className="font-medium text-gray-800 text-lg">Experience:</p>
                <p className="text-gray-600">8 years of practice • 500+ client sessions</p>
              </div>
            </div>
            {/* Image + Name/Title for desktop */}
            <div className="hidden md:flex flex-col items-center">
              <div className="w-[370px] h-[480px] overflow-hidden bg-gray-200 border border-gray-200 shadow-md mx-auto">
                <img 
                  src="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg"
                  alt="Dr. Serena Blake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <div className="text-2xl font-serif font-bold text-gray-900">Dr. Serena Blake</div>
                <div className="text-sm text-gray-500">PsyD, Clinical Psychologist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-20">Areas of Focus</h2>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden bg-gray-200 shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=800&h=800"
                  alt="Anxiety and Stress Management"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Anxiety & Stress Management</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Life's challenges can sometimes feel overwhelming, leading to persistent feelings of worry, stress, or disconnection. Through evidence-based approaches including CBT and mindfulness techniques, we'll work together to develop effective coping strategies and rediscover your inner strength and resilience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden bg-gray-200 shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=800&h=800"
                  alt="Relationship Counseling"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Relationship Counseling</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Whether navigating relationship challenges, communication difficulties, or major life transitions, these periods can bring both opportunities and stress. Together, we'll explore your values, strengthen communication skills, and develop strategies to navigate change with confidence and authenticity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden bg-gray-200 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Trauma Recovery"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Trauma Recovery</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Traumatic experiences can have lasting impacts on our sense of safety and well-being. Using trauma-informed approaches, we'll create a safe space to process these experiences at your own pace, helping you reclaim your sense of empowerment and move forward with greater peace and resilience.
              </p>
            </div>
          </div>

          {/* Session Fees */}
          <div className="mt-20 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-medium text-gray-900 mb-8">Session Fees</h3>
            <div className="grid md:grid-cols-2 gap-12 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-light text-teal-600 mb-3">$200</div>
                <div className="text-xl text-gray-700 font-medium">Individual Session</div>
                <div className="text-gray-500">50 minutes</div>
              </div>
              <div>
                <div className="text-4xl font-light text-teal-600 mb-3">$240</div>
                <div className="text-xl text-gray-700 font-medium">Couples Session</div>
                <div className="text-gray-500">50 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-20">Frequently Asked Questions</h2>
          
          <div className="bg-white rounded-2xl shadow-lg border">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Get In Touch</h2>
              <p className="text-gray-600 mb-12 leading-relaxed text-lg">
                Taking the first step toward therapy can feel daunting, but you don't have to do it alone. I'm here to support you on your journey toward greater well-being and self-discovery.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-teal-600" />
                  <span className="text-gray-700 text-lg">(323) 555-0192</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-teal-600" />
                  <span className="text-gray-700 text-lg">serena@blakepsychology.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-teal-600" />
                  <span className="text-gray-700 text-lg">1287 Maplewood Drive, Los Angeles, CA 90026</span>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-teal-600 mt-1" />
                  <div className="text-gray-700 text-lg">
                    <div className="font-medium mb-2">Office Hours:</div>
                    <div className="space-y-1">
                      <div>In-person: Tue & Thu, 10 AM–6 PM</div>
                      <div>Virtual via Zoom: Mon, Wed & Fri, 1 PM–5 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-medium text-gray-900 mb-8">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-teal-600 rounded-sm flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-light text-lg">Dr. Serena Blake</div>
                <div className="text-sm text-gray-400">PsyD, Clinical Psychologist</div>
              </div>
            </div>
            <div className="text-gray-400">
              © 2024 Dr. Serena Blake. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}