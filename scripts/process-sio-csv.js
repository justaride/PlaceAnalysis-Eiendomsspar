import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Property configuration
const properties = [
  {
    name: 'Brenneriveien 11',
    id: 'brenneriveien-11',
    adresse: 'Brenneriveien 11',
    gnr: null, // You can add these details later
    bnr: null,
    beskrivelse: 'Eiendom i Oslo eid av SiO',
    csvPath: '/Users/gabrielboen/Downloads/SIO Portefølje /Brenneriveien 11/Brenneriveien 11 - Sheet1 (1).csv',
    imagesFolder: '/Users/gabrielboen/Downloads/SIO Portefølje /Brenneriveien 11'
  },
  {
    name: 'Marselis gate 24',
    id: 'marselis-gate-24',
    adresse: 'Marselis gate 24',
    gnr: null,
    bnr: null,
    beskrivelse: 'Eiendom i Oslo eid av SiO',
    csvPath: '/Users/gabrielboen/Downloads/SIO Portefølje /Marselis gate 24/Marselis gate 24 - Sheet1 (1).csv',
    imagesFolder: '/Users/gabrielboen/Downloads/SIO Portefølje /Marselis gate 24'
  },
  {
    name: 'Trondheimsveien 25-29',
    id: 'trondheimsveien-25-29',
    adresse: 'Trondheimsveien 25-29',
    gnr: null,
    bnr: null,
    beskrivelse: 'Eiendom i Oslo eid av SiO',
    csvPath: '/Users/gabrielboen/Downloads/SIO Portefølje /Trondheimsveien 25-29 /Trondheimsveien 25-29 - Sheet1.csv',
    imagesFolder: '/Users/gabrielboen/Downloads/SIO Portefølje /Trondheimsveien 25-29 '
  }
];

function parseCSV(csvContent) {
  const actors = [];

  // Split by lines but handle quoted fields with newlines
  const rows = [];
  let currentRow = '';
  let inQuotes = false;

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

  if (currentRow.trim()) {
    rows.push(currentRow.trim());
  }

  // Process each row (skip header)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row.startsWith('#')) continue;

    // Split by comma but respect quotes
    const fields = [];
    let currentField = '';
    let inQuotes = false;

    for (let j = 0; j < row.length; j++) {
      const char = row[j];

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

    if (fields.length < 9) continue;

    const rank = fields[0];
    const navn = fields[1];
    const type = fields[2];
    const adresse = fields[3];
    const kommune = fields[4];

    // Parse revenue
    let omsetning = 0;
    let kjedeProsent = '-';
    const revenueRaw = fields[5];
    const revenueMatch = revenueRaw.match(/NOK (\d+) mill/);
    if (revenueMatch) {
      omsetning = parseInt(revenueMatch[1]);
    } else {
      const revenueMatchK = revenueRaw.match(/NOK (\d+)k/);
      if (revenueMatchK) {
        omsetning = parseFloat(revenueMatchK[1]) / 1000;
      }
    }
    const kjdeMatch = revenueRaw.match(/(\d+\.?\d*%)\s+av kjede/);
    if (kjdeMatch) {
      kjedeProsent = kjdeMatch[1];
    }

    // Parse YoY growth
    let yoyVekst = 0;
    const growthRaw = fields[6];
    if (growthRaw && growthRaw !== '-') {
      const growthMatch = growthRaw.match(/(-?\d+)%/);
      if (growthMatch) {
        yoyVekst = parseInt(growthMatch[1]);
      }
    }

    // Parse employees
    let ansatteLokalt = 0;
    let ansatteKjede = 0;
    let kjedeLokasjoner = 0;
    const employeesRaw = fields[7];
    const localMatch = employeesRaw.match(/^(\d+)/);
    if (localMatch) {
      ansatteLokalt = parseInt(localMatch[1]);
    }
    const chainMatch = employeesRaw.match(/(\d+)\s+i\s+(\d+)\s+lokasjoner/);
    if (chainMatch) {
      ansatteKjede = parseInt(chainMatch[1]);
      kjedeLokasjoner = parseInt(chainMatch[2]);
    }

    // Parse market share
    let markedsandel = 0;
    const marketRaw = fields[8];
    const marketMatch = marketRaw.match(/(\d+\.?\d*)%/);
    if (marketMatch) {
      markedsandel = parseFloat(marketMatch[1]);
    }

    actors.push({
      rank,
      navn,
      type,
      adresse,
      kommune,
      omsetning,
      kjedeProsent,
      yoyVekst,
      ansatteLokalt,
      ansatteKjede,
      kjedeLokasjoner,
      markedsandel
    });
  }

  return actors;
}

