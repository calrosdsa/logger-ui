interface LogRecord {
    time_unix_nano: number;
    observed_time_unix_nano: number;
    severity_number: number;
    Body: string;
    attributes: Attribute[];
    process: Process;
  }
  
  interface Process {
    service_name: string;
    attributes: Attribute[];
  }
  
  interface Attribute {
    Key: string;
    Value: Value2;
  }
  
  interface Value2 {
    Value: Value;
  }
  
  interface Value {
    StringValue: string;
  }
  
  