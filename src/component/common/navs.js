"use client";
import React from "react";
import styles from "@/styles/common.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navs = ({ className, setShowNavs }) => {
  const pathname = usePathname();

  return (
    <div className={className}>
      <Link
        href={"/"}
        className={`${styles.option} ${pathname === "/" ? styles.active : ""}`}
        onClick={() => setShowNavs(false)}
      >
        Home
      </Link>
      <Link
        href={"/contact"}
        className={`${styles.option} ${
          pathname === "/contact" ? styles.active : ""
        }`}
        onClick={() => setShowNavs(false)}
      >
        Contact
      </Link>
      <Link
        href={"/about"}
        className={`${styles.option} ${
          pathname === "/about" ? styles.active : ""
        }`}
        onClick={() => setShowNavs(false)}
      >
        About
      </Link>
    </div>
  );
};

export default Navs;
