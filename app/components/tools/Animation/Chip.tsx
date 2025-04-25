import { motion } from 'framer-motion';

interface ChipProps {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * An interactive chip component with animation support.
 * When selected, displays a gradient background with a smooth animation.
 * Supports both light and dark themes.
 * 
 * Animation Logic:
 * 1. Each chip has a gradient background (motion.span) with the same layoutId="pill-tab"
 * 2. When you click a chip, it becomes "selected" and the previous one becomes "unselected"
 * 3. Because they share the same layoutId, Framer Motion treats them as the same element
 * 4. This makes the gradient background smoothly animate from the old position to the new position
 * 5. A spring transition is used to give it a natural, bouncy feel
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.text - The text to display inside the chip
 * @param {boolean} [props.selected=false] - Whether the chip is in a selected state
 * @param {function} [props.onClick] - Optional click handler for the chip
 * 
 * @example
 * ```tsx
 * <Chip 
 *   text="Filter" 
 *   selected={isSelected} 
 *   onClick={() => setSelected(!isSelected)} 
 * />
 * ```
 */
const Chip = ({ text, selected = false, onClick }: ChipProps) => {
  // Tailwind classes explanation:
  // relative         - Required for absolute positioning of animation overlay
  // rounded-md      - Rounded corners for pill shape
  // px-2.5         - Horizontal padding
  // py-0.5         - Vertical padding
  // text-sm        - Small text size
  // transition-colors - Smooth color transitions
  // Selected state:
  //   text-light-text-primary - Primary text color in light mode
  //   dark:text-dark-text-primary - Primary text color in dark mode
  // Default/Hover state:
  //   text-light-text-secondary - Secondary text color in light mode
  //   hover:bg-light-paper - Background color on hover in light mode
  //   hover:text-light-text-primary - Text color on hover in light mode
  //   dark:text-dark-text-secondary - Secondary text color in dark mode
  //   dark:hover:bg-dark-paper - Background color on hover in dark mode
  //   dark:hover:text-dark-text-primary - Text color on hover in dark mode
  return (
    <button
      onClick={onClick}
      className={`${
        selected
          ? 'text-dark-text-primary'
          : 'text-light-text-secondary hover:bg-light-paper hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-paper dark:hover:text-dark-text-primary'
      } relative rounded-md px-2.5 py-0.5 text-sm transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        // Animation background with shared layout transition:
        // - layoutId="pill-tab" makes all selected chips share the same animated element
        // - When selection changes between chips, Framer Motion sees them as the same element
        // - This creates the smooth animation effect of the gradient "moving" between positions
        // 
        // Styling:
        // absolute inset-0 - Fill entire button
        // z-0 - Position behind text
        // rounded-md - Match button corners
        // bg-gradient-to-r - Right-directed gradient
        // from-/to- classes - Gradient colors for light/dark modes
        <motion.span
          layoutId="pill-tab"
          transition={{ type: 'spring', duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary"
        ></motion.span>
      )}
    </button>
  );
};

export default Chip;
