function MatchCard({ matchNo, teams, dateTime, venue, prices, onBook }) {
  return (
    <div className="match-card">
      <p><strong>{matchNo}</strong></p>
      <h3>{teams}</h3>
      <p><strong>Date & Time:</strong> {dateTime}</p>
      <p><strong>Venue:</strong> {venue}</p>
      <p><strong>Ticket Prices:</strong> {prices}</p>
      <button onClick={() => onBook(teams)}>Book</button>
    </div>
  );
}

export default MatchCard;