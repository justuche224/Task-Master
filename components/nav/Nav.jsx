import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaMoon,
  FaSearch,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Nav = () => {
  return (
    <nav aria-label="Navigation Bar" className=" border-b border-gray-400">
      <div className="m-auto px-4 sm:px-6 lg:px-8 xl:max-w-[90rem]">
        <div className="relative z-20 flex h-16 w-full items-center justify-between py-3">
          <div className="flex w-full items-center justify-between gap-4 sm:gap-8 md:w-auto">
            <div className="logo">
              <Link href="/">
                <Image
                  className="rounded-full"
                  src="/favicon.png"
                  height={35}
                  width={35}
                  alt="Logo"
                  priority={true}
                />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="button"
                className="bg-gray-100 hover:bg-gray-200 [[open]>&amp;]:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:[[open]>&amp;]:bg-gray-700 _no-triangle grid h-10 w-10 place-items-center rounded-full"
              >
                <FaMoon />
              </button>
              <button
                aria-label="button"
                className="bg-gray-100 hover:bg-gray-200 [[open]>&amp;]:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:[[open]>&amp;]:bg-gray-700 _no-triangle grid h-10 w-10 place-items-center rounded-full"
              >
                <FaSearch />
              </button>
              <button
                aria-label="button"
                className="md:hidden bg-gray-100 hover:bg-gray-200 [[open]>&amp;]:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:[[open]>&amp;]:bg-gray-700 _no-triangle grid h-10 w-10 place-items-center rounded-full"
              >
                <FaBars />
              </button>
            </div>
          </div>
          <div className="md:flex hidden gap-8">
            <div className="hidden md:flex items-center">
              <a
                className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
                href="/docs"
                title="Create Task"
              >
                Create Task
              </a>
              <a
                className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
                href="/docs"
                title="Create Task"
              >
                Create Task
              </a>
              <a
                className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
                href="/docs"
                title="Create Task"
              >
                Create Task
              </a>
              <a
                className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
                href="/docs"
                title="Create Task"
              >
                Create Task
              </a>
            </div>
            <div class="flex items-center gap-2">
              <a
                href="https://github.com/remix-run/remix"
                className="hidden h-10 w-10 place-items-center text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-50 md:grid"
                title="Chat us on WhatsApp"
              >
                <span class="sr-only">Chat us on WhatsApp</span>
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://rmx.as/discord"
                class="hidden h-10 w-10 place-items-center text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-50 md:grid"
                title="Follow us on Twitter"
              >
                <span class="sr-only">Follow us on Twitter</span>
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
