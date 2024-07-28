import Link from "next/link";
import { EyeOff, Menu, Package2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getServerAuthSession } from "~/server/auth";
import { AUTH_ACTION_LINKS } from "~/lib/constants";
import { api } from "~/trpc/server";
import NavMenu from "~/components/layout/user/NavMenu";
import LoginToSamePage from "~/components/layout/user/LoginToSamePage";
import WhitelabelCompany from "~/components/layout/WhitelabelCompany";
import ShareBoard from "~/components/layout/admin/ShareBoard";

export async function Header({ companyName }: { companyName: string }) {
  const session = await getServerAuthSession();
  const company = await api.company.getCompanyByName({ companyName });
  const isAdmin = company?.adminId === session?.user?.id;

  return (
    <div className="container flex">
      <div className="bg-muted/40 hidden md:block">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <WhitelabelCompany companyName={company?.name ?? ""} />
        </div>
      </div>

      <header className="bg-muted/40 olg:px-6 flex h-14 flex-1 items-center justify-between gap-4 px-4 lg:h-[60px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">{company?.name}</span>
            </Link>

            <NavMenu className="flex-col" />
          </SheetContent>
        </Sheet>

        <NavMenu className="hidden md:flex" />

        <div className="flex items-center gap-6">
          {isAdmin ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <EyeOff />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Admin View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <ShareBoard companyName={company?.name ?? ""} />
            </>
          ) : null}

          {session?.user?.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image ?? "/fallbackAvatar.avif"}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={AUTH_ACTION_LINKS.SIGN_OUT}>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginToSamePage />
          )}
        </div>
      </header>
    </div>
  );
}
