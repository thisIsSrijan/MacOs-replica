export interface Window {
  id: string;
  title: string;
  icon: string;
  component: React.ReactNode;
  isOpen: boolean;
  minimized: boolean;
  maximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: number;
  preview_url: string;
}

export interface TerminalCommand {
  command: string;
  output: string;
  timestamp: Date;
}

export interface MenuItem {
  label: string;
  action?: () => void;
  submenu?: MenuItem[];
}