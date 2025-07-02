const { useState } = React;

function MainMenu({ onStart, onLoad, onSettings }) {
  return (
    <div className="panel">
      <h1 className="title">역사 인생 게임</h1>
      <button className="btn btn-start" onClick={onStart}>
        새 게임 시작
      </button>
      <button className="btn btn-load" onClick={onLoad}>
        불러오기
      </button>
      <button className="btn btn-settings" onClick={onSettings}>
        설정
      </button>
    </div>
  );
}

function App() {
  const [view, setView] = useState('menu');

  return (
    <>
      {view === 'menu' && (
        <MainMenu
          onStart={() => setView('character')}
          onLoad={() => alert('불러오기 준비 중')}
          onSettings={() => alert('설정 준비 중')}
        />
      )}
      {view === 'character' && (
        <div className="panel" style={{ background: 'rgba(0,0,0,0.5)', color: '#F5ECD9' }}>
          캐릭터 생성 화면 (추후 구현)
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);