
interface LogDataSource {
    GetLogs(body:LogQueryParameters):Promise<Response>
    GetServiceNames():Promise<Response>
    GetOperationsNames(body:OperationQueryParamenters):Promise<Response>
}