

export class LogDataSourceImpl implements LogDataSource {

    constructor(){
        
    }
    async GetOperationsNames(body:OperationQueryParamenters):Promise<Response> {
        const res = fetch(`${process.env.NEXT_PUBLIC_URL}/operations/`,{
            method:"POST",
            body:JSON.stringify(body)
        })
        return res
    }  

    async GetLogs(body:LogQueryParameters):Promise<Response> {
        const res = fetch(`${process.env.NEXT_PUBLIC_URL}/logs/`,{
            method:"POST",
            body:JSON.stringify(body)
        })
        return res
    }  
    
    async GetServiceNames():Promise<Response> {
        const res = fetch(`${process.env.NEXT_PUBLIC_URL}/services/`)
        return res
    }   
}