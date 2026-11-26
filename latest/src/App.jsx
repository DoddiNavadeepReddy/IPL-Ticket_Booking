import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [lastBooked, setLastBooked] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchMatches() {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setErrorMsg("Supabase Error: " + error.message);
      } else if (!data || data.length === 0) {
        setErrorMsg("Connected to Supabase, but the 'matches' table returned 0 rows (check RLS or insert rows).");
      } else {
        setMatches(data);
        setErrorMsg("");
      }
      setLoading(false);
    }

    fetchMatches();

    const channel = supabase
      .channel("matches-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setMatches((prev) =>
              prev.map((m) => (m.id === payload.new.id ? payload.new : m))
            );
          } else if (payload.eventType === "INSERT") {
            setMatches((prev) => [...prev, payload.new]);
          } else if (payload.eventType === "DELETE") {
            setMatches((prev) => prev.filter((m) => m.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleBook = async (match) => {
    if (match.available_seats <= 0) return;

    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          match_id: match.id,
          teams: match.teams,
          seats_booked: 1,
        },
      ]);

    if (bookingError) {
      alert("Booking failed: " + bookingError.message);
      return;
    }

    const updatedSeats = match.available_seats - 1;

    const { error: updateError } = await supabase
      .from("matches")
      .update({ available_seats: updatedSeats })
      .eq("id", match.id);

    if (updateError) {
      alert("Seat update failed: " + updateError.message);
      return;
    }

    setMatches((prev) =>
      prev.map((m) =>
        m.id === match.id ? { ...m, available_seats: updatedSeats } : m
      )
    );
    setSelectedCount((prev) => prev + 1);
    setLastBooked(match.teams);
  };

  return (
    <div>
      <Navbar />
      <Hero selectedCount={selectedCount} />

      <main id="matches" className="container">
        <h2>Match Schedule (Live Supabase DB)</h2>

        {lastBooked && (
          <p>Booked Match: <strong>{lastBooked}</strong></p>
        )}

        {errorMsg && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
        )}

        {loading ? (
          <p>Loading matches from Supabase...</p>
        ) : (
          <div className="match-grid">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onBook={handleBook}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;