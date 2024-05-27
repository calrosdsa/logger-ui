interface LogDataSource {
    GetLogs():Promise<Response>
    GetServiceNames():Promise<Response>
}


type Log = {
    name:string
}