// src/variants.js

// Page transition animations for routes
export const pageTransitionVariants = {
    initial: {
        opacity: 0,
        x: '-100vw',
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        x: '100vw',
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 0.5,
        },
    },
};

// Section fade-in animation
export const sectionFadeIn = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
        },
    },
};

// Stagger container animation for sections with multiple child elements
export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

// Child element animation for stagger effect
export const fadeInUp = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Button hover animation
export const buttonHover = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3,
        },
    },
};

// Card zoom-in animation
export const cardZoom = {
    initial: {
        scale: 0.9,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

// Slide-in animation for side panels or modals
export const slideInLeft = {
    initial: {
        x: '-100%',
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            type: 'spring',
            stiffness: 70,
        },
    },
};

export const slideInRight = {
    initial: {
        x: '100%',
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            type: 'spring',
            stiffness: 70,
        },
    },
};

// Bounce animation for alerts or notifications
export const bounce = {
    initial: {
        y: -50,
    },
    animate: {
        y: [0, -20, 0, -10, 0],
        transition: {
            duration: 1.2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
        },
    },
};
