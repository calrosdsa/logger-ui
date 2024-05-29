import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { Chip, Typography } from "@mui/material";
import moment from "moment";
import SeeMore from "@/ui/shared/text/SeeMore";
import { LogLevel } from "@/data/model/dto/log/LogLevel";

const Scroller = React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  ))
Scroller.displayName = "Scroller"

const TableBodyV = React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  ))
TableBodyV.displayName = "TableBodyV"  

const VirtuosoTableComponents: TableComponents<LogRecord> = {
  Scroller:Scroller,
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} sx={{padding:0,margin:0}} />,
  TableBody:TableBodyV
};


function fixedHeaderContent() {
  return (
    <TableRow>
       <TableCell
          variant="head"
          sx={{
            backgroundColor: "background.paper",
            width:45
          }}
        ></TableCell>
        <TableCell
          variant="head"
          sx={{
            backgroundColor: "background.paper",
            width:170
          }}
        >Datetime</TableCell>
        <TableCell
          variant="head"
          sx={{
            backgroundColor: "background.paper",
          }}
        >Message</TableCell>
        <TableCell
          variant="head"
          sx={{
            backgroundColor: "background.paper",
            width:100
          }}
        >Log Level</TableCell>
          <TableCell
          variant="head"
          sx={{
            backgroundColor: "background.paper",
          }}
        >Tags</TableCell>
    </TableRow>
  );
}

function rowContent(_index: number, logRecord: LogRecord) {
  return (
    <React.Fragment>
      <TableCell>
        <Typography variant="body2" fontSize={13}>
        {_index +1}.-
        </Typography>
        </TableCell>
      <TableCell
      //   align={column.numeric || false ? 'right' : 'left'}
      >
        <Typography variant="body2" color="primary">
          {moment(logRecord.time_unix_nano / 1e6).format("yyyy-MM-DD HH:mm:ss")}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography></Typography>
      <SeeMore
      text={logRecord.body}
      maxLength={110}
      />
      </TableCell>
      <TableCell>
        {logRecord.severity_number == LogLevel.TRACE &&
            <Typography variant="body2" fontSize={12} fontWeight={600}>TRACE</Typography>    
        }
        {logRecord.severity_number == LogLevel.DEBUG &&
            <Typography variant="body2" fontSize={12} fontWeight={600}>DEBUG</Typography>    
        }
        {logRecord.severity_number == LogLevel.FATAL &&
            <Typography variant="body2" fontSize={12} fontWeight={600}>FATAL</Typography>    
        }
        {logRecord.severity_number == LogLevel.ERROR &&
            <Typography color="red" variant="body2" fontSize={12} fontWeight={600}>ERROR</Typography>    
        }
        {logRecord.severity_number == LogLevel.WARN &&
            <Typography color="orange" variant="body2" fontSize={12} fontWeight={600}>WARN</Typography>    
        }
         {logRecord.severity_number == LogLevel.INFO &&
            <Typography color="green" variant="body2" fontSize={12} fontWeight={600}>INFO</Typography>    
        }
      </TableCell>

      <TableCell>
        <div className="flex flex-wrap gap-1">
        {logRecord.attributes.map((item,idx)=>{
          return (
            <div key={idx}>
              <Chip size="small" label={`${item.key}: ${item.v_str}`} variant="outlined" />
            </div>
          )
        })}
        </div>
      </TableCell>
    </React.Fragment>
  );
}

const  LogRecordsTable=({
  logRecords,
}: {
  logRecords: LogRecord[];
}) => {
  return (
    <Paper style={{ height: "85vh", width: "100%" }}>
      <TableVirtuoso
        data={logRecords}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
export default LogRecordsTable;