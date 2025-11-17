'use client';

import FadeIn from '@/components/ui/FadeIn';

interface KeyMetricsProps {
  totalRevenue?: number;
  totalActors?: number;
  topCategory?: string;
  growthRate?: number;
  energyRating?: string | null;
  buildingArea?: string | null;
}

export default function KeyMetrics({
  totalRevenue,
  totalActors,
  topCategory,
  growthRate,
  energyRating,
  buildingArea,
}: KeyMetricsProps) {
  // Dynamically build metrics based on available data
  const metrics = [];

  if (energyRating) {
    metrics.push({
      label: 'Energimerke',
      value: energyRating,
      suffix: '',
      icon: '⚡',
      description: 'Energieffektivitet',
    });
  }

  if (buildingArea) {
    metrics.push({
      label: 'Totalt areal',
      value: buildingArea,
      suffix: '',
      icon: '📐',
      description: 'Bruksareal',
    });
  }

  if (totalRevenue && totalRevenue > 0) {
    metrics.push({
      label: 'Total omsetning',
      value: Math.round(totalRevenue),
      suffix: 'M NOK',
      icon: '💰',
      description: 'Område totalt',
    });
  }

  if (totalActors && totalActors > 0) {
    metrics.push({
      label: 'Aktører',
      value: totalActors,
      suffix: '',
      icon: '🏢',
      description: 'Registrerte bedrifter',
    });
  }

  if (topCategory) {
    metrics.push({
      label: 'Dominerende',
      value: topCategory,
      suffix: '',
      icon: '🎯',
      description: 'Største kategori',
    });
  }

  if (growthRate !== undefined && growthRate !== null) {
    metrics.push({
      label: 'Vekst',
      value: growthRate > 0 ? `+${growthRate}` : growthRate,
      suffix: '%',
      icon: growthRate > 0 ? '📈' : '📉',
      description: 'År-over-år',
    });
  }

  // Only show up to 4 metrics
  const displayMetrics = metrics.slice(0, 4);

  if (displayMetrics.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-gray-200/30 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 py-8 md:py-12">
      <div className="mx-auto max-w-[1900px] px-4 md:px-[4vw]">
        <FadeIn direction="none">
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl font-bold text-lokka-primary md:text-2xl">Nøkkeltall</h2>
            <p className="mt-1 text-xs text-lokka-secondary md:text-sm">
              Viktigste data om eiendommen og området
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
          {displayMetrics.map((metric, index) => (
            <FadeIn key={index} delay={index * 100} direction="up">
              <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-medium md:rounded-2xl md:p-6 md:hover:-translate-y-1"
              >
              {/* Icon */}
              <div className="absolute right-2 top-2 text-2xl opacity-20 transition-opacity group-hover:opacity-30 md:right-4 md:top-4 md:text-4xl">
                {metric.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-lokka-secondary md:mb-2 md:text-xs">
                  {metric.label}
                </div>
                <div className="mb-1 flex items-baseline gap-1 md:gap-2">
                  <span className="text-2xl font-bold text-lokka-primary md:text-4xl">
                    {metric.value}
                  </span>
                  {metric.suffix && (
                    <span className="text-sm font-medium text-lokka-secondary md:text-lg">
                      {metric.suffix}
                    </span>
                  )}
                </div>
                <div className="text-xs text-lokka-accent md:text-sm">
                  {metric.description}
                </div>
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
