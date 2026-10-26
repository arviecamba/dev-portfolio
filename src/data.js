export const profile = {
  name: 'Arvie Jay Camba',
  fullName: 'Arvie Jay Mariano Camba',
  title: 'Software Developer | Full-Stack Web Developer',
  company: 'Ayahtek Inc.',
  since: 'March 2023',
  email: 'ajmcamba@gmail.com',
  location: 'Caloocan City, Philippines',
  github: 'https://github.com/arviecamba',
  linkedin: 'https://www.linkedin.com/in/arvie-jay-camba-5310751b9/',
}

// The About me text, shared by both views.
export const intro = [
  "I'm Arvie Jay Mariano Camba, a Software Developer building and maintaining production web applications.",
  'I work across the stack—from designing MySQL databases and developing RESTful APIs to integrating frontend interfaces and delivering features that support real-world business operations. My experience spans government systems, HR and payroll, healthcare, and booking platforms.',
]

// Resume and CV PDFs in public/: copies of the originals without the phone number.
export const downloads = [
  { label: 'Resume', file: 'ArvieJayCamba_Resume_SoftwareDeveloper.pdf' },
  { label: 'CV', file: 'ArvieJayCamba_CV_SoftwareDeveloper.pdf' },
]

export const experience = [
  'Design MySQL schemas and migrations and build Laravel REST APIs for new systems.',
  'Integrate APIs with Vue, Nuxt, React, and Alpine.js frontends.',
  'Connect government systems to the Quezon City E-Services website.',
  'Maintain live systems, and support UAT and staging releases with the tech lead.',
  'Facilitate Scrum meetings when needed and assist with OJT interviews.',
  'Lead OJT trainees on local government platforms, under supervisor guidance.',
]

export const timeline = [
  { date: '2025', title: 'Promoted to mid-level Software Developer' },
  { date: 'Mar 2023', title: 'Joined Ayahtek Inc. as Software Developer', note: 'Startup team on an Agile SDLC.' },
]

// Skills from the resume, plus libraries named in the project stacks below.
// strongest: the ones I work in most. Project counts are computed from the project list.
export const strongest = ['Laravel', 'Vue.js', 'Nuxt.js']
export const skills = [
  { label: 'Frontend', key: 'frontend', items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'React.js', 'Alpine.js', 'Pinia', 'Tailwind CSS', 'jQuery', 'Bootstrap'] },
  { label: 'Backend', key: 'backend', items: ['PHP', 'Laravel', 'REST APIs', 'Laravel Sanctum', 'JWT authentication', 'Supabase',
    'Third-party API integration', 'Email and SMS notifications', 'PDF generation', 'Payment integration'] },
  { label: 'Databases', key: 'databases', items: ['MySQL', 'Schema design', 'Migrations'] },
  { label: 'Engineering practices', key: 'practices', items: ['Role-based access control', 'Query optimization',
    'Duplicate record prevention', 'Data migration', 'Production debugging'] },
  { label: 'Development tools', key: 'tools', items: ['Git', 'AI-assisted development'] },
  { label: 'Other', key: 'other', items: ['Kotlin (mobile features)', 'Agile SDLC', 'Scrum', 'UAT support'] },
]

