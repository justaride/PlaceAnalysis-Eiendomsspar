import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NaturalStateCard from '@/components/ui/NaturalStateCard';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lokka-primary to-lokka-secondary py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Place Analysis Løkka
            </h1>
            <p className="mb-8 text-xl text-white/90">
              Omfattende placeanalyser og eiendomsinformasjon for Løkka-området.
              Utforsk demografi, markedsdata og utviklingstrender for eiendommene
              i vår gårdeierforening.
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

      {/* Development Notice */}
      <Container className="py-8">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚧</div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-blue-900">
                Verktøy under utvikling
              </h3>
              <p className="mb-3 text-sm text-blue-800">
                Dette er et analyseverktøy under kontinuerlig utvikling og vil være i prosess og berikelse gjennom hele prosjektet. Vi ønsker dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.
              </p>
              <Link
                href="/om-prosjektet#kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                Send tilbakemelding →
              </Link>
            </div>
          </div>
        </div>
      </Container>

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

        {/* Natural State Card */}
        <div className="mt-12">
          <NaturalStateCard />
        </div>
      </Container>
    </>
  );
}
