"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, BarChart3, Package, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: typeof Package;
  comingSoon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Estoque", href: "/stock", icon: Package },
  { label: "Vendas", href: "/sales", icon: ShoppingCart },
  {
    label: "Relatórios",
    href: "/reports",
    icon: BarChart3,
    comingSoon: true,
  },
  {
    label: "Movimentações",
    href: "/stock-history",
    icon: ArrowLeftRight,
    comingSoon: true,
  },
];

interface NavLinksProps {
  onNavigate?: () => void;
}

export function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Navegação principal">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;

        if (item.comingSoon) {
          return (
            <div
              key={item.href}
              aria-disabled="true"
              className="flex items-center justify-between gap-2 rounded-md px-3 py-2.5 text-muted-foreground/60"
            >
              <span className="flex items-center gap-3 text-sm">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Em breve
              </span>
            </div>
          );
        }

        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-primary-light text-primary"
                : "text-foreground hover:bg-accent/60",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
