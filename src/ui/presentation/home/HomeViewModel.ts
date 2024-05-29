"use client";
import { LogLevel } from "@/data/model/dto/log/LogLevel";
import { LogRepository } from "@/data/repository/log/LogRepository";
import { ItemConverterImpl } from "@/domain/converters/ItemConverterImpl";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";

export const HomeViewModel = () => {
  const [serviceNames, setServiceNames] = useState<Item[]>([]);
  const [operationNames, setOperationNames] = useState<Item[]>([]);
  const [logRecordsTemp, setLogRecordsTemp] = useState<LogRecord[]>([]);
  const [logRecords, setLogRecords] = useState<LogRecord[]>([]);
  const [logQueryParameters, setLogQueryParamenters] = useState({
    service_name: "",
    operation_name: "",
    start_time_min: moment().subtract(1,"days").format(),
    start_time_max: moment().format(),
    num_traces: "100",
    severity_number: "0",
  });
  const [logLevels,setLogLevels] = useState<Item[]>([])
  const logRepository = LogRepository();

  const getServiceNames = async () => {
    const data = await logRepository.GetServiceNames();
    setServiceNames(data);
  };

  const getLogsLevels = () =>{
    const logLevels = logRepository.GetLogLevels()
    setLogLevels(logLevels)
  }

  const getLogs = async () => {
    try{

      if (logQueryParameters == null) return;
      const body: LogQueryParameters = {
        service_name: logQueryParameters.service_name,
      operation_name: logQueryParameters.operation_name,
      start_time_min: logQueryParameters.start_time_min,
      start_time_max: logQueryParameters.start_time_max,
      num_traces: Number(logQueryParameters.num_traces),
      severity_number: Number(logQueryParameters.severity_number),
      should_fetch_all:logQueryParameters.operation_name == "All"
    };
    const data = await logRepository.GetLogs(body);
    console.log(data)
    setLogRecords(data);
    setLogRecordsTemp(data);
  }catch(err){
    console.log(err)
  }
  };

  const applyFilterParams = () =>{
    getLogs()
    setLogQueryParamenters({
      ...logQueryParameters,
      severity_number:"0"
    })
  }

  const getOperatonsName = async (serviceName: string) => {
    const body: OperationQueryParamenters = {
      service_name: serviceName,
    };
    const data = await logRepository.GetOperations(body);
    const n = [{name:"All",value:"All"},...data]
    setOperationNames(n);
  };

  const onChangeLogQueryParams = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogQueryParamenters({
      ...logQueryParameters,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "service_name") {
      if (e.target.value != "" && e.target.value != "All") {
        getOperatonsName(e.target.value);
      }
    }
    if (e.target.name == "severity_number") {
        if (e.target.value != "") {
         filterLogsByLevel(Number(e.target.value))
        }
      }
  };

  const onChangeDateTime=(d:moment.Moment,name:string)=>{
    setLogQueryParamenters({
        ...logQueryParameters,
        [name]:d.format()
    })
  }

  const filterLogsByLevel = (level:LogLevel) =>{
    console.log("LENGHT",logRecords.length,"LEVEL",level)
    if(logRecordsTemp.length == 0)  return
    let n:LogRecord[] = logRecordsTemp
    if(level != LogLevel.ALL){  
      n = logRecordsTemp.filter(item=>item.severity_number == level)
    }
    setLogRecords(n)
  }

  useEffect(() => {
    getServiceNames();
    getLogsLevels()
  }, []);

  // useEffect(()=>{
  //   filterLogsByLevel(Number(logQueryParameters.severity_number))
  // },[logRecordsTemp])

  return {
    state: {
      serviceNames,
      logRecords,
      operationNames,
      logQueryParameters,
      logLevels
    },
    onChangeLogQueryParams,
    onChangeDateTime,
    applyFilterParams,
  };
};
