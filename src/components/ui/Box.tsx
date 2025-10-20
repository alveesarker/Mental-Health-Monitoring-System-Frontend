import React from 'react';

// 1. Define the props interface for type safety
interface WhiteBoxWrapperProps {
  /** The content to be rendered inside the box (any valid React node) */
  children: React.ReactNode;
  /** Optional custom Tailwind classes to override or extend the default style */
  className?: string;
  /** Optional inline styles (TypeScript type for CSS-in-JS) */
  style?: React.CSSProperties;
}

// 2. The Functional Component with TypeScript
const WhiteBoxWrapper: React.FC<WhiteBoxWrapperProps> = ({ children, className = '', style }) => {
  
  // Define the base Tailwind classes for the 'dynamic white box' look.
  // bg-white: White background
  // p-6: Padding of 1.5rem (24px)
  // m-4: Margin of 1rem (16px)
  // rounded-lg: Large border radius
  // shadow-xl: Extra large shadow for depth
  // transition-all: Smooth transition for dynamic effects (like hover)
  // hover:shadow-2xl: A slightly larger shadow on hover
  const baseClasses = 
    ' p-6 m-4 transition-all duration-300';

  // Combine base classes with any custom classes passed by the user
  const combinedClassName = `${baseClasses} ${className}`;

  return (
    <div className={combinedClassName} style={style}>
      {children}
    </div>
  );
};

export default WhiteBoxWrapper;