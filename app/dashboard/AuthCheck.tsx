"use client"; // ✅ Ensure this runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminCheck = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");

    if (!adminStatus) {
      router.push("/"); // ✅ Redirect immediately
    } else {
      setIsAdmin(true);
    }
  }, []);

  // 🔒 Prevents flashing of protected content
  if (isAdmin === null) {
    return null; // ✅ Show nothing while checking auth
  }

  return <>{children}</>;
};

export default AdminCheck;
