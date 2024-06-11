export const backgroundVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { delay: 0.6, duration: 0.6 } },
};

export const imageVariants = {
	hidden: { x: '100%' },
	visible: { x: 0, transition: { delay: 1, duration: 1 } },
};

export const textVariants = {
	hidden: { opacity: 0 },
	visible: (i: number) => ({
		opacity: 1,
		transition: {
			delay: 1 + i * 0.05,
			duration: 0.05,
		},
	}),
};

export const bgVariants = {
	hidden: { x: '-100%' },
	visible: {
		x: 0,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			duration: 0.2,
		},
	},
	exit: {
		x: '-100%',
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			duration: 0.2,
		},
	},
};
export const modalVariants = {
	hidden: { x: '-100%' },
	visible: {
		x: 0,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			duration: 1,
		},
	},
	exit: {
		x: '-100%',
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			duration: 1,
		},
	},
};

export const navLinkVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.2,
			duration: 1,
		},
	}),
	exit: { opacity: 0, y: -20 },
};
