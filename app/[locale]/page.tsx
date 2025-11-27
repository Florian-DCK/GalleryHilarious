"use client";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import { SUPPORTED_LOCALES } from "@/i18n/routing";
import { ReactNode } from "react";
import {Button} from "@/components/ui/button";
import Carousel from "@/components/Carousel";
import type { EmblaOptionsType } from 'embla-carousel';


const Home = () => {
    const t = useTranslations("Home");
    const lang = useLocale();
    const OPTIONS: EmblaOptionsType = { containScroll: false, loop: true };
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    const chunks = {
        br: () => <br/>,
        highlight: (chunks: ReactNode) => (
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">{chunks}</span>
        ),
        strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
    };
    return (
    <main>
        <section className="h-screen bg-black grid grid-cols-2">
          <Image src={"/brandLogo.png"} alt={"The wall academy logo"} width={400} height={400} className="absolute top-8 left-10 w-40 h-auto object-contain"/>
        <div className="flex items-center justify-end overflow-hidden">
          <Image
            src={"/vincent-vanasch-left-side.jpeg"}
            width={943}
            height={1080}
            alt={"Vincent Vanasch"}
            className="h-full w-auto object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <p className="text-8xl font-extrabold uppercase leading-18 text-white">
            {t.rich("title", {
              br: () => <br />,
              highlight: (chunks) => (
                <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </p>
          <div className={"flex flex-col w-fit items-center gap-1 ml-2"}>
            <Image
              src={"/signature_VV.png"}
              alt="Signature of Vincent Vanasch"
              width={120}
              height={60}
            />
            <p className="italic uppercase text-sm">Vincent Vanasch <strong>#21</strong></p>
          </div>
        </div>
          <div className={"absolute top-8 right-10 flex gap-4 items-end"}>
              {SUPPORTED_LOCALES.filter((item) => item !== lang).map((item, i) => (
                    <a key={i} href={`/${item}`} className={'uppercase text-sm font-bold hover:underline'} >
                        {item}
                    </a>
              ))}
          </div>
        </section>
        <section className="h-screen bg-[#fdfcff] overflow-hidden text-black grid grid-cols-2 items-center-safe">
            <div className="flex flex-col overflow-hidden gap-8">
                <p className={"text-4xl text-right font-extrabold uppercase"}>
                    {t.rich("headline1", chunks)}
                </p>
                <p className={"text-right text-3xl"}>
                    {t.rich("description1", chunks)}
                </p>
                <Button className={"w-fit self-end  text-lg font-bold shadow-none tracking-tight"}>{t("CTA")}</Button>
            </div>
            <div className="relative flex flex-col justify-center gap-5 bg-[rgb(253, 253, 253)]">
                <Image src={"/naked_VV.png"} alt={"Vincent Vanasch X Naked"} height={709} width={703} className={"h-full w-auto object-cover"}/>
                <p className={"absolute top-25 -right-5 transform-gpu rotate-[-90deg] italic"} >Energized by <strong>NAKED</strong></p>
            </div>
        </section>
        <section className="h-screen bg-white text-black grid-cols-2 flex items-center justify-center">
            <Carousel slides={SLIDES} options={OPTIONS}/>
        </section>
    </main>
  );
};

export default Home;
