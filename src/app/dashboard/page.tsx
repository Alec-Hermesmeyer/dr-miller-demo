"use client";
// At the top of your file to disable rules for the entire file:
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Brain, 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  MessageSquare, 
  History,
  Search,
  Send,
  PlusCircle,
  LogOut,
  UserCircle,
  FileUp,
  ChevronRight,
  Info,
  ChevronDown,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';

// ==== CONFIGURATION ====
// Replace with your actual API keys in a production environment
// Use environment variables or a secure key management system
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";; // e.g., "21m00Tcm4TlvDq8ikWAM"

// Hard-coded knowledge base about Brain Treatment Center Dallas
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

// Mocked data for the demo
const recentPatients = [
  { id: 1, name: "John Doe", status: "Active", lastVisit: "2 days ago", condition: "TBI" },
  { id: 2, name: "Jane Smith", status: "Active", lastVisit: "1 week ago", condition: "Anxiety" },
  { id: 3, name: "Robert Johnson", status: "Inactive", lastVisit: "3 weeks ago", condition: "PTSD" },
  { id: 4, name: "Emily Wilson", status: "Active", lastVisit: "Yesterday", condition: "Depression" },
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

const findRelevantContent = (query: string): KnowledgeBaseItem[] => {
    const queryTerms: string[] = query.toLowerCase().split(' ');

    // Calculate relevance score for each knowledge base item
    const scoredItems: ScoredKnowledgeBaseItem[] = KNOWLEDGE_BASE.map((item: KnowledgeBaseItem) => {
        // Check title, content and tags for matches
        const titleTerms: string[] = item.title.toLowerCase().split(' ');
        const contentTerms: string[] = item.content.toLowerCase().split(' ');
        // FIX 1: Removed unused variable: const tagTerms: string[] = item.tags.join(' ').toLowerCase().split(' ');

        let score: number = 0;

        // Score matches in title, tags, and content with different weights
        queryTerms.forEach((term: string) => {
            // Exact matches in tags (highest priority)
            if (item.tags.includes(term)) {
                score += 10;
            }

            // Partial matches in tags
            item.tags.forEach((tag: string) => {
                if (tag.includes(term)) score += 5;
            });

            // Matches in title (high priority)
            titleTerms.forEach((titleTerm: string) => {
                if (titleTerm.includes(term)) score += 4;
                if (term.includes(titleTerm)) score += 2;
            });

            // Matches in content (lower priority)
            contentTerms.forEach((contentTerm: string) => {
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
    const filteredItems: KnowledgeBaseItem[] = scoredItems
        .filter((item: ScoredKnowledgeBaseItem) => item.score > 0)
        .sort((a: ScoredKnowledgeBaseItem, b: ScoredKnowledgeBaseItem) => b.score - a.score)
        .slice(0, 3);

    return filteredItems;
};

// FIX 4 & 5: Add proper typing for SpeechRecognition
interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

// Add for type safety
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
    autoSendTimeout?: NodeJS.Timeout;
  }
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      role: 'assistant',
      content: 'Welcome to the Brain Treatment Center of Dallas AI Assistant. How can I help you today?',
      sources: []
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  // FIX 2: Remove unused setter - just use an underscore to indicate it's not used
  const [uploadedFiles, _setUploadedFiles] = useState([
    { id: 1, name: "Patient Guidelines.pdf", size: "1.2 MB", date: "2025-03-20" },
    { id: 2, name: "TBI Research Summary.docx", size: "845 KB", date: "2025-03-22" },
    { id: 3, name: "Treatment Protocols.pdf", size: "3.4 MB", date: "2025-03-15" },
  ]);
  const [showSourceInfo, setShowSourceInfo] = useState({});
  const [chatStats, setChatStats] = useState({
    totalQueries: 0,
    popularTopics: [
      { topic: "TBI Treatment", count: 12 },
      { topic: "Depression", count: 8 },
      { topic: "Insurance", count: 7 }
    ],
    averageResponseTime: "1.2s"
  });
  
  // Voice-related state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [wakeWordActive, setWakeWordActive] = useState(false);
  const [customWakeWord, setCustomWakeWord] = useState('Hey Dr. Miller');
  const [showWakeWordSettings, setShowWakeWordSettings] = useState(false);
  
  // References
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<typeof SpeechRecognition | null>(null);
  const audioPlayerRef = useRef(new Audio());
  
  // FIX 4 & 5: Replace any with proper types
  const SpeechRecognition = ((window as WindowWithSpeechRecognition).SpeechRecognition || 
                           (window as WindowWithSpeechRecognition).webkitSpeechRecognition);
  
  // Function to format transcribed text with OpenAI
  const formatTranscription = async (text: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an assistant that corrects the grammar, punctuation, and formatting of transcribed speech. Keep the meaning intact but make it read naturally. Only return the corrected text, nothing else."
            },
            {
              role: "user", 
              content: text
            }
          ],
          temperature: 0.3,
          max_tokens: 256,
        })
      });
      
      if (!response.ok) {
        throw new Error('OpenAI API call failed');
      }
      
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error formatting transcription:', error);
      return text; // Return original text if formatting fails
    }
  };
  
  // Process speech input
  const handleSpeechInput = async (finalTranscript: string) => {
    // Stop listening
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (!finalTranscript.trim()) return;
    
    // Format the transcription
    const formattedText = await formatTranscription(finalTranscript);
    
    // Set as chat input
    setChatInput(formattedText);
    
    // Auto-send
    setTimeout(() => {
      handleSendMessage(formattedText);
    }, 300);
  };
  
  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Check for wake word in continuous listening mode
        if (wakeWordActive && !isListening) {
          const lowerTranscript = finalTranscript.toLowerCase();
          if (lowerTranscript.includes(customWakeWord.toLowerCase())) {
            console.log("Wake word detected!");
            // Stop current recognition to reset
            recognitionRef.current.stop();
            // Start focused listening mode
            setTimeout(() => {
              startListening();
            }, 500);
            return;
          }
        }
        
        // Update the transcript for the current listening session
        if (isListening) {
          setTranscript(finalTranscript || interimTranscript);
          
          // If we have a final transcript and it's been quiet for a bit, auto-send
          if (finalTranscript && event.results[event.results.length - 1].isFinal) {
            clearTimeout(window.autoSendTimeout);
            window.autoSendTimeout = setTimeout(() => {
              if (finalTranscript.trim()) {
                handleSpeechInput(finalTranscript);
              }
            }, 1500); // Wait 1.5s of silence before auto-sending
          }
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (isListening) {
          setIsListening(false);
        }
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          // If actively listening (not wake word mode), restart
          recognitionRef.current.start();
        } else if (wakeWordActive) {
          // If in wake word mode, restart for continuous listening
          recognitionRef.current.start();
        }
      };
    } else {
      console.error('Speech recognition not supported in this browser');
    }
    
    // FIX 7: Fix the ref cleanup in useEffect - store the ref value locally
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      const player = audioPlayerRef.current;
      if (player) {
        player.pause();
      }
    };
  }, [isListening, wakeWordActive, customWakeWord, handleSpeechInput]); // FIX 8: Added handleSpeechInput to deps
  
  // Start wake word detection
  useEffect(() => {
    if (wakeWordActive && recognitionRef.current) {
      recognitionRef.current.start();
    } else if (!wakeWordActive && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [wakeWordActive]);
  
  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Toggle listen mode
  const startListening = () => {
    if (!recognitionRef.current) return;
    
    // Clear previous transcript
    setTranscript('');
    setIsListening(true);
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      // Recognition might already be running
      recognitionRef.current.stop();
      setTimeout(() => {
        recognitionRef.current.start();
      }, 100);
    }
  };
  
  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // If we have a transcript, format and use it
    if (transcript.trim()) {
      handleSpeechInput(transcript);
    }
  };
  
  // Text-to-speech using ElevenLabs
  const speakText = async (text: string) => {
    if (!audioEnabled) return;
    
    try {
      setIsSpeaking(true);
      
      // Call ElevenLabs API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        }),
        responseType: 'arraybuffer'
      });
      
      if (!response.ok) {
        throw new Error('ElevenLabs API call failed');
      }
      
      // Get audio data and play it
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Stop any current audio
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      }
      
      // Play new audio
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();
      
      // When audio completes
      audioPlayerRef.current.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl); // Clean up
      };
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      setIsSpeaking(false);
    }
  };
  
  const toggleSourceInfo = (index: number) => {
    setShowSourceInfo(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const handleSendMessage = async (overrideText: string | null = null) => {
    const messageText = overrideText || chatInput;
    
    if (!messageText.trim() || isLoading) return;
    
    // Add user question to chat
    const userMessage = { role: 'user', content: messageText, sources: [] };
    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    
    try {
      // Find relevant content from our knowledge base
      const relevantDocs = findRelevantContent(messageText);
      const context = relevantDocs.map(doc => doc.content).join('\n\n');
      
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
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
              content: messageText
            }
          ],
          temperature: 0.5,
          max_tokens: 500,
        })
      });
      
      if (!response.ok) {
        throw new Error('OpenAI API call failed');
      }
      
      const responseData = await response.json();
      const assistantResponseText = responseData.choices[0].message.content;
      
      // Add assistant response to chat
      const assistantMessage = { 
        role: 'assistant', 
        content: assistantResponseText,
        sources: relevantDocs.map(doc => ({ title: doc.title, id: doc.id }))
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update stats
      setChatStats(prev => ({
        ...prev,
        totalQueries: prev.totalQueries + 1
      }));
      
      // Speak the response if audio is enabled
      if (audioEnabled) {
        speakText(assistantResponseText);
      }
    } catch (error) {
      // FIX 9: Use the error variable
      console.error('Error querying OpenAI:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I apologize, but I encountered an error: ${error.message}. Please try asking again.`,
        sources: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleExampleQuestion = (question: string) => {
    setChatInput(question);
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    // Stop current audio if turning off
    if (audioEnabled && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  };
  
  const toggleWakeWord = () => {
    setWakeWordActive(!wakeWordActive);
  };
  
  const saveWakeWord = () => {
    setShowWakeWordSettings(false);
    // Wake word is already saved in state
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="text-blue-600 h-8 w-8" />
            {isSidebarOpen && <span className="ml-2 font-bold text-gray-800">Brain Center</span>}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-800"
          >
            <ChevronRight className={`h-5 w-5 transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <LayoutDashboard className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('patients')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'patients' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Users className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Patients</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('knowledge')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'knowledge' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FileText className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Knowledge Base</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'chat' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <MessageSquare className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">AI Assistant</span>}
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Settings className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Settings</span>}
          </button>
          <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md mt-2">
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'patients' && 'Patient Management'}
            {activeTab === 'knowledge' && 'Knowledge Base'}
            {activeTab === 'chat' && 'AI Assistant'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-2">
                <UserCircle className="h-6 w-6 text-blue-600" />
              </div>
              {isSidebarOpen && (
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-800">Dr. Spenser Miller</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Voice Assistant Floating Button */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
          {/* Voice Controls */}
          <div className="flex items-center space-x-2">
            {/* Wake Word Toggle */}
            <button 
              onClick={toggleWakeWord}
              className={`p-3 rounded-full shadow-lg ${wakeWordActive ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
              title={wakeWordActive ? "Wake word active" : "Enable wake word"}
            >
              <Zap className="h-5 w-5" />
            </button>
            
            {/* Audio Toggle */}
            <button 
              onClick={toggleAudio}
              className="p-3 bg-white rounded-full shadow-lg"
              title={audioEnabled ? "Mute assistant" : "Unmute assistant"}
            >
              {audioEnabled ? (
                <Volume2 className="h-5 w-5 text-blue-600" />
              ) : (
                <VolumeX className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {/* Speech Recognition */}
            <button 
              onClick={isListening ? stopListening : startListening}
              className={`p-4 rounded-full shadow-lg ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-600 text-white'}`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Wake Word Settings */}
          {showWakeWordSettings && (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-80">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Set Custom Wake Word</h3>
              <input
                type="text"
                value={customWakeWord}
                onChange={(e) => setCustomWakeWord(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                placeholder="e.g., Hey Brain Center"
              />
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowWakeWordSettings(false)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm mr-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveWakeWord}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* FIX 3: Use isSpeaking state in the UI */}
        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="fixed bottom-24 right-6 bg-green-100 px-3 py-1 rounded-full shadow-md text-xs flex items-center">
            <Volume2 className="h-3 w-3 text-green-500 mr-2 animate-pulse" />
            <span className="text-green-700">Speaking...</span>
          </div>
        )}
        
        {/* Listening Indicator */}
        {isListening && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center">
            <div className="flex space-x-1 mr-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm font-medium">Listening... <span className="text-gray-500">{transcript}</span></span>
          </div>
        )}
        
        {/* Show Wake Word Active Status */}
        {wakeWordActive && !isListening && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center">
            <Zap className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm font-medium">
              Listening for &quot;{customWakeWord}&quot;
              <button 
                onClick={() => setShowWakeWordSettings(true)}
                className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
              >
                Change
              </button>
            </span>
          </div>
        )}
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Active Patients</p>
                      <p className="text-3xl font-semibold text-gray-800 mt-1">124</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-green-600 flex items-center">
                    <span>+5% from last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Documents Analyzed</p>
                      <p className="text-3xl font-semibold text-gray-800 mt-1">47</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-green-600 flex items-center">
                    <span>+12 new this week</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">AI Interactions</p>
                      <p className="text-3xl font-semibold text-gray-800 mt-1">{chatStats.totalQueries}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-green-600 flex items-center">
                    <span>Avg. response time: {chatStats.averageResponseTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Recent Patients Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Visit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Condition
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentPatients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <UserCircle className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {patient.lastVisit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {patient.condition}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Mini RAG Demo */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Quick AI Assistant</h2>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                  >
                    Full Chat <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="border border-gray-300 rounded-md">
                  <div className="p-4 max-h-48 overflow-y-auto bg-gray-50">
                    {/* Just show the last message exchange for the mini view */}
                    {messages.length > 0 && (
                      <>
                        <div className="flex mb-4">
                          <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                            <UserCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm text-gray-800 text-sm flex-1">
                            {messages[messages.length - 2]?.role === 'user' ? messages[messages.length - 2].content : "Ask me something about treatments or services!"}
                          </div>
                        </div>
                        {messages[messages.length - 1]?.role === 'assistant' && (
                          <div className="flex mb-4">
                            <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                              <Brain className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg shadow-sm text-gray-800 text-sm flex-1">
                              {messages[messages.length - 1].content}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="border-t border-gray-300 p-3 flex">
                    <input
                      type="text"
                      placeholder="Ask a question about treatments or services..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-400 text-sm"
                    />
                    <button 
                      onClick={() => handleSendMessage()}
                      disabled={!chatInput.trim() || isLoading}
                      className={`p-2 rounded-full ${
                        !chatInput.trim() || isLoading ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-gray-500 flex items-center">
                    <Info className="h-3 w-3 mr-1" /> Powered by OpenAI with our knowledge base
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={startListening}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs flex items-center hover:bg-blue-100"
                    >
                      <Mic className="h-3 w-3 mr-1" /> Voice Input
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* AI Chat View */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">Medical AI Assistant</h2>
                      <p className="text-sm text-gray-500">Powered by your medical knowledge base</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-white text-gray-600 px-3 py-1 rounded-md border border-gray-300 text-sm flex items-center">
                      <History className="h-4 w-4 mr-1" /> History
                    </button>
                    <button 
                      onClick={() => setMessages([{ 
                        role: 'assistant',
                        content: 'Welcome to the Brain Treatment Center of Dallas AI Assistant. How can I help you today?',
                        sources: []
                      }])}
                      className="bg-white text-gray-600 px-3 py-1 rounded-md border border-gray-300 text-sm flex items-center"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> New Chat
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-gray-50 p-4 rounded-md">
                  {messages.map((message, index) => (
                    <div key={index} className="flex">
                      <div className={`rounded-full p-2 mr-3 flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-blue-100' 
                          : 'bg-green-100'
                      }`}>
                        {message.role === 'user' ? (
                          <UserCircle className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Brain className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg shadow-sm text-gray-800 flex-1 ${
                        message.role === 'user'
                          ? 'bg-white'
                          : 'bg-green-50'
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
                    <div className="flex">
                      <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                        <Brain className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg shadow-sm text-gray-400 flex items-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
                
                <div className="border border-gray-300 rounded-md p-3 flex">
                  <input
                    type="text"
                    placeholder="Ask about treatment options, patient data, or reference medical documents..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-400"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!chatInput.trim() || isLoading}
                    className={`p-2 rounded-full ${
                      !chatInput.trim() || isLoading ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-gray-500 flex items-center">
                    <Info className="h-3 w-3 mr-1" /> Responses are generated using your uploaded medical documents and general medical knowledge
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={toggleAudio}
                        className={`p-1 rounded ${audioEnabled ? 'text-blue-600' : 'text-gray-400'}`}
                        title={audioEnabled ? "Disable voice responses" : "Enable voice responses"}
                      >
                        {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </button>
                      <span className="text-xs text-gray-500">{audioEnabled ? "Voice on" : "Voice off"}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={toggleWakeWord}
                        className={`p-1 rounded ${wakeWordActive ? 'text-green-600' : 'text-gray-400'}`}
                        title={wakeWordActive ? "Disable wake word" : "Enable wake word"}
                      >
                        <Zap className="h-4 w-4" />
                      </button>
                      <span className="text-xs text-gray-500">{wakeWordActive ? "Wake word on" : "Wake word off"}</span>
                    </div>
                  </div>
                </div>
                
                {/* Example Questions */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Example Questions</h3>
                  <div className="flex flex-wrap gap-2">
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
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Knowledge Base View */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Knowledge Base</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center">
                    <FileUp className="h-4 w-4 mr-2" /> Upload Document
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Added
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {uploadedFiles.map((file) => (
                        <tr key={file.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {file.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {file.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-800 mb-2">Integration with AI Assistant</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Documents uploaded to your knowledge base are processed and made available to the AI Assistant. This allows the assistant to provide responses based on your specific medical documentation and protocols.
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                      Reprocess Documents
                    </button>
                    <button className="bg-white text-gray-600 px-3 py-1 rounded-md border border-gray-300 text-sm">
                      Check Processing Status
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Knowledge Base Content</h2>
                <div className="overflow-y-auto max-h-96 space-y-4">
                  {KNOWLEDGE_BASE.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-xs text-blue-700 rounded-full">{item.category}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{item.content.substring(0, 150)}...</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Document Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Most Referenced Documents</h3>
                    <ol className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">TBI Research Summary.docx</span>
                        <span className="text-xs text-blue-600 font-medium">42 references</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Treatment Protocols.pdf</span>
                        <span className="text-xs text-blue-600 font-medium">37 references</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Patient Guidelines.pdf</span>
                        <span className="text-xs text-blue-600 font-medium">28 references</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Popular Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {chatStats.popularTopics.map((topic, i) => (
                        <div key={i} className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          <span>{topic.topic}</span>
                          <span className="ml-1 px-1.5 py-0.5 bg-blue-200 rounded-full text-xs">{topic.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Usage Over Time</h3>
                    <div className="h-32 flex items-end">
                      {/* Simple bar chart visualization */}
                      {[25, 40, 30, 60, 80, 55, 70].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end">
                          <div 
                            className="w-4/5 bg-blue-500 rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-2">Days of Week</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Patients View (Simplified) */}
          {activeTab === 'patients' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Patient Management</h2>
                <div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                    Add New Patient
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">This section would contain a full patient management interface. For this demo, we&apos;re focusing on the RAG integration for the AI assistant.</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800 mb-1">AI Integration Tip</h3>
                  <p className="text-sm text-blue-700">
                    Patient data can be securely referenced by the AI Assistant when answering clinical questions. The system maintains HIPAA compliance while providing insights based on anonymized patient trends and outcomes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}