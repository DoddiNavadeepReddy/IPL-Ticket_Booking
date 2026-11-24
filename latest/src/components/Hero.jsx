function Hero({ selectedCount }) {
  return (
    <section id="hero" className="hero">
      <h2>Experience The Stadium Energy Live!</h2>
      <p>Matches Selected: <strong>{selectedCount}</strong></p>
      <a href="#matches"><button>View Schedule</button></a>
    </section>
  );
}

export default Hero;