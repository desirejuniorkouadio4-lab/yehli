import Image from "next/image";
import { Quote } from "lucide-react";

const PARAGRAPHS = [
  "Je suis heureuse de vous accueillir dans notre univers dédié à l'éducation, à la curiosité et à la confiance. Chez YEHLI, nous croyons profondément que chaque enfant mérite de rêver, d'apprendre et de s'accomplir, quels que soient son parcours ou ses origines. Nous œuvrons chaque jour, avec passion et détermination, pour semer les graines d'une société plus juste, plus humaine et plus éclairée.",
  "Ce site vous présente nos actions, nos formations, nos valeurs et toutes les façons de nous rejoindre dans cette belle aventure. Que vous soyez enseignant, parent, bénévole, donateur ou simple visiteur curieux, sachez que votre présence et votre soutien comptent énormément pour nous.",
  "Merci de partager notre conviction et d'éveiller, avec nous, les esprits et les cœurs.",
];

export function HomeWelcome() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:gap-14">
        {/* Photo de la fondatrice */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-accent/25 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-primary-pale shadow-2xl shadow-primary/15">
            <Image
              src="/images/fondatrice.png"
              alt="Dr Mariame Coulibaly, Fondatrice de YEHLI"
              width={520}
              height={650}
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-border bg-white p-4 text-center shadow-xl">
            <p className="font-bold text-dark">Dr Mariame Coulibaly</p>
            <p className="text-sm text-primary">Fondatrice de YEHLI</p>
          </div>
        </div>

        {/* Texte de bienvenue */}
        <div>
          <span className="inline-flex items-center rounded-full bg-primary-pale px-3.5 py-1.5 text-sm font-semibold text-primary">
            Mot de bienvenue
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-dark sm:text-4xl">
            Bienvenue dans l&apos;univers YEHLI
          </h2>
          <Quote className="mt-5 h-9 w-9 text-accent" aria-hidden="true" />
          <div className="mt-3 space-y-4 text-justify leading-relaxed text-body">
            {PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <p className="italic text-muted">Avec toute ma gratitude,</p>
            <p className="mt-1 font-heading text-xl font-bold text-primary">Dr Mariame Coulibaly</p>
            <p className="text-sm text-muted">Fondatrice de YEHLI</p>
          </div>
        </div>
      </div>
    </section>
  );
}
