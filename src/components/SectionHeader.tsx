interface SectionHeaderProps {
  label?: string;
  headline: string;
  subheadline?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  headline,
  subheadline,
  centered = true,
  light = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 lg:mb-16 ${className}`}>
      {label && (
        <span
          className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 ${
            light
              ? 'bg-white/10 text-white'
              : 'bg-primary/10 text-primary'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? 'text-white' : 'text-dark-800'
        }`}
      >
        {headline}
      </h2>
      {subheadline && (
        <p
          className={`text-lg sm:text-xl max-w-3xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/80' : 'text-dark-500'}`}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}
