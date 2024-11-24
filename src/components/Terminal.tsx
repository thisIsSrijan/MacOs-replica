// import React, { useState } from 'react';
// import { format } from 'date-fns';
// import { TerminalCommand } from '../types';

// export const Terminal: React.FC = () => {
//   const [commands, setCommands] = useState<TerminalCommand[]>([]);
//   const [input, setInput] = useState('');

//   const handleCommand = (cmd: string) => {
//     const newCommand: TerminalCommand = {
//       command: cmd,
//       output: getCommandOutput(cmd),
//       timestamp: new Date(),
//     };
//     setCommands([...commands, newCommand]);
//     setInput('');
//   };

//   const getCommandOutput = (cmd: string): string => {
//     const parts = cmd.toLowerCase().split(' ');
//     switch (parts[0]) {
//       case 'help':
//         return `Available commands:
//   help - Show this help message
//   about - Display information about the system
//   clear - Clear the terminal
//   date - Show current date and time
//   echo [text] - Display text
//   ls - List files and directories
//   pwd - Print working directory
//   whoami - Display current user`;
//       case 'about':
//         return 'macOS Portfolio Terminal v1.0\nType "help" for available commands.';
//       case 'clear':
//         setTimeout(() => setCommands([]), 0);
//         return '';
//       case 'date':
//         return format(new Date(), 'PPpp');
//       case 'echo':
//         return parts.slice(1).join(' ');
//       case 'ls':
//         return `Documents
// Desktop
// Downloads
// Pictures
// portfolio.txt`;
//       case 'pwd':
//         return '/Users/guest';
//       case 'whoami':
//         return 'guest';
//       default:
//         return `Command not found: ${cmd}\nType "help" for available commands.`;
//     }
//   };

//   return (
//     <div className="font-mono text-sm h-full bg-black text-green-400 p-2 overflow-auto">
//       {commands.map((cmd, i) => (
//         <div key={i} className="mb-2">
//           <div className="flex items-center">
//             <span className="text-blue-400">guest@portfolio</span>
//             <span className="text-white mx-1">:</span>
//             <span className="text-green-400">~$</span>
//             <span className="ml-2">{cmd.command}</span>
//           </div>
//           <div className="whitespace-pre-wrap">{cmd.output}</div>
//         </div>
//       ))}
//       <div className="flex items-center">
//         <span className="text-blue-400">guest@portfolio</span>
//         <span className="text-white mx-1">:</span>
//         <span className="text-green-400">~$</span>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && input.trim()) {
//               handleCommand(input.trim());
//             }
//           }}
//           className="ml-2 bg-transparent outline-none flex-1 text-green-400"
//           autoFocus
//         />
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { TerminalCommand } from '../types';

export const Terminal: React.FC = () => {
  const [commands, setCommands] = useState<TerminalCommand[]>([
    {
      command: '',
      output: 'Welcome to the macOS Portfolio Terminal!\nType "help" for available commands.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleCommand = (cmd: string) => {
    const newCommand: TerminalCommand = {
      command: cmd,
      output: getCommandOutput(cmd),
      timestamp: new Date(),
    };
    setCommands([...commands, newCommand]);
    setInput('');
  };

  const getCommandOutput = (cmd: string): string => {
    const parts = cmd.toLowerCase().split(' ');
    switch (parts[0]) {
      case 'help':
        return `Available commands:
  help - Show this help message
  about - Display information about the system
  clear - Clear the terminal
  date - Show current date and time
  echo [text] - Display text
  ls - List files and directories
  pwd - Print working directory
  whoami - Display current user
  joke - Get a random joke
  calc [expression] - Perform a simple calculation (e.g., calc 2+2)
  weather - Display simulated weather information
  fortune - Get a random motivational quote
  time - Show the current time`;
      case 'about':
        return 'macOS Portfolio Terminal v1.0\nA fun project to showcase macOS-like terminal functionality.';
      case 'clear':
        setTimeout(() => setCommands([]), 0);
        return '';
      case 'date':
        return format(new Date(), 'PPpp');
      case 'time':
        return format(new Date(), 'hh:mm:ss a');
      case 'echo':
        return parts.slice(1).join(' ');
      case 'ls':
        return `Documents
Desktop
Downloads
Pictures
portfolio.txt`;
      case 'pwd':
        return '/Users/guest';
      case 'whoami':
        return 'guest';
      case 'joke':
        const jokes = [
          'Why don’t skeletons fight each other? They don’t have the guts.',
          'What do you call fake spaghetti? An impasta!',
          'Why couldn’t the bicycle stand up by itself? It was two-tired!',
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      case 'calc':
        try {
          const expression = parts.slice(1).join('');
          return `Result: ${eval(expression)}`; // Use with caution; `eval` can be a security risk
        } catch {
          return 'Invalid calculation. Usage: calc 2+2';
        }
      case 'weather':
        return 'Sunny, 25°C. Perfect day for coding!';
      case 'fortune':
        const quotes = [
          'The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt',
          'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
          'Believe you can and you’re halfway there. - Theodore Roosevelt',
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      default:
        return `Command not found: ${cmd}\nType "help" for available commands.`;
    }
  };

  return (
    <div className="font-mono text-sm h-full bg-black text-green-400 p-2 overflow-auto">
      {commands.map((cmd, i) => (
        <div key={i} className="mb-2">
          <div className="flex items-center">
            <span className="text-blue-400">guest@portfolio</span>
            <span className="text-white mx-1">:</span>
            <span className="text-green-400">~$</span>
            <span className="ml-2">{cmd.command}</span>
          </div>
          <div className="whitespace-pre-wrap">{cmd.output}</div>
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-blue-400">guest@portfolio</span>
        <span className="text-white mx-1">:</span>
        <span className="text-green-400">~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              handleCommand(input.trim());
            }
          }}
          className="ml-2 bg-transparent outline-none flex-1 text-green-400"
          autoFocus
        />
      </div>
    </div>
  );
};
