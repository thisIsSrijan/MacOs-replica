// import React, { useState } from 'react';
// import { ArrowLeft, ArrowRight, RotateCcw, Search } from 'lucide-react';

// export const Browser: React.FC = () => {
//   const [url, setUrl] = useState('https://www.google.com');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleNavigate = (newUrl: string) => {
//     setIsLoading(true);
//     setUrl(newUrl);
//     setTimeout(() => setIsLoading(false), 500);
//   };

//   return (
//     <div className="h-full flex flex-col bg-white">
//       <div className="flex items-center gap-2 p-2 bg-gray-100">
//         <button className="p-1 hover:bg-gray-200 rounded">
//           <ArrowLeft className="w-4 h-4" />
//         </button>
//         <button className="p-1 hover:bg-gray-200 rounded">
//           <ArrowRight className="w-4 h-4" />
//         </button>
//         <button className="p-1 hover:bg-gray-200 rounded">
//           <RotateCcw className="w-4 h-4" />
//         </button>
//         <div className="flex-1 flex items-center bg-white rounded-lg border px-3 py-1">
//           <Search className="w-4 h-4 text-gray-400 mr-2" />
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleNavigate(url)}
//             className="flex-1 outline-none text-sm"
//           />
//         </div>
//       </div>
//       <div className="flex-1 bg-white">
//         <iframe
//           src={url}
//           className="w-full h-full border-none"
//           sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
//         />
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Search } from 'lucide-react';

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);

  const validateUrl = (input: string) => {
    try {
      // If it's a valid URL, return as is.
      const newUrl = new URL(input);
      return newUrl.toString();
    } catch (e) {
      // If not, assume it's a search query and redirect to Google Search.
      return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    }
  };

  const handleNavigate = (newUrl: string) => {
    setIsLoading(true);
    const validatedUrl = validateUrl(newUrl);
    setUrl(validatedUrl);
    setTimeout(() => setIsLoading(false), 500); // Simulate a loading delay
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center gap-2 p-2 bg-gray-100">
        <button className="p-1 hover:bg-gray-700 rounded bg-gray-300">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded bg-gray-300">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          className="p-1 hover:bg-gray-700 rounded bg-gray-300"
          onClick={() => handleNavigate(url)} // Refresh functionality
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="flex-1 flex items-center bg-white rounded-lg border px-3 py-1">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate(url)}
            className="flex-1 outline-none text-sm text-gray-700"
          />
        </div>
      </div>
      <div className="flex-1 bg-white relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <span className="text-gray-500 text-sm">Loading...</span>
          </div>
        )}
        <iframe
          key={url} // Re-render the iframe on URL change
          src={url}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};
