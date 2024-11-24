import { create } from 'zustand';
import { Window } from '../types';

interface Store {
  windows: Window[];
  activeWindow: string | null;
  wallpaper: string;
  setActiveWindow: (id: string) => void;
  toggleWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  setWallpaper: (url: string) => void;
}

const calculateInitialPosition = (id: string) => {
  const baseX = Math.max(50, Math.random() * (window.innerWidth - 600));
  const baseY = Math.max(50, Math.random() * (window.innerHeight - 400));
  return { x: baseX, y: baseY };
};

const calculateInitialSize = (id: string) => {
  switch (id) {
    case 'terminal':
      return { width: 800, height: 500 };
    case 'spotify':
      return { width: 600, height: 700 };
    case 'browser':
      return { width: 1000, height: 700 };
    default:
      return { width: 600, height: 400 };
  }
};

const DEFAULT_WALLPAPER = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80';

export const useStore = create<Store>((set) => ({
  windows: [],
  activeWindow: null,
  wallpaper: DEFAULT_WALLPAPER,
  setActiveWindow: (id) =>
    set((state) => ({
      activeWindow: id,
      windows: state.windows.map((window) => ({
        ...window,
        zIndex: window.id === id ? 10 : window.zIndex,
        minimized: window.id === id ? false : window.minimized,
      })),
    })),
  toggleWindow: (id) =>
    set((state) => {
      const existingWindow = state.windows.find((w) => w.id === id);
      const isOpen = existingWindow?.isOpen;

      return {
        windows: state.windows.map((window) =>
          window.id === id
            ? {
                ...window,
                isOpen: !isOpen,
                minimized: false,
                position: isOpen ? window.position : calculateInitialPosition(id),
                size: calculateInitialSize(id),
                zIndex: 10,
              }
            : { ...window, zIndex: window.zIndex > 1 ? 1 : window.zIndex }
        ),
        activeWindow: !isOpen ? id : null,
      };
    }),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? { ...window, minimized: true }
          : window
      ),
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    })),
  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? { 
              ...window, 
              maximized: !window.maximized,
              position: window.maximized ? calculateInitialPosition(id) : { x: 0, y: 0 },
              size: window.maximized 
                ? calculateInitialSize(id)
                : { width: window.innerWidth, height: window.innerHeight - 28 }
            }
          : window
      ),
    })),
  updateWindowPosition: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, position: { x, y } } : window
      ),
    })),
  updateWindowSize: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, size: { width, height } } : window
      ),
    })),
  setWallpaper: (url) => set({ wallpaper: url }),
}));