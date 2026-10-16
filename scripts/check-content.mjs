import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "bun run build" first.');
  process.exit(1);
}

// Scope check strictly to marketing pages: index.html and work/index.html
const homePath = path.join(distDir, 'index.html');
const workPath = path.join(distDir, 'work', 'index.html');

if (!fs.existsSync(homePath) || !fs.existsSync(workPath)) {
  console.error('Error: Required marketing pages index.html or work/index.html missing in dist/');
  process.exit(1);
}

const homeHtml = fs.readFileSync(homePath, 'utf8');
const workHtml = fs.readFileSync(workPath, 'utf8');
const marketingHtml = `${homeHtml}\n${workHtml}`;

const errors = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error(`❌ FAIL: ${message}`);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('Testing marketing pages: / (index.html) and /work (work/index.html)...');

// 1. Per-page canonical tags
assert(
  homeHtml.includes('rel="canonical" href="https://glickages.pages.dev/"'),
  'Homepage canonical URL is https://glickages.pages.dev/'
);

assert(
  workHtml.includes('rel="canonical" href="https://glickages.pages.dev/work"') ||
    workHtml.includes('rel="canonical" href="https://glickages.pages.dev/work/"'),
  'Work page canonical URL is https://glickages.pages.dev/work'
);

// 2. Exactly six cards on /work
const cardMatches = workHtml.match(/class="[^"]*project-card[^"]*"/g) || [];
assert(
  cardMatches.length === 6,
  `Exactly six project cards rendered on /work (found ${cardMatches.length})`
);

// 3. Exact URL/name pairs on /work
const expectedProjects = [
  {
    name: 'Love Fest Foundation',
    url: 'https://lff-website.lovefestfoundation.workers.dev/',
  },
  {
    name: 'ICC Studios',
    url: 'https://icc-delta.vercel.app/',
  },
  {
    name: 'Warrior Fitness',
    url: 'https://warrior-fitness-xi.vercel.app/',
  },
  {
    name: 'Risk & Audit Insights',
    url: 'https://riskaai.com/',
  },
  {
    name: 'The Emergence Porch',
    url: 'https://theemergenceporch.org/',
  },
  {
    name: 'Opeyemi Ogundeji',
    url: 'https://opeyemi-five.vercel.app/',
  },
];

for (const proj of expectedProjects) {
  const escapedName = proj.name.replace(/&/g, '&amp;');
  const nameFound = workHtml.includes(proj.name) || workHtml.includes(escapedName);
  const urlFound = workHtml.includes(proj.url);
  assert(
    nameFound && urlFound,
    `Exact project name & URL pair on /work: ${proj.name} -> ${proj.url}`
  );
}

// 4. No legacy unselected projects in marketing pages
const legacyProjects = [
  'FendAm Academy',
  'Cyberdicts',
  'Which AI Tool',
  'iSalesBook',
  'Cataleex',
  'NFT Marketplace',
  'Moonex',
  'Ogundeji Ogunyemi Portfolio',
];

for (const legacy of legacyProjects) {
  assert(!marketingHtml.includes(legacy), `No legacy project in marketing pages: "${legacy}"`);
}

// 5. No placeholder testimonials or unsubstantiated stats in marketing pages
const forbiddenPlaceholders = [
  'Client Name',
  'Startup Name',
  '10+ Projects',
  '10+ projects',
  '8+ Clients',
  '8+ clients',
];

for (const placeholder of forbiddenPlaceholders) {
  assert(!marketingHtml.includes(placeholder), `No placeholder/unsubstantiated stat in marketing: "${placeholder}"`);
}

// 6. No referral / friends / family / job search language in marketing text
const forbiddenPhrases = [
  'friends and family',
  'friends & family',
  'referral',
  'acquisition strategy',
  'job search',
  'job-search',
  'pre-agency',
];

for (const phrase of forbiddenPhrases) {
  assert(
    !marketingHtml.toLowerCase().includes(phrase),
    `No internal/referral language in marketing text: "${phrase}"`
  );
}

// 7. Live contact routes
assert(
  marketingHtml.includes('https://wa.me/2347059055888'),
  'WhatsApp enquiry route present in marketing pages (https://wa.me/2347059055888)'
);

assert(
  marketingHtml.includes('tel:+2347059055888'),
  'Phone link fixed to tel:+2347059055888'
);

assert(
  !marketingHtml.includes('mailto:hello@glickages.com'),
  'Unconfirmed email is hidden from public UI contact links'
);

// 8. Service offering alignment
assert(
  marketingHtml.includes('Custom websites.') && marketingHtml.includes('Built around your business.'),
  'Main headline "Custom websites. Built around your business." present'
);

assert(
  !marketingHtml.includes('Full-Stack Apps &amp; SaaS Products') &&
    !marketingHtml.includes('Cloud &amp; VPS Management') &&
    !marketingHtml.includes('AI Integrations'),
  'Broad SaaS/AI/cloud service catalogue removed from main offer'
);

if (errors.length > 0) {
  console.error(`\nCheck failed with ${errors.length} error(s).`);
  process.exit(1);
} else {
  console.log('\nAll marketing content regression assertions passed successfully!');
}
