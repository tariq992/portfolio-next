
"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+92 332 5293542",
    href: "https://wa.me/923325293542",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "tmtariq110@gmail.com",
    href: "mailto:tmtariq110@gmail.com",
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pakistan",
    href: "#",
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Available for Remote & Freelance",
    href: "#",
    color: "text-accent-pink",
    bgColor: "bg-accent-pink/10",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent-cyan text-sm font-semibold tracking-wider uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Let's <span className="gradient-text">Build Something Amazing</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
           Whether you're looking for a Full Stack MERN Developer, AI integration expert,
or someone to build scalable web applications, I'd love to hear about your
project. Let's create something exceptional together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent-cyan" />
              Get in Touch
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary/50 hover:bg-bg-primary transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${info.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <info.icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{info.label}</p>
                      <p className="text-text-primary font-medium group-hover:text-accent-cyan transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent-cyan/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-cyan" />
              </div>
              <h4 className="text-text-primary font-semibold mb-1">Why Work With Me?</h4>
              <p className="text-text-secondary text-sm">
             Building production-ready MERN applications, AI-powered solutions,
REST APIs, and cloud deployments with a strong focus on performance,
security, and scalability.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6">
               Start Your Project
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-cyan/10 flex items-center justify-center">
                    <Send className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary mb-2">Thank You!</h4>
                  <p className="text-text-secondary">Your message has been received successfully. I'll review your requirements and respond as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-text-muted mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-2">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-muted mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                      placeholder="Tell me about your project"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-text-muted mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all resize-none"
                      placeholder="Describe your project, goals, technologies, timeline, or any requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Inquiry
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
