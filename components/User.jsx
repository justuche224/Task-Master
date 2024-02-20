import { FaTimesCircle, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export const User = ({
  session,
  signOut,
  providers,
  signIn,
  isMenu,
  setIsMenu,
}) => {
  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  return (
    <div className="relative">
      {session?.user ? (
        <div className="flex gap-2">
          <Image
            src={session?.user?.image}
            width={35}
            height={35}
            className="rounded-full cursor-pointer"
            alt="profile"
            onClick={toggleMenu}
          />
        </div>
      ) : (
        <FaUserCircle
          size={35}
          onClick={toggleMenu}
          className=" cursor-pointer"
        />
      )}
      <div
        className={`absolute h-[250px] w-[300px] right-5 top-[50px] bg-gray-900 p-3 text-white shadow-xl rounded-2xl ${
          isMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <button type="button" onClick={toggleMenu}>
          <FaTimesCircle size={27} />
        </button>
        {session?.user ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div>
              <h1 className="text-md font-bold">{session?.user?.email}</h1>
            </div>
            <Image
              src={session?.user?.image}
              width={60}
              height={60}
              className="rounded-full block"
              alt="profile"
            />
            <div>
              <h1 className="text-xl font-bold">Hi, {session?.user?.name}!</h1>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={toggleMenu}
                className="px-5 py-1 bg-gray-400 text-black rounded-full hover:opacity-90"
              >
                <Link href="/profile">Profile</Link>
              </button>
              <button
                type="button"
                className="px-5 py-1 bg-gray-400 text-black rounded-full hover:opacity-90"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 flex-col items-center text-center justify-center">
            <FaUserCircle size={60} />
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="px-5 py-1 bg-gray-400 text-black rounded-full hover:opacity-90"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
