// utils/motion.js
import { motion } from 'framer-motion';

// Animation de conteneur avec effet d'espacement
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Animation d'apparition avec direction
export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type || 'spring',
      delay: delay || 0,
      duration: duration || 0.5,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

// Animation de zoom pour les éléments
export const zoomIn = (delay, duration) => ({
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

// Animation de slide pour les éléments
export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '-100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

// Animation de texte qui se révèle
export const textVariant = (delay = 0) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

// Animation de rotation
export const rotateIn = (delay, duration) => ({
  hidden: {
    rotate: 10,
    opacity: 0,
  },
  show: {
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
    },
  },
});

// Animation de flip (retournement)
export const flipIn = (delay, duration) => ({
  hidden: {
    rotateX: 90,
    opacity: 0,
  },
  show: {
    rotateX: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
    },
  },
});

// Animation de rebond
export const bounceIn = (delay, duration) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15,
      delay,
      duration,
    },
  },
});

// Animation de fondu enchaîné
export const fadeInOut = (delay, duration) => ({
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay,
      duration,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
});