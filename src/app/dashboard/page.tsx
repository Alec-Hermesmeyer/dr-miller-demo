"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  FileClock,
  X,
  Bell,
  AlertTriangle,
  HelpCircle,
  ChevronLeft,
  BookOpen,
  Download,
  ArrowUp,
  ArrowDown,
  Coffee,
  Sun
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
  },
  // New knowledge base entries for enhanced content
  {
    id: "lifestyle-nutrition",
    title: "Nutrition Guidelines",
    content: "Proper nutrition is an important component of brain health and can complement your MeRT treatment. Our nutritionists recommend a diet rich in omega-3 fatty acids, antioxidants, and anti-inflammatory foods. Specific recommendations include fatty fish (salmon, mackerel), leafy greens, berries, nuts, seeds, and olive oil. Limiting processed foods, refined sugars, and alcohol can also support brain function and overall health during your treatment.",
    category: "lifestyle",
    tags: ["nutrition", "diet", "brain health", "food", "supplements"]
  },
  {
    id: "lifestyle-sleep",
    title: "Sleep Optimization",
    content: "Quality sleep is essential for brain recovery and maximizing the benefits of your MeRT treatment. We recommend maintaining a consistent sleep schedule, creating a relaxing bedtime routine, optimizing your sleep environment (cool, dark, quiet), limiting screen time before bed, and avoiding caffeine and alcohol close to bedtime. If you experience sleep disturbances, please discuss this with your provider as adjustments to your treatment protocol may be beneficial.",
    category: "lifestyle",
    tags: ["sleep", "insomnia", "rest", "recovery", "brain health"]
  },
  {
    id: "research-studies",
    title: "Recent MeRT Research",
    content: "Recent clinical studies have shown promising results for MeRT treatment across multiple conditions. A 2023 study published in the Journal of Neurotherapeutics demonstrated significant improvements in executive function and emotional regulation for TBI patients following an 8-week MeRT protocol. Another study focused on treatment-resistant depression showed a 65% response rate and 42% remission rate among participants. Research is ongoing, with current trials exploring applications for Long COVID, fibromyalgia, and age-related cognitive decline.",
    category: "research",
    tags: ["studies", "clinical trials", "evidence", "outcomes", "research"]
  }
];

// Example patient appointments
const patientAppointments = [
  { id: 1, date: "2025-03-28", time: "10:00 AM", type: "MeRT Treatment", provider: "Dr. Miller", status: "Confirmed", location: "Dallas Office" },
  { id: 2, date: "2025-04-02", time: "2:30 PM", type: "Follow-up Consultation", provider: "Dr. Miller", status: "Confirmed", location: "Dallas Office" },
  { id: 3, date: "2025-04-09", time: "11:15 AM", type: "MeRT Treatment", provider: "Dr. Wilson", status: "Pending", location: "Plano Office" },
  { id: 4, date: "2025-04-16", time: "9:30 AM", type: "MeRT Treatment", provider: "Dr. Miller", status: "Confirmed", location: "Dallas Office" }
];

// Enhanced treatment progress data with more metrics
const treatmentProgress = [
  { 
    id: 1, 
    date: "2025-03-10", 
    sleepQuality: 6, 
    anxiety: 7, 
    focus: 5, 
    mood: 6, 
    energyLevel: 5,
    socialEngagement: 4,
    cognitivePerformance: 5,
    notes: "Feeling fatigued after treatment but noticed slight improvement in concentration during afternoon."
  },
  { 
    id: 2, 
    date: "2025-03-17", 
    sleepQuality: 7, 
    anxiety: 6, 
    focus: 6, 
    mood: 7, 
    energyLevel: 6,
    socialEngagement: 5,
    cognitivePerformance: 6,
    notes: "Sleep quality improving. Able to fall asleep faster and fewer nighttime awakenings."
  },
  { 
    id: 3, 
    date: "2025-03-24", 
    sleepQuality: 8, 
    anxiety: 5, 
    focus: 7, 
    mood: 8, 
    energyLevel: 7,
    socialEngagement: 7,
    cognitivePerformance: 7,
    notes: "Concentration improving at work. Less anxious in social situations. Overall feeling more balanced."
  }
];

