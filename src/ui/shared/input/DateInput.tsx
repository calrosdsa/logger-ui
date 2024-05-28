import moment from "moment";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";


const InputDate = ({
    value,onChange,minDate,maxDate,testId,label 
}:{
    onChange:(e:moment.Moment)=>void
    value:moment.Moment
    minDate?:moment.Moment
    maxDate?:moment.Moment
    testId?:string
    label?:string
})=>{
    
    return(
       <>
         <LocalizationProvider dateAdapter={AdapterMoment}>
         <DemoContainer
        components={[
          'DateTimePicker',
        ]}>
          <div data-testid={testId}>
        <DemoItem>
          <DateTimePicker 
          label={label}
          minDate={minDate}
          maxDate={maxDate}
           value={value} onChange={(e)=>{
            console.log(e)
            if(e == null) return
            onChange(e)
            }}/>
        </DemoItem>
          </div>
      </DemoContainer>
         </LocalizationProvider>
       </>
    )
}

export default InputDate;