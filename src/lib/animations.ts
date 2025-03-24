
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { 
    duration: 0.4, 
    ease: [0.22, 1, 0.36, 1] 
  }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { 
    duration: 0.3
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
  transition: { 
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
  transition: { 
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { 
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideInBottom = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  transition: { 
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }
};

// Function to apply a random floating animation to elements
export const applyFloatingAnimation = (element: HTMLElement, intensity: number = 1) => {
  if (!element) return;
  
  const baseSpeed = 10 + Math.random() * 15; // between 10-25s
  const baseDistance = 5 + Math.random() * 10; // between 5-15px
  
  const speed = baseSpeed / intensity;
  const distance = baseDistance * intensity;
  
  element.style.transition = `transform ${speed}s ease-in-out`;
  element.style.animation = `float ${speed}s ease-in-out infinite`;
  
  // Apply a random delay so elements don't all move in sync
  element.style.animationDelay = `${Math.random() * 5}s`;
};

// Create a visual connection between two elements
export const createConnectionLine = (
  startElement: HTMLElement, 
  endElement: HTMLElement, 
  color: string = 'rgba(160, 255, 220, 0.3)',
  parentContainer: HTMLElement
) => {
  if (!startElement || !endElement || !parentContainer) return null;
  
  const line = document.createElement('div');
  line.className = 'absolute pointer-events-none';
  line.style.backgroundColor = color;
  line.style.height = '2px';
  line.style.zIndex = '-1';
  line.style.opacity = '0';
  line.style.transition = 'opacity 0.5s ease';
  
  parentContainer.appendChild(line);
  
  const updateLinePosition = () => {
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const containerRect = parentContainer.getBoundingClientRect();
    
    const startX = startRect.left + startRect.width / 2 - containerRect.left;
    const startY = startRect.top + startRect.height / 2 - containerRect.top;
    const endX = endRect.left + endRect.width / 2 - containerRect.left;
    const endY = endRect.top + endRect.height / 2 - containerRect.top;
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    
    line.style.width = `${length}px`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    
    // Make visible after positioning
    line.style.opacity = '1';
  };
  
  // Initial positioning
  setTimeout(updateLinePosition, 100);
  
  // Update on window resize
  window.addEventListener('resize', updateLinePosition);
  
  return {
    element: line,
    update: updateLinePosition,
    destroy: () => {
      window.removeEventListener('resize', updateLinePosition);
      parentContainer.removeChild(line);
    }
  };
};
