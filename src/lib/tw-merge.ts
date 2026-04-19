import { extendTailwindMerge, fromTheme, validators } from 'tailwind-merge';

/**
 * This will merge squircle-* and rounded-* classes together.
 * But it wont create a conflict between rounded-[dir]-* and squircle-* classes
 */
const twMerge = extendTailwindMerge<'squircle'>({
  extend: {
    classGroups: {
      squircle: [
        {
          squircle: [
            'none',
            'full',
            fromTheme('radius'),
            validators.isArbitraryLength,
          ],
        },
      ],
    },
    conflictingClassGroups: {
      squircle: ['rounded'],
      rounded: ['squircle'],
    },
  },
});

export default twMerge;
