import { Divider, Typography } from "@mui/material"
import moment from "moment"

export const LogRecord = ({logRecord}:{
    logRecord:LogRecord
}) =>{
    return (
        <div className="p-2">
            <div className="flex space-x-3">

            {/* {moment.unix(logRecord.time_unix_nano).format("yyyy-mm-dd HH:mm:ss")} */}
            <Typography variant="body2" color="primary">
                {moment(logRecord.time_unix_nano/1e6).format("yyyy-MM-DD HH:mm:ss")}
                </Typography>

            <Typography variant="body2">{logRecord.Body}</Typography>    
            </div>

            <Divider/>
        </div>
    )
}