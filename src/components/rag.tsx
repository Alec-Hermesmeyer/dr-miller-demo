"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  MessageSquare,
  Send,
  Info,
  ChevronDown,
  RotateCw,
  Clock,
  UserCircle,
  
} from 'lucide-react';

// Hard-coded knowledge base about Brain Treatment Center Dallas
// In a real application, this would be populated from a database or API
const KNOWLEDGE_BASE = [
  {
    id: "treatments-tbi",
    title: "TBI Treatment",
    content: "The Brain Treatment Center of Dallas offers specialized treatment for Traumatic Brain Injury (TBI) patients. Our approach combines several modalities including Magnetic EEG/ECG-guided Resonance Therapy (MeRT), cognitive rehabilitation, and personalized treatment protocols. Treatment plans typically span 4-6 weeks with regular assessments to monitor progress. MeRT treatment has shown significant improvements in cognitive function, sleep patterns, and overall quality of life for TBI patients.",
    category: "treatments",
    tags: ["tbi", "traumatic brain injury", "mert", "rehabilitation"]
  },
  {
    id: "treatments-autism",
    title: "Autism Treatment",
    content: "For Autism Spectrum Disorder (ASD), the Brain Treatment Center uses a comprehensive approach that includes customized MeRT treatment, behavioral therapy integration, and family support services. Our treatment has shown improvements in sleep quality, social engagement, and emotional regulation for many patients. We work closely with each family to develop individualized care plans that address specific symptoms and challenges.",
    category: "treatments",
    tags: ["autism", "asd", "autism spectrum disorder", "mert"]
  },
  {
    id: "treatments-depression",
    title: "Depression & Anxiety Treatment",
    content: "The center treats depression and anxiety disorders using Magnetic EEG/ECG-guided Resonance Therapy (MeRT), which is a non-invasive procedure that uses magnetic pulses to stimulate specific areas of the brain. This is often combined with traditional therapeutic approaches for a comprehensive treatment plan. Many patients report improved mood, reduced anxiety, and better sleep patterns after treatment. Our approach is especially beneficial for treatment-resistant depression.",
    category: "treatments",
    tags: ["depression", "anxiety", "mental health", "mert"]
  },
  {
    id: "treatments-ptsd",
    title: "PTSD Treatment",
    content: "Post-Traumatic Stress Disorder (PTSD) treatment at Brain Treatment Center Dallas incorporates MeRT technology to address the neurological aspects of trauma. Our protocols help regulate brain wave patterns that are often disrupted in PTSD patients. Many of our patients experience a reduction in flashbacks, improved sleep, decreased anxiety, and better emotional regulation. Treatment typically involves daily sessions over a 4-6 week period.",
    category: "treatments",
    tags: ["ptsd", "trauma", "veterans", "mert"]
  },
  {
    id: "treatments-mert",
    title: "MeRT Technology",
    content: "Magnetic e-Resonance Therapy (MeRT) is a non-invasive neuromodulation technique that combines Transcranial Magnetic Stimulation (TMS), Quantitative EEG (qEEG), and personalized treatment protocols. The process begins with brain mapping to identify areas of dysregulation. Then, precise magnetic stimulation is applied to restore optimal neural function. Each treatment plan is customized based on the individual's brain activity patterns. MeRT has shown promising results for various neurological and psychiatric conditions.",
    category: "technology",
    tags: ["mert", "tms", "eeg", "neuromodulation", "brain mapping"]
  },
  {
    id: "about-team",
    title: "Our Medical Team",
    content: "The Brain Treatment Center of Dallas is led by a team of specialists in neurology, neuropsychology, and advanced brain mapping techniques. Each doctor has extensive experience in treating neurological and psychiatric conditions using the latest evidence-based approaches. Our medical director has over 15 years of experience in treating complex neurological conditions and has specialized training in neuromodulation techniques.",
    category: "about",
    tags: ["doctors", "specialists", "team", "medical staff"]
  },
  {
    id: "about-facility",
    title: "Our Facility",
    content: "Our state-of-the-art facility in Dallas is equipped with the latest neuromodulation technology and diagnostic equipment. We've created a comfortable, calming environment designed to promote healing and reduce anxiety during treatment. The center features private treatment rooms, consultation areas, and advanced brain mapping technology. Our facility is ADA accessible and offers convenient parking for patients.",
    category: "about",
    tags: ["facility", "location", "equipment", "technology"]
  },
  {
    id: "patients-faq",
    title: "Frequently Asked Questions",
    content: "Common questions about our treatments include: 1) Is MeRT painful? No, most patients report no pain, just a light tapping sensation. 2) How long before results are noticed? Many patients report improvements within the first two weeks, though this varies by condition. 3) Are treatments covered by insurance? Some insurance plans provide partial coverage, and we offer assistance with documentation for reimbursement. 4) How long are treatment sessions? Typical sessions last 30-45 minutes. 5) What conditions do you treat? We specialize in TBI, Autism, PTSD, Depression, Anxiety, and other neurological conditions.",
    category: "patients",
    tags: ["faq", "questions", "insurance", "treatments"]
  },
  {
    id: "patients-insurance",
    title: "Insurance & Financing",
    content: "Treatment costs at the Brain Treatment Center vary depending on the condition being treated and the specific protocol required. While some insurance plans may provide partial coverage, many treatments are considered innovative and may require out-of-pocket payment. We offer financing options through third-party providers and can provide documentation to help with insurance reimbursement. A consultation is recommended to get specific pricing information for your situation.",
    category: "patients",
    tags: ["cost", "insurance", "financing", "payment", "price"]
  },
  {
    id: "contact-info",
    title: "Contact Information",
    content: "The Brain Treatment Center of Dallas is located at 6080 S Hulen St, Suite 360, Fort Worth, TX 76132. You can reach us by phone at (817) 886-7735 or by email at info@braintreatmentdallas.com. Our hours of operation are Monday through Friday from 8:00 AM to 5:00 PM, with some Saturday appointments available by special arrangement. We're easily accessible from major highways and offer convenient parking.",
    category: "contact",
    tags: ["location", "address", "phone", "email", "directions", "hours"]
  }
];

