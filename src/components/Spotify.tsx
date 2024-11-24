import React, { useEffect, useState } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { SpotifyTrack } from '../types';

const SPOTIFY_CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // You'll need to replace this

export const Spotify: React.FC = () => {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([
    {
      id: '1',
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      albumArt: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80',
      duration: 354,
    },
    {
      id: '2',
      name: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80',
      duration: 482,
    },
  ]);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!currentTrack && tracks.length > 0) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Favorite Tracks</h2>
          <div className="space-y-2">
            {tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => setCurrentTrack(track)}
                className={`flex items-center p-2 rounded-lg hover:bg-white/10 cursor-pointer ${
                  currentTrack?.id === track.id ? 'bg-white/20' : ''
                }`}
              >
                <img
                  src={track.albumArt}
                  alt={track.album}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="ml-4 flex-1">
                  <div className="font-medium">{track.name}</div>
                  <div className="text-sm text-gray-400">{track.artist}</div>
                </div>
                <div className="text-sm text-gray-400">
                  {Math.floor(track.duration / 60)}:
                  {(track.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentTrack && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center">
            <img
              src={currentTrack.albumArt}
              alt={currentTrack.album}
              className="w-14 h-14 rounded object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="font-medium">{currentTrack.name}</div>
              <div className="text-sm text-gray-400">{currentTrack.artist}</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button className="p-2 hover:text-green-400">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              className="p-3 bg-green-500 rounded-full hover:bg-green-400"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button className="p-2 hover:text-green-400">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};