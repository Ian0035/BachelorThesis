"use client"; // ✅ Ensure this is a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAdmin = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const isAdmin = localStorage.getItem("isAdmin");
      if (!isAdmin) {
        router.push("/auth/login"); // ✅ Redirect to login if not authenticated
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAdmin;
