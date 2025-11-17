/**
 * Hovedinterface for eiendomsdata
 */
export interface Eiendom {
  id: string;
  adresse: string;
  gnr?: number | null;
  bnr?: number | null;
  beskrivelse?: string;
  heroImage?: string;
  mapImage?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  plaaceData: PlaaceData;
  tilleggsinfo: Tilleggsinfo;
  metadata: Metadata;
}

export interface PlaaceData {
  rapportDato: string; // ISO date string
  screenshots: Screenshot[];
  nokkeldata: Nokkeldata;
  demografi?: DemografiData;
  marked?: MarkedData;
}

export interface Screenshot {
  filnavn: string;
  path: string;
  beskrivelse: string;
  kategori: 'oversikt' | 'demografi' | 'marked' | 'utvikling' | 'annet';
}

export interface Nokkeldata {
  prisniva?: string | null; // f.eks. "NOK 53000/m2"
  leieinntekter?: string | null;
  befolkning?: number | null;
  gjennomsnittsinntekt?: string | null;
  arbeidsledighet?: number | null;
  areal?: string | null;
  arealKontor?: string | null;
  arealServering?: string | null;
  byggeaar?: string | null;
  energimerke?: string | null;
}

export interface DemografiData {
  totalBefolkning?: number;
  befolkningsutvikling?: number; // prosent
  aldersfordeling?: {
    '0-17': number;
    '18-29': number;
    '30-49': number;
    '50-66': number;
    '67+': number;
  };
  husstandsstorrelse?: number;
}

export interface MarkedData {
  omsetning?: number;
  transaksjoner?: number;
  prisutviklingProsent?: number;
  kvadratmeterpris?: number;
}

export interface Tilleggsinfo {
  historikk?: string; // Markdown-formatert
  kontaktperson?: string;
  notater?: string[];
  lenker?: Array<{
    tekst: string;
    url: string;
  }>;
}

export interface Metadata {
  opprettet: string; // ISO date
  sistOppdatert: string; // ISO date
  status: 'utkast' | 'publisert' | 'arkivert';
  versjon: number;
}
