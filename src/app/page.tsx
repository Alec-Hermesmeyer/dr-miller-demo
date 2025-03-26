"use client";
import React from 'react';
import { useState } from 'react';
import { Menu, X, ChevronRight, CheckCircle, Brain, UserCircle, MessageSquare, History, Shield, Award, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">
                <Brain size={32} />
              </span>
              <div>
                <div className="text-xl font-bold text-blue-700">Brain Treatment Center</div>
                <div className="text-xs text-gray-500">Dallas, TX</div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-blue-700 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-700">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-700">Treatments</a>
              <a href="#" className="text-gray-600 hover:text-blue-700">Ask Dr. Miller</a>
              <a href="#" className="text-gray-600 hover:text-blue-700">Contact</a>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 text-blue-700 hover:text-blue-800">Dashboard</Link>
              <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Register</a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-600 hover:text-blue-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-blue-700 font-medium">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-700">About</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-700">Treatments</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-700">Ask Dr. Miller</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-700">Contact</a>
              <div className="mt-4 flex flex-col space-y-2">
                <a href="#" className="px-3 py-2 text-blue-700 hover:text-blue-800">Log In</a>
                <a href="#" className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">Register</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Innovative Brain Treatment Solutions</h1>
              <p className="text-xl text-gray-600 mb-6">Experience personalized care with Dr. Spenser Miller for TBI, Autism, PTSD, and Depression.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                  Schedule a Consultation
                </a>
                <a href="#" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-center">
                  Ask Dr. Miller
                </a>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="w-full max-w-3xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Shield size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Board Certified</h3>
                <p className="text-gray-600 text-sm">Highest level of neurological expertise</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Award size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">15+ Years Experience</h3>
                <p className="text-gray-600 text-sm">Extensive clinical background</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Star size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">5,000+ Patients</h3>
                <p className="text-gray-600 text-sm">Proven track record of success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Patient Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access your personalized care resources and connect with Dr. Miller through our secure patient portal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Consultations</h3>
              <p className="text-gray-600">
                Ask medical questions to an AI version of Dr. Miller and receive evidence-based guidance.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <History size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Conversation History</h3>
              <p className="text-gray-600">
                Review your conversation history and approved responses from Dr. Miller.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserCircle size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Care</h3>
              <p className="text-gray-600">
                Doctor-reviewed responses ensure you receive accurate, personalized medical information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Dr. Miller Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <UserCircle size={40} className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Dr. Spenser Miller</h2>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-600 mb-6">
                Dr. Spenser Miller is a leading neurologist specializing in innovative treatments for brain conditions including TBI, Autism, PTSD, and Depression. With over 15 years of experience, Dr. Miller combines cutting-edge technology with compassionate care to provide personalized treatment plans for each patient.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                At the Brain Treatment Center of Dallas, Dr. Miller leads a team of dedicated professionals committed to improving brain health and overall quality of life for patients of all ages.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Harvard Medical School</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Board Certified Neurologist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Published Researcher</span>
                </div>
              </div>
              <div className="mt-8 text-center">
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Learn more about Dr. Miller
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Patient Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our patients about their experiences with Dr. Miller and the Brain Treatment Center.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <UserCircle size={24} className="text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Sarah J.</h3>
                  <p className="text-gray-600">TBI Patient</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
              &quot;The treatment I received from Dr. Miller changed my life. After my accident, I struggled with daily tasks, but the personalized care plan helped me regain my independence. The online portal made it easy to ask questions between appointments.&quot;
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <UserCircle size={24} className="text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Michael T.</h3>
                  <p className="text-gray-600">Depression Treatment</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &quot;After years of struggling with depression, Dr. Miller&apos;s approach was refreshingly effective. Being able to ask questions through the AI assistant between appointments helped me stay on track with my treatment plan.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Treatment Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in innovative treatments for a variety of neurological conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Treatment 1 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Traumatic Brain Injury</h3>
              <p className="text-gray-600 mb-4">
                Personalized treatments for TBI recovery and symptom management.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                Learn more
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            {/* Treatment 2 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Autism Spectrum</h3>
              <p className="text-gray-600 mb-4">
                Innovative approaches to improving focus, communication, and quality of life.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                Learn more
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            {/* Treatment 3 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">PTSD</h3>
              <p className="text-gray-600 mb-4">
                Evidence-based treatments to reduce stress and improve mental health.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                Learn more
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            {/* Treatment 4 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Depression</h3>
              <p className="text-gray-600 mb-4">
                Advanced treatments to restore balance and improve mood regulation.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                Learn more
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Journey to Better Brain Health</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our patient portal to access personalized care and connect with Dr. Miller and our team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 text-lg font-medium">
              Create an Account
            </a>
            <a href="#" className="px-8 py-3 border border-white text-white rounded-md hover:bg-blue-700 text-lg font-medium">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <div className="flex items-center mb-4">
                <span className="text-blue-400 mr-2">
                  <Brain size={24} />
                </span>
                <div className="text-lg font-bold">Brain Treatment Center</div>
              </div>
              <p className="text-gray-400 mb-4">
                Innovative brain health solutions in Dallas, TX.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Patient Portal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Treatments</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Traumatic Brain Injury</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Autism Spectrum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">PTSD</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Depression</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Anxiety</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p className="mb-2">1234 Medical Center Dr.</p>
                <p className="mb-2">Dallas, TX 75001</p>
                <p className="mb-2">Phone: (555) 123-4567</p>
                <p className="mb-2">Email: info@braintreatmentdallas.com</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Brain Treatment Center Dallas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}