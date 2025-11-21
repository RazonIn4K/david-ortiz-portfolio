import clsx from 'clsx';
import { proofMetrics, type ProofMetric } from '@/data/content';

interface ProofMetricBadgeProps {
  metric: ProofMetric;
}

function ProofMetricBadge({ metric }: ProofMetricBadgeProps) {
  const colorClasses = {
    teal: {
      border: 'border-teal-500/30',
      bg: 'bg-teal-500/10',
      text: 'text-teal-400'
    },
    cyan: {
      border: 'border-cyan-400/30',
      bg: 'bg-cyan-400/10',
      text: 'text-cyan-400'
    }
  };

  const colors = colorClasses[metric.color];

  return (
    <div
      className={clsx(
        'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
        'hover:scale-105 cursor-default',
        colors.border,
        colors.bg,
        colors.text
      )}
    >
      {metric.emoji} {metric.text}
    </div>
  );
}

export function ProofMetrics() {
  return (
    <div className="flex flex-wrap gap-3">
      {proofMetrics.map((metric, index) => (
        <ProofMetricBadge key={index} metric={metric} />
      ))}
    </div>
  );
}
