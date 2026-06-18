import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/social-icons";
import { Avatar } from "@/components/shared/avatar";
import type { TeamMemberVM } from "@/lib/data/types";

export function TeamCard({ member }: { member: TeamMemberVM }) {
  return (
    <article className="flex h-full flex-col items-center rounded-lg border border-border bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Avatar name={member.name} src={member.photo} size={96} className="h-24 w-24 text-2xl" />
      <h3 className="mt-4 text-lg font-bold text-dark">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
      {member.bio && (
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-5">{member.bio}</p>
      )}
      {(member.email || member.linkedin) && (
        <div className="mt-4 flex gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Écrire à ${member.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-pale text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${member.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-pale text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
