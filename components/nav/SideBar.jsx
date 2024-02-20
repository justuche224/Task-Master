import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { SideBarIcon } from "./SideBarIcon";
import { User } from "../User";

const Nav = () => {
  return (
    <nav
      aria-label="Side Navigation Bar"
      className="fixed sm:top-0 bottom-0 left-0 sm:h-screen sm:mt-10 w-screen sm:w-11 h-13 m-0 flex sm:flex-col sm:pt-5 bg-[#c8cdf1] text-secondary shadow-lg"
    >
      <User />
      <SideBarIcon icon={<FaFire size="28" />} />
      <SideBarIcon icon={<BsPlus size="32" />} />
      <SideBarIcon icon={<BsFillLightningFill size="20" />} />
      <SideBarIcon icon={<FaPoo size="20" />} />
      <SideBarIcon icon={<BsGearFill size="22" />} />
    </nav>
  );
};

export default Nav;

//const Divider = () => <hr className="sidebar-hr hidden sm:block" />;