// Simulated search function to find relevant content from our knowledge base
interface KnowledgeBaseItem {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
}

interface ScoredKnowledgeBaseItem extends KnowledgeBaseItem {
    score: number;
}

const findRelevantContent = (query: string): ScoredKnowledgeBaseItem[] => {
    const queryTerms = query.toLowerCase().split(' ');
    
    // Calculate relevance score for each knowledge base item
  const scoredItems: ScoredKnowledgeBaseItem[] = KNOWLEDGE_BASE.map((item: KnowledgeBaseItem) => {
      // Check title, content and tags for matches
      const titleTerms = item.title.toLowerCase().split(' ');
      const contentTerms = item.content.toLowerCase().split(' ');
      const tagTerms = item.tags.join(' ').toLowerCase().split(' ');
      
      let score = 0;
      
      // Score matches in title, tags, and content with different weights
      queryTerms.forEach(term => {
          // Exact matches in tags (highest priority)
          if (item.tags.includes(term)) {
              score += 10;
          }

          // Partial matches in title
          titleTerms.forEach(titleTerm => {
              if (titleTerm.includes(term)) score += 5;
          });

          // Partial matches in tags
          tagTerms.forEach(tagTerm => {
              if (tagTerm.includes(term)) score += 3;
          });

          // Partial matches in content
          contentTerms.forEach(contentTerm => {
              if (contentTerm.includes(term)) score += 0.5;
          });

          // Check if term appears in content directly
          if (item.content.toLowerCase().includes(term)) {
              score += 2;
          }
      });

      return { ...item, score };
  });
  
  // Sort by score and take top 3 results
  const filteredItems = scoredItems
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  return filteredItems;
};

