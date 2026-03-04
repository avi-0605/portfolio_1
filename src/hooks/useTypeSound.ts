import { useRef, useEffect, useCallback } from 'react';

// Shared audio instance to prevent multiple downloads/instances
let sharedAudio: HTMLAudioElement | null = null;

export const useTypeSound = (soundPath: string = '/sounds/type.mp3') => {
    useEffect(() => {
        if (typeof window !== 'undefined' && !sharedAudio) {
            sharedAudio = new Audio(soundPath);
            sharedAudio.volume = 0.25;
            sharedAudio.preload = 'auto';
        }
    }, [soundPath]);

    const play = useCallback(() => {
        if (sharedAudio) {
            // Clone the node or reset to allow rapid firing without cutting off previous sound
            // For character typing sounds, we usually want to reset
            const playPromise = sharedAudio.cloneNode() as HTMLAudioElement;
            playPromise.volume = 0.25;
            playPromise.play().catch(() => {
                // Fail silently if blocked by browser autoplay policy
            });
        }
    }, []);

    return { play };
};
