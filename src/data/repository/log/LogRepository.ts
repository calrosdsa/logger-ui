import { ItemConverterImpl } from "@/domain/converters/ItemConverterImpl"
import { LogDataSourceImpl } from "./LogDataSourceImpl"
import { LogLevel } from "@/data/model/dto/log/LogLevel"



export const LogRepository= ()=> {
    const dataSource= new LogDataSourceImpl()
    const itemConverter = new ItemConverterImpl()

    const GetLogLevels = ():Item[] =>{
        const logLevels:Item[] = [
            {name:"All",value:"0"},
            {name:"Debug",value:LogLevel.DEBUG.toString()},
            {name:"Trace",value:LogLevel.TRACE.toString()},
            {name:"Info",value:LogLevel.INFO.toString()},
            {name:"Warn",value:LogLevel.WARN.toString()},
            {name:"Error",value:LogLevel.ERROR.toString()},
            {name:"Fatal",value:LogLevel.FATAL.toString()},
        ]
        return logLevels
    }

    const GetLogs = async(body:LogQueryParameters):Promise<LogRecord[]> =>{
        const res =await dataSource.GetLogs(body)
        const data = await res.json()
        return data
    }

    const GetServiceNames = async():Promise<Item[]>=>{
        const res = await dataSource.GetServiceNames()
        const data:string[]= await res.json()
        return itemConverter.convertWithStringArray(data)
    }

    const  GetOperations = async(body:OperationQueryParamenters):Promise<Item[]> =>{
        const res = await dataSource.GetOperationsNames(body)
        const data:Operation[] = await res.json()
        return itemConverter.convertWithStringArray(data.map(item=>item.name))
    }
    
    return {
        GetLogs,
        GetServiceNames,
        GetOperations,
        GetLogLevels,
    }
}