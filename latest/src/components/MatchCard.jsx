function MatchCard({ match, onBook }) {
  return (
    <div className="match-card">
      <p><strong>{match.match_no}</strong></p>
      <h3>{match.teams}</h3>
      <p><strong>Date & Time:</strong> {match.date_time}</p>
      <p><strong>Venue:</strong> {match.venue}</p>
      <p><strong>Ticket Prices:</strong> {match.prices}</p>
      <p><strong>Available Seats:</strong> {match.available_seats}</p>
      <button
        onClick={() => onBook(match)}
        disabled={match.available_seats <= 0}
      >
        {match.available_seats > 0 ? "Book" : "Sold Out"}
      </button>
    </div>
  );
}

export default MatchCard;