function createActorJSON(actors) {
  // Calculate category stats
  const categoryStats = {};
  actors.forEach(actor => {
    if (!categoryStats[actor.type]) {
      categoryStats[actor.type] = {
        count: 0,
        totalRevenue: 0
      };
    }
    categoryStats[actor.type].count++;
    categoryStats[actor.type].totalRevenue += actor.omsetning;
  });

  return {
    actors,
    categoryStats,
    metadata: {
      totalActors: actors.length,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
  };
}

function getScreenshotCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('nøkkel') || lower.includes('nokkel')) return 'oversikt';
  if (lower.includes('demografi')) return 'demografi';
  if (lower.includes('besøk') || lower.includes('bevegelse') || lower.includes('korthandel')) return 'marked';
  if (lower.includes('konkuranse')) return 'marked';
  return 'annet';
}

function createPropertyJSON(property, screenshots) {
  const now = new Date().toISOString();

  return {
    id: property.id,
    adresse: property.adresse,
    gnr: property.gnr,
    bnr: property.bnr,
    beskrivelse: property.beskrivelse,
    heroImage: `/images/${property.id}/hero.jpg`,
    mapImage: `/images/${property.id}/map.png`,
    coordinates: {
      lat: 59.9,
      lng: 10.75
    },
    plaaceData: {
      rapportDato: new Date().toISOString(),
      screenshots,
      nokkeldata: {
        prisniva: null,
        leieinntekter: null,
        befolkning: null,
        gjennomsnittsinntekt: null,
        arbeidsledighet: null
      }
    },
    tilleggsinfo: {
      historikk: `# ${property.adresse}\n\nHistorikk og informasjon om eiendommen kommer her.`,
      kontaktperson: 'SiO',
      notater: []
    },
    metadata: {
      opprettet: now,
      sistOppdatert: now,
      status: 'publisert',
      versjon: 1
    }
  };
}

// Main processing
console.log('Processing SiO property data...\n');

properties.forEach(property => {
  console.log(`Processing ${property.name}...`);

  // Read and parse CSV
  const csvContent = fs.readFileSync(property.csvPath, 'utf-8');
  const actors = parseCSV(csvContent);

  // Create actor JSON
  const actorJSON = createActorJSON(actors);
  const actorOutputPath = path.join(__dirname, '..', 'src', 'data', 'aktorer', `${property.id}.json`);
  fs.writeFileSync(actorOutputPath, JSON.stringify(actorJSON, null, 2));
  console.log(`  ✓ Created actor data: ${actors.length} actors`);

  // Find Plaace screenshots
  const files = fs.readdirSync(property.imagesFolder);
  const screenshots = files
    .filter(f => f.endsWith('.jpg') && !f.includes('SiO') && !f.endsWith('.png'))
    .filter(f => {
      const lower = f.toLowerCase();
      return lower.includes('besøk') || lower.includes('bevegelse') ||
             lower.includes('demografi') || lower.includes('konkuranse') ||
             lower.includes('korthandel') || lower.includes('nøkkel');
    })
    .map(f => {
      const name = f.replace(property.name + ' ', '').replace('.jpg', '');
      return {
        filnavn: name,
        path: `/images/plaace/${property.id}/${f.toLowerCase().replace(/\s+/g, '-')}`,
        beskrivelse: name,
        kategori: getScreenshotCategory(f)
      };
    });

  // Create property JSON
  const propertyJSON = createPropertyJSON(property, screenshots);
  const propertyOutputPath = path.join(__dirname, '..', 'src', 'data', 'eiendommer', `${property.id}.json`);
  fs.writeFileSync(propertyOutputPath, JSON.stringify(propertyJSON, null, 2));
  console.log(`  ✓ Created property data with ${screenshots.length} screenshots`);

  console.log('');
});

console.log('✅ All properties processed successfully!');
console.log('\nNext steps:');
console.log('1. Copy images to the project folders');
console.log('2. Run: npm run validate:data');
console.log('3. Update property details (gnr, bnr, coordinates, etc.)');