// Example patient profile with more details
const patientProfile = {
  name: "Sarah Johnson",
  age: 35,
  condition: "Anxiety & Depression",
  treatmentStart: "2025-03-10",
  treatmentPlan: "6-week MeRT Protocol",
  completedSessions: 8,
  totalPlannedSessions: 24,
  doctor: "Dr. Spencer Miller",
  insurance: "Blue Cross Blue Shield",
  nextAppointment: "March 28, 2025 at 10:00 AM",
  medications: ["Sertraline 50mg", "Multivitamin"],
  allergies: ["Penicillin"],
  preferredPharmacy: "CVS Pharmacy - Oak Lawn",
  emergencyContact: "John Johnson (Husband) - (214) 555-3456"
};

// New notifications system
const patientNotifications = [
  { 
    id: 1, 
    type: "appointment", 
    title: "Upcoming Appointment", 
    message: "You have a MeRT Treatment scheduled for tomorrow at 10:00 AM with Dr. Miller at our Dallas Office.", 
    date: "2025-03-27", 
    read: false,
    action: "View Appointment"
  },
  { 
    id: 2, 
    type: "message", 
    title: "Message from Dr. Miller", 
    message: "I've reviewed your progress reports and I'm pleased with your improvements. Let's discuss further at your next appointment.", 
    date: "2025-03-25", 
    read: true,
    action: "Read Message"
  },
  { 
    id: 3, 
    type: "resource", 
    title: "New Resource Available", 
    message: "We've added a new guide on sleep optimization techniques to support your treatment. Check it out in your Resources tab.", 
    date: "2025-03-22", 
    read: false,
    action: "View Resource"
  },
  { 
    id: 4, 
    type: "reminder", 
    title: "Progress Report Reminder", 
    message: "Please complete your weekly symptom tracking before your next appointment to help us evaluate your treatment progress.", 
    date: "2025-03-26", 
    read: false,
    action: "Complete Report"
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

// Notification Component - New component for enhanced notifications
interface NotificationProps {
  notifications: typeof patientNotifications;
  onDismiss: (id: number) => void;
  onAction: (action: string, id: number) => void;
  onMarkAllRead: () => void;
}

const NotificationPanel: React.FC<NotificationProps> = ({ 
  notifications, 
  onDismiss, 
  onAction,
  onMarkAllRead
}) => {
  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'resource': return <FileText className="h-4 w-4 text-purple-500" />;
      case 'reminder': return <Bell className="h-4 w-4 text-yellow-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 w-80 max-h-96 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-blue-50">
        <h3 className="font-medium text-gray-800 flex items-center">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </h3>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <button 
              onClick={onMarkAllRead}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No notifications
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                      <button 
                        onClick={() => onDismiss(notification.id)} 
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{new Date(notification.date).toLocaleDateString()}</span>
                      <button 
                        onClick={() => onAction(notification.action, notification.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {notification.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Progress Chart Component - Extracted from main component
interface ProgressChartProps {
  progressData: typeof treatmentProgress;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progressData }) => {
  // Define metrics to display
  const metrics = [
    { key: 'sleepQuality', label: 'Sleep', color: 'bg-blue-400' },
    { key: 'anxiety', label: 'Anxiety', color: 'bg-red-400', inverted: true },
    { key: 'focus', label: 'Focus', color: 'bg-green-400' },
    { key: 'mood', label: 'Mood', color: 'bg-purple-400' },
    { key: 'energyLevel', label: 'Energy', color: 'bg-yellow-400' }
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full h-64 bg-gray-50 rounded-lg p-4 flex items-end justify-between space-x-4">
        {progressData.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col items-center flex-1">
            <p className="mb-2 text-xs text-gray-500">
              {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <div className="w-full flex space-x-1 justify-center">
              {metrics.map((metric, metricIndex) => (
                <div 
                  key={metricIndex}
                  className={`w-4 ${metric.color} rounded-t relative group`} 
                  style={{ 
                    height: `${metric.inverted 
                      ? (10 - (day as any)[metric.key]) * 10 
                      : (day as any)[metric.key] * 10}%` 
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {metric.label}: {metric.inverted 
                        ? `${day[metric.key as keyof typeof day]}/10 (lower is better)` 
                        : `${day[metric.key as keyof typeof day]}/10`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4 text-xs flex-wrap gap-2">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center mx-1">
            <div className={`w-3 h-3 ${metric.color} rounded mr-1`}></div>
            <span>{metric.label}{metric.inverted ? ' (lower is better)' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
    'How can I schedule a consultation?': 'How can i schedule a consultation 1.mp4',
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
      <div className="mb-4 bg-black rounded-lg overflow-hidden relative">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videos[currentVideo as keyof typeof videos]}
          controls={true}
          autoPlay={isPlaying}
          onEnded={handleVideoEnd}
          aria-label={`Dr. Miller answering: ${currentVideo}`}
        />
        {/* Loading indicator */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 pointer-events-none">
            <div className="rounded-full h-16 w-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
        )}
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
      
      {/* Custom question form */}
      <form onSubmit={onCustomQuestionSubmit} className="mt-4">
        <div className="flex">
          <input
            name="customQuestion"
            type="text"
            placeholder="Ask your own question..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-blue-700 transition-colors"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
};

// Message Bubble Component - For Chat Interface
interface MessageBubbleProps {
  message: {
    role: string;
    content: string;
    sources?: { title: string; id: string }[];
  };
  index: number;
  showSourceInfo: Record<string, boolean>;
  toggleSourceInfo: (index: number) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  index,
  showSourceInfo,
  toggleSourceInfo
}) => {
  return (
    <div className="flex animate-fadeIn">
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
              aria-expanded={showSourceInfo[index] ? 'true' : 'false'}
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
  );
};

// Custom hook for speech recognition
function useSpeechRecognition({
  onFinalTranscript,
  onInterimTranscript
}: {
  onFinalTranscript: (transcript: string) => void;
  onInterimTranscript: (transcript: string) => void;
}) {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const finalTranscriptRef = useRef<string>('');
  
  // Initialize on client-side only
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Set up SpeechRecognition
    const LocalSpeechRecognition = (window as WindowWithSpeechRecognition).SpeechRecognition || 
                                   (window as WindowWithSpeechRecognition).webkitSpeechRecognition;
    
    if (!LocalSpeechRecognition) {
      setError('Speech recognition not supported in this browser');
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
    recognitionRef.current = new LocalSpeechRecognition();
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
      
      // Active listening mode
      if (isListening) {
        // Show combined transcript for user feedback
        const displayText = finalTranscriptRef.current + interimTranscript;
        onInterimTranscript(displayText);
        
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
                onFinalTranscript(finalTranscriptRef.current.trim());
              }
            }, 2500);
          } 
        }
      }
    };
    
    // Handle errors
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(event.error);
      
      if (event.error === 'no-speech') {
        console.log("No speech detected");
        return; // Don't stop on no-speech errors
      }
      
      if (isListening) {
        setIsListening(false);
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
              setIsListening(false);
            }
          }, 300);
        }
      }
    };
    
    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && window.silenceTimer) {
        clearTimeout(window.silenceTimer);
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isListening, onFinalTranscript, onInterimTranscript]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (typeof window === 'undefined' || !recognitionRef.current) return;
    
    // Clear previous transcript and timers
    finalTranscriptRef.current = '';
    if (typeof window !== 'undefined' && window.silenceTimer) {
      clearTimeout(window.silenceTimer);
    }
    
    // Enable active listening
    setIsListening(true);
    setError(null);
    
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
        setError('Failed to start listening');
      }
    }, 200);
  }, []);
  
  // Stop listening
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
      onFinalTranscript(finalTranscriptRef.current.trim());
    }
    
    // Reset state
    finalTranscriptRef.current = '';
    onInterimTranscript('');
  }, [onFinalTranscript, onInterimTranscript]);
  
  return {
    isListening,
    startListening,
    stopListening,
    error
  };
}

