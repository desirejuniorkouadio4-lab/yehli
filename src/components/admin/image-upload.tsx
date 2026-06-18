"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, Loader2, X, RefreshCw, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  defaultValue?: string | null;
  aspect?: "video" | "square" | "wide";
};

export function ImageUpload({ name, defaultValue, aspect = "video" }: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
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
      setUrl(data.url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) upload(file);
    },
    [upload],
  );

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
        ? "aspect-[3/1]"
        : "aspect-video";

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="group relative overflow-hidden rounded-xl border border-border bg-surface">
          <div className={cn("relative w-full", aspectClass)}>
            <Image src={url} alt="" fill className="object-cover" unoptimized />
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/50 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-dark shadow-md transition hover:bg-gray-50"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Changer
            </button>
            <button
              type="button"
              onClick={() => { setUrl(""); setError(""); }}
              className="flex items-center gap-1.5 rounded-lg bg-error px-3 py-1.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
            >
              <X className="h-4 w-4" />
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !uploading && fileRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-all duration-200",
            dragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-primary/[0.02]",
            uploading && "pointer-events-none opacity-60",
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-9 w-9 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted">Téléversement en cours…</p>
            </>
          ) : dragging ? (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                <ImageIcon className="h-7 w-7" />
              </div>
              <p className="text-sm font-semibold text-primary">Déposez l'image ici</p>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-dark">
                  Glisser-déposer ou <span className="text-primary">cliquer pour choisir</span>
                </p>
                <p className="mt-1 text-xs text-muted">PNG, JPG, WEBP — 10 Mo max</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs font-medium text-error">{error}</p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onPick}
      />
    </div>
  );
}
