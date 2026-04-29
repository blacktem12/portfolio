import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { companies } from '@/content/companies';

export default function AboutPage() {
  const defaultValue = companies.map((company) => company.slug);

  return (
    <div className="w-full h-full space-y-8 p-10">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">이준영</h1>
        <p className="mt-3 text-lg text-muted-foreground">무언가 만드는 일을 사랑하고, 누군가에게 도움이 되는 순간에 행복을 느끼는 12년차 개발자입니다.</p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Career</h2>
        <div className="space-y-8">
          <Accordion multiple defaultValue={defaultValue} className="w-3xl">
            {companies.map((company) => (
              <AccordionItem key={company.slug} value={company.slug} className="border border-l-2 border-l-emerald-500 rounded-2xl">
                <AccordionTrigger>{company.name}</AccordionTrigger>
                <AccordionContent>
                  <p>{company.period}</p>
                  <p>직책: {company.role}</p>
                  <div>
                    <ul></ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* {companies.map((company) => (
            <div key={company.slug} className="border-l-2 pl-4">
              <div className="font-medium">{company.name}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">
                {company.role} · {company.period}
              </div>
              {company.projects.length > 0 && (
                <ul className="mt-3 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
                  {company.projects.map((p) => (
                    <li key={p.slug}>{p.name}</li>
                  ))}
                </ul>
              )}
            </div>
          ))} */}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Contact</h2>
        <div className="text-sm text-muted-foreground">TODO: 이메일, GitHub, LinkedIn 등</div>
      </section>
    </div>
  );
}