export default function BrainTreatmentChat() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
      { 
        role: 'assistant',
        content: 'Welcome to the Brain Treatment Center of Dallas virtual assistant. How can I help you today?',
        sources: []
      }
    ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSourceInfo, setShowSourceInfo] = useState<Record<number, boolean>>({});
  const [openaiKey, setOpenaiKey] = useState('');
  const [keySet, setKeySet] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  
  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);
  
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    sources: { title: string; id: string }[];
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | undefined): Promise<void> => {
    e?.preventDefault();
    
    if (!query.trim() || isLoading || !keySet) return;
    
    // Add user question to chat
    const userMessage: ChatMessage = { role: 'user', content: query, sources: [] };
    setChatHistory((prev: ChatMessage[]) => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    
    try {
        // Find relevant content from our knowledge base
        const relevantDocs: ScoredKnowledgeBaseItem[] = findRelevantContent(query);
        const context: string = relevantDocs.map((doc: ScoredKnowledgeBaseItem) => doc.content).join('\n\n');
        
        // Call OpenAI API
        const response: Response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are an AI assistant for the Brain Treatment Center of Dallas. 
                        Answer the user's question based ONLY on the following context. 
                        If you cannot answer the question based on the context, say that you don't have enough information and suggest contacting the center directly at (817) 886-7735.
                        
                        Context:
                        ${context}`
                    },
                    {
                        role: "user", 
                        content: query
                    }
                ],
                temperature: 0.5,
                max_tokens: 500,
            })
        });
        
        if (!response.ok) {
            throw new Error('OpenAI API call failed');
        }
        
        const responseData: {
            choices: { message: { content: string } }[];
        } = await response.json();
        
        // Add assistant response to chat
        const assistantMessage: ChatMessage = { 
            role: 'assistant', 
            content: responseData.choices[0].message.content,
            sources: relevantDocs.map((doc: ScoredKnowledgeBaseItem) => ({ title: doc.title, id: doc.id }))
        };
        
        setChatHistory((prev: ChatMessage[]) => [...prev, assistantMessage]);
    } catch (error) {
        console.error('Error querying OpenAI:', error);
        setChatHistory((prev: ChatMessage[]) => [...prev, { 
            role: 'assistant', 
            content: 'I apologize, but I encountered an error while processing your question. Please check your OpenAI API key or try asking again.',
            sources: []
        }]);
    } finally {
        setIsLoading(false);
    }
};
  
const toggleSourceInfo = (index: number): void => {
    setShowSourceInfo((prev: Record<number, boolean>) => ({
        ...prev,
        [index]: !prev[index]
    }));
};
  
const handleSetKey = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (openaiKey.trim().startsWith('sk-')) {
        setKeySet(true);
    } else {
        alert('Please enter a valid OpenAI API key (starts with "sk-")');
    }
};
  
const handleExampleQuestion = (question: string): void => {
    setQuery(question);
    // Wait for state to update
    setTimeout(() => handleSubmit(undefined), 100);
};
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 border-b border-gray-200">
        <div className="container mx-auto flex items-center">
          <Brain className="text-blue-600 h-8 w-8 mr-3" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Brain Treatment Center</h1>
            <p className="text-sm text-gray-500">Dallas Patient Information Assistant</p>
          </div>
        </div>
      </header>
      
      {!keySet ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Enter Your OpenAI API Key
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              This demo requires an OpenAI API key to function. Your key stays in your browser and is not saved or sent anywhere except to OpenAI&apos;s API.
            </p>
            <form onSubmit={handleSetKey} className="space-y-4">
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  id="api-key"
                  placeholder="sk-..."
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue to Chat
              </button>
            </form>
          </div>
        </div>
      ) : (
        <main className="flex-1 container mx-auto p-4 flex flex-col md:flex-row gap-6">
          {/* Chat Interface */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare className="text-blue-600 h-5 w-5 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Treatment Information Assistant</h2>
              </div>
              <button 
                onClick={() => setChatHistory([{ 
                  role: 'assistant',
                  content: 'Welcome to the Brain Treatment Center of Dallas virtual assistant. How can I help you today?',
                  sources: []
                }])}
                className="text-gray-500 hover:text-blue-600"
              >
                <RotateCw className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl rounded-lg p-4 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p>{message.content}</p>
                    
                    {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                      <div className="mt-2">
                        <button 
                          onClick={() => toggleSourceInfo(index)} 
                          className="text-xs flex items-center mt-1 text-blue-600"
                        >
                          <Info className="h-3 w-3 mr-1" /> 
                          Sources ({message.sources.length})
                          <ChevronDown className={`h-3 w-3 ml-1 transform ${showSourceInfo[index] ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showSourceInfo[index] && (
                          <div className="mt-2 text-xs space-y-1 pl-2 border-l-2 border-blue-300">
                            {message.sources.map((source, sourceIdx) => (
                              <div key={sourceIdx} className="text-gray-600">
                                {source.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl rounded-lg p-4 bg-gray-100 text-gray-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about treatments, conditions, doctors, or location..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className={`px-4 py-2 rounded-md flex items-center ${
                  !query.trim() || isLoading
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Send className="h-5 w-5 mr-2" />
                Send
              </button>
            </form>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Brain className="text-blue-600 h-5 w-5 mr-2" />
                About This Assistant
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                This assistant provides information about the Brain Treatment Center of Dallas, including treatments offered, conditions treated, and general FAQs.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <UserCircle className="h-4 w-4 mr-2 text-blue-600" />
                <span>Using OpenAI API with your key</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Example Questions</h3>
              <div className="space-y-2">
                {[
                  "What treatments do you offer for TBI?",
                  "How does MeRT technology work?",
                  "Do you treat autism spectrum disorders?",
                  "Where is your center located?",
                  "What is the cost of treatment?"
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleQuestion(question)}
                    className="w-full text-left px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Disclaimer
              </h3>
              <p className="text-sm text-blue-700">
                This assistant provides general information about treatments and conditions. It is not a substitute for professional medical advice. Please consult with healthcare providers for personalized treatment recommendations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Clock className="text-blue-600 h-4 w-4 mr-2" />
                Quick Contact Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-blue-600 font-medium">(817) 886-7735</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-blue-600 font-medium">info@braintreatmentdallas.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hours:</span>
                  <span className="text-gray-800">Mon-Fri: 8am-5pm</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}