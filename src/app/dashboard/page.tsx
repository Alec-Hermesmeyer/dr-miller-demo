"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Brain, 
  Calendar, 
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
  Zap,
  Clock,
  Activity,
  CheckCircle,
  FileClock
} from 'lucide-react';

// ==== CONFIGURATION ====
// Replace with your actual API keys in a production environment
// Use environment variables or a secure key management system
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

// Dr. Spencer O. Miller AI prompt
const DR_MILLER_PROMPT = `You are Dr. Spencer O. Miller, a Board-Certified Neurologist and Medical Director of the Brain Treatment Center Dallas and Plano. You specialize in Magnetic e-Resonance Therapy (MeRT), a non-invasive, drug-free, and personalized treatment that combines technologies such as transcranial magnetic stimulation (TMS), quantitative electroencephalogram (qEEG), and electrocardiogram (ECG/EKG) to analyze and address dysregulation in brain activity. MeRT has been used to treat a variety of neurological and psychological conditions, including: 
* **Autism Spectrum Disorder**  
* **Major Depressive Disorder**  
* **Traumatic Brain Injury (TBI)**  
* **Anxiety**  
* **Post-Traumatic Stress Disorder (PTSD)**  
* **Dementia**  
* **Parkinson's Disease**  
* **Sleep Disorders**  
* **Attention Deficit Hyperactivity Disorder (ADHD)**  
* **After-effects of Stroke**  
* **COVID-19 After-Care**  
* **Brain Optimization and Mental Focus**  
With over 15 years of clinical experience, including five years in the U.S. Air Force treating soldiers with PTSD and TBI, you are dedicated to providing compassionate, individualized care. Your approach involves a thorough evaluation process, starting with a qEEG and ECG/EKG to measure brain wave frequencies and heart rate, followed by a customized treatment plan aimed at encouraging healthy brain communication. You are committed to explaining complex neurological concepts in an accessible manner, ensuring patients and their families understand the treatment process and feel supported throughout their journey. Your clinics are veteran-owned and operated, reflecting a commitment to serving military personnel and veterans.
 
**Communication Guidelines:** 
* **General Information:** Provide educational insights about MeRT, its benefits, and the conditions it treats. Emphasize the individualized nature of the therapy and the importance of a thorough evaluation to determine suitability.  
* **Current Patients:** Offer general guidance on what to expect during the treatment process, potential benefits, and the importance of adherence to the prescribed protocol. Encourage open communication with the care team for any specific concerns.  
* **Caregivers:** Provide information on how MeRT works and how it may benefit their loved one. Offer general advice on supporting patients during their treatment journey and emphasize the importance of a supportive environment.  
* **Prospective Patients:** Explain the MeRT treatment process, including the initial evaluation, personalized treatment planning, and the non-invasive nature of the therapy. Encourage scheduling a consultation for a comprehensive assessment.  
* **Clinic Staff:** Assist in delivering clear and compassionate explanations about MeRT, ensuring consistency with the clinic's values of personalized care, scientific integrity, and patient empowerment.  
 
**Important Considerations:** 
* **No Access to Personal Health Information (PHI):** Ensure that all communications are general and do not reference or infer any individual's personal health information.  
* **Non-Diagnostic:** Avoid providing any form of diagnosis or medical advice. Encourage individuals to consult directly with the medical team for personalized assessments.  
* **Encourage Professional Consultation:** For specific medical concerns or detailed information, recommend scheduling an in-person consultation with the Brain Treatment Center Dallas or Plano.`;

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

// Example patient appointments
const patientAppointments = [
  { id: 1, date: "2025-03-28", time: "10:00 AM", type: "MeRT Treatment", provider: "Dr. Miller", status: "Confirmed" },
  { id: 2, date: "2025-04-02", time: "2:30 PM", type: "Follow-up Consultation", provider: "Dr. Miller", status: "Confirmed" },
  { id: 3, date: "2025-04-09", time: "11:15 AM", type: "MeRT Treatment", provider: "Dr. Wilson", status: "Pending" }
];

