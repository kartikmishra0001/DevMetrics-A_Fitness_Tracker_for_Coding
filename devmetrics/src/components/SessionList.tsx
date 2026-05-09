interface Session {
  duration: number;
  date: string;
}

interface SessionListProps {
  sessions: Session[];
}

function SessionList({ sessions }: SessionListProps) {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📋 Saved Sessions
      </h2>
      
      {sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No sessions yet. Start coding!
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">💻</span>
                <span className="font-mono font-semibold text-gray-800">
                  {formatTime(session.duration)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                📅 {session.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionList;