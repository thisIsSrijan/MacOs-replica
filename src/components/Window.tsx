import React from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Square } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMaximized: boolean;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  isMaximized,
  defaultSize,
  defaultPosition,
}) => {
  const { toggleWindow, setActiveWindow, updateWindowPosition, updateWindowSize, minimizeWindow, maximizeWindow } = useStore();

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={400}
      minHeight={300}
      bounds="window"
      dragHandleClassName="window-handle"
      onDragStart={() => setActiveWindow(id)}
      onDragStop={(e, d) => updateWindowPosition(id, d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(id, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(id, position.x, position.y);
      }}
      disableDragging={isMaximized}
      size={isMaximized ? { width: window.innerWidth, height: window.innerHeight - 28 } : undefined}
      position={isMaximized ? { x: 0, y: 28 } : undefined}
      style={{ zIndex: 1000 }}
      className="absolute"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full h-full bg-gray-100 rounded-lg shadow-xl overflow-hidden"
      >
        <div className="window-handle bg-gray-200 p-2 flex items-center justify-between cursor-move">
          <div className="flex space-x-2">
            <button
              onClick={() => toggleWindow(id)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => minimizeWindow(id)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
            >
              <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => maximizeWindow(id)}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
            >
              <Square className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          <span className="text-sm text-gray-700 absolute left-1/2 -translate-x-1/2">
            {title}
          </span>
          <div className="w-16" />
        </div>
        <div className="h-[calc(100%-2.5rem)] overflow-auto">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
};