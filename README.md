# Rishaan Kumar — Personal Portfolio & Private CMS

> **Maximalist European Neoclassical Architecture × Contemporary Editorial Design × Digital Art Direction**

A bespoke, production-quality personal portfolio website and authenticated Content Management System (CMS) engineered for **Rishaan Kumar**, an Information Technology undergraduate at Netaji Subhash Engineering College (MAKAUT) specializing in Artificial Intelligence, Machine Learning, Computer Vision, Embedded Systems, and Full-Stack Development.

---

## 🏛️ Visual Identity & Atmosphere

The design translates the spatial and aesthetic grandeur of **European Neoclassical Architecture** (French palaces, Italian Renaissance estates, aristocratic libraries, and historic galleries) into a modern digital experience:
- **Colour Palette**: Warm Ivory (`#F5F0E6`), Parchment (`#EAE0CD`), Antique Cream (`#DED0B8`), Deep Burgundy (`#481D27`), Oxblood (`#37161D`), Dark Walnut (`#30231E`), Antique Gold (`#B08D57`), Forest Green (`#24392D`), and Dark Espresso (`#29211D`).
- **Typography**: Display serif headings powered by **Cormorant Garamond** and **Playfair Display**, paired with clean, accessible **Inter** and **DM Sans** for technical metadata and body typography.
- **Architectural Ornamentation**: Classical arches (`ArchFrame`), corner pediments (`CornerOrnament`), gold flourish dividers (`OrnamentalDivider`), and folio card structures.

---

## 🚀 Key Features

### 1. Public Portfolio
- **The Grand Entrance (Hero)**: Architectural arch-framed portrait, established date insignia, identity badges, and call-to-actions.
- **Beyond the Code (About)**: Editorial essay format, academic profile (B.Tech IT, MAKAUT, 7.7 CGPA), and interactive exploration tags.
- **The Library of Skills (Skills)**: Categorized folios across Programming Languages, AI/ML (CNNs, Transformers, YOLOv8, YAMNet, SHAP, OCR), Web Development, Databases/Tools, and Embedded Systems (ESP32, FreeRTOS, Raspberry Pi Zero W). No arbitrary percentages.
- **Selected Works (Gallery)**: Alternating exhibition cards with gold dividers, technical tags, and deep-dive detail links.
- **Individual Project Detail Pages (`/projects/[slug]`)**: Exhaustive case studies covering context, problem statements, architectures, technical contributions, challenges, and live/repository links for:
  - `ATLAS`: AI-Based Exoplanet Detection (NASA Space Apps Challenge 2025)
  - `TRINETRA`: Multimodal AI Intrusion Detection (ESP32 + FreeRTOS + RPi Zero W + YOLOv8 + YAMNet)
  - `SWASTHYA`: AI-Assisted Medical Insurance Platform (Document Intelligence & OCR)
  - `PRICEHUB`: Multi-Platform Price Comparison Platform
- **Research & Intellectual Pursuits**: Scholarly library layout detailing interests in Computer Vision, Time-Series Analysis, Deep Learning, XAI, Generative AI, and Edge Computing.
- **The Journey So Far (Timeline)**: European chronicle timeline charting leadership (Byte Brigade Co-Founder), open source (Social Winter of Code S6 Administrator, Hacktoberfest), and competitive hackathons.
- **The Salon (Contact)**: Verified contact channels and fully functional epistle contact form with anti-spam honeypot and database storage.

### 2. Private Admin Dashboard (`/admin`)
- **Authentication**: Supabase Auth with server-side session verification and route protection via Next.js Middleware.
- **Dashboard Overview**: Stat cards (total published/draft projects, skills, messages, timeline events) and quick navigation.
- **Project Manager**: Complete CRUD operations, slug generation, rich markdown description, technology stacks, image uploads, and draft/published state toggling.
- **Profile Manager**: Edit titles, biographies, social links, location, portrait, and resume PDF.
- **Skills Catalog**: Dynamic skill category and skill item creation, reordering, and visibility toggling.
- **Journey Chronicler**: Manage education, leadership roles, hackathons, and achievements.
- **Research Curator**: Maintain active research interests and future academic publication entries.
- **Epistle Inbox**: Review visitor inquiries, search by sender or subject, mark as read/unread, and archive messages.
- **Media Library**: Manage images and documents stored in Supabase Storage.
- **Site Settings**: Customize SEO metadata, footer statement, social toggles, and navigation labels.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, React 19, Server Components)
- **Styling**: Tailwind CSS v4 with custom CSS Custom Property Design Tokens
- **Animations**: Motion / Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form + Zod
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) & Supabase Storage
- **Notifications**: Sonner

---

## 📦 Project Directory Structure

