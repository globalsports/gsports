"use client";
import Link from "next/link";
import React from "react";
import { Skeleton } from "./skeleton";
import signIn from "@/app/login/actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/session-provider"; // Import the new hook

const Navbar = () => {
  const { session, isLoading, getUserDisplayName, getInitials, handleSignOut } = useSession();
  const router = useRouter();

  const handleSignOutWithRedirect = async () => {
    await handleSignOut();
    router.refresh();
    router.push('/');
  };

  return (
    <div className="border-b shadow-xs">
      {isLoading ? (
        <Skeleton className="h-[60px] w-full mx-auto" />
      ) : (
        <div className="h-[60px] flex items-center sm:justify-between justify-center max-w-7xl sm:mx-auto mx-5">
          <Link href={"/"}>
            <img src="./images/logo.png" alt="" className="h-[40px]" />
          </Link>
          <div>
            {session!=null ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={session.user.user_metadata.avatar_url} 
                        alt={getUserDisplayName()} 
                      />
                      <AvatarFallback>
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <span className="font-medium">{getUserDisplayName()}</span>
                    <span className="text-sm text-gray-500">{session.user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600 cursor-pointer mt-2 focus:text-red-600"
                    onClick={handleSignOutWithRedirect}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => signIn()}
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Login with Google
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;