// Example treatment progress data
const treatmentProgress = [
  { id: 1, date: "2025-03-10", sleepQuality: 6, anxiety: 7, focus: 5, mood: 6, notes: "Feeling fatigued after treatment" },
  { id: 2, date: "2025-03-17", sleepQuality: 7, anxiety: 6, focus: 6, mood: 7, notes: "Noticed improved sleep" },
  { id: 3, date: "2025-03-24", sleepQuality: 8, anxiety: 5, focus: 7, mood: 8, notes: "Concentration improving at work" }
];

// Example patient profile
const patientProfile = {
  name: "Sarah Johnson",
  age: 35,
  condition: "Anxiety & Depression",
  treatmentStart: "2025-03-10",
  treatmentPlan: "6-week MeRT Protocol",
  doctor: "Dr. Spenser Miller",
  insurance: "Blue Cross Blue Shield",
  nextAppointment: "March 28, 2025 at 10:00 AM"
};

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

// Add for type safety
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
    silenceTimer?: NodeJS.Timeout;
    wakeWordDetected?: boolean;
    restartTimer?: NodeJS.Timeout;
  }
}

// Video Player Component
interface VideoPlayerProps {
  currentVideo: string;
  isPlaying: boolean;
  onVideoEnd: () => void;
  onQuestionClick: (questionKey: 'Will the treatment hurt?' | 'How can I schedule a consultation?' | 'Can I keep doing my regular daily routine while getting treatment?' | 'default') => void;
  onCustomQuestionSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  currentVideo, 
  isPlaying, 
  onVideoEnd, 
  onQuestionClick,
  onCustomQuestionSubmit,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Video mapping
  const videos: Record<'Will the treatment hurt?' | 'How can I schedule a consultation?' | 'Can I keep doing my regular daily routine while getting treatment?' | 'default', string> = {
    'Will the treatment hurt?': 'Will the treatment hurt_.mp4',
    'How can I schedule a consultation?': 'how can I schedule a consultation 1.mp4',
    'Can I keep doing my regular daily routine while getting treatment?': 'Can I keep doing my regular daily routine while getting treatment_.mp4',
    'default': 'Finding the answer.mp4'
  };

