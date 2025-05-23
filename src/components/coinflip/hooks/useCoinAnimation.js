import { useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage coin flip animation
 * @param {Object} options - Animation options
 * @param {boolean} options.isFlipping - Whether the coin is currently flipping
 * @param {number|null} options.result - The result of the flip (0 for heads, 1 for tails, null for no result)
 * @returns {Object} - Animation controls and refs
 */
const useCoinAnimation = ({ isFlipping, result }) => {
  const canvasRef = useRef(null);
  const headsImageRef = useRef(new Image());
  const tailsImageRef = useRef(new Image());
  const animationRef = useRef(null);
  const rotationRef = useRef(0);
  
  // Render the coin with the current rotation - side determined naturally by rotation
  const renderCoin = useCallback((rotation) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
    
    // Center coordinates
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Determine which side to show naturally based on rotation
    const showingHeads = Math.cos(rotation) > 0;
    
    const image = showingHeads ? headsImageRef.current : tailsImageRef.current;
    
    // Save the canvas state
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Calculate scale based on rotation (creates 3D effect)
    const scale = Math.abs(Math.cos(rotation));
    ctx.scale(scale, 1);
    
    // Add shadow for better 3D effect
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5 * Math.sin(rotation);
    ctx.shadowOffsetY = 5;
    
    // Draw the coin image
    const imgSize = Math.min(width, height) * 0.8;
    ctx.drawImage(image, -imgSize/2, -imgSize/2, imgSize, imgSize);
    
    // Restore the canvas state
    ctx.restore();
  }, []);
  
  // Load images when component mounts
  useEffect(() => {
    const headsImage = headsImageRef.current;
    const tailsImage = tailsImageRef.current;
    
    headsImage.src = '/images/left-coin-2.png'; // Heads side
    tailsImage.src = '/images/left-coin-1.png'; // Tails side
    
    // Wait for all images to load
    let loadedCount = 0;
    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        // All images loaded, render initial state
        renderCoin(0);
      }
    };
    
    headsImage.onload = onImageLoad;
    tailsImage.onload = onImageLoad;
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [renderCoin]);
  
  // Easing functions for smooth animation
  const easeOutQuint = useCallback((x) => {
    return 1 - Math.pow(1 - x, 5);
  }, []);
  
  // Completely revised animation to ensure the side doesn't change after stopping
  const startFlipAnimation = useCallback(() => {
    let startTime = null;
    const duration = 2000; // 2 seconds for a flip
    
    // Always start the animation from the current rotation
    const startRotation = rotationRef.current || 0;
    
    // Calculate the exact final rotation we need to show the correct result
    // Important: We must end at EXACTLY the right position to show the correct side
    // For heads (result === 0): End at a multiple of 2π (cos = 1)
    // For tails (result === 1): End at π + multiple of 2π (cos = -1)
    
    // Calculate how many full rotations to do (minimum 5)
    const numFullRotations = 5;
    
    // Calculate the target rotation
    let targetRotation;
    if (result === 0) { // Heads
      // End with cos(rotation) = 1 (multiple of 2π)
      targetRotation = Math.ceil(startRotation / (2 * Math.PI)) * 2 * Math.PI + numFullRotations * 2 * Math.PI;
    } else { // Tails
      // End with cos(rotation) = -1 (π + multiple of 2π)
      targetRotation = Math.floor(startRotation / (2 * Math.PI)) * 2 * Math.PI + Math.PI + numFullRotations * 2 * Math.PI;
    }
    
    console.log(`Starting animation: from ${startRotation} to ${targetRotation}, result: ${result === 0 ? 'Heads' : 'Tails'}`);
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use an easing function that slows down at the end
      // This gives a more natural stopping motion
      const easedProgress = easeOutQuint(progress);
      
      // Calculate current rotation - interpolate from start to target
      const rotation = startRotation + easedProgress * (targetRotation - startRotation);
      rotationRef.current = rotation;
      
      // Render based on current rotation
      renderCoin(rotation);
      
      // Continue animation if not done
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - verify we're showing the right side
        const finalSide = Math.cos(rotation) > 0 ? 'Heads' : 'Tails';
        console.log(`Animation complete. Final rotation: ${rotation}, showing: ${finalSide}`);
        
        // Important: We don't modify the rotation after animation ends
        // The animation should naturally end with the correct side showing
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [result, easeOutQuint, renderCoin]);
  
  // Gentle floating animation when idle
  const startFloatingAnimation = useCallback(() => {
    let startTime = null;
    
    // Get current rotation and analyze it
    const currentRotation = rotationRef.current || 0;
    const currentShowingHeads = Math.cos(currentRotation) > 0;
    
    // If we have a specific result to show and it doesn't match current rotation,
    // adjust the base rotation to show the correct side
    let baseRotation = currentRotation;
    
    if (result !== null) {
      const shouldShowHeads = result === 0;
      
      if (shouldShowHeads !== currentShowingHeads) {
        // Need to adjust rotation to show correct side
        // For heads, use even multiples of π (0, 2π, 4π...)
        // For tails, use odd multiples of π (π, 3π, 5π...)
        const currentFullRotations = Math.floor(currentRotation / Math.PI);
        baseRotation = (currentFullRotations + (shouldShowHeads ? 0 : 1)) * Math.PI;
      }
    }
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Gentle bobbing motion around the base rotation
      const floatAmount = Math.sin(elapsed / 1000) * 0.05; // Reduced amplitude for subtler effect
      const currentRotation = baseRotation + floatAmount;
      
      // Apply small floating effect to the base rotation
      renderCoin(currentRotation);
      rotationRef.current = currentRotation;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [result, renderCoin]);
  
  // Handle changes in flipping state
  useEffect(() => {
    if (isFlipping) {
      // Start the flip animation with the predetermined result
      startFlipAnimation();
    } else if (result !== null) {
      // When flipping ends, do NOT change the rotation
      // Just keep the current rotation that already shows the correct result
      // The rotation was set during animation to end at the correct position
    } else {
      // Gentle floating animation when idle
      startFloatingAnimation();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isFlipping, result, startFlipAnimation, startFloatingAnimation]);

  // Get the current showing side (heads or tails)
  const getCurrentSide = useCallback(() => {
    return Math.cos(rotationRef.current) > 0 ? 'heads' : 'tails';
  }, []);
  
  return {
    canvasRef,
    getCurrentSide,
    renderCoin
  };
};

export default useCoinAnimation; 