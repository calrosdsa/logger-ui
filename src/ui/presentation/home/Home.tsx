"use client"
import FilterSidebar from "@/ui/presentation/home/components/FilterSidebar";
import { HomeViewModel } from "./HomeViewModel";
import LogRecords from "./components/LogRecords";
import { viVN } from "@mui/x-date-pickers/locales";


const Home = () =>{
    const vm = HomeViewModel()
    const state = vm.state
    return (
        <div>
            <FilterSidebar
            serviceNames={state.serviceNames}
            operationNames={state.operationNames}
            logQueryParameters={state.logQueryParameters}
            onChangeLogQueryParams={vm.onChangeLogQueryParams}
            applyFilterParams={vm.applyFilterParams}
            onChangeDateTime={vm.onChangeDateTime}
            >
            <LogRecords
            logRecords={state.logRecords}
            logLevels={state.logLevels}
            logQueryParameters={state.logQueryParameters}
            onChangeLogQueryParams={vm.onChangeLogQueryParams}
            />
            </FilterSidebar>
        </div>
    )
}

export default Home;