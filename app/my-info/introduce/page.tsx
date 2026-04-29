export default function IntroducePage() {
  return (
    <div className="max-w-3xl space-y-12 p-6 md:p-10">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">이준영</h1>
        <p className="mt-3 text-lg text-muted-foreground">TODO: 한 줄 자기소개 · 관심사 · 직무</p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Career</h2>
        <div className="space-y-8"></div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Contact</h2>
        <div className="text-sm text-muted-foreground">TODO: 이메일, GitHub, LinkedIn 등</div>
      </section>
    </div>
  );
}
