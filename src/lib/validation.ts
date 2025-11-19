import { z } from 'zod';

/**
 * Zod schemas for runtime-validering av eiendomsdata
 */

export const ScreenshotSchema = z.object({
  filnavn: z.string().min(1),
  path: z.string().refine(
    (path) => path.startsWith('/images/') || path.startsWith('/pdf/'),
    { message: 'Path must start with /images/ or /pdf/' }
  ),
  beskrivelse: z.string(),
  kategori: z.enum(['oversikt', 'demografi', 'marked', 'utvikling', 'annet']),
});

export const NokkelDataSchema = z.object({
  prisniva: z.string().optional(),
  leieinntekter: z.string().optional(),
  befolkning: z.number().positive().optional(),
  gjennomsnittsinntekt: z.string().optional(),
  arbeidsledighet: z.number().min(0).max(100).optional(),
});

export const AnalyseParametereSchema = z.object({
  gangeavstand: z.string().optional(),
  radius: z.number().optional(),
  transporttype: z.enum(['gange', 'sykkel', 'bil', 'kollektiv']).optional(),
  notater: z.string().optional(),
});

export const PlaaceAnalyseSchema = z.object({
  id: z.string().min(1),
  tittel: z.string().min(1),
  beskrivelse: z.string().optional(),
  parametere: AnalyseParametereSchema,
  rapportDato: z.string().datetime(),
  screenshots: z.array(ScreenshotSchema),
  nokkeldata: NokkelDataSchema,
  demografi: z
    .object({
      totalBefolkning: z.number().optional(),
      befolkningsutvikling: z.number().optional(),
      aldersfordeling: z
        .object({
          '0-17': z.number(),
          '18-29': z.number(),
          '30-49': z.number(),
          '50-66': z.number(),
          '67+': z.number(),
        })
        .optional(),
      husstandsstorrelse: z.number().optional(),
    })
    .optional(),
  marked: z
    .object({
      omsetning: z.number().optional(),
      transaksjoner: z.number().optional(),
      prisutviklingProsent: z.number().optional(),
      kvadratmeterpris: z.number().optional(),
    })
    .optional(),
});

export const PlaaceDataSchema = z.object({
  rapportDato: z.string().datetime(),
  screenshots: z.array(ScreenshotSchema).min(1),
  nokkeldata: NokkelDataSchema,
  demografi: z
    .object({
      totalBefolkning: z.number().optional(),
      befolkningsutvikling: z.number().optional(),
      aldersfordeling: z
        .object({
          '0-17': z.number(),
          '18-29': z.number(),
          '30-49': z.number(),
          '50-66': z.number(),
          '67+': z.number(),
        })
        .optional(),
      husstandsstorrelse: z.number().optional(),
    })
    .optional(),
  marked: z
    .object({
      omsetning: z.number().optional(),
      transaksjoner: z.number().optional(),
      prisutviklingProsent: z.number().optional(),
      kvadratmeterpris: z.number().optional(),
    })
    .optional(),
});

export const EiendomSchema = z.object({
  id: z.string().min(1),
  adresse: z.string().min(1),
  gnr: z.number().positive(),
  bnr: z.number().positive(),
  beskrivelse: z.string().optional(),
  heroImage: z.string().optional(),
  mapImage: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  plaaceData: PlaaceDataSchema,
  plaaceAnalyses: z.array(PlaaceAnalyseSchema).optional(),
  tilleggsinfo: z.object({
    historikk: z.string().optional(),
    kontaktperson: z.string().optional(),
    notater: z.array(z.string()).optional(),
    lenker: z
      .array(
        z.object({
          tekst: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
  }),
  metadata: z.object({
    opprettet: z.string().datetime(),
    sistOppdatert: z.string().datetime(),
    status: z.enum(['utkast', 'publisert', 'arkivert']),
    versjon: z.number().positive(),
  }),
});

// Type inference fra Zod schema
export type ValidertEiendom = z.infer<typeof EiendomSchema>;

/**
 * Valider eiendomsdata og returner typet resultat
 */
export function validerEiendomsdata(data: unknown): ValidertEiendom {
  return EiendomSchema.parse(data);
}

/**
 * Trygg validering som returnerer error i stedet for å kaste exception
 */
export function validerEiendomsdataSafe(data: unknown) {
  return EiendomSchema.safeParse(data);
}
