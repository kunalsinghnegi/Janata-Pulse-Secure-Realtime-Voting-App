// src/App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";
import { auth, provider, database } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { ref, set, onValue, get, update } from "firebase/database";

const candidates = [
  { name: "भगवान सिंह मेहर", symbol: "🌾" },
  { name: "भीम सिंह नेगी", symbol: "🍍" },
  { name: "मोहर सिंह असवाल", symbol: "🍦" },
  { name: "हुकम सिंह रांगड़", symbol: "🍬" }
];

function App() {
  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState({});
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const votesRef = ref(database, "votes/");
    onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) setVotes(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `voters/${user.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) setVoted(true);
      });
    }
  }, [user]);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.log(error));
  };

  const voteFor = async (index) => {
    if (!user || voted) return;

    const voteCount = votes[index] || 0;

    try {
      await update(ref(database), {
        [`votes/${index}`]: voteCount + 1,
        [`voters/${user.uid}`]: index
      });
      setVoted(true);
    } catch (error) {
      console.error("Vote submission error:", error);
    }
  };

  const totalVotes = Object.values(votes || {}).reduce(
    (acc, curr) => (typeof curr === "number" ? acc + curr : acc),
    0
  );

  const leadingIndex = Object.entries(votes || {}).reduce((maxIdx, [key, val]) => {
    if (!candidates[parseInt(key)]) return maxIdx;
    return val > (votes[maxIdx] || 0) ? parseInt(key) : maxIdx;
  }, 0);

  return (
    <div className="app-container">
      <div className="header">
        🙏 बताइए, आप किसका समर्थन करते हैं?
      </div>

      {!user ? (
        <>
          <div className="leading-box">
            🏆 <strong>इस समय सबसे आगे हैं:</strong>
            <div className="leading-candidate">
              {candidates[leadingIndex]?.symbol} {candidates[leadingIndex]?.name}
            </div>
            <div className="tease-message">
              जानना चाहते हैं कि दूसरे और तीसरे नंबर पर कौन है? 🔍 <br />
              पूरी जानकारी के लिए नीचे लॉगिन करें!
            </div>
          </div>
          <button className="vote-button" onClick={handleLogin}>
            Google से लॉगिन करें
          </button>
        </>
      ) : (
        <>
          {candidates.map((cand, i) => (
            <div key={i} className="candidate">
              <div className="candidate-name">
                {cand.symbol} {cand.name}
              </div>
              <button
                className="vote-button"
                disabled={voted}
                onClick={() => voteFor(i)}
              >
                वोट करें
              </button>
            </div>
          ))}

          <div className="results">
            <h3>📊 लाइव परिणाम:</h3>
            {candidates.map((cand, i) => {
              const count = votes[i] || 0;
              const percent = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0;
              return (
                <div key={i}>
                  <strong>{cand.symbol} {cand.name}</strong>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percent}%` }}>
                      {percent}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