// shots: file names under public/projects/<slug>/. A name ending in "-mobile" is a phone screenshot.
// Case-study fields need, implementation, challenges and outcome stay empty until there is verified
// text for them; empty sections are hidden on the project page. challenges is a list of strings.
export const projects = [
  {
    slug: 'online-clearance', name: 'Online Clearance Application System (OPCAS)', category: 'Government',
    domain: 'Department of Justice, Quezon City', role: 'Main developer', featured: true,
    stack: ['Laravel', 'jQuery', 'MySQL'],
    summary: 'Prosecutor clearance applications filed online, from case record checking to certificate issuance. It began as my BSIT thesis and is now in government use.',
    built: ['Designed the full database and built the backend.', 'Online registration, clearance applications, case record checking, certificate issuance, and application tracking.', 'Integrated the system with the Quezon City E-Services website.'],
    need: 'Applicants had to apply for a prosecutor clearance in person, with long lines while staff checked case records by hand.',
    implementation: 'A Laravel backend with JWT authentication serves separate applicant and admin frontends. Residents reach the system through Quezon City E-Services: only existing E-Services users can open it, and E-Services passes the applicant\'s personal information to the system. Each application is matched against the case records automatically and then reviewed by staff, and the clearance is issued as a generated PDF.',
    challenges: [
      'Taking it from a thesis project to a public government system, which meant tightening its security.',
      'Handling applicants who already have an existing record when they apply again.',
    ],
    outcome: 'In use by the Quezon City Prosecutor\'s Office since July 2026. Residents apply online instead of in person and can track their application without calling.',
    dir: 'doj-clearance', shots: ['applicant-login.png', 'admin-login.png'],
  },
  {
    slug: 'case-monitoring', name: 'Case Monitoring System', category: 'Government',
    domain: 'Office of the City Prosecutor', role: 'Main developer', featured: true,
    stack: ['Laravel', 'Alpine.js', 'MySQL'],
    summary: 'Case records, reports, case aging tracking, and motion for reconsideration workflows for prosecutors, division chiefs, and secretaries.',
    built: ['Designed the full database and built the backend and UI.', 'Integrated the system with the Quezon City E-Services website.'],
    need: '', implementation: 'A Laravel backend with JWT authentication. Case aging is computed automatically from the date a case is filed to the date it is resolved.', challenges: [], outcome: '',
    dir: 'case-monitoring', shots: ['dashboard.png', 'login.png', 'forgot-password.png'],
  },
  {
    slug: 'lgu360', name: 'LGU360', category: 'Government',
    domain: 'Local government services', role: 'Main developer, OJT lead', featured: true,
    stack: ['Laravel', 'Vue.js', 'Pinia', 'TypeScript', 'Tailwind CSS'],
    summary: 'A platform for digitizing barangay and local government services, with a Laravel API and Vue admin frontend.',
    built: ['API creation, database design, and frontend integration.', 'Led OJT trainees under supervisor guidance: gave each trainee a module, let them choose backend or frontend work, and reviewed their code.'],
    need: '', implementation: 'A Laravel API with Sanctum authentication and Vue frontends. Services are configurable rather than built for one city, so the platform can be set up for another city that applies.', challenges: [], outcome: 'In development.',
    dir: 'lgu360', shots: ['admin-login.png'],
  },
  {
    slug: 'safe-barangay', name: 'Safe Barangay', category: 'Government',
    domain: 'Barangay case reporting', role: 'Main developer, OJT lead', featured: true,
    stack: ['Laravel', 'Vue.js', 'Pinia', 'TypeScript', 'Tailwind CSS'],
    summary: 'Case and crime reporting for barangays, with separate portals for administrators, barangay staff, and residents.',
    built: ['API creation, database design, and frontend integration.', 'Three Vue frontends on one Laravel API.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'safe-barangay', shots: ['admin-dashboard.png', 'admin-cases.png', 'admin-users.png', 'barangay-login.png', 'admin-login.png', 'user-login.png'],
  },
  {
    slug: 'pet-booking', name: 'Pet Hotel Booking Platform', category: 'Booking',
    domain: 'Pet services', role: 'Main developer', featured: true,
    stack: ['Laravel', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
    summary: 'Pet hotel reservations with branch management, an admin dashboard, and a mobile-first customer app.',
    built: ['Designed the database.', 'Built booking and scheduling, branch management, and customer applications.'],
    need: '',
    implementation: 'A Laravel API with Sanctum authentication, a Nuxt customer app and a separate admin app. Nuxt was chosen for the customer side for server-side rendering, which gives faster first loads and better search visibility, and for its file-based routing. Customers book online, and admins manage each booking\'s status and can cancel a double booking. Each branch has its own staff and offers the same services.',
    challenges: [], outcome: '',
    dir: 'pet-booking', shots: ['dashboard.png', 'reservations.png', 'admin-login.png', 'customer-login-mobile.png', 'customer-signup-mobile.png', 'admin-forgot.png'],
  },
  {
    slug: 'talk-encourage', name: 'Mental Health Appointment Platform', category: 'Healthcare',
    domain: 'Mental health', role: 'Main developer', featured: true,
    stack: ['Laravel', 'Alpine.js', 'MySQL'],
    summary: 'Booking appointments with doctors and mental health professionals, with a public website and an admin side.',
    built: ['Built the database, API, and frontend integration.'],
    need: '',
    implementation: 'A Laravel backend with JWT authentication. Clients book a doctor or mental health professional based on the professional\'s availability, and each booking is confirmed before the session. Professionals apply through the platform and pass a screening before they are approved. Records are protected by authentication and backend middleware.',
    challenges: [], outcome: '',
    dir: 'talk-encourage', shots: ['home.png', 'services.png', 'about.png', 'home-mobile.png'],
  },
  {
    slug: 'hrms', name: 'Human Resources Management System', category: 'HR and payroll',
    domain: 'HR and payroll', role: 'Main developer', featured: true,
    stack: ['Laravel', 'React.js', 'Tailwind CSS', 'MySQL'],
    summary: 'Attendance, payroll, and leave management for companies.',
    built: ['Built the attendance clock-in and clock-out module, payroll processing, and leave request workflows.', "Contributed to the team's security review."],
    need: '',
    implementation: 'A Laravel API with Sanctum authentication and separate admin and employee frontends. For payroll, the admin picks a payroll period and the system computes the pay, following Philippine rules for government deductions, overtime, night differential and holidays. Loan interest follows each company\'s own settings. Each company chooses which clock-in and clock-out options its employees can use, and the mobile app signs in with an MPIN.',
    challenges: [
      'Role-based access control: Laravel middleware that lets each user reach only their own records and the APIs meant for their role.',
    ],
    outcome: '',
    dir: 'hrms', shots: ['admin-dashboard.jpg', 'admin-employees.jpg', 'admin-attendance.jpg', 'admin-payroll.jpg', 'employee-home.jpg', 'employee-attendance.jpg', 'employee-leave.jpg', 'employee-loans.jpg', 'employee-reimbursement.jpg', 'home.png', 'home-mobile.png', 'employee-mpin-mobile.jpg'],
  },
  {
    slug: 'police-pension', name: 'Police Retirement and Pension Systems', category: 'Government',
    domain: 'Police retirement and pensions', role: 'Maintenance',
    stack: ['Laravel'],
    summary: 'Two live systems: PARPS for retirement claims, and PPOAS for pensioner proof-of-life and quarterly accounting.',
    built: ['Fixed bugs and added new features on both systems.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'parps', extraDirs: [['ppoas', ['admin-login.png']]], shots: ['admin-login.png', 'user-login.png'],
  },
  {
    slug: 'edppas', name: 'Police Duty Attendance (EDPPAS)', category: 'Government',
    domain: 'Police attendance', role: 'Feature development',
    stack: ['Laravel', 'Vue.js', 'Kotlin'],
    summary: 'Duty attendance for police personnel, with a mobile app and a web admin.',
    built: ['Built feature requests for the mobile app and web side.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'edppas', shots: ['dashboard.png', 'admin-login.png'],
  },
  {
    slug: 'clp', name: 'Centralized Login (CLP)', category: 'Internal tools',
    domain: 'Authentication', role: 'Contributor',
    stack: ['Laravel', 'Vue.js', 'Pinia', 'Tailwind CSS'],
    summary: 'One login across client sites, with IP-based access control, rolled out to other projects.',
    built: ['Worked on the centralized login and its IP-based access control.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'clp', shots: ['user-login.png'],
  },
  {
    slug: 'lbcoop', name: 'Loan Application Platform', category: 'Lending',
    domain: 'Cooperative lending', role: 'Contributor',
    stack: ['Laravel', 'Alpine.js', 'Bootstrap'],
    summary: 'Loan applications and member records for a cooperative, with loan computation and a PWA.',
    built: ['Worked on loan computation and the PWA.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'lbcoop', shots: ['admin-login.png'],
  },
  {
    slug: 'labsong', name: 'Siklab Custom Songs', category: 'Commerce',
    domain: 'Custom song ordering', role: 'Contributor',
    stack: ['Laravel', 'Vue.js', 'Pinia', 'Tailwind CSS'],
    summary: 'Customers order personalized songs from artists, with artist applications and an admin side.',
    built: ['Worked on the ordering platform.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'labsong', shots: ['user-home.png', 'admin-login.png'],
  },
  {
    slug: 'kiddo', name: 'Kido Pass', category: 'Education',
    domain: 'Kids activities and classes', role: 'Contributor',
    stack: ['Nuxt.js', 'Supabase'],
    summary: 'Parents discover and book activities and classes for their kids.',
    built: ['Worked on the course scheduling platform.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'kiddo', shots: ['home.png', 'admin.png', 'home-mobile.png'],
  },
  {
    slug: 'smms', name: 'Influencer Engagement Platform', category: 'Marketing',
    domain: 'Influencer engagement', role: 'Contributor',
    stack: ['Laravel', 'React.js', 'TypeScript'],
    summary: 'An influencer engagement platform for merchants and guests.',
    built: ['Worked on the platform.'],
    need: '', implementation: '', challenges: [], outcome: '',
    dir: 'smms', shots: ['dashboard.png', 'merchants.png', 'live.png', 'brand.png', 'login.png'],
  },
]

const label = file => file.replace(/\.(png|jpg)$/, '').replace(/-mobile$/, '').replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())

// Image list for a project: [{ src, caption, mobile }]
export function images(p) {
  const list = [[p.dir, p.shots], ...(p.extraDirs ?? [])]
  return list.flatMap(([dir, files]) => (dir ? files : []).map(f => ({
    src: `/projects/${dir}/${f}`,
    caption: (p.extraDirs ? dir.toUpperCase() + ' · ' : '') + label(f),
    mobile: /-mobile\.(png|jpg)$/.test(f),
  })))
}

// Order for featured work in both views: government systems first, then the other main projects.
export const featuredOrder = ['online-clearance', 'case-monitoring', 'police-pension', 'edppas', 'pet-booking', 'talk-encourage', 'lgu360']
const rank = p => featuredOrder.indexOf(p.slug) + 1 || 99
export const orderedProjects = [...projects].sort((a, b) => rank(a) - rank(b))

export const categories = ['All', ...new Set(projects.map(p => p.category))]
