import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b md-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            href={link.href}
          >
            {link.lable}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
