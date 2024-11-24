import React, { useState, useEffect } from 'react';
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, Wifi, Volume2, Search } from 'lucide-react';
import { MenuItem } from '../types';
import { useStore } from '../store/useStore';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80',
];

export const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [batteryStatus, setBatteryStatus] = useState<{ level: number; charging: boolean }>({ level: 1, charging: false });
  const { setWallpaper } = useStore();
  
  useEffect(() => {
    const getBatteryStatus = async () => {
      try {
        const battery = await (navigator as any).getBattery();
        const updateBatteryStatus = () => {
          setBatteryStatus({
            level: battery.level,
            charging: battery.charging,
          });
        };

        updateBatteryStatus();
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryStatus);
          battery.removeEventListener('chargingchange', updateBatteryStatus);
        };
      } catch (error) {
        console.log('Battery status not available');
      }
    };

    getBatteryStatus();
  }, []);

  const getBatteryIcon = () => {
    if (batteryStatus.charging) return <BatteryCharging className="w-4 h-4" />;
    if (batteryStatus.level > 0.7) return <BatteryFull className="w-4 h-4" />;
    if (batteryStatus.level > 0.3) return <BatteryMedium className="w-4 h-4" />;
    return <BatteryLow className="w-4 h-4" />;
  };

  const date = new Date();
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const menuItems: Record<string, MenuItem[]> = {
    File: [
      { label: 'New Window', action: () => console.log('New Window') },
      { label: 'Close Window', action: () => console.log('Close Window') },
    ],
    Edit: [
      { label: 'Cut', action: () => document.execCommand('cut') },
      { label: 'Copy', action: () => document.execCommand('copy') },
      { label: 'Paste', action: () => document.execCommand('paste') },
    ],
    View: [
      { 
        label: 'Change Wallpaper',
        submenu: WALLPAPERS.map((url, index) => ({
          label: `Wallpaper ${index + 1}`,
          action: () => setWallpaper(url),
        })),
      },
    ],
  };

  return (
    <div className="fixed top-0 w-full h-7 bg-black/20 backdrop-blur-md px-4 flex items-center justify-between text-white text-sm z-50">
      <div className="flex items-center space-x-4">
        <span className="font-semibold">Portfolio</span>
        {Object.entries(menuItems).map(([menu]) => (
          <div
            key={menu}
            className="relative"
            onMouseEnter={() => setActiveMenu(menu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
              {menu}
            </span>
            {activeMenu === menu && (
              <div className="absolute top-full left-0 mt-1 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg py-1 min-w-[200px]">
                {menuItems[menu].map((item, index) => (
                  <MenuItemComponent key={index} item={item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-1">
          {getBatteryIcon()}
          <span className="text-xs">{Math.round(batteryStatus.level * 100)}%</span>
        </div>
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Search className="w-4 h-4" />
        <span>{timeString}</span>
      </div>
    </div>
  );
};

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      <div
        className="px-4 py-1 hover:bg-blue-500 cursor-pointer flex items-center justify-between"
        onClick={item.action}
      >
        <span>{item.label}</span>
        {item.submenu && <span>▶</span>}
      </div>
      {showSubmenu && item.submenu && (
        <div className="absolute left-full top-0 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg py-1 min-w-[200px]">
          {item.submenu.map((subItem, index) => (
            <div
              key={index}
              className="px-4 py-1 hover:bg-blue-500 cursor-pointer"
              onClick={subItem.action}
            >
              {subItem.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};