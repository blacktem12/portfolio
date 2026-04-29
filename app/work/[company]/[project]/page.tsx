import { notFound } from 'next/navigation';

import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { companies } from '@/content/companies';

type Params = Promise<{ company: string; project: string }>;

export function generateStaticParams() {
  return companies.flatMap((company) => company.projects.map((p) => ({ company: company.slug, project: p.slug })));
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { company: companySlug, project: projectSlug } = await params;
  const company = companies.find((company) => company.slug === companySlug);

  if (!company) {
    notFound();
  }

  const project = company.projects.find((project) => project.slug === projectSlug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-10 break-keep">
      <header>
        <div className="text-sm text-muted-foreground">{company.name}</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{project.name}</h1>
        {project.period ? <div className="mt-1 text-sm text-muted-foreground">{project.period}</div> : null}
        <p className="mt-4 text-muted-foreground">{project.summary}</p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Stack</h2>
        <div className="space-y-4">
          {Object.values(project.stack).map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3">
                <div className="text-xs font-medium text-muted-foreground sm:w-32 sm:shrink-0">{item.label}</div>
                <div className="flex flex-wrap gap-2">
                  {item.values.map((value) => (
                    <span key={value} className="rounded-full border bg-background px-3 py-1 text-xs">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {project.achievements.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Achievements</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {project.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </section>
      )}

      {project.architecture ? (
        <section>
          <h2 className="mb-3 max-w-4xl text-lg font-semibold">Architecture</h2>
          <ArchitectureDiagram nodes={project.architecture.nodes} edges={project.architecture.edges} />
        </section>
      ) : null}
    </div>
  );
}
