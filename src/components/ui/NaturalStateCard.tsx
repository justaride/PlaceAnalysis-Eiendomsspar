import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

interface NaturalStateCardProps {
  variant?: 'default' | 'compact';
}

export default function NaturalStateCard({ variant = 'default' }: NaturalStateCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href="https://naturalstate.no"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105"
      >
        <div className="rounded-lg border-2 border-lokka-primary/20 bg-gradient-to-br from-lokka-primary/5 to-lokka-secondary/5 p-4 text-center shadow-sm hover:shadow-md">
          <div className="mb-2 text-2xl font-bold text-lokka-primary">
            Natural State
          </div>
          <p className="text-xs text-gray-600">
            Utviklet av Natural State
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Card className="border-2 border-lokka-primary/20 bg-gradient-to-br from-lokka-primary/5 to-lokka-secondary/5">
      <CardHeader>
        <CardTitle className="text-lokka-primary">Natural State</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-600">
          Denne plattformen er utviklet av Natural State - et selskap som
          spesialiserer seg på digitale løsninger og dataanalyse for
          eiendomsforvaltning og samfunnsutvikling.
        </p>
        <Link
          href="https://naturalstate.no"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-lokka-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lokka-secondary"
        >
          Besøk naturalstate.no
          <span className="text-lg">→</span>
        </Link>
      </CardContent>
    </Card>
  );
}
