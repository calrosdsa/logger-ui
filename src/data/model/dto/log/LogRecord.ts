interface LogRecord {
  time_unix_nano: number;
  observed_time_unix_nano: number;
  severity_number: number;
  body: string;
  attributes: Attribute[];
  process: Process;
}

interface Process {
  service_name: string;
  attributes: Attribute2[];
}

interface Attribute2 {
  key: string;
  v_str: string;
}

interface Attribute {
  key: string;
  v_str?: string;
}