'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';

interface Aktor {
  rank: string;
  navn: string;
  type: string;
  adresse: string;
  kommune: string;
  omsetning: number | null;
  kjedeProsent: string | null;
  yoyVekst: number | null;
  ansatteLokalt: number | null;
  ansatteKjede: number | null;
  kjedeLokasjoner: number | null;
  markedsandel: number | null;
}

interface CategoryStats {
  count: number;
  totalRevenue: number;
  avgRevenue: number;
}

interface AktorListeProps {
  actors: Aktor[];
  categoryStats: Record<string, CategoryStats>;
  metadata: {
    totalActors: number;
    totalCategories: number;
    generatedAt: string;
  };
}

export default function AktorListe({ actors, categoryStats, metadata }: AktorListeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllActors, setShowAllActors] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'rank' | 'omsetning' | 'yoyVekst'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const itemsPerPage = 15;

  // Filter actors by category
  const filteredActors = selectedCategory === 'all'
    ? actors
    : actors.filter(a => a.type === selectedCategory);

  // Sort actors
  const sortedActors = [...filteredActors].sort((a, b) => {
    let aVal: number, bVal: number;

    if (sortField === 'rank') {
      aVal = parseInt(a.rank.replace('#', ''));
      bVal = parseInt(b.rank.replace('#', ''));
    } else if (sortField === 'omsetning') {
      aVal = a.omsetning || 0;
      bVal = b.omsetning || 0;
    } else { // yoyVekst
      aVal = a.yoyVekst || 0;
      bVal = b.yoyVekst || 0;
    }

    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedActors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedActors = sortedActors.slice(startIndex, endIndex);

  // Show only top 10 by default, or paginated if expanded
  const displayedActors = showAllActors ? paginatedActors : sortedActors.slice(0, 10);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSort = (field: 'rank' | 'omsetning' | 'yoyVekst') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Top 3 categories by count
  const topCategories = Object.entries(categoryStats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3);

  // Calculate total revenue
  const totalRevenue = actors.reduce((sum, a) => sum + (a.omsetning || 0), 0);

  return (
    <section className="border-t border-gray-200/30 bg-white py-16">
      <div className="mx-auto max-w-[1900px] px-[4vw]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
                🏆 Top {Math.min(10, filteredActors.length)} Aktører
              </h2>
              <p className="text-sm text-lokka-secondary">
                Viser de største bedriftene av totalt {metadata.totalActors} aktører i området
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-4">
          <FadeIn delay={0} direction="up">
            <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-lokka-light p-6 transition-all duration-300 hover:shadow-medium">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-lokka-secondary">
                Totalt antall
              </div>
              <div className="text-4xl font-bold text-lokka-primary">{metadata.totalActors}</div>
              <div className="mt-2 text-sm text-lokka-accent">registrerte aktører</div>
            </div>
          </FadeIn>

          <FadeIn delay={100} direction="up">
            <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-lokka-light p-6 transition-all duration-300 hover:shadow-medium">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-lokka-secondary">
                Total omsetning
              </div>
              <div className="text-4xl font-bold text-lokka-primary">{Math.round(totalRevenue)}</div>
              <div className="mt-2 text-sm text-lokka-accent">NOK millioner</div>
            </div>
          </FadeIn>

          <FadeIn delay={200} direction="up">
            <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-lokka-light p-6 transition-all duration-300 hover:shadow-medium">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-lokka-secondary">
                Kategorier
              </div>
              <div className="text-4xl font-bold text-lokka-primary">{metadata.totalCategories}</div>
              <div className="mt-2 text-sm text-lokka-accent">ulike bransjer</div>
            </div>
          </FadeIn>

          <FadeIn delay={300} direction="up">
            <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-lokka-light p-6 transition-all duration-300 hover:shadow-medium">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-lokka-secondary">
                Største aktør
              </div>
              <div className="text-lg font-bold text-lokka-primary">{actors[0]?.navn}</div>
              <div className="mt-2 text-sm text-lokka-accent">NOK {actors[0]?.omsetning} mill.</div>
            </div>
          </FadeIn>
        </div>

        {/* Top 3 Categories */}
        <div className="mb-12">
          <FadeIn direction="none">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Største kategorier</h3>
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {topCategories.map(([category, stats], index) => (
              <FadeIn key={category} delay={index * 100} direction="up">
                <div className="rounded-xl border border-gray-200/50 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-2xl font-bold text-lokka-primary">#{index + 1}</span>
                    <span className="rounded-full bg-lokka-light px-3 py-1 text-sm font-medium text-lokka-secondary">
                      {stats.count} bedrifter
                    </span>
                  </div>
                  <div className="mb-2 text-base font-semibold text-lokka-primary">{category}</div>
                  <div className="text-sm text-lokka-accent">
                    Snitt omsetning: NOK {Math.round(stats.avgRevenue)} mill.
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Sticky Filter & Sort Bar */}
        <div className="sticky top-0 z-10 mb-6 rounded-xl border border-gray-200/50 bg-white/95 p-4 shadow-soft backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category Filter */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <label htmlFor="category-filter" className="text-xs font-semibold uppercase tracking-wider text-lokka-secondary md:text-sm">
                Kategori:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-lokka-primary transition-colors hover:border-lokka-primary focus:border-lokka-primary focus:outline-none focus:ring-2 focus:ring-lokka-primary/20"
              >
                <option value="all">Alle ({metadata.totalActors})</option>
                {Object.entries(categoryStats)
                  .sort((a, b) => b[1].count - a[1].count)
                  .map(([category, stats]) => (
                    <option key={category} value={category}>
                      {category} ({stats.count})
                    </option>
                  ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-lokka-secondary">Sorter:</span>
              <button
                onClick={() => handleSort('rank')}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  sortField === 'rank'
                    ? 'bg-lokka-primary text-white'
                    : 'bg-gray-100 text-lokka-secondary hover:bg-gray-200'
                }`}
              >
                Rang {sortField === 'rank' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('omsetning')}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  sortField === 'omsetning'
                    ? 'bg-lokka-primary text-white'
                    : 'bg-gray-100 text-lokka-secondary hover:bg-gray-200'
                }`}
              >
                Omsetning {sortField === 'omsetning' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('yoyVekst')}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  sortField === 'yoyVekst'
                    ? 'bg-lokka-primary text-white'
                    : 'bg-gray-100 text-lokka-secondary hover:bg-gray-200'
                }`}
              >
                Vekst {sortField === 'yoyVekst' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>

          {/* Active Filter Info */}
          {selectedCategory !== 'all' && (
            <div className="mt-3 text-xs text-lokka-secondary">
              📊 Viser {filteredActors.length} aktører i kategorien "{selectedCategory}"
            </div>
          )}
        </div>

        {/* Actor Table - Always visible now with show/hide controlled by button */}
        <div id="aktor-liste">
          <div className="overflow-x-auto rounded-2xl border border-gray-200/50 bg-white shadow-soft">
            <table className="w-full">
              <thead className="border-b border-gray-200/50 bg-lokka-light">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Rang
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Navn
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Adresse
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Omsetning
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Vekst
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Ansatte
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-lokka-secondary">
                    Markedsandel
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/30">
                {displayedActors.map((aktor, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-lokka-light/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-lokka-primary">
                      {aktor.rank}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-lokka-primary">
                      {aktor.navn}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xs text-lokka-secondary">
                      {aktor.type}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-lokka-secondary">
                      {aktor.adresse}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="font-medium text-lokka-primary">
                        {aktor.omsetning ? `${aktor.omsetning} mill.` : '-'}
                      </div>
                      {aktor.kjedeProsent && (
                        <div className="text-xs text-lokka-accent">
                          {aktor.kjedeProsent} av kjede
                        </div>
                      )}
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-right text-sm font-semibold ${
                        aktor.yoyVekst === null
                          ? 'text-lokka-secondary'
                          : aktor.yoyVekst < 0
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {aktor.yoyVekst !== null ? `${aktor.yoyVekst > 0 ? '+' : ''}${aktor.yoyVekst}%` : '-'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="font-medium text-lokka-primary">
                        {aktor.ansatteLokalt !== null ? aktor.ansatteLokalt : '-'}
                      </div>
                      {aktor.ansatteKjede && aktor.kjedeLokasjoner && (
                        <div className="text-xs text-lokka-accent">
                          {aktor.ansatteKjede} i {aktor.kjedeLokasjoner} lok.
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-lokka-primary">
                      {aktor.markedsandel !== null ? `${aktor.markedsandel.toFixed(2)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show All / Show Less Button & Pagination */}
          {filteredActors.length > 10 && (
            <div className="mt-8 space-y-4">
              {/* Toggle Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowAllActors(!showAllActors);
                    setCurrentPage(1);
                  }}
                  className="group flex items-center gap-3 rounded-xl border-2 border-lokka-primary bg-white px-8 py-4 text-base font-semibold text-lokka-primary shadow-soft transition-all hover:bg-lokka-primary hover:text-white hover:shadow-medium"
                >
                  {showAllActors ? (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Vis kun top 10
                    </>
                  ) : (
                    <>
                      Vis alle {filteredActors.length} aktører
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Pagination Controls */}
              {showAllActors && totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                  <div className="text-sm text-lokka-secondary">
                    Viser {startIndex + 1}-{Math.min(endIndex, sortedActors.length)} av {sortedActors.length} aktører
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-lokka-primary transition-all hover:bg-lokka-light disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ← Forrige
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum: number;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${
                              currentPage === pageNum
                                ? 'bg-lokka-primary text-white shadow-soft'
                                : 'bg-gray-100 text-lokka-secondary hover:bg-gray-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-lokka-primary transition-all hover:bg-lokka-light disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Neste →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Distribution (always visible) */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-bold text-lokka-primary">Fordeling per kategori</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(categoryStats)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([category, stats]) => {
                const percentage = (stats.count / metadata.totalActors) * 100;
                return (
                  <div
                    key={category}
                    className="group cursor-pointer rounded-lg border border-gray-200/50 bg-white p-4 transition-all hover:border-lokka-primary hover:shadow-medium"
                    onClick={() => handleCategoryChange(category)}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-lokka-primary">{category}</span>
                      <span className="text-xs text-lokka-accent">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="mb-2 h-2 overflow-hidden rounded-full bg-lokka-light">
                      <div
                        className="h-full rounded-full bg-lokka-primary transition-all group-hover:bg-lokka-secondary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-lokka-secondary">
                      <span>{stats.count} bedrifter</span>
                      <span>Ø {Math.round(stats.avgRevenue)} mill.</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
