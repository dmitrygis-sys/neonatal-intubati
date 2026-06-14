import { useState } from 'react';
import { T, STEPS, callClaude } from './tokens';
import { AirwayAnatomySVG, LaryngoscopeSVG, TubeSizesSVG, DepthSVG } from './Illustrations';

function CheckCircle({ ok }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
      {ok
        ? <><circle cx="10" cy="10" r="9" fill={T.green}/><path d="M5 10 L8.5 13.5 L15 7" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>
        : <circle cx="10" cy="10" r="9" fill="#ddd"/>}
    </svg>
  );
}

export function ProtocolTab() {
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState({});
  const step = STEPS[activeStep];
  const doneCount = step.checklist.filter(item => checked[`${step.id}-${item}`]).length;

  const toggle = (stepId, item) => {
    const key = `${stepId}-${item}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {STEPS.map((s, i) => (
          <button key={s.id} onClick={() => setActiveStep(i)}
            style={{
              background: activeStep === i ? T.teal : T.white,
              color: activeStep === i ? T.white : T.navy,
              border: `2px solid ${activeStep === i ? T.teal : "#CBD5E0"}`,
              borderRadius: 8, padding: "8px 12px", cursor: "pointer",
              fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6,
            }}>
            <span>{s.icon}</span>
            <span>{i + 1}. {s.title}</span>
          </button>
        ))}
      </div>

      <div style={{ background: "#E2E8F0", borderRadius: 8, height: 6, marginBottom: 18, overflow: "hidden" }}>
        <div style={{
          background: T.teal, height: "100%", borderRadius: 8,
          width: `${(doneCount / step.checklist.length) * 100}%`,
          transition: "width 0.3s ease",
        }}/>
      </div>

      <div style={{ background: step.color, border: `2px solid ${step.borderColor}`, borderRadius: 14, padding: 22, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 36 }}>{step.icon}</span>
          <div>
            <div style={{ fontSize: 11, color: T.slate, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
              Шаг {step.id} из {STEPS.length}
            </div>
            <h2 style={{ margin: 0, fontSize: 20, color: T.navy, fontWeight: 900 }}>{step.title}</h2>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: step.borderColor }}>{doneCount}/{step.checklist.length}</div>
            <div style={{ fontSize: 10, color: T.slate }}>выполнено</div>
          </div>
        </div>

        <p style={{ margin: "0 0 16px", color: T.slate, lineHeight: 1.75, fontSize: 14 }}>{step.content}</p>

        <div style={{ background: "rgba(255,255,255,0.8)", borderLeft: `4px solid ${step.borderColor}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: step.borderColor, letterSpacing: 1, marginBottom: 4 }}>💡 КЛИНИЧЕСКИЙ СОВЕТ</div>
          <div style={{ fontSize: 13, color: T.navy, lineHeight: 1.65 }}>{step.tip}</div>
        </div>

        <div style={{ background: T.white, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: T.navy, marginBottom: 10, letterSpacing: 1 }}>✓ КОНТРОЛЬНЫЙ СПИСОК</div>
          {step.checklist.map(item => {
            const key = `${step.id}-${item}`;
            return (
              <div key={item} onClick={() => toggle(step.id, item)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 6px",
                  cursor: "pointer", borderRadius: 6, userSelect: "none",
                  background: checked[key] ? "#F0FFF4" : "transparent",
                  color: checked[key] ? "#888" : T.navy,
                  textDecoration: checked[key] ? "line-through" : "none",
                  fontSize: 13, fontWeight: 500,
                }}>
                <CheckCircle ok={checked[key]}/>
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
        <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}
          style={{ background: activeStep === 0 ? "#ddd" : T.navy, color: T.white, border: "none", borderRadius: 8, padding: "11px 26px", cursor: activeStep === 0 ? "default" : "pointer", fontWeight: 700, fontSize: 14 }}>
          ← Назад
        </button>
        <button onClick={() => setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))} disabled={activeStep === STEPS.length - 1}
          style={{ background: activeStep === STEPS.length - 1 ? "#ddd" : T.teal, color: T.white, border: "none", borderRadius: 8, padding: "11px 26px", cursor: activeStep === STEPS.length - 1 ? "default" : "pointer", fontWeight: 700, fontSize: 14 }}>
          Далее →
        </button>
      </div>
    </div>
  );
}

