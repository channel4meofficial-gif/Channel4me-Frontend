import '../../styles/chatbot/chatbot.css';
import { useState, useRef, useEffect } from 'react';

type Message = {
  id: number;
  role: 'bot' | 'user';
  text?: string;
  time: string;
  suggestions?: string[];
  isDiagnosis?: boolean;
};
const QUICK_SYMPTOMS = ['🤕 Headache', '💔 Chest pain', '🥵 Fever', '😴 Fatigue', '🤢 Nausea', '😮‍💨 Breathlessness'];

const SPECIALISTS = [
  { id: 1, name: 'Dr. Mark',  specialty: 'Cardiologist',           hospital: 'Hemas Hospital',  rating: 4.7, icon: '👨‍⚕️' },
  { id: 2, name: 'Dr. Hashi', specialty: 'Electrophysiologist',    hospital: 'Asiri Hospital',  rating: 4.6, icon: '👩‍⚕️' },
  { id: 3, name: 'Dr. Larry', specialty: 'General Cardiologist',   hospital: 'Hemas Hospital',  rating: 4.5, icon: '👨‍⚕️' },
];

const CONDITIONS = [
  { label: 'Angina or Heart Attack',          dot: 'orange' },
  { label: 'Severe Anxiety or Panic Attack',  dot: 'red'    },
  { label: 'Infection',                        dot: 'blue'   },
  { label: 'Other Cardiac / Respiratory Issues', dot: 'purple' },
];

// ── Helpers ──────────────────────────────────────────────────
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
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
    { label: 'Diagnosis',  num: 4 },
  ];
  return (
    <div className="cb-steps">
      {steps.map(s => {
        const isDone   = symptomCount >= s.num;
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
function DiagnosisBubble({ onFindSpecialist, onNewChat }) {
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
          {CONDITIONS.map((c, i) => (
            <div className="cb-condition-item" key={i}>
              <div className={`cb-condition-dot ${c.dot}`}></div>
              {c.label}
            </div>
          ))}
        </div>
        <div className="cb-diag-note">
          ⚠️ This is an AI-generated prediction based on common medical information and may{' '}
          <a href="#">not be 100% accurate</a>. It is not a medical diagnosis.
        </div>
        <div className="cb-diag-actions">
          <button className="cb-diag-btn primary" onClick={onFindSpecialist}>🏥 Find a Specialist</button>
          <button className="cb-diag-btn secondary" onClick={onNewChat}>💬 New Chat</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SCREEN 1 + 2 — CHAT
// ════════════════════════════════════════════════════════════
function ChatScreen({ onFindSpecialist, onNewChat, collectedSymptoms, setCollectedSymptoms }) {
  const [messages, setMessages]   = useState<Message[]>(INIT_MESSAGES);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const messagesEndRef             = useRef<HTMLDivElement | null>(null);
  const inputRef                   = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function sendMessage(text?: string) {
    const trimmed = (text || input).trim();
    if (!trimmed || isTyping || showDiagnosis) return;

    const userMsg = { id: Date.now(), role: 'user' as const, text: trimmed, time: nowTime() };
    const newSymptoms = [...collectedSymptoms, trimmed];
    setCollectedSymptoms(newSymptoms);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed, newSymptoms.length);
      if (reply) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot' as const, text: reply.text, time: nowTime(), suggestions: reply.suggestions }]);
      } else {
        // show diagnosis
        setMessages(prev => [...prev, {
          id: Date.now() + 1, role: 'bot' as const, time: nowTime(),
          isDiagnosis: true,
        }]);
        setShowDiagnosis(true);
      }
      setIsTyping(false);
    }, 1100);

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
                    ? <DiagnosisBubble onFindSpecialist={onFindSpecialist} onNewChat={onNewChat} />
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
function ResultsScreen({ symptoms, onBack, onNewChat }) {
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(SPECIALISTS.length / itemsPerPage);
  const displayedSpecialists = SPECIALISTS.slice(activePage * itemsPerPage, (activePage + 1) * itemsPerPage);

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
                {CONDITIONS.map((c, i) => (
                  <div key={i} className="cb-ins-condition">
                    <div className={`cb-ins-dot ${c.dot}`}></div>
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
              <span className="cb-spec-count">{SPECIALISTS.length} doctors</span>
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
  const [screen, setScreen]             = useState('chat');
  const [collectedSymptoms, setSymptoms] = useState([]);

  function handleNewChat() {
    setScreen('chat');
    setSymptoms([]);
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        symptoms={collectedSymptoms}
        onBack={() => setScreen('chat')}
        onNewChat={handleNewChat}
      />
    );
  }

  return (
    <ChatScreen
      onFindSpecialist={() => setScreen('results')}
      onNewChat={handleNewChat}
      collectedSymptoms={collectedSymptoms}
      setCollectedSymptoms={setSymptoms}
    />
  );
}
