import { OrganizationSelection } from "./dashboard/components/OrganizationSelection";

export default async function Home() {
  // Always show OrganizationSelection - it will handle authentication internally
  return <OrganizationSelection />;
}
