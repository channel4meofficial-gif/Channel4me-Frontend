import '../../styles/chatbot/chatbot.css';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import config from '../../config/config';

type Message = {
  id: number;
  role: 'bot' | 'user';
  text?: string;
  time: string;
  suggestions?: string[];
  isDiagnosis?: boolean;
  aiData?: any;
};
const QUICK_SYMPTOMS = ['🤕 Headache', '💔 Chest pain', '🥵 Fever', '😴 Fatigue', '🤢 Nausea', '😮‍💨 Breathlessness'];

const SPECIALISTS = [
  { id: 1, name: 'Dr. Mark', specialty: 'Cardiologist', hospital: 'Hemas Hospital', rating: 4.7, icon: '👨‍⚕️' },
  { id: 2, name: 'Dr. Hashi', specialty: 'Electrophysiologist', hospital: 'Asiri Hospital', rating: 4.6, icon: '👩‍⚕️' },
  { id: 3, name: 'Dr. Larry', specialty: 'General Cardiologist', hospital: 'Hemas Hospital', rating: 4.5, icon: '👨‍⚕️' },
];

const CONDITIONS = [
  { label: 'Angina or Heart Attack', dot: 'orange' },
  { label: 'Severe Anxiety or Panic Attack', dot: 'red' },
  { label: 'Infection', dot: 'blue' },
  { label: 'Other Cardiac / Respiratory Issues', dot: 'purple' },
];

// ── Helpers ──────────────────────────────────────────────────
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '');
}

function getBotReply(userMsg, symptomCount) {
  const msg = userMsg.toLowerCase();
  if (symptomCount < 3) {
    const nextNum = symptomCount + 1;
    if (msg.includes('chest') || msg.includes('heart'))
      return { text: `❗ Chest pain recorded. Please describe your symptom ${nextNum}.`, suggestions: ['Cold sweat', 'Shortness of breath', 'Dizziness'] };
    if (msg.includes('headache') || msg.includes('head'))
      return { text: `🧠 Headache noted. Please describe your symptom ${nextNum}.`, suggestions: ['Nausea', 'Blurred vision', 'Sensitivity to light'] };
    if (msg.includes('fever'))
      return { text: `🌡️ Fever recorded. Please describe your symptom ${nextNum}.`, suggestions: ['Chills', 'Body ache', 'Sore throat'] };
    return { text: `📝 Symptom ${symptomCount} recorded. Please describe your symptom ${nextNum}.`, suggestions: ['Fatigue', 'Nausea', 'Dizziness'] };
  }
  return null; // triggers diagnosis screen
}

// ── Initial messages ─────────────────────────────────────────
const INIT_MESSAGES: Message[] = [
  {
    id: 1, role: 'bot' as const,
    text: '👋 Hi Cristiano! I\'m your AI Health Assistant. I\'m here to help understand your symptoms and connect you with the right specialist.',
    time: '10:00 AM',
    suggestions: ['Chest pain', 'Headache', 'Fever', 'Fatigue'],
  },
  {
    id: 2, role: 'bot' as const,
    text: '🩺 Please describe your first symptom. Be as specific as possible.',
    time: '10:00 AM',
  },
];

// ── Step bar component ────────────────────────────────────────
function StepBar({ symptomCount }) {
  const steps = [
    { label: 'Symptom 1', num: 1 },
    { label: 'Symptom 2', num: 2 },
    { label: 'Symptom 3', num: 3 },
    { label: 'Diagnosis', num: 4 },
  ];
  return (
    <div className="cb-steps">
      {steps.map(s => {
        const isDone = symptomCount >= s.num;
        const isActive = symptomCount + 1 === s.num;
        return (
          <div key={s.num} className={`cb-step${isDone ? ' done' : isActive ? ' active' : ''}`}>
            <div className="cb-step-num">{isDone ? '✓' : s.num}</div>
            {s.label}
          </div>
        );
      })}
    </div>
  );
}

