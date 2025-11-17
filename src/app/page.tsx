import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lokka-primary to-lokka-secondary py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Eiendomsspar Eiendomsportefølje
            </h1>
            <p className="mb-8 text-xl text-white/90">
              Omfattende placeanalyser og eiendomsinformasjon for Eiendomsspars eiendomsportefølje.
              Utforsk demografi, markedsdata og utviklingstrender for eiendommer
              i Oslo.
            </p>
            <div className="flex gap-4">
              <Link href="/eiendommer">
                <Button
                  size="lg"
                  className="bg-white text-lokka-primary hover:bg-white/90"
                >
                  Se Eiendommer
                </Button>
              </Link>
              <Link href="/om-prosjektet">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-lokka-primary"
                >
                  Om Prosjektet
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-lokka-primary">
          Hva du finner her
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Placeanalyser</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk
                for hver eiendom i området.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Markedsinnsikt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Prisnivåer, leieinntekter, transaksjonsdata og utviklingstrender
                for å forstå det lokale eiendomsmarkedet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demografisk Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Befolkningssammensetning, inntektsnivå, aldersfordeling og andre
                nøkkeltall for området.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
