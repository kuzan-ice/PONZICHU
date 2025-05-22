import React, { useState, useRef, memo } from 'react';

// Reusable AnimatedButton component with memo for performance
const AnimatedButton = memo(({
  children,
  bgColor,
  className = '',
  onClick,
  animated = true,
}) => {
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const createRipple = (event) => {
    const button = btnRef.current;
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    
    setRipples((prev) => [...prev, newRipple]);
    
    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter(r => r.key !== newRipple.key));
    }, 500);
  };

  return (
    <div
      ref={btnRef}
      className={`
        relative overflow-hidden
        flex border border-[#000000] rounded-full
        ${bgColor}
        justify-center items-center py-[10px] px-3 cursor-pointer
        transition duration-150 ease-in-out
        ${animated && pressed ? 'scale-95 shadow-lg' : 'scale-100 shadow-[2px_2px_0px_0px_#000000]'}
        hover:brightness-105 active:brightness-95
        ${className}
      `}
      onMouseDown={e => {
        if (animated) setPressed(true);
        createRipple(e);
      }}
      onMouseUp={animated ? () => setPressed(false) : undefined}
      onMouseLeave={animated ? () => setPressed(false) : undefined}
      onClick={onClick}
      style={{ userSelect: 'none' }}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.key}
          className="absolute bg-white/40 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      {children}
    </div>
  );
});

export default AnimatedButton; 