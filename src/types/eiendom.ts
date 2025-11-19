/**
 * Hovedinterface for eiendomsdata
 */
export interface Eiendom {
  id: string;
  adresse: string;
  gnr: number;
  bnr: number;
  beskrivelse?: string;
  heroImage?: string;
  mapImage?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  plaaceData: PlaaceData;
  plaaceAnalyses?: PlaaceAnalyse[]; // Multiple analyses support
  tilleggsinfo: Tilleggsinfo;
  metadata: Metadata;
}

/**
 * Individual Plaace analysis with specific parameters
 */
export interface PlaaceAnalyse {
  id: string; // e.g., "5min-walk", "1min-walk", "custom-1"
  tittel: string; // e.g., "5 minutters gange", "1 minutts gange"
  beskrivelse?: string; // Optional description of this analysis
  parametere: AnalyseParametere;
  rapportDato: string; // ISO date string
  screenshots: Screenshot[];
  nokkeldata: Nokkeldata;
  demografi?: DemografiData;
  marked?: MarkedData;
}

/**
 * Parameters used for this specific analysis
 */
export interface AnalyseParametere {
  gangeavstand?: string; // e.g., "5 minutter", "1 minutt"
  radius?: number; // meters
  transporttype?: 'gange' | 'sykkel' | 'bil' | 'kollektiv';
  notater?: string;
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
  prisniva?: string; // f.eks. "NOK 53000/m2"
  leieinntekter?: string;
  befolkning?: number;
  gjennomsnittsinntekt?: string;
  arbeidsledighet?: number;
  areal?: string;
  arealKontor?: string;
  arealServering?: string;
  byggeaar?: string;
  energimerke?: string;
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
