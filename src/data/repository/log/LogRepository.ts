import { LogDataSourceImpl } from "./LogDataSourceImpl"



export const LogRepository = () =>{
    const dataSource= new LogDataSourceImpl()

    const GetLogs = async() =>{
        const res = dataSource.GetLogs()
        // const 
    }

    const GetServiceNames = async():Promise<string[]>=>{
        const res = await dataSource.GetServiceNames()
        const data:string[]= await res.json()
        return data
    }
    
    return {
        GetLogs,
        GetServiceNames
    }
}