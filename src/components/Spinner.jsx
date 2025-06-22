/**
 * Spinner Component
 * A simple Tailwind CSS spinner for loading states.
 *
 * Usage:
 * <Spinner />                  // default size
 * <Spinner size="w-12 h-12" /> // custom size via props
 */
export default function Spinner({ size = 'w-8 h-8' }) {
    return (
      <div className={`inline-block ${size} border-4 border-t-transparent border-blue-600 rounded-full animate-spin`} />
    );
  }
  