  // Handle video end
  const handleVideoEnd = () => {
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  // Play the video when isPlaying changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        try {
          videoRef.current.play().catch(error => {
            console.error("Error playing video:", error);
          });
        } catch (e) {
          console.error("Video play error:", e);
        }
      } else {
        try {
          videoRef.current.pause();
        } catch (e) {
          console.error("Video pause error:", e);
        }
      }
    }
  }, [isPlaying, currentVideo]);

  return (
    <div className="mb-6">
      {/* Video player */}
      <div className="mb-4 bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef}
          className="w-full h-64 object-cover"
          src={videos[currentVideo as keyof typeof videos]}
          controls={true}
          autoPlay={isPlaying}
          onEnded={handleVideoEnd}
        />
      </div>
      
      {/* Suggested questions */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Questions</h3>
        <div className="flex flex-col space-y-2">
          {Object.keys(videos).filter(key => key !== 'default').map((question) => (
            <button
              key={question}
              onClick={() => onQuestionClick(question as 'default' | 'Will the treatment hurt?' | 'How can I schedule a consultation?' | 'Can I keep doing my regular daily routine while getting treatment?')}
              className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 transition-colors text-left"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function PatientDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatInput, setChatInput] = useState('');
  interface Message {
    role: string;
    content: string;
    sources: { title: string; id: string }[];
  }
  
  const [messages, setMessages] = useState<Message[]>([
      { 
        role: 'assistant',
        content: 'Hello Sarah! I\'m Dr. Spencer Miller from the Brain Treatment Center. How can I assist you today with your treatment journey?',
        sources: []
      }
    ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSourceInfo, setShowSourceInfo] = useState<Record<string, boolean>>({});
  const [chatStats, setChatStats] = useState({
    totalQueries: 0,
    popularTopics: [
      { topic: "MeRT Treatment", count: 5 },
      { topic: "Side Effects", count: 3 },
      { topic: "Insurance", count: 2 }
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
  
  // Video state
  const [currentVideo, setCurrentVideo] = useState('default');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  
  // References
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const wakeWordListeningRef = useRef<boolean>(false);
  
  // Initialize audio player on client side only
  useEffect(() => {
    // Only create the Audio object in browser environment
    if (typeof window !== 'undefined') {
      audioPlayerRef.current = new Audio();
    }
    
    return () => {
      // Cleanup on unmount
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.src = '';
      }
    };
  }, []);
  
  // Use SpeechRecognition - moved to useEffect for client-side only
  let SpeechRecognition: any = null;
  
  // Function to format transcribed text with OpenAI
  const formatTranscription = useCallback(async (text: string): Promise<string> => {
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
  }, []);
  
  // Process speech input
  const handleSpeechInput = useCallback(async (finalTranscript: string) => {
    if (typeof window === 'undefined') return;
    
    // Don't process if the transcript is empty
    if (!finalTranscript?.trim()) return;

    console.log("Processing final transcript:", finalTranscript);
    
    // Stop listening
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log("Error stopping recognition:", e);
      }
    }
    
    // Format the transcription
    const formattedText = await formatTranscription(finalTranscript);
    console.log("Formatted text:", formattedText);
    
    // Set as chat input
    setChatInput(formattedText);
    
    // Auto-send
    setTimeout(() => {
      handleSendMessage(formattedText);
    }, 300);
    
    // Reset transcript
    finalTranscriptRef.current = '';
    setTranscript('');
  }, [formatTranscription, setChatInput]);
  
  // Handle video question click - only plays the video without sending to chat
const handleVideoQuestionClick = useCallback((questionKey: 'Will the treatment hurt?' | 'How can I schedule a consultation?' | 'Can I keep doing my regular daily routine while getting treatment?' | 'default') => {
    // Just set the video and play it, without sending to the chatbot
    setCurrentVideo(questionKey);
    setIsVideoPlaying(true);
    setShowVideoPlayer(true); // Ensure video player is visible
}, []);
  
  // Handle video end
  const handleVideoEnd = useCallback(() => {
    setIsVideoPlaying(false);
    setShowVideoPlayer(false); // Hide video player when video ends
  }, []);
  
  const handleSendMessage = useCallback(async (overrideText: string | null = null) => {
    const messageText = overrideText || chatInput;
    
    if (!messageText.trim() || isLoading) return;
    
    // Add user question to chat
    const userMessage = { role: 'user', content: messageText, sources: [] };
    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    
    // Play "Finding the answer" video
    setCurrentVideo('default');
    setIsVideoPlaying(true);
    setShowVideoPlayer(true); // Show video player when sending message
    
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
              content: `${DR_MILLER_PROMPT}
              
              You are currently speaking with ${patientProfile.name}, a patient with ${patientProfile.condition}.
              Use your knowledge and expertise to address their questions and concerns, while following the communication guidelines provided.

              Additional patient context (for personalization only):
              Name: ${patientProfile.name}
              Condition: ${patientProfile.condition}
              Treatment: ${patientProfile.treatmentPlan} (started ${patientProfile.treatmentStart})
              Doctor: ${patientProfile.doctor}
              Next appointment: ${patientProfile.nextAppointment}
              
              Relevant information based on their query:
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
    } catch (error: any) {
      console.error('Error querying OpenAI:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I apologize, but I encountered an error: ${error.message}. Please try asking again.`,
        sources: []
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [chatInput, isLoading, audioEnabled]);
  
  // Handle custom question submit from video player
interface CustomQuestionFormElements extends HTMLFormControlsCollection {
    customQuestion: HTMLInputElement;
}

interface CustomQuestionForm extends HTMLFormElement {
    elements: CustomQuestionFormElements;
}

const handleCustomQuestionSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as CustomQuestionForm;
    const customQuestion = form.elements.customQuestion.value;
    
    if (customQuestion.trim()) {
        // Set as chat input and send
        setChatInput(customQuestion);
        handleSendMessage(customQuestion);
        
        // Play the default "Finding the answer" video
        setCurrentVideo('default');
        setIsVideoPlaying(true);
        setShowVideoPlayer(true); // Ensure video player is visible
        
        // Clear the input field
        form.elements.customQuestion.value = '';
    }
}, [handleSendMessage]);
  
  // ==== IMPROVED SPEECH RECOGNITION IMPLEMENTATION ====
  
  // Initialize on client-side only
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Set up SpeechRecognition
    const LocalSpeechRecognition = (window as WindowWithSpeechRecognition).SpeechRecognition || 
                                   (window as WindowWithSpeechRecognition).webkitSpeechRecognition;
    
    if (!LocalSpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }
    
    // Clear all pre-existing recognition references
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    
    // Initialize
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    // Handle speech results
    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          finalTranscriptRef.current += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Wake word detection mode
      if (wakeWordActive && !isListening && wakeWordListeningRef.current && typeof window !== 'undefined') {
        // Use both interim and final for wake word to be more responsive
        const searchText = (finalTranscriptRef.current + interimTranscript).toLowerCase();
        const wakeWord = customWakeWord.toLowerCase();
        
        console.log("Wake word search:", { searchText, wakeWord });
        
        if (searchText.includes(wakeWord)) {
          console.log("⭐ WAKE WORD DETECTED! ⭐");
          
          // Clear detection state
          wakeWordListeningRef.current = false;
          window.wakeWordDetected = true;
          
          // Clean up any timers
          clearAllTimers();
          
          // Stop recognition to reset it
          try {
            recognitionRef.current.stop();
          } catch (e) {
            console.error("Error stopping recognition after wake word:", e);
          }
          
          // Schedule starting active listening mode with a slight delay
          setTimeout(() => {
            console.log("Activating listening mode after wake word...");
            finalTranscriptRef.current = '';
            setTranscript('');
            window.wakeWordDetected = false;
            startListening();
          }, 800);
          
          return;
        }
      }
      
      // Active listening mode
      if (isListening) {
        // Show combined transcript for user feedback
        const displayText = finalTranscriptRef.current + interimTranscript;
        setTranscript(displayText);
        
        // When we get a final result, reset silence detection timer
        if (finalTranscript && typeof window !== 'undefined') {
          console.log("Final part received:", finalTranscript);
          
          // Reset the silence detection timer
          if (typeof window !== 'undefined') {
            if (window.silenceTimer) {
              clearTimeout(window.silenceTimer);
            }
            
            // Set a new silence timer - if no new speech is detected for 2.5 seconds, submit
            window.silenceTimer = setTimeout(() => {
              if (isListening && finalTranscriptRef.current.trim()) {
                console.log("Silence detected after speech, processing:", finalTranscriptRef.current);
                handleSpeechInput(finalTranscriptRef.current.trim());
              }
            }, 2500);
          } 
        }
      }
    };
    
    // Handle errors
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech') {
        console.log("No speech detected");
        return; // Don't stop on no-speech errors
      }
      
      if (isListening) {
        setIsListening(false);
      }
      
      if (wakeWordActive) {
        // Try to restart wake word detection
        restartWakeWordDetection();
      }
    };
    
    // Handle when recognition ends
    recognitionRef.current.onend = () => {
      console.log("Speech recognition ended");
      
      if (isListening) {
        // If actively listening, restart immediately
        try {
          recognitionRef.current.start();
          console.log("Restarted active listening");
        } catch (e) {
          console.error("Error restarting after end:", e);
          setTimeout(() => {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.error("Error in delayed restart:", e);
            }
          }, 300);
        }
      } else if (wakeWordActive && !window.wakeWordDetected) {
        // If in wake word mode and not in transition, restart for continuous wake word listening
        restartWakeWordDetection();
      }
    };
    
    // Cleanup on unmount
    return () => {
      clearAllTimers();
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        try {
          audioPlayerRef.current.currentTime = 0;
        } catch (e) {}
      }
    };
  }, []);
  
  // Helper to restart wake word detection with error handling
  const restartWakeWordDetection = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!wakeWordActive || window.wakeWordDetected || !recognitionRef.current) return;
    
    // Immediate delay to allow browser to release resources
    if (window.restartTimer) {
      clearTimeout(window.restartTimer);
    }
    
    window.restartTimer = setTimeout(() => {
      try {
        wakeWordListeningRef.current = true;
        finalTranscriptRef.current = '';
        recognitionRef.current.start();
        console.log("Restarted wake word detection");
      } catch (e) {
        console.error("Error restarting wake word:", e);
        
        // Try again after a longer delay
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            console.log("Restarted wake word after delay");
          } catch (e) {
            console.error("Failed to restart wake word detection after multiple attempts");
            // Reset wake word state after repeated failures
            wakeWordListeningRef.current = false;
          }
        }, 1000);
      }
    }, 300);
  }, [wakeWordActive]);
  
  // Effect to manage wake word activation/deactivation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    console.log(`Wake word mode ${wakeWordActive ? 'enabled' : 'disabled'}`);
    
    if (wakeWordActive) {
      // Enable wake word detection mode
      window.wakeWordDetected = false;
      finalTranscriptRef.current = '';
      setTranscript('');
      
      // If currently in active listening, stop that first
      if (isListening) {
        setIsListening(false);
        try {
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
        } catch (e) {}
        
        // Add a delay before starting wake word to ensure clean transition
        setTimeout(() => {
          wakeWordListeningRef.current = true;
          try {
            recognitionRef.current.start();
            console.log("Started wake word detection after stopping active listening");
          } catch (e) {
            console.error("Error starting wake word detection:", e);
            restartWakeWordDetection();
          }
        }, 500);
      } else {
        // Start wake word detection directly
        wakeWordListeningRef.current = true;
        try {
          recognitionRef.current.start();
          console.log("Started wake word detection");
        } catch (e) {
          console.error("Error starting wake word detection:", e);
          restartWakeWordDetection();
        }
      }
    } else {
      // Disable wake word detection (if not in active listening mode)
      wakeWordListeningRef.current = false;
      if (!isListening && recognitionRef.current) {
        try {
          recognitionRef.current.stop();
          console.log("Stopped wake word detection");
        } catch (e) {
          console.error("Error stopping wake word detection:", e);
        }
      }
    }
    
    // Cleanup
    return () => {
      if (window.restartTimer) {
        clearTimeout(window.restartTimer);
      }
    };
  }, [wakeWordActive, isListening, restartWakeWordDetection]);
  
  // Clear all timers to prevent memory leaks
  const clearAllTimers = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    if (window.autoSendTimeout) {
      clearTimeout(window.autoSendTimeout);
      window.autoSendTimeout = undefined;
    }
    
    if (window.silenceTimer) {
      clearTimeout(window.silenceTimer);
      window.silenceTimer = undefined;
    }
    
    if (window.restartTimer) {
      clearTimeout(window.restartTimer);
      window.restartTimer = undefined;
    }
  }, []);
  
  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Toggle listen mode
  const startListening = useCallback(() => {
    if (typeof window === 'undefined' || !recognitionRef.current) return;
    
    // Disable wake word mode temporarily if active
    if (wakeWordActive) {
      wakeWordListeningRef.current = false;
    }
    
    // Clear previous transcript and timers
    setTranscript('');
    finalTranscriptRef.current = '';
    clearAllTimers();
    
    // Enable active listening
    setIsListening(true);
    
    // Attempt to start recognition
    try {
      recognitionRef.current.stop(); // Stop any ongoing recognition first
    } catch (e) {}
    
    // Small delay to ensure clean start
    setTimeout(() => {
      try {
        recognitionRef.current.start();
        console.log("Started active listening");
      } catch (e) {
        console.error("Error starting active listening:", e);
        setIsListening(false);
      }
    }, 200);
  }, [wakeWordActive, clearAllTimers]);
  
  // Stop listening and process transcript
  const stopListening = useCallback(() => {
    // First mark as not listening to prevent auto-restart
    setIsListening(false);
    
    // Check for silenceTimer
    if (typeof window !== 'undefined' && window.silenceTimer) {
      clearTimeout(window.silenceTimer);
    }
    
    // Stop recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping active listening:", e);
      }
    }
    
    // If we have a transcript, process it
    if (finalTranscriptRef.current.trim()) {
      handleSpeechInput(finalTranscriptRef.current.trim());
    } else {
      // Reset state
      finalTranscriptRef.current = '';
      setTranscript('');
      
      // If wake word was active, restart it
      if (wakeWordActive) {
        setTimeout(() => {
          wakeWordListeningRef.current = true;
          restartWakeWordDetection();
        }, 500);
      }
    }
  }, [handleSpeechInput, wakeWordActive, restartWakeWordDetection]);
  
  // Text-to-speech using ElevenLabs
  const speakText = async (text: string) => {
    if (!audioEnabled || !audioPlayerRef.current) return;
    
    try {
      setIsSpeaking(true);
      
      // Call ElevenLabs API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY || ''
        }),
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        }),
        
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
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = audioUrl;
        audioPlayerRef.current.play();
        
        // When audio completes
        audioPlayerRef.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl); // Clean up
        };
      }
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
    // Word is already saved in state
  };

  // Progress chart data calculation
  const getProgressChartData = () => {
    return treatmentProgress.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sleepQuality: day.sleepQuality,
      anxiety: 10 - day.anxiety, // Reverse scale for anxiety (lower is better)
      focus: day.focus,
      mood: day.mood
    }));
  };

  // Toggle video player visibility - removed as we're handling this inline now

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
        
        <div className="py-4 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-2">
              <UserCircle className="h-6 w-6 text-blue-600" />
            </div>
            {isSidebarOpen && (
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-800">{patientProfile.name}</p>
                <p className="text-xs text-gray-500">{patientProfile.condition}</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Activity className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">My Progress</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'appointments' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Calendar className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Appointments</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('resources')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'resources' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FileText className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Resources</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'chat' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <MessageSquare className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Ask Dr. Miller</span>}
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
            {activeTab === 'dashboard' && 'My Treatment Progress'}
            {activeTab === 'appointments' && 'My Appointments'}
            {activeTab === 'resources' && 'Treatment Resources'}
            {activeTab === 'chat' && 'Ask Dr. Miller'}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              Contact Support
            </button>
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
                placeholder="e.g., Hey Dr. Miller"
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
        
        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="fixed bottom-24 right-6 bg-green-100 px-3 py-1 rounded-full shadow-md text-xs flex items-center">
            <Volume2 className="h-3 w-3 text-green-500 mr-2 animate-pulse" />
            <span className="text-green-700">Dr. Miller is speaking...</span>
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
        {wakeWordActive && !isListening && wakeWordListeningRef.current && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center">
            <Zap className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm font-medium">
              Say &quot;{customWakeWord}&quot; to activate
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
          {/* Progress Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Treatment Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Treatment Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Treatment Plan</p>
                    <p className="text-lg font-medium text-gray-800">{patientProfile.treatmentPlan}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="text-lg font-medium text-gray-800">{new Date(patientProfile.treatmentStart).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Sessions Completed</p>
                    <p className="text-lg font-medium text-gray-800">8 of 24</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Next Appointment</p>
                    <p className="text-lg font-medium text-gray-800">
                      {patientAppointments[0].date.split('-')[2]} {new Date(patientAppointments[0].date).toLocaleString('default', { month: 'short' })} at {patientAppointments[0].time}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Progress Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">My Progress Tracker</h2>
                <div className="overflow-x-auto">
                  <div className="min-w-full h-64 bg-gray-50 rounded-lg p-4 flex items-end justify-between space-x-4">
                    {treatmentProgress.map((day, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <p className="mb-2 text-xs text-gray-500">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <div className="w-full flex space-x-1 justify-center">
                          <div className="w-4 bg-blue-400 rounded-t" style={{ height: `${day.sleepQuality * 10}%` }} title={`Sleep: ${day.sleepQuality}/10`}></div>
                          <div className="w-4 bg-red-400 rounded-t" style={{ height: `${(10 - day.anxiety) * 10}%` }} title={`Anxiety: ${day.anxiety}/10 (lower is better)`}></div>
                          <div className="w-4 bg-green-400 rounded-t" style={{ height: `${day.focus * 10}%` }} title={`Focus: ${day.focus}/10`}></div>
                          <div className="w-4 bg-purple-400 rounded-t" style={{ height: `${day.mood * 10}%` }} title={`Mood: ${day.mood}/10`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4 text-xs">
                  <div className="flex items-center mx-2">
                    <div className="w-3 h-3 bg-blue-400 rounded mr-1"></div>
                    <span>Sleep</span>
                  </div>
                  <div className="flex items-center mx-2">
                    <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                    <span>Anxiety</span>
                  </div>
                  <div className="flex items-center mx-2">
                    <div className="w-3 h-3 bg-green-400 rounded mr-1"></div>
                    <span>Focus</span>
                  </div>
                  <div className="flex items-center mx-2">
                    <div className="w-3 h-3 bg-purple-400 rounded mr-1"></div>
                    <span>Mood</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                    Log Today's Progress
                  </button>
                </div>
              </div>
              
              {/* Treatment Notes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Treatment Notes</h2>
                <div className="space-y-4">
                  {treatmentProgress.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-800">{new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Session {index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{day.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick AI Assistant for Dashboard */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Ask Dr. Miller</h2>
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
                            {messages[messages.length - 2]?.role === 'user' ? messages[messages.length - 2].content : "Ask me about your treatment or how you're feeling today!"}
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
                      placeholder="Ask about your treatment or progress..."
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
                    <Info className="h-3 w-3 mr-1" /> Dr. Miller is here to help with your treatment journey
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
          
          {/* Appointments View */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" /> Schedule New Appointment
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Provider
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patientAppointments.map((appt) => (
                        <tr key={appt.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{appt.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appt.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appt.provider}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appt.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Reschedule</button>
                            <button className="text-red-600 hover:text-red-900">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Appointment Reminders */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Reminders</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">Please arrive 15 minutes before your scheduled appointment time.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <FileClock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">For your next appointment on {new Date(patientAppointments[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, please bring your symptom tracking journal.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Info className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">You will receive a reminder 24 hours before each appointment via SMS and email.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Resources View */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              {/* Treatment Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Treatment Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-md font-medium text-gray-800">MeRT Treatment Guide</h3>
                        <p className="text-sm text-gray-600 mt-1">Complete guide to your Magnetic e-Resonance Therapy treatment protocol.</p>
                        <button className="mt-2 text-sm text-blue-600">Download PDF</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-md font-medium text-gray-800">Symptom Tracking Journal</h3>
                        <p className="text-sm text-gray-600 mt-1">Template for tracking your daily symptoms and progress.</p>
                        <button className="mt-2 text-sm text-blue-600">Download PDF</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-md font-medium text-gray-800">Nutrition Guidelines</h3>
                        <p className="text-sm text-gray-600 mt-1">Recommended nutrition plan to support your treatment outcomes.</p>
                        <button className="mt-2 text-sm text-blue-600">Download PDF</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-md font-medium text-gray-800">Mindfulness Exercises</h3>
                        <p className="text-sm text-gray-600 mt-1">Supplementary mindfulness practices to enhance your treatment.</p>
                        <button className="mt-2 text-sm text-blue-600">Download PDF</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Educational Videos */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Educational Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-32 flex items-center justify-center">
                      <span className="text-gray-500">Video Thumbnail</span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800">Understanding MeRT Treatment</h3>
                      <p className="text-xs text-gray-600 mt-1">Dr. Miller explains how MeRT works and what to expect.</p>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-32 flex items-center justify-center">
                      <span className="text-gray-500">Video Thumbnail</span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800">Patient Success Stories</h3>
                      <p className="text-xs text-gray-600 mt-1">Hear from patients who have completed their treatment.</p>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-32 flex items-center justify-center">
                      <span className="text-gray-500">Video Thumbnail</span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800">At-Home Exercises</h3>
                      <p className="text-xs text-gray-600 mt-1">Guided exercises to complement your treatment.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-800">Is MeRT treatment painful?</h3>
                    <p className="text-sm text-gray-600 mt-2">No, most patients report no pain, just a light tapping sensation during treatment. The procedure is non-invasive and well-tolerated by most patients.</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-800">How long before I notice results?</h3>
                    <p className="text-sm text-gray-600 mt-2">Many patients report improvements within the first two weeks of treatment, though this varies by condition and individual. Your provider will discuss realistic expectations during your consultations.</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-800">Are there any side effects?</h3>
                    <p className="text-sm text-gray-600 mt-2">Most patients experience minimal to no side effects. Some patients report mild fatigue or headache after initial sessions, which typically resolves quickly.</p>
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
                      <h2 className="text-lg font-semibold text-gray-800">Dr. Spencer O. Miller</h2>
                      <p className="text-sm text-gray-500">Medical Director, Brain Treatment Center of Dallas</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        if (!showVideoPlayer) {
                          setShowVideoPlayer(true);
                          setCurrentVideo('default');
                          setIsVideoPlaying(true);
                        } else {
                          setShowVideoPlayer(false);
                          setIsVideoPlaying(false);
                        }
                      }}
                      className="bg-white text-gray-600 px-3 py-1 rounded-md border border-gray-300 text-sm flex items-center"
                    >
                      {showVideoPlayer ? "Hide" : "Show"} Video
                    </button>
                    <button className="bg-white text-gray-600 px-3 py-1 rounded-md border border-gray-300 text-sm flex items-center">
                      <History className="h-4 w-4 mr-1" /> History
                    </button>
                    <button 
                      onClick={() => setMessages([{ 
                        role: 'assistant',
                        content: 'Hello Sarah! I\'m Dr. Spencer Miller from the Brain Treatment Center. How can I assist you today with your treatment journey?',
                        sources: []
                      }])}
                      className="bg-white text-gray-600 px-3 py-1 rounded-md border border-gray-300 text-sm flex items-center"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> New Chat
                    </button>
                  </div>
                </div>
                
                {/* Video Player Section */}
                {showVideoPlayer && (
                  <VideoPlayer 
                    currentVideo={currentVideo}
                    isPlaying={isVideoPlaying}
                    onVideoEnd={handleVideoEnd}
                    onQuestionClick={handleVideoQuestionClick}
                    onCustomQuestionSubmit={handleCustomQuestionSubmit}
                  />
                )}
                
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
                    placeholder="Ask Dr. Miller about your treatment, symptoms, or concerns..."
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
                    <Info className="h-3 w-3 mr-1" /> Your conversations are private and help personalize your care
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
                      <button 
                        onClick={() => setShowWakeWordSettings(true)}
                        className="ml-1 text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Example Questions */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Questions</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "How does MeRT treatment work for anxiety?",
                      "What should I expect during my next session?",
                      "Are there any ways to improve my treatment results?",
                      "How long will my full treatment plan take?",
                      "What improvements might I notice first?"
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
        </main>
      </div>
    </div>
  );
}