// ── Diagnosis bubble ──────────────────────────────────────────
function DiagnosisBubble({ aiData, onFindSpecialist, onNewChat }: any) {
  const conditionsToRender = aiData?.conditions || CONDITIONS;
  return (
    <div className="cb-diagnosis-bubble">
      <div className="cb-diag-header">
        <div className="cb-diag-header-icon">🔬</div>
        <div>
          <div className="cb-diag-header-title">AI Health Assessment</div>
          <div className="cb-diag-header-sub">Based on your 3 symptoms</div>
        </div>
      </div>
      <div className="cb-diag-body">
        <div className="cb-diag-conditions">
          <div className="cb-diag-conditions-title">Possible Conditions</div>
          {conditionsToRender.map((c: any, i: number) => (
            <div className="cb-condition-item" key={i}>
              <div className={`cb-condition-dot ${c.dot || 'purple'}`}></div>
              {c.label}
            </div>
          ))}
        </div>
        <div className="cb-diag-note">
          ⚠️ {aiData?.insightMessage || "This is an AI-generated prediction based on common medical information and may not be 100% accurate. It is not a medical diagnosis."}
        </div>
        <div className="cb-diag-actions">
          <button className="cb-diag-btn primary" onClick={() => onFindSpecialist(aiData)}>🏥 Find a Specialist</button>
          <button className="cb-diag-btn secondary" onClick={onNewChat}>💬 New Chat</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SCREEN 1 + 2 — CHAT
// ════════════════════════════════════════════════════════════
function ChatScreen({ onFindSpecialist, onNewChat, collectedSymptoms, setCollectedSymptoms }: any) {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    async function initSession() {
      if (!token) {
        setMessages(prev => [...prev, { id: Date.now(), role: 'bot' as const, text: "⚠️ You must be logged in to use the AI Health Assistant.", time: nowTime() }]);
        return;
      }
      try {
        setIsTyping(true);
        const res = await fetch(`${config.apiBaseUrl}/api/v1/chat/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ model: 'openrouter/free' })
        });
        const data = await res.json();
        if (data.success) {
          setSessionId(data.session.sessionId);
        } else {
          setMessages(prev => [...prev, { id: Date.now(), role: 'bot' as const, text: "⚠️ Failed to start chat session: " + (data.message || 'Unknown error'), time: nowTime() }]);
        }
      } catch (e) {
        console.error("Failed to start session", e);
        setMessages(prev => [...prev, { id: Date.now(), role: 'bot' as const, text: "⚠️ Cannot connect to the server. Please check your backend.", time: nowTime() }]);
      } finally {
        setIsTyping(false);
      }
    }
    if (!sessionId && collectedSymptoms.length === 0) {
      initSession();
    }
  }, [token, sessionId, collectedSymptoms.length]);

  async function sendMessage(text?: string) {
    const trimmed = (text || input).trim();
    if (!trimmed || isTyping || showDiagnosis) return;

    if (!sessionId) {
      setMessages(prev => [...prev, { id: Date.now(), role: 'bot' as const, text: "⚠️ Chat session is not initialized. Please reload or log in.", time: nowTime() }]);
      setInput('');
      return;
    }

    const userMsg = { id: Date.now(), role: 'user' as const, text: trimmed, time: nowTime() };
    const newSymptoms = [...collectedSymptoms, trimmed];
    setCollectedSymptoms(newSymptoms);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let promptToSend = trimmed;
    if (newSymptoms.length === 1) {
      promptToSend = `User's 1st symptom is: ${trimmed}. Acknowledge it briefly and ask for symptom 2.`;
    } else if (newSymptoms.length === 2) {
      promptToSend = `User's 2nd symptom is: ${trimmed}. Acknowledge it briefly and ask for symptom 3.`;
    } else if (newSymptoms.length >= 3) {
      const specialistsStr = JSON.stringify(SPECIALISTS);
      promptToSend = `User's 3rd symptom is: ${trimmed}. You now have 3 symptoms. 
Provide a final diagnosis. 
CRITICAL RULES: 
1. You MUST respond with ONLY a valid, raw JSON object. No markdown formatting, no backticks, no other text.
2. The JSON object MUST have this exact structure:
{
  "conditions": [{ "label": "Name of condition", "dot": "red" /* or orange, blue, purple */ }],
  "recommendedDoctorIds": [sequence of integer IDs from the provided specialist list that match the diagnosis],
  "insightMessage": "A short summary of the AI analysis, e.g. 'Based on your symptoms...'"
}
3. ONLY recommend doctors from this list: ${specialistsStr}. Use their exact 'id'.`;
    }

    try {
      const res = await fetch(`${config.apiBaseUrl}/api/v1/chat/sessions/${sessionId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: promptToSend })
      });
      const data = await res.json();

      if (data.success) {
        const aiReply = data.reply;
        if (newSymptoms.length < 3) {
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot' as const, text: aiReply, time: nowTime() }]);
        } else {
          try {
            let jsonStr = aiReply;
            if (jsonStr.includes('```json')) {
              jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
            } else if (jsonStr.includes('```')) {
              jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
            }
            const parsed = JSON.parse(jsonStr);
            setMessages(prev => [...prev, {
              id: Date.now() + 1, role: 'bot' as const, time: nowTime(),
              isDiagnosis: true,
              aiData: parsed
            }]);
            setShowDiagnosis(true);
          } catch (e) {
            console.error("Failed to parse AI JSON:", e, aiReply);
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot' as const, text: aiReply, time: nowTime() }]);
          }
        }
      } else {
        const errDetail = data.error ? ` Details: ${data.error}` : "";
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot' as const, text: "Error: " + data.message + errDetail, time: nowTime() }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot' as const, text: "Failed to reach AI.", time: nowTime() }]);
    } finally {
      setIsTyping(false);
    }
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <div className="cb-page">
      <div className="cb-content">

        {/* Heading */}
        <div className="cb-heading">
          <div className="cb-heading-left">
            <h2>🤖 AI Assistant</h2>
            <p>Describe your symptoms — get instant guidance and specialist recommendations</p>
          </div>
          <span className="cb-status-badge">
            <span className="cb-status-dot"></span>
            Online &amp; Ready
          </span>
        </div>

        {/* Quick chips */}
        {!showDiagnosis && (
          <div className="cb-quick-row">
            <span className="cb-quick-label">Quick:</span>
            {QUICK_SYMPTOMS.map(s => (
              <button key={s} className="cb-quick-chip" onClick={() => sendMessage(s)}>{s}</button>
            ))}
          </div>
        )}

        {/* Chat window */}
        <div className="cb-window">

          {/* Header */}
          <div className="cb-win-header">
            <div className="cb-bot-avatar">🤖</div>
            <div>
              <div className="cb-win-name">Channel4Me AI Assistant</div>
              <div className="cb-win-sub"><span className="cb-win-sub-dot"></span>Active · Medical AI</div>
            </div>
            <div className="cb-win-actions">
              <button className="cb-win-icon-btn" title="Reset" onClick={() => { setMessages(INIT_MESSAGES); setCollectedSymptoms([]); setShowDiagnosis(false); }}>🔄</button>
              <button className="cb-win-icon-btn" title="New chat" onClick={onNewChat}>✕</button>
            </div>
          </div>

          {/* Step bar */}
          <StepBar symptomCount={collectedSymptoms.length} />

          {/* Messages */}
          <div className="cb-messages">
            <div className="cb-date-div">
              <span>Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>

            {messages.map(msg => (
              <div key={msg.id} className={`cb-msg-row ${msg.role}`}>
                <div className={`cb-msg-av ${msg.role === 'bot' ? 'bot-av' : 'user-av'}`}>
                  {msg.role === 'bot' ? '🤖' : 'CR'}
                </div>
                <div className="cb-msg-group">
                  {msg.isDiagnosis
                    ? <DiagnosisBubble aiData={msg.aiData} onFindSpecialist={onFindSpecialist} onNewChat={onNewChat} />
                    : <div className="cb-bubble">{msg.text}</div>
                  }
                  <div className="cb-msg-time">{msg.time}</div>
                  {msg.role === 'bot' && msg.suggestions && !showDiagnosis && (
                    <div className="cb-suggestions">
                      {msg.suggestions.map(s => (
                        <button key={s} className="cb-suggest-chip" onClick={() => sendMessage(s)}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="cb-msg-row bot">
                <div className="cb-msg-av bot-av">🤖</div>
                <div className="cb-msg-group">
                  <div className="cb-bubble typing">
                    <span className="cb-typing-dot"></span>
                    <span className="cb-typing-dot"></span>
                    <span className="cb-typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="cb-input-bar">
            <button className="cb-input-attach" title="Attach">📎</button>
            <div className="cb-input-wrap">
              <input
                ref={inputRef}
                type="text"
                placeholder={showDiagnosis ? 'Select an option above…' : 'Type your symptom here…'}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping || showDiagnosis}
              />
            </div>
            <button
              className="cb-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping || showDiagnosis}
              title="Send"
            >➤</button>
          </div>
          <div className="cb-input-hint">
            Press <strong>Enter</strong> to send · For guidance only — always consult a qualified doctor
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SCREEN 3 — RESULTS
// ════════════════════════════════════════════════════════════
function ResultsScreen({ symptoms, aiDiagnosis, onBack, onNewChat }: any) {
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 2;

  const conditionsToRender = aiDiagnosis?.conditions || CONDITIONS;
  const recommendedSpecialists = aiDiagnosis?.recommendedDoctorIds
    ? SPECIALISTS.filter(doc => aiDiagnosis.recommendedDoctorIds.includes(doc.id))
    : SPECIALISTS;

  const totalPages = Math.ceil(recommendedSpecialists.length / itemsPerPage);
  const displayedSpecialists = recommendedSpecialists.slice(activePage * itemsPerPage, (activePage + 1) * itemsPerPage);

  return (
    <div className="cb-results-page">
      <div className="cb-results-content">

        {/* Top bar */}
        <div className="cb-results-back">
          <button className="cb-back-btn" onClick={onBack}>← Back to Chat</button>
          <div className="cb-results-heading-text">
            <h2>🏥 Your Health Report</h2>
            <p>AI-generated insights based on your symptoms</p>
          </div>
          <button className="cb-new-chat-btn" onClick={onNewChat}>💬 New Chat</button>
        </div>

        {/* Symptoms strip */}
        <div className="cb-symptoms-strip">
          <span className="cb-strip-label">Your Symptoms:</span>
          {symptoms.map((s, i) => (
            <span key={i} className="cb-symptom-pill">🔹 {s}</span>
          ))}
        </div>

        {/* Two-column grid */}
        <div className="cb-results-grid">

          {/* Insights */}
          <div className="cb-insights-card">
            <div className="cb-insights-header">
              <div className="cb-insights-header-icon">🧬</div>
              <div>
                <div className="cb-insights-header-title">AI Health Insights</div>
                <div className="cb-insights-header-sub">Based on {symptoms.length} symptoms</div>
              </div>
            </div>
            <div className="cb-insights-body">
              <div className="cb-insights-conditions">
                <div className="cb-insights-section-title">Possible Conditions to Consider</div>
                {conditionsToRender.map((c: any, i: number) => (
                  <div key={i} className="cb-ins-condition">
                    <div className={`cb-ins-dot ${c.dot || 'purple'}`}></div>
                    {c.label}
                  </div>
                ))}
              </div>
              <div className="cb-insights-note">
                <div className="cb-insights-note-title">⚠️ Important Note</div>
                <p>
                  This is an AI-generated prediction based on common medical information and may{' '}
                  <a href="#">not be 100% accurate</a>. It is not a medical diagnosis. Always consult a qualified doctor.
                </p>
              </div>
            </div>
          </div>

          {/* Specialists */}
          <div className="cb-specialists-card">
            <div className="cb-specialists-header">
              <div className="cb-spec-header-left">
                <div className="cb-spec-header-icon">👨‍⚕️</div>
                <div>
                  <div className="cb-spec-header-title">Suggested Specialists</div>
                  <div className="cb-spec-header-sub">Matched to your symptoms</div>
                </div>
              </div>
              <span className="cb-spec-count">{recommendedSpecialists.length} doctors</span>
            </div>

            <div className="cb-specialists-list">
              {displayedSpecialists.map(doc => (
                <div key={doc.id} className="cb-doctor-card">
                  <div className="cb-doctor-avatar-wrap">{doc.icon}</div>
                  <div className="cb-doctor-info">
                    <div className="cb-doctor-name">{doc.name}</div>
                    <div className="cb-doctor-specialty">{doc.specialty}</div>
                    <div className="cb-doctor-rating">
                      <span className="cb-doctor-stars">{renderStars(doc.rating)}</span>
                      <span className="cb-doctor-rating-num">{doc.rating}</span>
                    </div>
                    <div className="cb-doctor-hosp">🏥 {doc.hospital}</div>
                  </div>
                  <button className="cb-book-btn">📅 Book</button>
                </div>
              ))}
            </div>

            <div className="cb-pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i}
                  className={`cb-page-dot${activePage === i ? ' active' : ''}`}
                  onClick={() => setActivePage(i)}
                ></div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Main- Screen 1
// ════════════════════════════════════════════════════════════
export default function Chatbot() {
  // 'chat' | 'results'
  const [screen, setScreen] = useState('chat');
  const [collectedSymptoms, setSymptoms] = useState<string[]>([]);
  const [aiDiagnosis, setAiDiagnosis] = useState<any>(null);

  function handleNewChat() {
    setScreen('chat');
    setSymptoms([]);
    setAiDiagnosis(null);
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        symptoms={collectedSymptoms}
        aiDiagnosis={aiDiagnosis}
        onBack={() => setScreen('chat')}
        onNewChat={handleNewChat}
      />
    );
  }

  return (
    <ChatScreen
      onFindSpecialist={(data: any) => {
        if (data) setAiDiagnosis(data);
        setScreen('results');
      }}
      onNewChat={handleNewChat}
      collectedSymptoms={collectedSymptoms}
      setCollectedSymptoms={setSymptoms}
    />
  );
}
