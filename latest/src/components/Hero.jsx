function Hero({ selectedCount }) {
  return (
    <section id="hero" className="hero">
      <h2>Experience The Stadium Energy Live!</h2>
      <p>Matches Selected: <strong>{selectedCount}</strong></p>
      <a href="#matches"><button>View Schedule</button></a>
    </section>
  );
}

<img
  src="/IMG/trophy.png"
  alt="IPL Championship Trophy"
  className="hero-trophy-img"
/>

export default Hero;