"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Logo = () => {
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  // change between the logo and the button when the user scrolls

  return (
    <>
      <Link href="/">
        <p className="text-4xl text-cr-darkgrey dark:text-white">CFA Companion</p>
      </Link>
    </>
  );
};

export default Logo;