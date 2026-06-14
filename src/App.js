import { useState } from 'react';
import { T } from './tokens';
import { ProtocolTab, AnatomyTab, ScenariosTab, AITab } from './Tabs';

const TABS = [
  { id: "guide",     label: "📋 Протокол" },
  { id: "anatomy",   label: "🫁 Анатомия" },
  { id: "scenarios", label: "⚡ Сценарии" },
  { id: "ai",        label: "🤖 ИИ-консультант" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("guide");

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: T.cream, minHeight: "100vh" }}>

      <div style={{ background: T.navy, color: T.white, padding: "24px 20px 16px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <div style={{ background: T.teal, borderRadius: 10, padding: "8px 12px", fontSize: 28, lineHeight: 1 }}>🫁</div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: T.tealLt, fontWeight: 700, textTransform: "uppercase" }}>
                Клинический проспект · Неонатология
              </div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>
                Интубация новорождённых
              </h1>
            </div>
          </div>
          <p style={{ margin: 0, color: "#A8C4D8", fontSize: 13, lineHeight: 1.5 }}>
            Практическое руководство · AI-ассистент: claude-sonnet-4-6
          </p>
        </div>
      </div>

      <div style={{ background: T.navy, borderBottom: `3px solid ${T.teal}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 2, padding: "0 12px", flexWrap: "wrap" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? T.teal : "transparent",
                color: activeTab === tab.id ? T.white : "#A8C4D8",
                border: "none", cursor: "pointer",
                padding: "10px 16px", fontSize: 13, fontWeight: 700,
                borderRadius: "6px 6px 0 0", transition: "all 0.18s",
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 56px" }}>
        {activeTab === "guide"     && <ProtocolTab/>}
        {activeTab === "anatomy"   && <AnatomyTab/>}
        {activeTab === "scenarios" && <ScenariosTab/>}
        {activeTab === "ai"        && <AITab/>}
      </div>

      <div style={{ background: T.navy, color: "#6B8BA4", textAlign: "center", padding: 16, fontSize: 11 }}>
        Клинический проспект · Интубация новорождённых · NRP / ERC / AAP 2024 · Powered by claude-sonnet-4-6
      </div>
    </div>
  );
}