```
rishaan-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Main public portfolio homepage
│   │   ├── layout.tsx                   # Root HTML layout with Google Fonts
│   │   ├── globals.css                  # Neoclassical tokens & utility classes
│   │   ├── projects/[slug]/page.tsx     # Dynamic individual project case studies
│   │   ├── api/contact/route.ts         # Secure contact form API endpoint
│   │   └── admin/                       # Private administrative suite
│   │       ├── page.tsx                 # Dashboard metrics & overview
│   │       ├── layout.tsx               # Admin shell & authorization guard
│   │       ├── login/page.tsx           # Administrator login interface
│   │       ├── projects/page.tsx        # Project catalog listing
│   │       ├── projects/new/page.tsx    # Project creation interface
│   │       ├── projects/[id]/page.tsx   # Project editor interface
│   │       ├── profile/page.tsx         # Bio & personal information editor
│   │       ├── skills/page.tsx          # Skills & taxonomy manager
│   │       ├── journey/page.tsx         # Chronicle & milestone manager
│   │       ├── research/page.tsx        # Intellectual pursuits manager
│   │       ├── messages/page.tsx        # Visitor epistle inbox
│   │       ├── media/page.tsx           # Supabase asset repository
│   │       └── settings/page.tsx        # Global site configuration
│   ├── components/
│   │   ├── public/                      # Public portfolio components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Research.tsx
│   │   │   ├── Journey.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── decorative/              # Neoclassical ornaments
│   │   │       ├── ArchFrame.tsx
│   │   │       ├── CornerOrnament.tsx
│   │   │       └── OrnamentalDivider.tsx
│   │   └── admin/                       # Administrative components
│   │       ├── AdminHeader.tsx
│   │       ├── AdminSidebar.tsx
│   │       └── AdminShell.tsx
│   ├── lib/
│   │   ├── fallback-data.ts             # Default portfolio seed data
│   │   ├── utils.ts                     # Slugs, formatting, and DOM helpers
│   │   ├── supabase/
│   │   │   ├── client.ts                # Browser Supabase client
│   │   │   ├── server.ts                # Server SSR & Admin client
│   │   │   └── middleware.ts            # Session refresh & route guard
│   │   ├── types/
│   │   │   ├── database.ts              # Database schema definitions
│   │   │   └── index.ts                 # UI & navigation types
│   │   └── validations/
│   │       └── project.ts               # Zod validation schemas
│   └── middleware.ts                    # Edge session proxy
├── supabase/
│   ├── schema.sql                       # 13 relational tables & indexes
│   ├── policies.sql                     # Row Level Security (RLS) policies
│   ├── storage.sql                      # Public media bucket configuration
│   └── seed.sql                         # Initial dataset for Rishaan Kumar
├── .env.example                         # Environment configuration template
└── README.md
```

---

## ⚡ Quick Start & Local Run

### 1. Clone & Install Dependencies

```bash
cd rishaan-portfolio
npm install
```

### 2. Configure Environment Variables

Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

Populate the keys from your **[Supabase Project Dashboard](https://supabase.com)**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_USER_ID=your-admin-user-uuid
```

*(Note: The portfolio functions immediately out of the box with built-in verified fallback data even before setting up Supabase!)*

### 3. Initialize Supabase Database

In your Supabase project's **SQL Editor**, run the SQL files in the following order:

1. `supabase/schema.sql` (Creates all 13 tables, indexes, and triggers)
2. `supabase/policies.sql` (Applies Row Level Security policies)
3. `supabase/storage.sql` (Configures the `portfolio-media` storage bucket)
4. `supabase/seed.sql` (Seeds your verified initial CV data)

### 4. Create Your Administrator Account

1. Navigate to **Authentication > Users** in your Supabase Dashboard.
2. Click **Add User** -> **Create User**.
3. Enter your administrator email (`ashim3006@gmail.com`) and choose a strong password.
4. Auto-confirm the user email.
5. Copy the newly created user's **User UID** and place it in `.env.local` as `ADMIN_USER_ID`.

### 5. Start the Development Server

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🚢 Production Deployment (Vercel)

1. Push your repository to **GitHub**.
2. Go to **[Vercel](https://vercel.com)** and import your project.
3. In **Settings > Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_USER_ID`
4. Deploy! Your site will be live on Vercel with automatic HTTPS and edge routing.

---

## 🛡️ Security Architecture

- **Row Level Security (RLS)**: Public anonymous visitors can only perform `SELECT` on published portfolio records. Contact form submissions are write-only for visitors.
- **Server-Controlled Authorization**: All administrative mutations and private routes are guarded on the server level using Supabase authentication cookies and session verification.
- **Service Role Isolation**: The high-privilege `SUPABASE_SERVICE_ROLE_KEY` is strictly confined to server-side code (`src/lib/supabase/server.ts`) and is never leaked to the browser.
