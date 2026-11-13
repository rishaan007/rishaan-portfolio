import { Navbar } from "@/components/public/Navbar";
export const dynamic = "force-dynamic";
import { Hero } from "@/components/public/Hero";
import { About } from "@/components/public/About";
import { Skills } from "@/components/public/Skills";
import { Projects } from "@/components/public/Projects";
import { Research } from "@/components/public/Research";
import { Journey } from "@/components/public/Journey";
import { Contact } from "@/components/public/Contact";
import { Footer } from "@/components/public/Footer";
import { CelestialCanvas } from "@/components/public/decorative/CelestialCanvas";

import { GsapInteractiveEngine } from "@/components/public/interactive/GsapInteractiveEngine";
import { ScrollProgressBar } from "@/components/public/interactive/ScrollProgressBar";
import { TechMarquee } from "@/components/public/tech/TechMarquee";
import { TechHoverIcons } from "@/components/public/decorative/TechHoverIcons";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackCategories,
  fallbackEducation,
  fallbackTimeline,
  fallbackResearchInterests,
} from "@/lib/fallback-data";

async function getPortfolioData() {
  try {
    const supabase = await createServerSupabaseClient();

    const [
      profileRes,
      projectsRes,
      techsRes,
      categoriesRes,
      skillsRes,
      educationRes,
      timelineRes,
      researchRes,
    ] = await Promise.all([
      supabase.from("profiles").select("*").limit(1).maybeSingle(),
      supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("display_order"),
      supabase.from("project_technologies").select("*").order("display_order"),
      supabase.from("skill_categories").select("*").order("display_order"),
      supabase
        .from("skills")
        .select("*")
        .eq("is_visible", true)
        .order("display_order"),
      supabase.from("education").select("*").order("display_order"),
      supabase.from("timeline_entries").select("*").order("display_order"),
      supabase.from("research_interests").select("*").order("display_order"),
    ]);

    const dbProjects = (projectsRes.data || []).map((project: any) => ({
      ...project,
      technologies: (techsRes.data || []).filter(
        (t: any) => t.project_id === project.id
      ),
    }));

    const dbCategories = (categoriesRes.data || []).map((cat: any) => ({
      ...cat,
      skills: (skillsRes.data || []).filter(
        (s: any) => s.category_id === cat.id
      ),
    }));

    const profile = profileRes.data || fallbackProfile;
    const projects = dbProjects.length > 0 ? dbProjects : fallbackProjects;
    const categories = dbCategories.length > 0 ? dbCategories : fallbackCategories;
    const education = (educationRes.data && educationRes.data.length > 0) ? educationRes.data : fallbackEducation;
    const timeline = (timelineRes.data && timelineRes.data.length > 0) ? timelineRes.data : fallbackTimeline;
    const research = (researchRes.data && researchRes.data.length > 0) ? researchRes.data : fallbackResearchInterests;
    const interests = research.map((r: any) => r.title);

    return {
      profile,
      projects,
      categories,
      education,
      timeline,
      research,
      interests,
    };
  } catch (err) {
    console.warn("Supabase fetch failed, using fallback data:", err);
    return {
      profile: fallbackProfile,
      projects: fallbackProjects,
      categories: fallbackCategories,
      education: fallbackEducation,
      timeline: fallbackTimeline,
      research: fallbackResearchInterests,
      interests: fallbackResearchInterests.map((r) => r.title),
    };
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <main className="relative min-h-screen bg-[var(--ivory)] text-[var(--espresso)] selection:bg-[#D4AF37] selection:text-[#0B0D12]">
      {/* Glowing Laser Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* GSAP Interactive Magnetic & Cursor Engine */}
      <GsapInteractiveEngine />

      {/* Interactive Celestial Telemetry Canvas */}
      <CelestialCanvas />

      <TechHoverIcons />

      <Navbar />

      <section id="hero">
        <Hero profile={data.profile} />
      </section>

      {/* Infinite Glowing Tech Stack Marquee Strip */}
      <TechMarquee />

      <section id="about">
        <About profile={data.profile} interests={data.interests} />
      </section>

      <section id="skills">
        <Skills categories={data.categories} />
      </section>

      <section id="projects">
        <Projects projects={data.projects} />
      </section>

      <section id="research">
        <Research interests={data.research} />
      </section>

      <section id="journey">
        <Journey education={data.education} timeline={data.timeline} />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
