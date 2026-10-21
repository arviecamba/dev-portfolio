// Saves my GitHub contribution calendar to src/github-contributions.json.
// Uses the GitHub CLI's login, so no token ends up in the site. Run: npm run github:refresh
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const login = 'arviecamba'
const since = 2023 // I started at Ayahtek in March 2023, so that year counts from March 1

const gql = query => JSON.parse(execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`], { encoding: 'utf8' })).data.user

const last = gql(`{ user(login: "${login}") { contributionsCollection {
  restrictedContributionsCount
  contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } }
} } }`).contributionsCollection

const levels = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }
const years = []
for (let y = since; y <= new Date().getFullYear(); y++) {
  const c = gql(`{ user(login: "${login}") { contributionsCollection(from: "${y}-${y === since ? '03' : '01'}-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") {
    contributionCalendar { totalContributions } } } }`).contributionsCollection
  years.push({ year: y, total: c.contributionCalendar.totalContributions })
}

writeFileSync(new URL('../src/github-contributions.json', import.meta.url), JSON.stringify({
  login,
  fetchedAt: new Date().toISOString().slice(0, 10),
  total: last.contributionCalendar.totalContributions,
  private: last.restrictedContributionsCount,
  years,
  // One entry per week; each day is [date, count, level 0-4].
  weeks: last.contributionCalendar.weeks.map(w => w.contributionDays.map(d => [d.date, d.contributionCount, levels[d.contributionLevel]])),
}) + '\n')
console.log(`Saved ${last.contributionCalendar.totalContributions} contributions for the last year.`)
