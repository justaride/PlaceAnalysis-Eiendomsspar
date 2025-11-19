import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import NaturalStateCard from '@/components/ui/NaturalStateCard';

export const metadata = {
  title: 'Om Prosjektet',
  description: 'Informasjon om Place Analysis Løkka prosjektet',
};

export default function OmProsjektetPage() {
  return (
    <Container>
      <h1 className="mb-8 text-4xl font-bold text-lokka-primary">
        Om Prosjektet
      </h1>

      <div className="grid gap-8">
        {/* Purpose - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Formål</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Place Analysis er et analyseverktøy og system hvor vi samler Plaace-underlaget til en felles plattform for å gjøre dypere analyser, inkorporere andre viktige elementer av data og innsikter som vi tilegner oss gjennom prosjektet. Sammen vil dette gi mest mulig effekt for å styre Løkka-skipet videre på en rett og fin kjøl.
            </p>
            <p className="text-gray-600">
              Vi bruker Plaace, KI-verktøy, koding og en bred rekke verktøy, samt en engasjert gruppe med mennesker som bidrar til å oppnå mye med smarte og innovative tilnærminger.
            </p>
          </CardContent>
        </Card>

        {/* Two column grid for Data Sources and Contact */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Datakilder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Data kommer fra flere kilder for å gi et mest mulig helhetlig bilde. Vi benytter Plaace-rapporter som primærkilde, og beriker dette med andre datakilder, innsikt og bidrag fra medlemmene i foreningen, samt andre teknologiske prosesser. Dette skaper en plattform som er grunnlaget for videre analyser etterhvert som vi tillegger flere analyser fra Plaace med forskjellige utsnitt og perspektiver.
              </p>
            </CardContent>
          </Card>

          <div id="kontakt">
            <Card>
              <CardHeader>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                For spørsmål, tilbakemeldinger eller forslag, kontakt Natural State:
              </p>
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <p className="font-medium text-lokka-primary">Gabriel B Freeman</p>
                <a
                  href="mailto:gabriel@naturalstate.no"
                  className="text-sm text-lokka-secondary hover:text-lokka-primary"
                >
                  gabriel@naturalstate.no
                </a>
              </div>

              {/* Google Forms Embed */}
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Send tilbakemelding</h4>
                <p className="mb-3 text-xs text-gray-600">
                  Vi setter stor pris på dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeo32aBhqz7MhKLaKT5MY3mv5zazND2Fb8hfM3t92SeFIRS-w/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-lokka-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lokka-secondary"
                >
                  Åpne tilbakemeldingsskjema
                  <span className="text-lg">→</span>
                </a>
              </div>
            </CardContent>
            </Card>
          </div>
        </div>

        {/* Natural State Card - Full Width */}
        <NaturalStateCard />
      </div>
    </Container>
  );
}
