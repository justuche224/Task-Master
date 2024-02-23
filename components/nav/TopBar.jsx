"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { User } from "../User";

const TopBar = () => {
  const { data: session } = useSession();
  const [isMenu, setIsMenu] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav
      aria-label="Top Navigation Bar"
      className="fixed top-0 w-full shadow-xl border border-b-2 h-16 flex content-center justify-between  bg-[#c8cdf1] px-5 z-10"
    >
      <Link href="/">
        <Image
          className="rounded-full"
          src="/favicon.png"
          height={60}
          width={60}
          alt="Logo"
          priority={true}
        />
      </Link>
      <div className="flex justify-center content-center mt-3 gap-5">
        <Link href="/create-task">
          <FaPlus
            size={30}
            className="hover:text-white cursor-pointer transition-all duration-300 ease-linear "
          />
        </Link>
        <FaSearch
          size={30}
          className="hover:text-white cursor-pointer transition-all duration-300 ease-linear "
        />
        <User
          session={session}
          signOut={signOut}
          providers={providers}
          signIn={signIn}
          isMenu={isMenu}
          setIsMenu={setIsMenu}
        />
      </div>
    </nav>
  );
};

export default TopBar;
