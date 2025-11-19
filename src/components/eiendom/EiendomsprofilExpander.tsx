'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from '@/components/ui/Card';

interface EiendomsprofilExpanderProps {
  historikk: string;
  adresse: string;
}

export default function EiendomsprofilExpander({
  historikk,
  adresse,
}: EiendomsprofilExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-lokka-primary bg-lokka-light px-6 py-4 text-left transition-all hover:bg-lokka-primary/10"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <svg
            className={`h-6 w-6 text-lokka-primary transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-lg font-bold text-lokka-primary">
            Utvidet Eiendomsprofil
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {isExpanded ? 'Lukk' : 'Les mer'}
        </span>
      </button>

      {isExpanded && (
        <Card className="mt-4 overflow-hidden border-2 border-lokka-primary/20">
          <CardContent className="prose prose-lg max-w-none p-8 lg:p-12">
            <div className="mb-6 rounded-lg bg-lokka-light px-6 py-4">
              <h2 className="mb-0 text-2xl font-bold text-lokka-primary">
                {adresse.toUpperCase()} – EIENDOMSPROFIL
              </h2>
            </div>

            {/* Development Notice */}
            <div className="mb-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📝</div>
                <div>
                  <h4 className="mb-2 text-sm font-bold text-blue-900">
                    Under utvikling
                  </h4>
                  <p className="text-sm leading-relaxed text-blue-800">
                    Eiendomsprofilen er under utvikling for alle eiendommer. Vi ønsker gjerne underlag og detaljer fra eieren for å berike denne profilen med mer informasjon og historikk.
                  </p>
                </div>
              </div>
            </div>

            <ReactMarkdown
              components={{
                h3: ({ ...props }) => (
                  <h3
                    className="mb-4 mt-8 text-xl font-bold text-lokka-primary"
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="mb-6 mt-10 text-2xl font-bold text-lokka-primary"
                    {...props}
                  />
                ),
                table: ({ ...props }) => (
                  <div className="my-6 overflow-x-auto">
                    <table className="min-w-full border-collapse" {...props} />
                  </div>
                ),
                th: ({ ...props }) => (
                  <th
                    className="border border-gray-300 bg-lokka-light px-4 py-2 text-left font-semibold text-lokka-primary"
                    {...props}
                  />
                ),
                td: ({ ...props }) => (
                  <td className="border border-gray-300 px-4 py-2" {...props} />
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-4 leading-relaxed text-gray-700" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ ...props }) => (
                  <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />
                ),
                li: ({ ...props }) => (
                  <li className="leading-relaxed text-gray-700" {...props} />
                ),
                strong: ({ ...props }) => (
                  <strong className="font-semibold text-gray-900" {...props} />
                ),
              }}
            >
              {historikk}
            </ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
