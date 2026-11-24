import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
  // React State
  const [selectedCount, setSelectedCount] = useState(0);
  const [lastBooked, setLastBooked] = useState("");

  // Match Data Array
  const matches = [
    {
      id: 1,
      matchNo: "Match 1",
      teams: "MI vs CSK",
      dateTime: "April 23, 2026 - 7:30 PM",
      venue: "Bengaluru",
      prices: "₹2,500 / ₹5,500 / ₹23,000",
    },
    {
      id: 2,
      matchNo: "Match 2",
      teams: "MI vs RCB",
      dateTime: "April 26, 2026 - 7:30 PM",
      venue: "Mumbai",
      prices: "₹1,500 / ₹2,000 / ₹7,500",
    },
  ];

  // Event handler passed to MatchCard via props
  const handleBook = (teams) => {
    setSelectedCount(selectedCount + 1);
    setLastBooked(teams);
  };

  return (
    <div>
      <Navbar />
      <Hero selectedCount={selectedCount} />

      <main id="matches" className="container">
        <h2>Match Schedule</h2>

        {lastBooked && (
          <p>Selected Match: <strong>{lastBooked}</strong></p>
        )}

        <div className="match-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              matchNo={match.matchNo}
              teams={match.teams}
              dateTime={match.dateTime}
              venue={match.venue}
              prices={match.prices}
              onBook={handleBook}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;