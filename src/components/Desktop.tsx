import React from 'react';
import { Folder } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Desktop: React.FC = () => {
  const { toggleWindow, wallpaper } = useStore();

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center p-4 pt-8"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="grid grid-cols-1 gap-4 w-24">
        <button
          onClick={() => toggleWindow('about')}
          className="flex flex-col items-center group"
        >
          <Folder className="w-16 h-16 text-white group-hover:text-blue-400 transition-colors" />
          <span className="text-white text-sm mt-1">About Me</span>
        </button>
        <button
          onClick={() => toggleWindow('terminal')}
          className="flex flex-col items-center group"
        >
          <Folder className="w-16 h-16 text-white group-hover:text-green-400 transition-colors" />
          <span className="text-white text-sm mt-1">Terminal</span>
        </button>
        <button
          onClick={() => toggleWindow('spotify')}
          className="flex flex-col items-center group"
        >
          <Folder className="w-16 h-16 text-white group-hover:text-green-500 transition-colors" />
          <span className="text-white text-sm mt-1">Spotify</span>
        </button>
      </div>
    </div>
  );
};