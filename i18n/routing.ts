import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["de", "it", "en"],

  // Used when no locale matches
  defaultLocale: "de",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
