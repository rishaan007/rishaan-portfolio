import { createServerSupabaseClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { OrnamentalDivider } from "@/components/public/decorative/OrnamentalDivider";
import { ArchFrame } from "@/components/public/decorative/ArchFrame";
import { GsapInteractiveEngine } from "@/components/public/interactive/GsapInteractiveEngine";
import { fallbackProjects } from "@/lib/fallback-data";
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createServerSupabaseClient();
    const { data: project } = await supabase
      .from("projects")
      .select("title, short_description")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (project) {
      return {
        title: `${project.title} — Rishaan Kumar`,
        description: project.short_description,
      };
    }
  } catch {
    // fallback
  }

  const fallback = fallbackProjects.find((p) => p.slug === slug);
  if (fallback) {
    return {
      title: `${fallback.title} — Rishaan Kumar`,
      description: fallback.short_description,
    };
  }

  return { title: "Project Not Found" };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let project: any = null;
  let technologies: any[] = [];
  let images: any[] = [];

  try {
    const supabase = await createServerSupabaseClient();

    const { data: dbProject } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (dbProject) {
      project = dbProject;
      const [techsRes, imagesRes] = await Promise.all([
        supabase
          .from("project_technologies")
          .select("*")
          .eq("project_id", project.id)
          .order("display_order"),
        supabase
          .from("project_images")
          .select("*")
          .eq("project_id", project.id)
          .order("display_order"),
      ]);
      technologies = techsRes.data || [];
      images = imagesRes.data || [];
    }
  } catch {
    // Supabase unavailable or table empty
  }

  if (!project) {
    const fallback = fallbackProjects.find((p) => p.slug === slug);
    if (!fallback) notFound();
    project = fallback;
    technologies = fallback.technologies || [];
    images = [];
  }

  const sections = [
    { title: "Context", content: project.context },
    { title: "The Problem", content: project.problem_statement },
    { title: "Objectives", content: project.objectives },
    { title: "Proposed Solution", content: project.solution },
    { title: "Technical Architecture", content: project.technical_architecture },
    { title: "Implementation Details", content: project.implementation_details },
    { title: "My Contribution", content: project.my_contribution },
    { title: "Challenges Encountered", content: project.challenges },
    { title: "Key Learnings", content: project.key_learnings },
  ].filter((s) => s.content);

  return (
    <main className="min-h-screen bg-[var(--ivory)] text-[var(--espresso)]">
      <GsapInteractiveEngine />
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-[var(--parchment)] to-[var(--ivory)]">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-sans text-[var(--muted)] hover:text-[var(--burgundy)] transition-colors mb-8"
          >
            ← Back to Selected Works
          </Link>

          <p className="text-sm font-sans uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
            {project.category}
          </p>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[var(--burgundy)] mb-4 leading-tight">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-xl font-serif italic text-[var(--muted)] mb-6">
              {project.subtitle}
            </p>
          )}

          <p className="text-lg font-sans text-[var(--charcoal)] max-w-2xl mx-auto leading-relaxed">
            {project.short_description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--burgundy)] text-[var(--ivory)] font-sans text-sm tracking-wider uppercase rounded hover:bg-[var(--oxblood)] transition-colors"
              >
                GitHub Repository
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--burgundy)] text-[var(--burgundy)] font-sans text-sm tracking-wider uppercase rounded hover:bg-[var(--burgundy)] hover:text-[var(--ivory)] transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {technologies.map((tech: any) => (
                <span
                  key={tech.id || tech.name}
                  className="px-3 py-1 text-xs font-sans uppercase tracking-wider border border-[var(--gold)]/30 text-[var(--gold)] rounded-full bg-[var(--ivory)]"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          {project.completion_date && (
            <p className="text-sm font-sans text-[var(--muted)] mt-6">
              Completed:{" "}
              {new Date(project.completion_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          )}
        </div>
      </div>

      <OrnamentalDivider variant="ornate" />

      {/* Featured Image */}
      {project.featured_image && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <ArchFrame variant="project" className="max-w-3xl mx-auto">
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </ArchFrame>
        </div>
      )}

      {/* Content Sections */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--burgundy)] mb-6">
              {section.title}
            </h2>
            <div className="prose prose-lg max-w-none font-sans text-[var(--charcoal)] leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
            {idx < sections.length - 1 && (
              <OrnamentalDivider variant="simple" className="mt-12" />
            )}
          </div>
        ))}
      </div>

      {/* Project Images Gallery */}
      {images.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--burgundy)] mb-8 text-center">
            Project Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {images.map((img: any) => (
              <div key={img.id} className="space-y-2">
                <div className="border border-[var(--cream)] rounded overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.caption || project.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {img.caption && (
                  <p className="text-sm font-sans text-[var(--muted)] text-center italic">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to Projects */}
      <div className="text-center py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--burgundy)] text-[var(--burgundy)] font-sans text-sm tracking-wider uppercase rounded hover:bg-[var(--burgundy)] hover:text-[var(--ivory)] transition-colors"
        >
          ← Back to Selected Works
        </Link>
      </div>

      <Footer />
    </main>
  );
}
