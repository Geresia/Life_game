const { useState, useEffect } = React;

// PNG 이미지 경로 포함
// 시대 목록 (PNG 파일 경로 포함)
const eras = [
  { key: 'ancient',      name: '고대 시대',      img: 'images/ancient.png' },
  { key: 'medieval',     name: '중세 시대',      img: 'images/medieval.png' },
  { key: 'renaissance',  name: '르네상스',       img: 'images/early-modern.png' },  // 이전 '근대 시대'
  { key: 'modern',       name: '근대',           img: 'images/pre-modern.png'   },  // 이전 '전근대'
  { key: '20th-early',   name: '20세기 초',      img: 'images/20th-early.png'   },
  { key: 'ww2',          name: '2차 세계대전',   img: 'images/ww2.png'          },
  { key: 'industrial',   name: '산업화 시대',    img: 'images/industrial.png'   },
  { key: 'contemporary', name: '현대',           img: 'images/modern.png'       }
];

// 이하 기존 코드 유지...


function MainMenu({ onStart, onLoad, onSettings }) {
  return (
    <div className="menu-panel">
      <h1 className="title">역사 인생 게임</h1>
      <button className="btn btn-start" onClick={onStart}>새 게임 시작</button>
      <button className="btn btn-load" onClick={onLoad}>불러오기</button>
      <button className="btn btn-settings" onClick={onSettings}>설정</button>
    </div>
  );
}

function EraSelection({ onSelect, onBack }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      idx += 1;
      setVisibleCount(idx);
      if (idx >= eras.length) clearInterval(iv);
    }, 600);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="era-panel">
      {eras.slice(0, visibleCount).map(era => (
        <div key={era.key} className="era-box" onClick={() => onSelect(era)}>
          <div className="era-text">{era.name}</div>
          <img className="era-img" src={era.img} alt={era.name} />
        </div>
      ))}
      {visibleCount >= eras.length && (
        <button className="back-btn" onClick={onBack}>뒤로 가기</button>
      )}
    </div>
  );
}

function App() {
  const [view, setView] = useState('menu');
  return (
    <>
      {view === 'menu' && (
        <MainMenu
          onStart={() => setView('era')}
          onLoad={() => alert('불러오기 준비 중')}
          onSettings={() => alert('설정 준비 중')}
        />
      )}
      {view === 'era' && (
        <EraSelection
          onSelect={era => alert(`선택된 시대: ${era.name}`)}
          onBack={() => setView('menu')}
        />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
