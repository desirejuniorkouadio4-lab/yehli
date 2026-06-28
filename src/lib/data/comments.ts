import { prisma } from "@/lib/prisma";

export type CommentVM = {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
};

/** Commentaires approuvés d'un article (affichage public). */
export async function getApprovedComments(articleId: string): Promise<CommentVM[]> {
  try {
    return await prisma.articleComment.findMany({
      where: { articleId, status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, content: true, createdAt: true },
    });
  } catch {
    return [];
  }
}
