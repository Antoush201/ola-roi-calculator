import { useState, useMemo, useEffect, useRef } from "react";

const formatMoney = (n) => n.toLocaleString("fr-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const formatHours = (n) => Math.round(n).toLocaleString("fr-CA");

const MONTHLY_OLA = 200;
const ANNUAL_OLA = MONTHLY_OLA * 12;
const AUTOMATION_RATE = 0.50;
const LEAD_LOSS_RATE = 0.25;
const BOOKING_URL = "https://api.ola-ai.ca/widget/bookings/olapresentation";
const LOGO = "https://static.wixstatic.com/media/0f65e1_4917de35ad474838802fbe15ed7f8e76~mv2.png";

const testimonials = [
  { quote: "Depuis qu'on utilise OLA, on a récupéré au moins 10 heures par semaine. J'ai enfin du temps pour mes enfants le soir.", author: "Courtier RE/MAX", location: "Montréal" },
  { quote: "Mes suivis se font tout seuls maintenant. J'ai fermé 3 transactions de plus cette année sans travailler plus.", author: "Courtière Royal LePage", location: "Laval" },
  { quote: "Avant OLA, je perdais des leads parce que j'oubliais de faire mes relances. Maintenant, aucun client ne passe entre les craques.", author: "Courtier Proprio Direct", location: "Québec" },
  { quote: "Le setup avec l'équipe a été smooth. En une semaine, tout était automatisé. Je recommande à 100%.", author: "Courtière Sutton", location: "Longueuil" },
  { quote: "OLA m'a redonné mes weekends. Mon business roule mieux et je travaille moins. C'est exactement ce que je cherchais.", author: "Courtier Century 21", location: "Gatineau" }
];

function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIdx(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer.current);
  }, [paused]);

  const go = (i) => { setIdx(i); setPaused(true); setTimeout(() => setPaused(false), 8000); };

  const t = testimonials[idx];
  return (
    <div style={{ maxWidth: 720, margin: "0 auto 48px", textAlign: "center" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
        Ce que les courtiers en disent
      </div>
      <div style={{ position: "relative", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div key={idx} style={{ animation: "fadeSlide 0.5s ease", padding: "0 20px" }}>
          <div style={{ fontSize: 17, color: "#444", fontStyle: "italic", lineHeight: 1.6, maxWidth: 560, marginInline: "auto", marginBottom: 14 }}>
            « {t.quote} »
          </div>
          <div style={{ fontSize: 13, color: "#aaa", fontWeight: 600 }}>— {t.author}, {t.location}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === idx ? 24 : 8, height: 8, borderRadius: 4,
            background: i === idx ? "#111" : "#ddd", border: "none", cursor: "pointer",
            transition: "all 0.3s ease", padding: 0
          }} />
        ))}
      </div>
    </div>
  );
}

