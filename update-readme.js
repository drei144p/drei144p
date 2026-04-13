const fs = require('fs');

const BIRTHDAY     = new Date('2004-07-01');  
const CODING_START = new Date('2020-06-01');  

const now = new Date();

function daysBetween(a, b) {
  return Math.floor((b - a) / (1000 * 60 * 60 * 24));
}

const age = now.getFullYear() - BIRTHDAY.getFullYear() -
  (now < new Date(now.getFullYear(), BIRTHDAY.getMonth(), BIRTHDAY.getDate()) ? 1 : 0);

const nextBday = new Date(now.getFullYear(), BIRTHDAY.getMonth(), BIRTHDAY.getDate());
if (nextBday <= now) nextBday.setFullYear(now.getFullYear() + 1);
const daysUntilBday = daysBetween(now, nextBday);

const daysCoding = daysBetween(CODING_START, now).toLocaleString();

let readme = fs.readFileSync('README.md', 'utf8');

readme = readme.replace(
  /<!-- AGE_START -->[\s\S]*?<!-- AGE_END -->/,
  `<!-- AGE_START -->\n\`\`\`\nage          →  ${age} yrs old\n\`\`\`\n<!-- AGE_END -->`
);

readme = readme.replace(
  /<!-- BDAY_START -->[\s\S]*?<!-- BDAY_END -->/,
  `<!-- BDAY_START -->\n\`\`\`\nbirthday in  →  ${daysUntilBday} days  ·  july 1\n\`\`\`\n<!-- BDAY_END -->`
);

readme = readme.replace(
  /<!-- DAYS_CODING_START -->[\s\S]*?<!-- DAYS_CODING_END -->/,
  `<!-- DAYS_CODING_START -->\n\`\`\`\ndays coding  →  ${daysCoding} days  //  started modding gta:sa\n\`\`\`\n<!-- DAYS_CODING_END -->`
);

fs.writeFileSync('README.md', readme);

console.log(`✓ README updated`);
console.log(`  age: ${age} yrs`);
console.log(`  birthday in: ${daysUntilBday} days`);
console.log(`  days coding: ${daysCoding}`);