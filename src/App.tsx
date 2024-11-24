import React, { useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { Window } from './components/Window';
import { Terminal } from './components/Terminal';
import { AboutMe } from './components/AboutMe';
import { Spotify } from './components/Spotify';
import { Browser } from './components/Browser';
import { MenuBar } from './components/MenuBar';
import { Dock } from './components/Dock';
import { useStore } from './store/useStore';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { windows, activeWindow } = useStore();

  useEffect(() => {
    // Initialize windows
    useStore.setState({
      windows: [
        {
          id: 'about',
          title: 'About Me',
          icon: 'file',
          component: <AboutMe />,
          isOpen: false,
          minimized: false,
          maximized: false,
          position: { x: 100, y: 100 },
          size: { width: 600, height: 400 },
          zIndex: 1,
        },
        {
          id: 'terminal',
          title: 'Terminal',
          icon: 'terminal',
          component: <Terminal />,
          isOpen: false,
          minimized: false,
          maximized: false,
          position: { x: 150, y: 150 },
          size: { width: 800, height: 500 },
          zIndex: 1,
        },
        {
          id: 'spotify',
          title: 'Spotify',
          icon: 'music',
          component: <Spotify />,
          isOpen: false,
          minimized: false,
          maximized: false,
          position: { x: 200, y: 200 },
          size: { width: 600, height: 700 },
          zIndex: 1,
        },
        {
          id: 'browser',
          title: 'Browser',
          icon: 'chrome',
          component: <Browser />,
          isOpen: false,
          minimized: false,
          maximized: false,
          position: { x: 250, y: 250 },
          size: { width: 1000, height: 700 },
          zIndex: 1,
        },
      ],
    });
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gray-900">
      <MenuBar />
      <Desktop />
      <Dock />
      <AnimatePresence>
        {windows
          .filter((window) => window.isOpen && !window.minimized)
          .map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              isMaximized={window.maximized}
              defaultSize={window.size}
              defaultPosition={window.position}
            >
              {window.component}
            </Window>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default App;