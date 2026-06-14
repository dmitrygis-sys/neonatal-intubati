import { T } from './tokens';

export function AirwayAnatomySVG() {
  return (
    <svg viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 320 }}>
      <ellipse cx="160" cy="70" rx="70" ry="65" fill="#FDDBB4" stroke="#C8956B" strokeWidth="2"/>
      <rect x="130" y="128" width="60" height="45" rx="8" fill="#FDDBB4" stroke="#C8956B" strokeWidth="2"/>
      <ellipse cx="160" cy="100" rx="28" ry="12" fill="#A03030" stroke="#7A2020" strokeWidth="1.5"/>
      <ellipse cx="160" cy="108" rx="22" ry="10" fill="#C04040"/>
      <path d="M148 128 Q160 118 172 128" fill="#8B2020" stroke="#7A2020" strokeWidth="1.5"/>
      <rect x="143" y="170" width="34" height="120" rx="6" fill="#D4EBF8" stroke={T.teal} strokeWidth="2"/>
      {[180,200,220,240,260,275].map(y => (
        <line key={y} x1="143" y1={y} x2="177" y2={y} stroke={T.teal} strokeWidth="1.5" strokeDasharray="4,3"/>
      ))}
      <path d="M143 290 Q160 305 177 290" fill="none" stroke={T.teal} strokeWidth="2.5"/>
      <path d="M143 295 Q110 320 108 350" fill="none" stroke={T.teal} strokeWidth="3"/>
      <path d="M177 295 Q210 320 212 350" fill="none" stroke={T.teal} strokeWidth="3"/>
      <line x1="145" y1="158" x2="175" y2="155" stroke={T.amber} strokeWidth="2.5"/>
      <line x1="145" y1="165" x2="175" y2="168" stroke={T.amber} strokeWidth="2.5"/>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={T.navy}/>
        </marker>
      </defs>
      {[
        [95, 88, "Носоглотка"],
        [200, 148, "Надгортанник"],
        [200, 162, "Голосовые связки"],
        [210, 230, "Трахея"],
        [48, 340, "Лев. бронх"],
        [215, 340, "Прав. бронх"],
        [200, 305, "Карина"],
      ].map(([x, y, label]) => (
        <text key={label} x={x} y={y} fontSize="9.5" fill={T.navy} fontFamily="sans-serif" fontWeight="600"
          stroke="#fff" strokeWidth="3" strokeLinejoin="round" style={{ paintOrder: "stroke" }}>
          {label}
        </text>
      ))}
      <line x1="193" y1="148" x2="170" y2="130" stroke={T.navy} strokeWidth="1" markerEnd="url(#arr)"/>
      <line x1="193" y1="162" x2="176" y2="162" stroke={T.navy} strokeWidth="1" markerEnd="url(#arr)"/>
      <line x1="205" y1="230" x2="180" y2="230" stroke={T.navy} strokeWidth="1" markerEnd="url(#arr)"/>
      <line x1="47" y1="335" x2="110" y2="342" stroke={T.navy} strokeWidth="1" markerEnd="url(#arr)"/>
      <line x1="215" y1="334" x2="209" y2="344" stroke={T.navy} strokeWidth="1" markerEnd="url(#arr)"/>
      <line x1="193" y1="305" x2="166" y2="302" stroke={T.navy} strokeWidth="1" markerEnd="url(#arr)"/>
    </svg>
  );
}

