"use client"
import { LogRepository } from "@/data/repository/log/LogRepository"
import { useEffect, useState } from "react"


export const HomeViewModel = () =>{
    const [serviceNames,setServiceNames] = useState<string[]>([])
    const logRepitory = LogRepository()

    const GetServiceNames = async() =>{
        const data = await logRepitory.GetServiceNames()
        setServiceNames(data)
    }

    useEffect(()=>{
        GetServiceNames()
    },[])

    return {
        state:{
            serviceNames
        }
    }
}