// Main Dashboard Component
export default function PatientDashboard() {
  // State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatInput, setChatInput] = useState('');
  const [filteredProgressMetrics, setFilteredProgressMetrics] = useState<string[]>([
    'sleepQuality', 'anxiety', 'focus', 'mood', 'energyLevel'
  ]);
  
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

  // Notification state
  const [notifications, setNotifications] = useState(patientNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Theme state (new feature)
  const [darkMode, setDarkMode] = useState(false);
  
  // References
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
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
  
  // Setup speech recognition with custom hook
  const {
    isListening,
    startListening: startListeningBase,
    stopListening,
    error: speechError
  } = useSpeechRecognition({
    onFinalTranscript: (finalTranscript) => handleSpeechInput(finalTranscript),
    onInterimTranscript: (interimTranscript) => setTranscript(interimTranscript)
  });
  
  // Enhanced startListening function that handles wake word state
  const startListening = useCallback(() => {
    // Disable wake word mode temporarily if active
    if (wakeWordActive) {
      wakeWordListeningRef.current = false;
    }
    
    // Start normal listening mode
    startListeningBase();
  }, [wakeWordActive, startListeningBase]);
  
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
    
    // Format the transcription
    const formattedText = await formatTranscription(finalTranscript);
    console.log("Formatted text:", formattedText);
    
    // Set as chat input
    setChatInput(formattedText);
    
    // Auto-send
    setTimeout(() => {
      handleSendMessage(formattedText);
    }, 300);
  }, [formatTranscription]);
  
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
  
  // Wake Word Detection (simplified implementation for this mockup)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    console.log(`Wake word mode ${wakeWordActive ? 'enabled' : 'disabled'}`);
    
    if (wakeWordActive) {
      // In a real implementation, we would activate wake word detection here
      wakeWordListeningRef.current = true;
      console.log("Wake word detection activated with phrase:", customWakeWord);
    } else {
      // Disable wake word detection
      wakeWordListeningRef.current = false;
      console.log("Wake word detection deactivated");
    }
  }, [wakeWordActive, customWakeWord]);
  
  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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

  // Notification handlers
  const handleDismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const handleNotificationAction = (action: string, id: number) => {
    // Mark as read
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    // Handle specific actions based on the action text
    switch (action) {
      case 'View Appointment':
        setActiveTab('appointments');
        break;
      case 'Read Message':
        setActiveTab('chat');
        break;
      case 'View Resource':
        setActiveTab('resources');
        break;
      case 'Complete Report':
        // Would navigate to progress tracking form
        setActiveTab('dashboard');
        break;
      default:
        break;
    }
    
    // Hide notification panel after action
    setShowNotifications(false);
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  // Filter progress metrics
  const toggleProgressMetric = (metric: string) => {
    setFilteredProgressMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric) 
        : [...prev, metric]
    );
  };

  // Calculate unread notifications count
  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} border-r ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
          <div className="flex items-center">
            <Brain className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} h-8 w-8`} />
            {isSidebarOpen && <span className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Brain Center</span>}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronRight className={`h-5 w-5 transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className={`py-4 px-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-2">
              <UserCircle className="h-6 w-6 text-blue-600" />
            </div>
            {isSidebarOpen && (
              <div className="ml-2">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{patientProfile.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{patientProfile.condition}</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full px-4 py-3 ${
                  activeTab === 'dashboard' 
                    ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600') 
                    : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
                }`}
                aria-current={activeTab === 'dashboard' ? 'page' : undefined}
              >
                <Activity className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">My Progress</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center w-full px-4 py-3 ${
                  activeTab === 'appointments' 
                    ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600') 
                    : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
                }`}
                aria-current={activeTab === 'appointments' ? 'page' : undefined}
              >
                <Calendar className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Appointments</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('resources')}
                className={`flex items-center w-full px-4 py-3 ${
                  activeTab === 'resources' 
                    ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600') 
                    : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
                }`}
                aria-current={activeTab === 'resources' ? 'page' : undefined}
              >
                <FileText className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Resources</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex items-center w-full px-4 py-3 ${
                  activeTab === 'chat' 
                    ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600') 
                    : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
                }`}
                aria-current={activeTab === 'chat' ? 'page' : undefined}
              >
                <MessageSquare className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Ask Dr. Miller</span>}
              </button>
            </li>
          </ul>
        </nav>
        
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center w-full px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-md mb-2`}
            aria-pressed={darkMode}
          >
            {darkMode ? (
              <><Sun className="h-5 w-5" />{isSidebarOpen && <span className="ml-3">Light Mode</span>}</>
            ) : (
              <><Coffee className="h-5 w-5" />{isSidebarOpen && <span className="ml-3">Dark Mode</span>}</>
            )}
          </button>
          <button className={`flex items-center w-full px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-md mb-2`}>
            <Settings className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Settings</span>}
          </button>
          <button className={`flex items-center w-full px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-md mt-2`}>
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex items-center justify-between`}>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {activeTab === 'dashboard' && 'My Treatment Progress'}
            {activeTab === 'appointments' && 'My Appointments'}
            {activeTab === 'resources' && 'Treatment Resources'}
            {activeTab === 'chat' && 'Ask Dr. Miller'}
          </h1>
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label="Notifications"
              >
                <Bell className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
              
              {/* Notification Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 z-50">
                  <NotificationPanel 
                    notifications={notifications}
                    onDismiss={handleDismissNotification}
                    onAction={handleNotificationAction}
                    onMarkAllRead={markAllNotificationsAsRead}
                  />
                </div>
              )}
            </div>
            
            <button className={`px-4 py-2 ${
              darkMode 
                ? 'bg-blue-700 text-white hover:bg-blue-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } rounded-md text-sm transition-colors`}>
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
              className={`p-3 rounded-full shadow-lg ${
                wakeWordActive 
                  ? 'bg-green-600 text-white' 
                  : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700')
              }`}
              title={wakeWordActive ? "Wake word active" : "Enable wake word"}
              aria-pressed={wakeWordActive}
            >
              <Zap className="h-5 w-5" />
            </button>
            
            {/* Audio Toggle */}
            <button 
              onClick={toggleAudio}
              className={`p-3 rounded-full shadow-lg ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}
              title={audioEnabled ? "Mute assistant" : "Unmute assistant"}
              aria-pressed={audioEnabled}
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
              className={`p-4 rounded-full shadow-lg ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : (darkMode ? 'bg-blue-700' : 'bg-blue-600') + ' text-white'
              }`}
              aria-pressed={isListening}
              aria-label={isListening ? "Stop listening" : "Start voice input"}
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
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
            } p-4 rounded-lg shadow-lg border w-80`}>
              <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Set Custom Wake Word</h3>
              <input
                type="text"
                value={customWakeWord}
                onChange={(e) => setCustomWakeWord(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3`}
                placeholder="e.g., Hey Dr. Miller"
              />
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowWakeWordSettings(false)}
                  className={`px-3 py-1 ${
                    darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                  } text-sm mr-2`}
                >
                  Cancel
                </button>
                <button 
                  onClick={saveWakeWord}
                  className={`px-3 py-1 ${
                    darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-md text-sm`}
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
          <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-40 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } px-4 py-2 rounded-lg shadow-lg border flex items-center`}>
            <div className="flex space-x-1 mr-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Listening... <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{transcript}</span>
            </span>
          </div>
        )}
        
        {/* Show Wake Word Active Status */}
        {wakeWordActive && !isListening && wakeWordListeningRef.current && (
          <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-40 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } px-4 py-2 rounded-lg shadow-lg border flex items-center`}>
            <Zap className="h-4 w-4 text-green-600 mr-2" />
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
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
        
        {/* Speech Recognition Error */}
        {speechError && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-red-100 border border-red-300 px-4 py-2 rounded-lg shadow-lg text-red-700 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {speechError === 'not-allowed' 
                ? 'Microphone access denied. Please check your browser permissions.' 
                : `Speech recognition error: ${speechError}`}
            </span>
          </div>
        )}
        
        {/* Content Area */}
        <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* Progress Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Treatment Overview */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border p-6`}>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Treatment Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`${darkMode ? 'bg-blue-900' : 'bg-blue-50'} p-4 rounded-lg`}>
                    <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-gray-600'}`}>Treatment Plan</p>
                    <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{patientProfile.treatmentPlan}</p>
                  </div>
                  <div className={`${darkMode ? 'bg-green-900' : 'bg-green-50'} p-4 rounded-lg`}>
                    <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-gray-600'}`}>Progress</p>
                    <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {patientProfile.completedSessions} of {patientProfile.totalPlannedSessions} Sessions
                    </p>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(patientProfile.completedSessions / patientProfile.totalPlannedSessions) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-purple-900' : 'bg-purple-50'} p-4 rounded-lg`}>
                    <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-gray-600'}`}>Start Date</p>
                    <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{new Date(patientProfile.treatmentStart).toLocaleDateString()}</p>
                  </div>
                  <div className={`${darkMode ? 'bg-yellow-900' : 'bg-yellow-50'} p-4 rounded-lg`}>
                    <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-gray-600'}`}>Next Appointment</p>
                    <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {patientAppointments[0].date.split('-')[2]} {new Date(patientAppointments[0].date).toLocaleString('default', { month: 'short' })} at {patientAppointments[0].time}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Progress Chart */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>My Progress Tracker</h2>
                  
                  {/* Metric filter buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => toggleProgressMetric('sleepQuality')}
                      className={`px-2 py-1 text-xs rounded-full ${
                        filteredProgressMetrics.includes('sleepQuality')
                          ? 'bg-blue-600 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Sleep
                    </button>
                    <button 
                      onClick={() => toggleProgressMetric('anxiety')}
                      className={`px-2 py-1 text-xs rounded-full ${
                        filteredProgressMetrics.includes('anxiety')
                          ? 'bg-red-600 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Anxiety
                    </button>
                    <button 
                      onClick={() => toggleProgressMetric('focus')}
                      className={`px-2 py-1 text-xs rounded-full ${
                        filteredProgressMetrics.includes('focus')
                          ? 'bg-green-600 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Focus
                    </button>
                    <button 
                      onClick={() => toggleProgressMetric('mood')}
                      className={`px-2 py-1 text-xs rounded-full ${
                        filteredProgressMetrics.includes('mood')
                          ? 'bg-purple-600 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Mood
                    </button>
                    <button 
                      onClick={() => toggleProgressMetric('energyLevel')}
                      className={`px-2 py-1 text-xs rounded-full ${
                        filteredProgressMetrics.includes('energyLevel')
                          ? 'bg-yellow-600 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Energy
                    </button>
                  </div>
                </div>
                
                {/* Progress chart component */}
                <ProgressChart progressData={treatmentProgress} />
                
                <div className="mt-4 flex justify-center">
                  <button className={`${
                    darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white px-4 py-2 rounded-md text-sm transition-colors`}>
                    Log Today&apos;s Progress
                  </button>
                </div>
              </div>
              
              {/* Treatment Notes */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border p-6`}>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Treatment Notes</h2>
                <div className="space-y-4">
                  {treatmentProgress.map((day, index) => (
                    <div key={index} className={`border-l-4 border-blue-400 pl-4 py-2 ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    } transition-colors`}>
                      <div className="flex justify-between items-start">
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <span className={`${
                          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        } text-xs px-2 py-1 rounded`}>
                          Session {index + 1}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{day.notes}</p>
                      
                      {/* Additional metrics section */}
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div className={`${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        } rounded p-1 text-xs flex items-center justify-between`}>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Sleep:</span>
                          <span className={`font-medium ${
                            day.sleepQuality >= 7 
                              ? 'text-green-500' 
                              : day.sleepQuality >= 5 
                                ? 'text-yellow-500' 
                                : 'text-red-500'
                          }`}>{day.sleepQuality}/10</span>
                        </div>
                        <div className={`${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        } rounded p-1 text-xs flex items-center justify-between`}>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Anxiety:</span>
                          <span className={`font-medium ${
                            day.anxiety <= 3 
                              ? 'text-green-500' 
                              : day.anxiety <= 6 
                                ? 'text-yellow-500' 
                                : 'text-red-500'
                          }`}>{day.anxiety}/10</span>
                        </div>
                        <div className={`${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        } rounded p-1 text-xs flex items-center justify-between`}>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Focus:</span>
                          <span className={`font-medium ${
                            day.focus >= 7 
                              ? 'text-green-500' 
                              : day.focus >= 5 
                                ? 'text-yellow-500' 
                                : 'text-red-500'
                          }`}>{day.focus}/10</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick AI Assistant for Dashboard */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-lg shadow-sm border p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Ask Dr. Miller</h2>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className={`${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    } text-sm hover:underline flex items-center`}
                  >
                    Full Chat <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md`}>
                  <div className={`p-4 max-h-48 overflow-y-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    {/* Just show the last message exchange for the mini view */}
                    {messages.length > 0 && (
                      <>
                        <div className="flex mb-4">
                          <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                            <UserCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className={`${
                            darkMode ? 'bg-gray-800' : 'bg-white'
                          } p-3 rounded-lg shadow-sm ${
                            darkMode ? 'text-white' : 'text-gray-800'
                          } text-sm flex-1`}>
                            {messages[messages.length - 2]?.role === 'user' 
                              ? messages[messages.length - 2].content 
                              : "Ask me about your treatment or how you're feeling today!"}
                          </div>
                        </div>
                        {messages[messages.length - 1]?.role === 'assistant' && (
                          <div className="flex mb-4">
                            <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                              <Brain className="h-5 w-5 text-green-600" />
                            </div>
                            <div className={`${
                              darkMode ? 'bg-green-900' : 'bg-green-50'
                            } p-3 rounded-lg shadow-sm ${
                              darkMode ? 'text-white' : 'text-gray-800'
                            } text-sm flex-1`}>
                              {messages[messages.length - 1].content}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} p-3 flex`}>
                    <input
                      type="text"
                      placeholder="Ask about your treatment or progress..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                        className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} flex-1 px-3 py-2 rounded-l-md focus:outline-none`}
                    />
                    <button 
                      onClick={() => handleSendMessage()}
                      className={`${
                        darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
                      } px-4 py-2 rounded-r-md text-sm`}
                    >
                        Send
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