export function LaryngoscopeSVG() {
  return (
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 280 }}>
      <rect x="30" y="60" width="28" height="110" rx="6" fill="#888" stroke="#555" strokeWidth="2"/>
      <path d="M58 80 L220 50 L224 60 L66 92 Z" fill={T.teal} stroke="#076" strokeWidth="1.5"/>
      <circle cx="200" cy="55" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="200" cy="55" r="9" fill="rgba(255,215,0,0.25)"/>
      <path d="M100 140 Q140 110 200 70" fill="none" stroke="#D4EBF8" strokeWidth="8" strokeLinecap="round"/>
      <path d="M100 140 Q140 110 200 70" fill="none" stroke={T.tealLt} strokeWidth="4" strokeLinecap="round" strokeDasharray="6,4"/>
      <text x="32" y="55" fontSize="10" fill={T.navy} fontFamily="sans-serif" fontWeight="700">Рукоятка</text>
      <text x="118" y="41" fontSize="10" fill={T.teal} fontFamily="sans-serif" fontWeight="700">Клинок Миллера</text>
      <text x="102" y="158" fontSize="10" fill={T.navy} fontFamily="sans-serif" fontWeight="700">ЭТТ</text>
      <text x="174" y="48" fontSize="9" fill="#B8860B" fontFamily="sans-serif" fontWeight="700">Источник света</text>
    </svg>
  );
}

export function TubeSizesSVG() {
  const sizes = [
    { ga: "≤28 нед", size: "2.5", color: "#E8C0C0", mass: "≤1000 г" },
    { ga: "28–34 нед", size: "3.0", color: "#C0D4E8", mass: "1000–1500 г" },
    { ga: "34–38 нед", size: "3.5", color: "#C0E8C8", mass: "1500–2500 г" },
    { ga: ">38 нед", size: "3.5–4.0", color: "#E8E0C0", mass: ">2500 г" },
  ];
  return (
    <svg viewBox="0 0 320 195" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 320 }}>
      <text x="160" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill={T.navy} fontFamily="sans-serif">
        Подбор размера ЭТТ
      </text>
      {sizes.map((s, i) => (
        <g key={i} transform={`translate(0, ${28 + i * 40})`}>
          <rect x="12" y="4" width="295" height="32" rx="7" fill={s.color} stroke="#ccc" strokeWidth="1"/>
          <text x="24" y="25" fontSize="12" fontWeight="700" fill={T.navy} fontFamily="sans-serif">{s.ga}</text>
          <text x="148" y="25" fontSize="11" fill={T.slate} fontFamily="sans-serif" textAnchor="middle">{s.mass}</text>
          <text x="290" y="25" fontSize="14" fontWeight="900" fill={T.teal} fontFamily="sans-serif" textAnchor="end">№ {s.size}</text>
        </g>
      ))}
    </svg>
  );
}

export function DepthSVG() {
  return (
    <svg viewBox="0 0 320 165" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 320 }}>
      <text x="160" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill={T.navy} fontFamily="sans-serif">
        Глубина введения ЭТТ
      </text>
      <rect x="12" y="26" width="295" height="46" rx="8" fill="#D4EBF8" stroke={T.teal} strokeWidth="1.5"/>
      <text x="24" y="46" fontSize="12" fontWeight="700" fill={T.navy} fontFamily="sans-serif">Формула:</text>
      <text x="108" y="46" fontSize="14" fontWeight="900" fill={T.teal} fontFamily="sans-serif">Глубина (см) = масса (кг) + 6</text>
      <text x="24" y="65" fontSize="10" fill={T.slate} fontFamily="sans-serif">* для орально введённой трубки у доношенных</text>
      <rect x="12" y="82" width="295" height="72" rx="8" fill="#FFF3DC" stroke={T.amber} strokeWidth="1.5"/>
      <text x="24" y="103" fontSize="11" fontWeight="700" fill={T.navy} fontFamily="sans-serif">Контрольные точки:</text>
      <text x="24" y="122" fontSize="11" fill={T.slate} fontFamily="sans-serif">• 1 кг → 7 см  |  2 кг → 8 см  |  3 кг → 9 см  |  4 кг → 10 см</text>
      <text x="24" y="142" fontSize="10" fill={T.slate} fontFamily="sans-serif">• Правило «1-2-3 = 7-8-9» удобно запомнить в родзале</text>
    </svg>
  );
}
