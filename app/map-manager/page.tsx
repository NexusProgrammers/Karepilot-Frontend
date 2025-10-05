import { DashboardLayout } from '@/components/DashboardLayout'
import MapManagerHeader from './components/MapManagerHeader'
import MapManagerStats from './components/MapManagerStats'
import MapManagerTabs from './components/MapManagerTabs'
import SearchAndFilters from './components/SearchAndFilters'
import FloorPlanGrid from './components/FloorPlanGrid'

export default function MapManagerPage() {
  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Map Manager"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className="space-y-6">
        <MapManagerHeader />
        <MapManagerStats />
        <MapManagerTabs />
        <SearchAndFilters />
        <FloorPlanGrid />
      </div>
    </DashboardLayout>
  )
}