export function AnatomyTab() {
  const cards = [
    { title: "Особенности ВДП новорождённых", items: ["Узкое субглоттическое пространство", "Воронкообразная форма гортани", "Высокое положение гортани (C3–C4)", "Большой язык относительно рта", "Длинный омегообразный надгортанник"] },
    { title: "Частые ошибки", items: ["Интубация пищевода (не трахеи)", "Однолёгочная интубация (правый бронх)", "Превышение времени попытки >30с", "Недостаточная преоксигенация", "Неправильный размер трубки"] },
    { title: "Признаки правильной интубации", items: ["Движение грудной клетки симметрично", "Аускультация: равное с обеих сторон", "SpO₂ нарастает после процедуры", "ЧСС >100 уд/мин", "CO₂-детектор положителен"] },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 20 }}>
        <div style={{ background: T.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <h3 style={{ margin: "0 0 14px", color: T.navy, fontSize: 15, fontWeight: 800 }}>🫁 Анатомия дыхательных путей</h3>
          <AirwayAnatomySVG/>
          <p style={{ marginTop: 12, fontSize: 12, color: T.slate, lineHeight: 1.6 }}>
            У новорождённых гортань расположена выше (C3–C4 vs C5–C6 у взрослых), надгортанник длиннее и более Ω-образный. Язык относительно крупнее — главная причина сложности визуализации.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: T.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 12px", color: T.navy, fontSize: 15, fontWeight: 800 }}>🔦 Ларингоскоп · Клинок Миллера</h3>
            <LaryngoscopeSVG/>
            <p style={{ marginTop: 8, fontSize: 12, color: T.slate, lineHeight: 1.6 }}>
              Прямой клинок Миллера подводится непосредственно под надгортанник и приподнимает его — стандарт в неонатологии.
            </p>
          </div>
          <div style={{ background: T.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <TubeSizesSVG/>
          </div>
        </div>
      </div>
      <div style={{ background: T.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 20 }}>
        <DepthSVG/>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {cards.map(card => (
          <div key={card.title} style={{ background: T.white, borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: T.teal, marginBottom: 10 }}>{card.title}</div>
            {card.items.map(it => (
              <div key={it} style={{ fontSize: 12, color: T.navy, padding: "4px 0", borderBottom: "1px solid #E2E8F0", lineHeight: 1.5 }}>• {it}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const SCENARIO_TYPES = [
  "недоношенный 26 недель, масса 780г, дыхательная недостаточность с рождения",
  "доношенный новорождённый с меконием в ОВ, оценка по Апгар 3/5",
  "ребёнок 2 суток жизни, 3200г, нарастающий цианоз, подозрение на ВПС",
  "случайное смещение трубки у ребёнка 800г, требуется реинтубация",
  "апноэ у недоношенного 32 недели, брадикардия до 50 уд/мин",
];

export function ScenariosTab() {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  async function generate() {
    setLoading(true); setScenario(null); setShowAnswer(false);
    const picked = SCENARIO_TYPES[Math.floor(Math.random() * SCENARIO_TYPES.length)];
    try {
      const data = await callClaude({
        model: "claude-sonnet-4-6", max_tokens: 1200,
        system: `Ты создаёшь клинические сценарии для обучения врачей-неонатологов. 
Отвечай ТОЛЬКО валидным JSON. Никакого markdown, никаких блоков кода, никакого текста кроме JSON.
Все строки в JSON должны быть в одну строку без переносов.
Структура: {"situation":"...","vitals":{"SpO2":"...","HR":"...","RR":"...","weight":"..."},"urgency":"критическая","question":"Ваши действия?","answer":"...","pitfalls":["...","..."]}`,
        messages: [{ role: "user", content: `Сценарий: ${picked}. Только JSON одной строкой.` }],
      });
      const text = data.content?.[0]?.text || "";
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("JSON не найден");
      const cleaned = match[0]
        .replace(/[\u0000-\u001F\u007F]/g, m => m === '\n' || m === '\r' ? ' ' : '')
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');
      setScenario(JSON.parse(cleaned));
    } catch (err) {
      setScenario({
        situation: `Ошибка: ${err.message}. Нажмите ещё раз — обычно помогает.`,
        vitals: {}, urgency: "средняя", question: "", answer: "", pitfalls: []
      });
    } finally { setLoading(false); }
  }

  const urgColor = u => u === "критическая" ? T.danger : u === "высокая" ? T.amber : T.green;

  return (
    <div>
      <div style={{ background: T.white, borderRadius: 14, padding: 22, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <h2 style={{ margin: "0 0 8px", color: T.navy, fontSize: 18, fontWeight: 900 }}>⚡ Клинические сценарии</h2>
        <p style={{ margin: "0 0 16px", color: T.slate, fontSize: 13, lineHeight: 1.6 }}>ИИ генерирует реалистичные случаи ОРИТ. Сформулируйте ответ, затем откройте разбор.</p>
        <button onClick={generate} disabled={loading}
          style={{ background: loading ? "#ddd" : T.teal, color: T.white, border: "none", borderRadius: 8, padding: "12px 24px", cursor: loading ? "default" : "pointer", fontWeight: 800, fontSize: 15 }}>
          {loading ? "⏳ Генерирую…" : "🎲 Новый клинический случай"}
        </button>
      </div>
      {scenario && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: T.white, borderRadius: 14, padding: 22, borderLeft: `5px solid ${urgColor(scenario.urgency)}`, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ background: urgColor(scenario.urgency), color: T.white, borderRadius: 20, padding: "3px 14px", fontSize: 11, fontWeight: 800 }}>{(scenario.urgency||"").toUpperCase()}</span>
              <span style={{ fontSize: 13, color: T.slate, fontWeight: 600 }}>КЛИНИЧЕСКИЙ СЦЕНАРИЙ</span>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 14, color: T.navy, lineHeight: 1.75, fontWeight: 500 }}>{scenario.situation}</p>
            {scenario.vitals && Object.keys(scenario.vitals).length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {Object.entries(scenario.vitals).map(([k, v]) => (
                  <div key={k} style={{ background: T.cream, borderRadius: 8, padding: "8px 16px", minWidth: 80, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: T.slate, fontWeight: 700, textTransform: "uppercase" }}>{k}</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {scenario.question && (
            <div style={{ background: "#FFF8E7", border: `2px solid ${T.amber}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.amber, marginBottom: 8 }}>❓ ВАШИ ДЕЙСТВИЯ</div>
              <p style={{ margin: 0, fontSize: 14, color: T.navy, lineHeight: 1.7 }}>{scenario.question}</p>
            </div>
          )}
          {scenario.answer && (
            <div style={{ background: T.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <button onClick={() => setShowAnswer(v => !v)}
                style={{ width: "100%", background: showAnswer ? T.teal : "#EDF7F6", color: showAnswer ? T.white : T.teal, border: "none", padding: "14px 22px", cursor: "pointer", fontWeight: 800, fontSize: 15, textAlign: "left", display: "flex", justifyContent: "space-between" }}>
                <span>✅ {showAnswer ? "Скрыть разбор" : "Показать разбор"}</span>
                <span>{showAnswer ? "▲" : "▼"}</span>
              </button>
              {showAnswer && (
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 14, color: T.navy, lineHeight: 1.8, whiteSpace: "pre-wrap", marginBottom: 16 }}>{scenario.answer}</div>
                  {scenario.pitfalls?.length > 0 && (
                    <div style={{ background: "#FFF0F0", borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: T.danger, marginBottom: 8 }}>⚠️ ТИПИЧНЫЕ ОШИБКИ</div>
                      {scenario.pitfalls.map(p => (
                        <div key={p} style={{ fontSize: 13, color: T.navy, padding: "5px 0", borderBottom: "1px solid #FFD0D0" }}>• {p}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const QUICK_Q = [
  "Как действовать при неудачной попытке интубации?",
  "Чем отличается интубация у 24-недельного от доношенного?",
  "Когда применять видеоларингоскоп у новорождённых?",
  "Как подтвердить положение ЭТТ без CO₂-детектора?",
  "Показания к экстренной интубации в родзале",
  "Что делать при подозрении на интубацию пищевода?",
];

export function AITab() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  async function ask() {
    if (!question.trim()) return;
    const q = question.trim();
    setLoading(true); setAnswer("");
    try {
      const data = await callClaude({
        model: "claude-sonnet-4-6", max_tokens: 1000,
        system: `Ты — эксперт-неонатолог с 20-летним опытом. Отвечай на вопросы об интубации новорождённых точно и клинически обоснованно. Используй рекомендации ERC 2021, NRP 8th ed., AAP. Давай конкретные числа. Отвечай на русском. Структура: основное → детали → практический совет.`,
        messages: [{ role: "user", content: q }],
      });
      const ans = data.content?.[0]?.text || "Не удалось получить ответ.";
      setAnswer(ans);
      setHistory(prev => [{ q, a: ans }, ...prev].slice(0, 5));
    } catch {
      setAnswer("Ошибка соединения. Проверьте ANTHROPIC_API_KEY в настройках Vercel.");
    } finally { setLoading(false); }
  }

  return (
    <div>
      <div style={{ background: T.white, borderRadius: 14, padding: 22, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <h2 style={{ margin: "0 0 8px", color: T.navy, fontSize: 18, fontWeight: 900 }}>🤖 ИИ-консультант</h2>
        <p style={{ margin: "0 0 14px", color: T.slate, fontSize: 13 }}>Задайте клинический вопрос. Отвечает на основе NRP / AAP / ERC 2021–2024.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {QUICK_Q.map(q => (
            <button key={q} onClick={() => setQuestion(q)}
              style={{ background: T.cream, border: `1px solid ${T.teal}`, borderRadius: 20, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: T.teal, fontWeight: 600 }}>
              {q}
            </button>
          ))}
        </div>
        <textarea value={question} onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) ask(); }}
          placeholder="Введите клинический вопрос… (Ctrl+Enter)"
          rows={4}
          style={{ width: "100%", borderRadius: 10, border: "2px solid #CBD5E0", padding: 14, fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box", color: T.navy, display: "block" }}/>
        <button onClick={ask} disabled={loading || !question.trim()}
          style={{ marginTop: 12, background: loading ? "#ddd" : T.navy, color: T.white, border: "none", borderRadius: 8, padding: "12px 26px", cursor: loading ? "default" : "pointer", fontWeight: 800, fontSize: 15 }}>
          {loading ? "⏳ Анализирую…" : "📤 Получить ответ"}
        </button>
      </div>
      {answer && (
        <div style={{ background: T.white, borderRadius: 14, padding: 22, marginBottom: 20, borderLeft: `5px solid ${T.teal}`, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: T.teal, marginBottom: 12, letterSpacing: 1 }}>🤖 ОТВЕТ · claude-sonnet-4-6</div>
          <div style={{ fontSize: 14, color: T.navy, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{answer}</div>
          <div style={{ marginTop: 14, fontSize: 11, color: "#999", borderTop: "1px solid #eee", paddingTop: 10 }}>⚠️ Информация носит образовательный характер и не заменяет клиническое суждение врача.</div>
        </div>
      )}
      {history.length > 1 && (
        <div style={{ background: T.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: T.slate, marginBottom: 12 }}>📚 ИСТОРИЯ ВОПРОСОВ</div>
          {history.slice(1).map((item, i) => (
            <details key={i} style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: 10, marginBottom: 10 }}>
              <summary style={{ cursor: "pointer", fontSize: 13, fontWeight: 600, color: T.teal }}>{item.q}</summary>
              <div style={{ fontSize: 13, color: T.navy, lineHeight: 1.7, whiteSpace: "pre-wrap", marginTop: 8 }}>{item.a}</div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
