// import './App.css';

function Menu() {
  return (
    <div className="menu">
      Menu Bar
    </div>
  )
}

function Settings() {
  return (
    <div className="settings">
      Settings Pane
    </div>
  )
}

function CurrentItems() {
  return (
    <ul>
      <li>
        <div>
          <div>Title</div>
          <div>Text</div>
        </div>
      </li>
      <li>
        <div>
          <div>Title 2</div>
          <div>Text</div>
        </div>
      </li>
    </ul>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Braindump
      </header>
      <Menu />
      <CurrentItems />
      <Settings />
    </div>
  );
}

export default App;
