'use client';

import { useState } from 'react';
import TabbedImageViewer from './TabbedImageViewer';
import { PlaaceAnalyse, PlaaceData } from '@/types/eiendom';
import FadeIn from '@/components/ui/FadeIn';

interface AnalyseSelectorProps {
  // Legacy single analysis support
  plaaceData?: PlaaceData;
  // New multiple analyses support
  plaaceAnalyses?: PlaaceAnalyse[];
}

export default function AnalyseSelector({ plaaceData, plaaceAnalyses }: AnalyseSelectorProps) {
  const [selectedAnalyseId, setSelectedAnalyseId] = useState<string | null>(null);

  // If new format with multiple analyses
  if (plaaceAnalyses && plaaceAnalyses.length > 0) {
    // Initialize selected analysis
    const currentAnalyse = selectedAnalyseId
      ? plaaceAnalyses.find(a => a.id === selectedAnalyseId) || plaaceAnalyses[0]
      : plaaceAnalyses[0];

    // Safety check
    if (!currentAnalyse) {
      return null;
    }

    return (
      <div className="mb-12 md:mb-20">
        {plaaceAnalyses.length > 1 && (
          <FadeIn direction="up">
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-lokka-primary md:text-xl">
                Velg analyse
              </h3>
              <div className="flex flex-wrap gap-3">
                {plaaceAnalyses.map((analyse) => (
                  <button
                    key={analyse.id}
                    onClick={() => setSelectedAnalyseId(analyse.id)}
                    className={`rounded-xl px-6 py-3 text-sm font-medium transition-all md:text-base ${
                      currentAnalyse.id === analyse.id
                        ? 'bg-lokka-primary text-white shadow-medium'
                        : 'bg-gray-100 text-lokka-secondary hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{analyse.tittel}</div>
                      {analyse.parametere.gangeavstand && (
                        <div className="text-xs opacity-90">
                          {analyse.parametere.gangeavstand}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {currentAnalyse.beskrivelse && (
                <p className="mt-4 text-sm text-gray-600">
                  {currentAnalyse.beskrivelse}
                </p>
              )}
            </div>
          </FadeIn>
        )}

        {/* Display selected analysis */}
        {currentAnalyse.screenshots.length > 0 && (
          <TabbedImageViewer
            screenshots={currentAnalyse.screenshots}
            title={plaaceAnalyses.length === 1
              ? `Plaace Stedsanalyse - ${currentAnalyse.tittel}`
              : 'Plaace Stedsanalyse'
            }
          />
        )}
      </div>
    );
  }

  // Legacy format - single analysis via plaaceData
  if (plaaceData && plaaceData.screenshots.length > 0) {
    return (
      <div className="mb-12 md:mb-20">
        <div className="mb-4 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Merk:</strong> Denne analysen er basert på 5 minutters gange.
          </p>
        </div>
        <TabbedImageViewer
          screenshots={plaaceData.screenshots}
          title="Plaace Stedsanalyse - 5 minutters gange"
        />
      </div>
    );
  }

  return null;
}
