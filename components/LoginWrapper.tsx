"use client";

import KarepilotLogin from "@/components/Login";
import { useRouter } from "next/navigation";

export function LoginWrapper() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/");
    router.refresh();
  };

  return <KarepilotLogin onLogin={handleLogin} />;
}

