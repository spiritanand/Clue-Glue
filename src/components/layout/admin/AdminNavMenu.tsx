"use client";

import Link from "next/link";
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import { cn } from "~/lib/utils";

function AdminNavMenu({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "flex items-start gap-2 px-2 font-medium md:text-sm lg:px-4",
        className,
      )}
    >
      <Link
        href="#"
        className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3"
      >
        <Home className="h-6 w-6 md:h-4 md:w-4" />
        <p>Dashboard</p>
      </Link>
      <Link
        href="#"
        className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all hover:bg-gray-700 md:px-3"
      >
        <ShoppingCart className="h-6 w-6 md:h-4 md:w-4" />
        <p>Orders</p>
      </Link>
      <Link
        href="#"
        className="text-primary hover:text-primary flex items-center gap-3 rounded-lg bg-gray-950 px-2 py-2 transition-all md:px-3"
      >
        <Package className="h-6 w-6 md:h-4 md:w-4" />
        <p>Products</p>
      </Link>
      <Link
        href="#"
        className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3"
      >
        <Users className="h-6 w-6 md:h-4 md:w-4" />
        <p>Customers</p>
      </Link>
      <Link
        href="#"
        className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3"
      >
        <LineChart className="h-6 w-6 md:h-4 md:w-4" />
        <p>Analytics</p>
      </Link>
    </nav>
  );
}

export default AdminNavMenu;
