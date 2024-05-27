

export class LogDataSourceImpl implements LogDataSource {

    constructor(){
        
    }
    async GetLogs():Promise<Response> {
        const res = fetch("http://localhost:8001/v1/logs/")
        return res
    }  
    
    async GetServiceNames():Promise<Response> {
        const res = fetch("http://localhost:8001/v1/services/")
        return res
    }   
}