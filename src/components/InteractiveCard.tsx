import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  delay = 0,
  className = '',
  onClick,
  style,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo curve
      }}
      whileHover={{
        y: -8,
        boxShadow: 'var(--shadow-premium)',
        borderColor: 'rgba(37, 99, 235, 0.25)',
      }}
      onClick={onClick}
      className={`glass-card ${className}`}
      style={{
        padding: '2.5rem',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid var(--glass-border)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};