function PushPull({ wh, animated }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      maxWidth: 720, margin: "0 auto 40px",
      background: "#FAFAFA", borderRadius: 16, border: "1.5px solid #ECECEC",
      opacity: animated ? 1 : 0, transition: "opacity 0.7s ease 0.6s", overflow: "hidden"
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "24px 28px", background: "none", border: "none", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left"
      }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {wh} heures de récupérées par semaine.<br />
          <span style={{ color: "#888" }}>La question, c'est : tu en fais quoi?</span>
        </div>
        <div style={{
          fontSize: 24, color: "#888", transition: "transform 0.3s ease",
          transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0, marginLeft: 16
        }}>▼</div>
      </button>
      <div style={{
        maxHeight: open ? 500 : 0, opacity: open ? 1 : 0,
        transition: "max-height 0.4s ease, opacity 0.3s ease",
        overflow: "hidden", padding: open ? "0 28px 28px" : "0 28px"
      }}>
        <div style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>
          Peut-être que tu veux finir tes journées plus tôt, être plus présent avec ta famille, retrouver tes weekends. C'est un objectif qui est plus que valide — et OLA peut te donner ça.
        </div>
        <div style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>
          Peut-être que tu veux réinvestir ce temps-là pour closer plus de transactions et augmenter tes revenus. Ça aussi, c'est possible — mais pas juste en sauvant du temps. C'est en ayant <strong>le bon système derrière</strong> : les bons suivis, au bon moment, avec le bon message. Un système qui fait le travail invisible pendant que toi, tu te concentres sur ce que tu fais de mieux.
        </div>
        <div style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>
          Que ton objectif soit plus de liberté, plus de revenus, ou les deux — le résultat dépend du système que tu mets en place.
        </div>
        <div style={{ fontSize: 15, color: "#111", lineHeight: 1.7, fontWeight: 600 }}>
          C'est pour ça qu'on bâtit chaque setup sur mesure. Parce que ton business est pas pareil comme celui du voisin — et ton système devrait pas l'être non plus.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [commission, setCommission] = useState(8000);
  const [transactions, setTransactions] = useState(12);
  const [hoursManual, setHoursManual] = useState(15);
  const [weeksYear, setWeeksYear] = useState(48);
  const [showResults, setShowResults] = useState(false);
  const [animated, setAnimated] = useState(false);

  const stats = useMemo(() => {
    const annualRevenue = commission * transactions;
    const hourlyValue = annualRevenue / (weeksYear * 40);
    const totalManualHours = hoursManual * weeksYear;
    const annualCostLost = hourlyValue * totalManualHours;
    const leadsLost = Math.round(transactions * LEAD_LOSS_RATE);
    const timeSaved = totalManualHours * AUTOMATION_RATE;
    const moneySaved = hourlyValue * timeSaved;
    const extraTransactions = Math.round((timeSaved / totalManualHours) * transactions * 0.3);
    const extraRevenue = extraTransactions * commission;
    const totalGain = moneySaved + extraRevenue;
    const roi = ((totalGain - ANNUAL_OLA) / ANNUAL_OLA) * 100;
    return { hourlyValue, totalManualHours, annualCostLost, leadsLost, timeSaved, moneySaved, extraTransactions, extraRevenue, totalGain, roi, annualRevenue };
  }, [commission, transactions, hoursManual, weeksYear]);

  const handleCalculate = () => {
    setShowResults(false);
    setAnimated(false);
    setTimeout(() => { setShowResults(true); setTimeout(() => setAnimated(true), 50); }, 10);
  };

  const inp = {
    width: "100%", padding: "14px 16px", fontSize: 18, fontFamily: "'Geist', sans-serif",
    border: "2px solid #E5E5E5", borderRadius: 10, outline: "none",
    background: "#FAFAFA", color: "#111", transition: "border-color 0.2s", boxSizing: "border-box"
  };
  const lbl = { fontSize: 13, fontWeight: 600, color: "#555", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 6, display: "block" };

  const card = (hi = false, delay = "0s") => ({
    background: hi ? "#111" : "#fff", color: hi ? "#fff" : "#111",
    borderRadius: 16, padding: "28px 24px", border: hi ? "none" : "1.5px solid #E8E8E8",
    flex: 1, minWidth: 280,
    opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`
  });

  const stat = (label, value, sub = null, light = false) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: light ? "rgba(255,255,255,0.55)" : "#888", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: light ? "#fff" : "#111", lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: light ? "rgba(255,255,255,0.45)" : "#aaa", marginTop: 2 }}>{sub}</div>}
    </div>
  );

  const roiColor = stats.roi > 0 ? "#22c55e" : "#ef4444";
  const wh = Math.round(stats.timeSaved / weeksYear);

  return (
    <div style={{ fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh", padding: "40px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(17,17,17,0.2)} 50%{box-shadow:0 0 0 16px rgba(17,17,17,0)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .cta-btn { animation: pulseGlow 2.5s infinite; transition: transform 0.2s, background 0.2s; }
        .cta-btn:hover { transform: scale(1.04); background: #333 !important; }
        .calc-btn { transition: transform 0.15s, background 0.15s; }
        .calc-btn:hover { transform: scale(1.02); background: #222 !important; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <img src={LOGO} alt="OLA" style={{ height: 48, marginBottom: 20 }} />
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#111", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Combien te coûte ton temps perdu?
        </h1>
        <p style={{ fontSize: 15, color: "#888", margin: 0, maxWidth: 500, marginInline: "auto", lineHeight: 1.5 }}>
          Chaque semaine, tu passes des heures sur des tâches que tu pourrais automatiser.<br />
          Entre tes chiffres — le résultat va te surprendre.
        </p>
      </div>

      {/* Inputs */}
      <div style={{ maxWidth: 720, margin: "0 auto 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        <div>
          <label style={lbl}>Commission moyenne / transaction</label>
          <div style={{ position: "relative" }}>
            <input type="number" value={commission} onChange={e => setCommission(Math.max(0, +e.target.value))} style={{ ...inp, paddingRight: 40 }} />
            <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: 16, fontWeight: 600 }}>$</span>
          </div>
        </div>
        <div>
          <label style={lbl}>Transactions par année</label>
          <input type="number" value={transactions} onChange={e => setTransactions(Math.max(0, +e.target.value))} style={inp} />
        </div>
        <div>
          <label style={lbl}>Heures / semaine en tâches manuelles</label>
          <div style={{ position: "relative" }}>
            <input type="number" value={hoursManual} onChange={e => setHoursManual(Math.max(0, +e.target.value))} style={{ ...inp, paddingRight: 40 }} />
            <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: 14, fontWeight: 500 }}>hrs</span>
          </div>
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>Suivis, relances, envois de documents, rappels de RDV, publications, gestion de leads…</div>
        </div>
        <div>
          <label style={lbl}>Semaines travaillées par année</label>
          <input type="number" value={weeksYear} onChange={e => setWeeksYear(Math.max(1, Math.min(52, +e.target.value)))} style={inp} />
        </div>
      </div>

      {/* Calculate */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <button className="calc-btn" onClick={handleCalculate} style={{
          background: "#111", color: "#fff", border: "none", borderRadius: 12,
          padding: "16px 48px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Geist', sans-serif"
        }}>
          Voir combien je perds →
        </button>
      </div>

      {showResults && (
        <>
          {/* Shock */}
          <div style={{
            maxWidth: 720, margin: "0 auto 40px", textAlign: "center",
            background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 16, padding: "32px 24px",
            opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(15px)",
            transition: "opacity 0.5s ease, transform 0.5s ease"
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#B91C1C", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              ⚠️ Chaque année, tu laisses sur la table
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: "#111", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {formatMoney(stats.annualCostLost)}
            </div>
            <div style={{ fontSize: 15, color: "#666", marginTop: 10 }}>
              C'est l'équivalent de <strong>{formatHours(stats.totalManualHours)} heures</strong> par année passées sur des tâches répétitives au lieu de closer des deals.
            </div>
          </div>

          {/* Hourly */}
          <div style={{
            maxWidth: 720, margin: "0 auto 40px", background: "#F7F7F7", borderRadius: 12,
            padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
            opacity: animated ? 1 : 0, transition: "opacity 0.5s ease 0.15s"
          }}>
            <span style={{ fontSize: 14, color: "#666", fontWeight: 500 }}>Ta valeur horaire estimée</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#111" }}>{formatMoney(stats.hourlyValue)}<span style={{ fontSize: 14, fontWeight: 500, color: "#888" }}> / heure</span></span>
          </div>

          {/* Cards */}
          <div style={{ maxWidth: 720, margin: "0 auto 48px", display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div style={card(false, "0.2s")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ fontSize: 16, fontWeight: 700 }}>Sans OLA</span>
              </div>
              {stat("Heures manuelles / année", `${formatHours(stats.totalManualHours)} hrs`)}
              {stat("Coût du temps perdu", formatMoney(stats.annualCostLost), "En valeur de ton temps")}
              {stat("Leads potentiels perdus", `~${stats.leadsLost} clients`, "Par manque de suivi automatisé")}
            </div>
            <div style={card(true, "0.35s")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: 16, fontWeight: 700 }}>Avec OLA</span>
              </div>
              {stat("Temps récupéré / année", `${formatHours(stats.timeSaved)} hrs`, `${wh} hrs de plus / semaine`, true)}
              {stat("Économies annuelles", formatMoney(stats.moneySaved), "Valeur du temps récupéré", true)}
              {stat("Transactions supplémentaires", `+${stats.extraTransactions}`, `= ${formatMoney(stats.extraRevenue)} en revenus`, true)}
            </div>
          </div>

          {/* ROI */}
          <div style={{
            maxWidth: 720, margin: "0 auto 40px", background: "#111", borderRadius: 20,
            padding: "36px 32px", textAlign: "center",
            opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s"
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Ton retour sur investissement avec OLA</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: roiColor, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {stats.roi > 0 ? "+" : ""}{Math.round(stats.roi)}%
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 12, marginBottom: 24 }}>
              Investissement : {formatMoney(ANNUAL_OLA)}/an ({formatMoney(MONTHLY_OLA)}/mois) → Gains estimés : {formatMoney(stats.totalGain)}/an
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{formatMoney(stats.totalGain - ANNUAL_OLA)}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>PROFIT NET ANNUEL</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{formatHours(stats.timeSaved)} hrs</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>TEMPS RÉCUPÉRÉ</div>
              </div>
            </div>
          </div>

          {/* Push-Pull Dropdown */}
          <PushPull wh={wh} animated={animated} />

          {/* CTA */}
          <div style={{
            maxWidth: 720, margin: "0 auto 40px",
            background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
            borderRadius: 20, padding: "44px 32px", textAlign: "center",
            border: "1.5px solid #E8E8E8",
            opacity: animated ? 1 : 0, transition: "opacity 0.7s ease 0.7s"
          }}>
            <img src={LOGO} alt="OLA" style={{ height: 32, marginBottom: 20, opacity: 0.8 }} />
            <div style={{ fontSize: 26, fontWeight: 800, color: "#111", marginBottom: 8, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
              On t'a montré le problème.<br />
              <span style={{ color: "#888" }}>On peut te montrer la solution.</span>
            </div>
            <div style={{ fontSize: 15, color: "#777", marginBottom: 12, maxWidth: 460, marginInline: "auto", lineHeight: 1.6 }}>
              15 minutes avec notre équipe pour voir exactement comment OLA s'applique à ton business. Pas de pitch générique — un plan concret basé sur ta réalité.
            </div>
            <div style={{
              display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap",
              margin: "20px 0 28px", fontSize: 13, color: "#555", fontWeight: 500
            }}>
              <span>✓ Suivis automatisés 24/7</span>
              <span>✓ Zéro lead oublié</span>
              <span>✓ Setup 1:1 avec l'équipe</span>
            </div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="cta-btn" style={{
                background: "#111", color: "#fff", border: "none", borderRadius: 14,
                padding: "20px 64px", fontSize: 18, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Geist', sans-serif", letterSpacing: "0.01em"
              }}>
                Je veux plus d'infos →
              </button>
            </a>
            <div style={{ fontSize: 12, color: "#bbb", marginTop: 14 }}>
              15 minutes • Gratuit • Sans engagement
            </div>
          </div>

          {/* Testimonials */}
          <TestimonialSlider />

          {/* Footer */}
          <div style={{ textAlign: "center", paddingBottom: 24 }}>
            <div style={{ fontSize: 11, color: "#bbb" }}>
              * Basé sur une réduction estimée de 50% des tâches manuelles avec l'automatisation OLA.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
