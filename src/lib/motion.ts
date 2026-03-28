import type { Transition } from 'motion/react';

export const springStandard: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
};

export const springEntrance: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 18,
};

export const springCinematic: Transition = {
  type: 'spring',
  stiffness: 55,
  damping: 16,
};

export const viewportOnce = { once: true, margin: '-80px' as const };

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springEntrance },
};
