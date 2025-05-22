import React, { useEffect, memo } from 'react';

// Toast notification component
const Toast = memo(({ message, isVisible, onClose, type = 'error' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColorClass = type === 'error' ? 'bg-red-500' : 
                       type === 'success' ? 'bg-green-500' : 
                       'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColorClass} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`}>
      {message}
    </div>
  );
});

export default Toast; 