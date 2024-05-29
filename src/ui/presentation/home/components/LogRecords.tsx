import { Container } from "@mui/material";
import { LogRecord } from "./LogRecord";
import LogRecordsTable from "./LogRecordsTable";
import { CustomTextField } from "@/ui/shared/input/CustomTextField";

interface Props {
  logRecords: LogRecord[];
  logQueryParameters: {
    service_name: string;
    operation_name: string;
    start_time_min: string;
    start_time_max: string;
    num_traces: string;
    severity_number: string;
  };
  onChangeLogQueryParams: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  logLevels: Item[];
}
export const LogRecords = (props: Props) => {
  return (
    <Container>

        <div className="pb-3">
          {/* {prop} */}
      <CustomTextField
        disabled={props.logRecords.length == 0 && props.logQueryParameters.severity_number == "0"}
        label="Log level"
        select
        sx={{width:150}}
        size="small"
        name="severity_number"
        value={props.logQueryParameters.severity_number}
        onChange={(e) => props.onChangeLogQueryParams(e)}
        items={props.logLevels}
        />
        </div>
      <LogRecordsTable logRecords={props.logRecords} />
    </Container>
  );
};

export default LogRecords;
