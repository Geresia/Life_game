const { useState, useEffect } = React;

// 초기 플레이어 데이터는 외부 JSON에서 불러옵니다
// public/data/player.json
// {
//   "stats": { "intelligence":5, "health":8, "happiness":6, "appearance":4 },
//   "profile": { /* ... */ }
// }

function PlayerWindow({ player }) {
  const statLabels = {
    intelligence: '지능', health: '건강', happiness: '행복도', appearance: '외모'
  };
  const profileLabels = {
    name: '이름', gender: '성별', socialRank: '계급', occupation: '직업',
    ageCategory: '연령대', nationality: '국적', residenceCountry: '거주국'
  };

  return (
    <div className="player-window">
      <h2>플레이어 정보</h2>
      <div className="stats">
        {Object.entries(player.stats).map(([key, val]) => (
          <div className="stat-item" key={key}>
            <span className="stat-name">{statLabels[key]}</span>
            <span className="stat-value">{val}</span>
          </div>
        ))}
      </div>
      <div className="profile">
        {Object.entries(player.profile).map(([key, val]) => (
          <div className="profile-item" key={key}>
            <span className="label">{profileLabels[key]}:</span>
            <span className="value">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 시대 목록
const eras = [
  { key: 'ancient',      name: '고대 시대',    img: 'images/ancient.png' },
  { key: 'medieval',     name: '중세 시대',    img: 'images/medieval.png' },
  { key: 'renaissance',  name: '르네상스',     img: 'images/early-modern.png' },
  { key: 'modern',       name: '근대',         img: 'images/pre-modern.png' },
  { key: '20th-early',   name: '20세기 초',    img: 'images/20th-early.png' },
  { key: 'ww2',          name: '2차 세계대전', img: 'images/ww2.png' },
  { key: 'coldwar',      name: '냉전 시대',    img: 'images/coldwar.png' },
  { key: 'contemporary', name: '현대',         img: 'images/modern.png' }
];

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

function Game({ era }) {
  return (
    <div className="game-panel">
      <h2>{era.name} 게임 시작!</h2>
      {/* TODO: 실제 게임 로직 */}
    </div>
  );
}

function App() {
  const [view, setView] = useState('menu');
  const [selectedEra, setSelectedEra] = useState(null);
  const [player, setPlayer] = useState(null);

  // 플레이어 외부 데이터 로드
  useEffect(() => {
      fetch('/public/data/player.json')
      .then(res => {
        if (!res.ok) throw new Error('플레이어 데이터 로드 실패');
        return res.json();
      })
      .then(data => setPlayer(data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = era => {
    if (era.key === 'ancient') {
      setSelectedEra(era);
      setView('game');
    } else {
      alert(`선택된 시대: ${era.name}`);
    }
  };

  if (!player) return <div>플레이어 정보를 불러오는 중…</div>;

  return (
    <>
      {view === 'menu' && <MainMenu
        onStart={() => setView('era')}
        onLoad={() => alert('불러오기 준비 중')}
        onSettings={() => alert('설정 준비 중')} />}
      {view === 'era' && <EraSelection onSelect={handleSelect} onBack={() => setView('menu')} />}
      {view === 'game' && selectedEra && (
        <>
          <PlayerWindow player={player} />
          <Game era={selectedEra} />
        </>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
