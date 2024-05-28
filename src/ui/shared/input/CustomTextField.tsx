import {
  StandardTextFieldProps,
  TextField as MuiTextField,
  Theme,
  MenuItem,
} from "@mui/material";
import { ReactNode } from "react";

interface Props extends StandardTextFieldProps {
  items?: Item[];
}

export const CustomTextField = (props: Props) => {
  return (
    <MuiTextField {...props}>
      {props.items != undefined &&
        props.items.map((item, idx) => {
          return (
            <MenuItem key={idx} value={item.value}>
              {item.name}
            </MenuItem>
          );
        })}
    </MuiTextField>
  );
};
