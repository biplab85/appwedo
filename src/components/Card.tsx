import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  className?: string;
  iconClassName?: string;
}

export default function Card({
  icon: Icon,
  title,
  description,
  children,
  variant = 'default',
  className = '',
  iconClassName = '',
}: CardProps) {
  const variants = {
    default: 'bg-white',
    bordered: 'bg-white border border-dark-200',
    elevated: 'bg-white shadow-xl shadow-dark-900/5',
    gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10',
  };

  return (
    <div
      className={`rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 ${variants[variant]} ${className}`}
    >
      {Icon && (
        <div
          className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 ${iconClassName}`}
        >
          <Icon className="w-7 h-7 text-primary" />
        </div>
      )}
      <h3 className="text-xl font-bold text-dark-800 mb-3">{title}</h3>
      {description && (
        <p className="text-dark-500 leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
}
