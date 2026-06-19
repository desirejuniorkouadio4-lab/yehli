"use client";

import { useState, useRef, useCallback } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImagePlus,
  Link2,
  Link2Off,
  Loader2,
  Baseline,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ToolbarButton({
  onClick,
  active,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:opacity-50",
        active ? "bg-primary text-white" : "text-body hover:bg-primary-pale hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

const PRESET_COLORS = [
  { name: "Noir", value: "#1C1C2E" },
  { name: "Vert YEHLI", value: "#1A6B2A" },
  { name: "Vert clair", value: "#2E8B42" },
  { name: "Bleu", value: "#2563EB" },
  { name: "Rouge", value: "#DC2626" },
  { name: "Orange", value: "#D97706" },
  { name: "Jaune", value: "#D4A017" },
  { name: "Gris", value: "#6B7280" },
];

function ColorControl({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const current = (editor.getAttributes("textStyle").color as string) ?? "";

  return (
    <div className="relative">
      <ToolbarButton onClick={() => setOpen((o) => !o)} active={!!current} label="Couleur du texte">
        <Baseline className="h-4 w-4" style={current ? { color: current } : undefined} />
      </ToolbarButton>
      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-9 z-20 w-44 rounded-lg border border-border bg-white p-2 shadow-lg">
            <div className="grid grid-cols-4 gap-1.5">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  onClick={() => {
                    editor.chain().focus().setColor(c.value).run();
                    setOpen(false);
                  }}
                  className={cn(
                    "h-7 w-7 rounded-md border transition-transform hover:scale-110",
                    current.toLowerCase() === c.value.toLowerCase()
                      ? "border-dark ring-2 ring-primary/40"
                      : "border-border",
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <label className="flex flex-1 cursor-pointer items-center gap-1.5 text-xs text-body">
                <input
                  type="color"
                  value={current || "#1A6B2A"}
                  onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                  className="h-6 w-6 cursor-pointer rounded border border-border bg-white p-0"
                />
                Personnalisée
              </label>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setOpen(false);
                }}
                className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-surface hover:text-dark"
              >
                Aucune
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Toolbar({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor;
  onPickImage: () => void;
  uploading: boolean;
}) {
  const setLink = useCallback(() => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Adresse du lien (https://…)", previous ?? "https://");
    if (url === null) return; // annulé
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface px-2 py-1.5">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Gras">
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italique">
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ColorControl editor={editor} />
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Titre 2">
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Titre 3">
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Liste à puces">
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Liste numérotée">
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Citation">
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton onClick={setLink} active={editor.isActive("link")} label="Insérer un lien">
        <Link2 className="h-4 w-4" />
      </ToolbarButton>
      {editor.isActive("link") && (
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} label="Retirer le lien">
          <Link2Off className="h-4 w-4" />
        </ToolbarButton>
      )}
      <ToolbarButton onClick={onPickImage} disabled={uploading} label="Insérer une image">
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} label="Annuler">
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} label="Rétablir">
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export function RichEditor({ name = "content", initialHTML = "" }: { name?: string; initialHTML?: string }) {
  const [html, setHtml] = useState(initialHTML);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Image.configure({ inline: false, allowBase64: false, HTMLAttributes: { class: "rounded-lg" } }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
    ],
    content: initialHTML,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose-yehli min-h-[260px] max-w-none px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      if (!file.type.startsWith("image/")) {
        setError("Le fichier doit être une image (PNG, JPG, WEBP).");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 10 Mo.");
        return;
      }
      setError("");
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Échec du téléversement");
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setUploading(false);
      }
    },
    [editor],
  );

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
    e.target.value = "";
  };

  return (
    <div className="overflow-hidden rounded-md border border-border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      {editor && <Toolbar editor={editor} onPickImage={() => fileRef.current?.click()} uploading={uploading} />}
      <EditorContent editor={editor} />
      {error && <p className="border-t border-border px-4 py-2 text-xs font-medium text-error">{error}</p>}
      <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={onPick} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
