## 🏛️ IYTE Yazilim Society Website

A modern and dynamic website built for IYTE Yazilim Society, aiming to showcase events, blogs, and activities.

#### 📌 Features
- 📰 Blogs section
- 📅 Event management & registration
- 📷 Media gallery
- 📩 Contact & social links

#### 🛠️ Tech Stack
- Frontend: Next.js, React, TailwindCSS
- Backend: Supabase
- Database: PostgreSQL / Supabase
- Deployment: Vercel

#### 🚀 Getting Started

**Prerequisites**
- Node.js (v18+)
- pnpm or npm/yarn

#### Installation
```bash
# Clone the repo
git clone https://github.com/IYTE-Yazilim-Toplulugu/yazilim-web-site.git
cd yazilim-web-site

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 📂 Project Structure
```plaintext
📦 project-root
├── app/                  
│   ├── admin/            # Admin Dashboard (manage events, posts, users, etc.)
│   ├── server/           # Server routes (login, register, API, auth logic)
│   └── ...page-folders   # Application pages (e.g., /home, /events, /contact)
│
├── components/           # Reusable UI components (buttons, modals, navbars, forms)
├── hooks/                # Custom React hooks (auth, state logic)
├── i18n/                 # Internationalization setup & translations
├── lib/                  # Core libraries, API clients, database helpers
├── messages/             # i18n language defaults
├── public/               # Static assets (images, icons, fonts, favicons)
├── types/                # TypeScript type definitions & interfaces
├── utils/                # Data fetching (supabase)
│
├── package.json          # Dependencies & scripts
└── ...config-files       # Project-wide configs (Nextjs, Tailwind, Typescript, env, etc.)
```

#### 🤝 Contribution Guidelines

We welcome contributions from all team members! Please follow these steps:
1. Fork the repository

2. Create a feature branch
```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes with clear message
```bash
git commit -m "feat(header): new navbar component"
```

4.	Push your branch and open a Pull Request (PR)
5.	Get at least one review before merging

#### Coding Rules
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g., feat:, fix:, docs:)
- Run npm run lint before pushing
- Keep components small & reusable
- Document new features in the README

#### 📌 Roadmap
- Event registration system
- Admin dashboard for managing posts/events
