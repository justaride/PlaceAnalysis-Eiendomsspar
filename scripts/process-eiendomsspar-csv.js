import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const properties = [
  {
    name: 'Nedre Foss Gård',
    id: 'nedre-foss-gard',
    csvPath: '/Users/gabrielboen/Downloads/Eiendomsspar - Portefølje/Nedre Foss Gård/Nedre Foss Gård - Sheet1 (1).csv',
  },
  {
    name: 'Thorvald Meyers gate 2',
    id: 'thorvald-meyers-gate-2',
    csvPath: '/Users/gabrielboen/Downloads/Eiendomsspar - Portefølje/Thorvald Meyers gate 2/Thorvald Meyers gate 2 - Sheet1.csv',
  },
];

function parseCSV(csvContent) {
  const actors = [];
  const rows = [];
  let currentRow = '';
  let inQuotes = false;

  // First pass: split into rows respecting quoted sections
  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    }

    if (char === '\n' && !inQuotes) {
      if (currentRow.trim()) {
        rows.push(currentRow.trim());
      }
      currentRow = '';
    } else {
      currentRow += char;
    }
  }

  // Add the last row if it exists
  if (currentRow.trim()) {
    rows.push(currentRow.trim());
  }

  // Parse fields from a row
  function parseRow(row) {
    const fields = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    fields.push(currentField.trim());
    return fields;
  }

  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const fields = parseRow(rows[i]);

    if (fields.length >= 9) {
      // Extract values from fields
      const navn = fields[1]; // Navn
      const omsetningField = fields[5]; // Omsetning: "NOK 88 mill.\n\n0.5% av kjede"
      const yoyVekstField = fields[6]; // YoY-vekst: "-4%\n\n(%)"
      const ansatteField = fields[7]; // Ansatte: "0\n\n28 i 227 lokasjoner"
      const markedsandelField = fields[8]; // Markedsandel: "7.53%\n\ni området"

      // Parse omsetning - extract number from "NOK 88 mill."
      const omsetningMatch = omsetningField.match(/NOK\s+(\d+)/);
      const omsetning = omsetningMatch ? parseFloat(omsetningMatch[1]) : null;

      // Parse YoY-vekst - extract percentage
      const yoyVekstMatch = yoyVekstField.match(/([-\d.]+)%/);
      const yoyVekst = yoyVekstMatch ? parseFloat(yoyVekstMatch[1]) : null;

      // Parse ansatte - extract first number
      const ansatteMatch = ansatteField.match(/^(\d+)/);
      const ansatte = ansatteMatch ? parseInt(ansatteMatch[1]) : null;

      // Parse markedsandel - extract percentage
      const markedsandelMatch = markedsandelField.match(/([\d.]+)%/);
      const markedsandel = markedsandelMatch
        ? parseFloat(markedsandelMatch[1])
        : null;

      const actor = {
        navn,
        omsetning,
        yoyVekst,
        ansatte,
        markedsandel,
      };

      actors.push(actor);
    }
  }

  return actors;
}

async function processProperty(property) {
  try {
    console.log(`\nProcessing ${property.name}...`);

    // Read CSV file
    const csvContent = await fs.readFile(property.csvPath, 'utf-8');

    // Parse CSV
    const actors = parseCSV(csvContent);

    console.log(`  Found ${actors.length} actors`);

    // Create property data
    const propertyData = {
      id: property.id,
      adresse: property.name,
      beskrivelse: `Placeanalyse for ${property.name}`,
      heroImage: `/images/plaace/${property.id}/hero.jpg`,
      mapImage: `/images/plaace/${property.id}/map.png`,
      aktorer: actors,
      plaaceData: {
        rapportDato: new Date().toISOString(),
        screenshots: [
          {
            filnavn: 'nokkeldata',
            path: `/images/plaace/${property.id}/nokkeldata.${property.id === 'nedre-foss-gard' ? 'png' : 'jpg'}`,
            beskrivelse: 'Nøkkeldata og statistikk',
            kategori: 'oversikt',
          },
          {
            filnavn: 'korthandel',
            path: `/images/plaace/${property.id}/korthandel.jpg`,
            beskrivelse: 'Korthandel og transaksjoner',
            kategori: 'marked',
          },
          {
            filnavn: 'konkurransebildet',
            path: `/images/plaace/${property.id}/konkurransebildet.jpg`,
            beskrivelse: 'Konkurransebildet',
            kategori: 'marked',
          },
          {
            filnavn: 'demografi',
            path: `/images/plaace/${property.id}/demografi.jpg`,
            beskrivelse: 'Demografisk data',
            kategori: 'demografi',
          },
          {
            filnavn: 'bevegelse',
            path: `/images/plaace/${property.id}/bevegelse.jpg`,
            beskrivelse: 'Bevegelsesdata',
            kategori: 'utvikling',
          },
          {
            filnavn: 'besokende',
            path: `/images/plaace/${property.id}/besokende.jpg`,
            beskrivelse: 'Besøkende',
            kategori: 'utvikling',
          },
        ],
        nokkeldata: {
          prisniva: null,
          leieinntekter: null,
          befolkning: null,
          gjennomsnittsinntekt: null,
          arbeidsledighet: null,
        },
      },
      tilleggsinfo: {
        historikk: `Eiendom i ${property.name}`,
        kontaktperson: 'Eiendomsspar',
        notater: [],
        lenker: [],
      },
      metadata: {
        opprettet: new Date().toISOString(),
        sistOppdatert: new Date().toISOString(),
        status: 'publisert',
        versjon: 1,
      },
    };

    // Write JSON file
    const outputPath = path.join(
      __dirname,
      '..',
      'src',
      'data',
      'eiendommer',
      `${property.id}.json`
    );

    await fs.writeFile(outputPath, JSON.stringify(propertyData, null, 2));

    console.log(`  ✓ Created ${outputPath}`);
    console.log(
      `  Sample actor: ${actors[0]?.navn} - ${actors[0]?.omsetning}M NOK`
    );
  } catch (error) {
    console.error(`Error processing ${property.name}:`, error);
  }
}

async function main() {
  console.log('Processing Eiendomsspar CSV files...\n');

  for (const property of properties) {
    await processProperty(property);
  }

  console.log('\n✓ All properties processed!');
}

main();
