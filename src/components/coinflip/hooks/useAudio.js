import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing audio playback
 * @param {Object} options - Configuration options
 * @param {string} options.successSoundPath - Path to success sound file
 * @param {string} options.failureSoundPath - Path to failure sound file
 * @returns {Object} - Audio controls
 */
const useAudio = ({ 
  successSoundPath = '/sounds/success.wav', 
  failureSoundPath = '/sounds/failure.wav'
}) => {
  const successSoundRef = useRef(null);
  const failureSoundRef = useRef(null);
  const soundPlayedRef = useRef(false);

  // Initialize audio elements
  useEffect(() => {
    successSoundRef.current = new Audio(successSoundPath);
    failureSoundRef.current = new Audio(failureSoundPath);
    
    // Preload audio
    successSoundRef.current.load();
    failureSoundRef.current.load();
    
    return () => {
      // Clean up audio resources
      if (successSoundRef.current) {
        successSoundRef.current.pause();
        successSoundRef.current.src = '';
      }
      if (failureSoundRef.current) {
        failureSoundRef.current.pause();
        failureSoundRef.current.src = '';
      }
    };
  }, [successSoundPath, failureSoundPath]);

  // Play success sound
  const playSuccessSound = () => {
    if (successSoundRef.current) {
      try {
        // Reset and play from the beginning
        successSoundRef.current.currentTime = 0;
        successSoundRef.current.play().catch(err => 
          console.log("Error playing success sound:", err)
        );
      } catch (error) {
        console.error("Error playing success sound:", error);
      }
    }
  };

  // Play failure sound
  const playFailureSound = () => {
    if (failureSoundRef.current) {
      try {
        // Reset and play from the beginning
        failureSoundRef.current.currentTime = 0;
        failureSoundRef.current.play().catch(err => 
          console.log("Error playing failure sound:", err)
        );
      } catch (error) {
        console.error("Error playing failure sound:", error);
      }
    }
  };

  // Track if sound has been played in a sequence
  const resetSoundPlayed = () => {
    soundPlayedRef.current = false;
  };

  const setSoundPlayed = () => {
    soundPlayedRef.current = true;
  };

  const hasSoundPlayed = () => {
    return soundPlayedRef.current;
  };

  return {
    playSuccessSound,
    playFailureSound,
    resetSoundPlayed,
    setSoundPlayed,
    hasSoundPlayed
  };
};

export default useAudio; 