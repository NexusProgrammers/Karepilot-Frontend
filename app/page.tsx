import { cookies } from "next/headers";
import { OrganizationSelection } from "./dashboard/components/OrganizationSelection";
import { LoginWrapper } from "@/components/LoginWrapper";

export default async function Home() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) {
    return <LoginWrapper />;
  }

  return <OrganizationSelection />;
}
