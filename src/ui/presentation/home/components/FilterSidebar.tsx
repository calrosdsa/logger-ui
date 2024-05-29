import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuItem, TextField } from "@mui/material";
import { Select } from "../../../shared/select/Select";
import { CustomTextField } from "../../../shared/input/CustomTextField";
import { CustomButton } from "../../../shared/button/CustomButton";
import InputDate from "../../../shared/input/DateInput";
import moment from "moment";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: React.ReactNode;
  serviceNames: Item[];
  operationNames: Item[];
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
  applyFilterParams: () => void;
  onChangeDateTime: (e: moment.Moment, n: string) => void;
}

export default function FilterSidebar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const disabledButton = props.logQueryParameters.service_name == "" || props.logQueryParameters.operation_name == "";

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography>Logger</Typography>
      </Toolbar>
      <Divider />
      <div className="grid gap-y-5 mt-5 px-2">
        <CustomTextField
          fullWidth
          label="Service Name"
          select
          name="service_name"
          value={props.logQueryParameters.service_name}
          onChange={(e) => props.onChangeLogQueryParams(e)}
          items={props.serviceNames}
        />
        {(props.logQueryParameters.service_name != "") && (
          <CustomTextField
            fullWidth
            label="Operation Name"
            select
            name="operation_name"
            value={props.logQueryParameters.operation_name}
            onChange={(e) => props.onChangeLogQueryParams(e)}
            items={props.operationNames}
          />
        )}

        <InputDate
          value={moment(props.logQueryParameters.start_time_min)}
          onChange={(e) => props.onChangeDateTime(e, "start_time_min")}
          label="Start"
        />

        <InputDate
          value={moment(props.logQueryParameters.start_time_max)}
          onChange={(e) => props.onChangeDateTime(e, "start_time_max")}
          label="End"
        />

        <TextField
          value={props.logQueryParameters.num_traces}
          onChange={props.onChangeLogQueryParams}
          fullWidth
          label="Num. Logs"
          name="num_traces"
        />

        <CustomButton
          disabled={disabledButton}
          variant="contained"
          onClick={() => props.applyFilterParams()}
        >
          Apply
        </CustomButton>
      </div>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        {props.children}
      </Box>
    </Box>
  );
}
