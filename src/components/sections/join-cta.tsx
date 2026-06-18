import Link from "next/link";
import { Send, HandHeart, Heart, UserPlus, ArrowRight } from "lucide-react";

const ACTIONS = [
  {
    icon: Send,
    label: "Demander une intervention",
    href: "/demander-une-intervention",
    text: "Écoles, associations, collectivités",
  },
  {
    icon: HandHeart,
    label: "Faire un don",
    href: "/faire-un-don",
    text: "Soutenez nos actions éducatives",
  },
  {
    icon: Heart,
    label: "Devenir bénévole",
    href: "/devenir-benevole",
    text: "Offrez votre temps et vos talents",
  },
  {
    icon: UserPlus,
    label: "Adhérer",
    href: "/adherer",
    text: "Rejoignez l'association",
  },
];

export function JoinCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-[#0f4a1d]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="container-page relative z-10 text-center">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-accent-light">
          Passez à l&apos;action
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl">
          Rejoignez le mouvement YEHLI
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-white/85">
          Chaque geste compte. Choisissez la façon dont vous souhaitez contribuer à éclairer
          l&apos;avenir des enfants et des jeunes de Côte d&apos;Ivoire.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map(({ icon: Icon, label, href, text }) => (
            <Link
              key={href + label}
              href={href}
              className="group flex flex-col items-center gap-3 rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm ring-1 ring-white/15 transition-all hover:-translate-y-1 hover:bg-white hover:ring-white"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-dark">
                <Icon className="h-7 w-7" />
              </span>
              <span className="font-semibold text-white group-hover:text-primary">{label}</span>
              <span className="text-sm text-white/75 group-hover:text-muted">{text}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-accent-light group-hover:text-primary">
                Découvrir
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
