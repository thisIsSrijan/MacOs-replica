import React from 'react';
import { Terminal, User, Music, Chrome, Mail, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Dock: React.FC = () => {
  const { toggleWindow, windows } = useStore();

  const isWindowOpen = (id: string) => {
    const window = windows.find(w => w.id === id);
    return window?.isOpen && !window?.minimized;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md flex items-center gap-2">
      <DockIcon icon={<User />} onClick={() => toggleWindow('about')} active={isWindowOpen('about')} />
      <DockIcon icon={<Terminal />} onClick={() => toggleWindow('terminal')} active={isWindowOpen('terminal')} />
      <DockIcon icon={<Music />} onClick={() => toggleWindow('spotify')} active={isWindowOpen('spotify')} />
      <DockIcon icon={<Chrome />} onClick={() => toggleWindow('browser')} active={isWindowOpen('browser')} />
      <div className="w-px h-8 bg-white/20 mx-2" />
      <DockIcon icon={<Mail />} />
      <DockIcon icon={<Globe />} />
    </div>
  );
};

const DockIcon: React.FC<{
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}> = ({ icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center text-white hover:scale-110 ${
      active ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'
    }`}
  >
    {icon}
  </button>
);