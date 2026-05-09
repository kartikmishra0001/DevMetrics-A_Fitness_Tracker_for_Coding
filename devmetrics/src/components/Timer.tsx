import { useRef, useState, useEffect } from "react";
import SessionList from './SessionList';

interface Session {
  duration: number;
  date: string;
}

function Timer() {
  const [timer, setTimer] = useState<number>(0);
  const intervalRef = useRef<number>(0);
  const [goal, setGoal] = useState<number>(0);
  const [goalInput, setGoalInput] = useState<string>("");
  
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('sessions');
    if (saved === null) return [];
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current !== 0) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function StartButton() {
    if (intervalRef.current !== 0) {
      StopButton();
    } else {
      const IntervalId = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      intervalRef.current = IntervalId;
    }
  }

  function StopButton() {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    
    if (timer > 0) {
      const newSession: Session = {
        duration: timer,
        date: new Date().toLocaleString()
      };
      const newSessions = [...sessions, newSession];
      setSessions(newSessions);
      localStorage.setItem('sessions', JSON.stringify(newSessions));
    }
  }

  function ResetButton() {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    setTimer(0);
  }

  function getTotalToday() {
    const today = new Date().toLocaleDateString();
    const todaySessions = sessions.filter(session => {
      if (!session || !session.date) return false;
      return session.date.includes(today);
    });
    const total = todaySessions.reduce((sum, session) => {
      return sum + session.duration;
    }, 0);
    return total;
  }

  function setDailyGoal() {
    const goalInSeconds = parseInt(goalInput);
    if (!isNaN(goalInSeconds) && goalInSeconds > 0) {
      setGoal(goalInSeconds);
    }
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const todayTotal = getTotalToday();
  const progressPercentage = goal > 0 ? Math.min((todayTotal / goal) * 100, 100) : 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '32px 16px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Hero Section - Home */}
        <div id="home" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'white',
            borderRadius: '9999px',
            padding: '8px 24px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2563eb' }}>✨ Track Your Code ✨</span>
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #fff, #e0e7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            Code. Track. Improve.
          </h1>
          <p style={{ color: '#e0e7ff', fontSize: '18px', maxWidth: '672px', margin: '0 auto' }}>
            Monitor your coding sessions, set daily goals, and boost your productivity.
          </p>
        </div>

        {/* Dashboard Section - Stats Cards */}
        <div id="dashboard">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏱️</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{formatTime(timer)}</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Current Session</div>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{formatTime(todayTotal)}</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Today's Total</div>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{sessions.length}</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Sessions</div>
            </div>
          </div>
        </div>

        {/* Timer Controls Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', marginBottom: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', fontFamily: 'monospace', fontWeight: 'bold', color: '#1f2937', marginBottom: '32px' }}>
              {formatTime(timer)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={StartButton}
                style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '18px' }}
              >
                ▶ Start Coding
              </button>
              <button
                onClick={StopButton}
                style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '18px' }}
              >
                ⏹ Finish Session
              </button>
              <button
                onClick={ResetButton}
                style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #6b7280, #4b5563)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '18px' }}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div id="analytics" style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', marginBottom: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📈 Analytics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '12px' }}>
              <div style={{ fontSize: '28px' }}>📊</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{sessions.length}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Total Sessions</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '12px' }}>
              <div style={{ fontSize: '28px' }}>⏱️</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{formatTime(todayTotal)}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Today's Total</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '12px' }}>
              <div style={{ fontSize: '28px' }}>🎯</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{goal > 0 ? formatTime(goal) : 'Not Set'}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Daily Goal</div>
            </div>
          </div>
        </div>

        {/* Daily Goal Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', marginBottom: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px' }}>🎯</div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Daily Goal Tracker</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <input
              type="number"
              placeholder="Enter your goal in seconds (e.g., 3600 = 1 hour)"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '16px', outline: 'none' }}
            />
            <button
              onClick={setDailyGoal}
              style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '16px', cursor: 'pointer' }}
            >
              Set Goal
            </button>
          </div>

          {goal > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
                <span>Target: <strong>{formatTime(goal)}</strong></span>
                <span>Progress: <strong>{formatTime(todayTotal)}</strong></span>
              </div>
              
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercentage}%`, background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', height: '8px', borderRadius: '9999px', transition: 'width 0.5s' }}></div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#4b5563' }}>{progressPercentage.toFixed(0)}% Complete</span>
              </div>

              {todayTotal >= goal && (
                <div style={{ marginTop: '24px', textAlign: 'center', background: 'linear-gradient(135deg, #dcfce7, #a7f3d0)', border: '1px solid #86efac', borderRadius: '16px', padding: '16px' }}>
                  <span style={{ color: '#166534', fontWeight: 'bold', fontSize: '20px' }}>🎉 Amazing! You've crushed your daily goal! 🎉</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* About Section */}
        <div id="about" style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', marginBottom: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ℹ️ About DevMetrics
          </h2>
          <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '16px' }}>
            DevMetrics is a powerful coding tracker that helps developers monitor their productivity, 
            set daily goals, and analyze their coding habits. Built with React and TypeScript, 
            it provides real-time tracking with persistent storage.
          </p>
          <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
            Features include: session tracking, daily goals, progress visualization, and analytics dashboard. 
            All data is stored locally in your browser for privacy.
          </p>
        </div>

        {/* Sessions Section */}
        <SessionList sessions={sessions} />
      </div>
    </div>
  );
}

export default Timer;