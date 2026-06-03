import { pillars } from "@/lib/product/pillars";

const examples = [
  "Je veux un restaurant romantique à Oran avec vue sur mer.",
  "J'ai besoin d'un étudiant pour donner des cours de maths à Alger.",
  "Je cherche quelqu'un pour promener mon chien ce weekend."
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:py-20">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight">🧞 AFRITE</div>
          <a className="rounded-full bg-night px-5 py-3 text-sm font-semibold text-white" href="#roadmap">
            Voir la roadmap
          </a>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <p className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-palm">
              Le système d'exploitation local de l'Algérie
            </p>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
                Décrivez ce que vous cherchez. Afrite trouve la meilleure solution.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-night/70">
                Une plateforme IA conversationnelle qui connecte lieux, commerces,
                professionnels, voisins, demandes et bons plans dans une seule expérience.
              </p>
            </div>
            <div className="afrite-card p-3">
              <div className="rounded-2xl bg-night p-5 text-white">
                <p className="mb-3 text-sm text-white/60">Recherche locale IA</p>
                <p className="text-xl font-semibold">“Je suis à Alger demain, organise-moi une journée.”</p>
              </div>
              <div className="grid gap-3 p-4 md:grid-cols-3">
                {examples.map((example) => (
                  <div className="rounded-2xl bg-sand/70 p-4 text-sm text-night/70" key={example}>
                    {example}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="afrite-card space-y-5 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-desert">MVP recommandé</p>
            {[
              "Explore : lieux et fiches locales",
              "Avis et résumé IA",
              "Profils utilisateurs et réputation",
              "Demandes de missions",
              "Recherche conversationnelle"
            ].map((item, index) => (
              <div className="flex items-start gap-4" key={item}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-palm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 font-semibold">{item}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 md:grid-cols-5">
        {pillars.map((pillar) => (
          <article className="afrite-card p-5" key={pillar.slug}>
            <div className="text-3xl">{pillar.icon}</div>
            <h2 className="mt-4 text-lg font-black">{pillar.title}</h2>
            <p className="mt-2 text-sm leading-6 text-night/65">{pillar.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
