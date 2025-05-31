
const apiKey = "4e4a468ba7d7e991f17f50aecf6f341a"; // Your Odds API Key

async function fetchOdds() {
  const res = await fetch(`https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=eu&markets=h2h&apiKey=${apiKey}`);
  const data = await res.json();
  const table = document.getElementById("odds-table");
  table.innerHTML = "";

  data.forEach(match => {
    const bookmakerOdds = match.bookmakers.map(b => {
      const [home, draw, away] = b.markets[0].outcomes.map(o => o.price);
      return `<tr>
        <td>${match.home_team} vs ${match.away_team}</td>
        <td>${b.title}</td>
        <td>${home}</td>
        <td>${draw}</td>
        <td>${away}</td>
      </tr>`;
    }).join("");

    table.innerHTML += `<table border="1" cellspacing="0" cellpadding="6">
      <tr style="background:#ddd;"><th>Match</th><th>Bookmaker</th><th>Win</th><th>Draw</th><th>Lose</th></tr>
      ${bookmakerOdds}
    </table><br/>`;
  });
}

fetchOdds();
setInterval(fetchOdds, 30000); // Refresh every 30 seconds
