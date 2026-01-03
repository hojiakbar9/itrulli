"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  // --- LOGIK: Sprachwechsel ---
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
      router.replace(newPath);
    });
  };

  const closeMenu = () => setIsOpen(false);

  // Helper für aktiven Status (genauer Match für Home, "includes" für Subseiten)
  const isActive = (path: string) => {
    if (path === "") return pathname === `/${locale}`;
    return pathname.startsWith(`/${locale}${path}`);
  };

  // Liste der Links für sauberen Code
  const navItems = [
    { key: "home", path: "" }, // Leerer Pfad = Root
    { key: "menu", path: "/menu" },
    { key: "gallery", path: "/gallery" },
    { key: "hours", path: "/hours" }, // Oder /location
    { key: "contact", path: "/contact" },
    { key: "careers", path: "/careers" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-stone-200 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* 1. LOGO */}
          <div className="flex-shrink-0 flex items-center mr-4">
            <Link
              href={`/${locale}`}
              className="text-2xl lg:text-3xl font-serif text-[#3B2F2F] font-bold tracking-tight hover:text-[#93C572] transition-colors"
            >
              iTrulli
            </Link>
          </div>

          {/* 2. DESKTOP NAVIGATION */}
          {/* "hidden lg:flex" bedeutet: Auf Tablets versteckt (Hamburger), nur auf großen Screens sichtbar, da Menü sehr lang ist */}
          <div className="hidden xl:flex space-x-6 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                href={`/${locale}${item.path}`}
                active={isActive(item.path)}
              >
                {t(item.key)}
              </NavLink>
            ))}

            {/* Language Dropdown */}
            <div className="relative border-l border-stone-300 pl-4 ml-2">
              <select
                defaultValue={locale}
                disabled={isPending}
                onChange={onSelectChange}
                className="bg-transparent text-[#3B2F2F] text-sm font-bold cursor-pointer outline-none hover:text-[#93C572] transition-colors"
              >
                <option value="de">DE</option>
                <option value="it">IT</option>
                <option value="en">EN</option>
              </select>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="bg-[#93C572] text-white px-5 py-2 rounded-full font-medium hover:bg-[#7fae61] transition-colors shadow-sm whitespace-nowrap"
            >
              {t("cta_visit")}
            </Link>
          </div>

          {/* 3. MOBILE & TABLET HAMBURGER (Sichtbar unter xl Screens) */}
          <div className="flex items-center xl:hidden gap-4">
            {/* Mobile Lang Switcher */}
            <select
              defaultValue={locale}
              onChange={onSelectChange}
              className="bg-transparent text-sm font-bold text-[#3B2F2F] border-none focus:ring-0 p-0"
            >
              <option value="de">DE</option>
              <option value="it">IT</option>
              <option value="en">EN</option>
            </select>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#3B2F2F] hover:text-[#93C572] focus:outline-none p-2"
              aria-label="Menü öffnen"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="xl:hidden bg-[#FDFBF7] border-t border-stone-100 shadow-lg absolute w-full left-0 h-screen overflow-y-auto pb-20">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <MobileNavLink
                key={item.key}
                href={`/${locale}${item.path}`}
                onClick={closeMenu}
                active={isActive(item.path)}
              >
                {t(item.key)}
              </MobileNavLink>
            ))}

            <div className="pt-6 mt-6 border-t border-stone-200">
              <Link
                href={`/${locale}/contact`}
                onClick={closeMenu}
                className="block w-full text-center bg-[#93C572] text-white px-5 py-4 rounded-md font-bold hover:bg-[#7fae61] text-lg"
              >
                {t("cta_visit")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// --- SUB-KOMPONENTEN ---

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-bold tracking-wide uppercase transition-colors whitespace-nowrap ${
        active ? "text-[#93C572]" : "text-[#3B2F2F] hover:text-[#93C572]"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-3 py-3 rounded-md text-xl font-bold ${
        active
          ? "bg-stone-100 text-[#93C572]"
          : "text-[#3B2F2F] hover:bg-stone-50"
      }`}
    >
      {children}
    </Link>
  );
}
