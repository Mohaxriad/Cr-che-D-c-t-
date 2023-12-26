import React from "react";
import { navLinks } from "./utils/NavDB";


function NavBar() {
  return (
    <nav className="h-full col-span-2 border-r bg-[#ffdeda90] rounded-lg border-gray-200 min-h-[90vh] w-[80px] xl:w-[250px] pt-8 px-1 flex flex-col items-start justify-between">
      <div className="space-y-8 w-full ">
        {navLinks.slice(0, 5).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
        <div className="w-full border-t border-gray-200" />
        {navLinks.slice(5, 6).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
      </div>
    </nav>
  );
}
function NavItem({ link }) {
  return (
    <a
      href={link.path}
      className="flex items-center space-x-8 px-5 cursor-pointer border-l-4 border-transparent hover:border-gray-900"
    >
      <span> {link.icon}</span>
      <h2 className="text-[#191A43] font-semibold xl:flex hidden">{link.title}</h2>
    </a>
  );
}

export default NavBar;
