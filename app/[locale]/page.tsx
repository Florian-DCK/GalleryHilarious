"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const [galleries, setGalleries] = useState<
    Array<{ id: number; title: string }>
  >([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setGalleries(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching galleries:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const dataObj = Object.fromEntries(fd.entries());

    // Affiche les valeurs récupérées (pour debug)
    console.log("Form values:", dataObj);

    fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then(async (response) => {
        const json = await response.json().catch(() => null);
        if (response.ok) {
          router.push(`/gallery?page=1`);
        } else {
          alert(t("errorMessage"));
          throw new Error("API error");
        }
      })
      .catch((err) => {
        console.error("Request failed:", err);
      });
  };

  return (
    <main className="relative flex flex-1 w-full items-center justify-center px-4 py-12">
      <div className="glass-panel relative mx-auto flex w-full max-w-5xl flex-col gap-10 rounded-3xl px-6 py-10 sm:px-10">
        <div className="space-y-4 text-center">
          <p className="text-sm font-heading uppercase tracking-[0.5em] text-white/70">
            {t("heroClaim") ?? "Mon objectif"}
          </p>
          <h1 className="text-4xl font-heading text-white sm:text-5xl md:text-6xl">
            {t.rich("title", {
              br: () => <br />,
              highlight: (chunks) => (
                <span className="bg-linear-to-r from-[#ff8218] via-[#f15a24] to-[#c3200f] bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h1>
        </div>

        <form
          className="space-y-5 rounded-2xl border border-white/10 bg-[#070a12]/80 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-heading uppercase tracking-[0.4em] text-white/60">
                {t("selectPlaceholder")}
              </span>
              <Select
                value={selectedId}
                required
                onValueChange={(v) => setSelectedId(v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {galleries.length === 0 ? (
                      <div className="flex justify-center p-4">
                        <Spinner />
                      </div>
                    ) : (
                      galleries.map((gallery) => (
                        <SelectItem
                          key={gallery.id}
                          value={gallery.id.toString()}
                        >
                          {gallery.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input type="hidden" name="id" value={selectedId} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-heading uppercase tracking-[0.4em] text-white/60">
                {t("passwordPlaceholder")}
              </span>
              <Input
                id="password"
                className="font-heading text-white/60"
                name="password"
                type="password"
                placeholder={t("passwordPlaceholder")}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
              {t("privacyNote")}
            </p>
            <Button className="w-full md:w-auto">{t("buttonSubmit")}</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
