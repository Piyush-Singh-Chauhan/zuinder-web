"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

const clients = [
  {
    name: "Lineicons",
    link: "https://lineicons.com",
    image: "/assets/img/clients/lineicons.svg",
    width: 246,
    height: 40,
  },
  {
    name: "Formbold",
    link: "https://formbold.com",
    image: "/assets/img/clients/formbold.svg",
    width: 219,
    height: 40,
  },
  {
    name: "Tailadmin",
    link: "https://tailadmin.com",
    image: "/assets/img/clients/tailadmin.svg",
    width: 221,
    height: 40,
  },
  {
    name: "Uideck",
    link: "https://uideck.com",
    image: "/assets/img/clients/uideck.svg",
    width: 171,
    height: 40,
  },
  {
    name: "Graygrids",
    link: "https://graygrids.com",
    image: "/assets/img/clients/graygrids.svg",
    width: 193,
    height: 40,
  },
];

export default function ClientsSection() {
  const { t } = useLanguage();
  return (
    <section id="clients" className="relative bg-[#004A70] py-15 pt-10 pb-30 sm:py-30 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[570px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#F15A29] md:text-4xl">
              {t("clients.title")}
            </h2>
            <p className="text-lg font-medium text-white">
              {t("clients.desc")}
            </p>
          </div>
        </div>

        {/* Clients Logos */}
        <div className="w-full px-4">
          <div className="flex flex-wrap items-center py-10 justify-center gap-6">
            {clients.map((client, index) => (
              <a
                key={index}
                href={client.link}
                target="_blank"
                rel="nofollow noreferrer"
                className="relative mx-3 flex max-w-[120px] items-center justify-center py-4 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
