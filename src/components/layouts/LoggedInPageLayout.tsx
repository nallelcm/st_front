import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
//import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { Container, Paper } from "@mui/material";

const drawerWidth = 200;

const LoggedInPageLayout = ({ children }: any) => {
  return (
    <Box sx={{ display: "block" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 1,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box>
          <List>
            <ListItem key={"Home"} disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={"Test"} disablePadding>
              <ListItemButton component={Link} to="/test">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Test"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Container sx={{ position: "fixed", left: 0 }}>
        <Toolbar />
        <Box className="main-content">{children}</Box>
      </Container>
    </Box>
  );
};

// import "./pagelayout.css";
// const PageLayout = ({ children }: any) => {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <header className="bg-white shadow">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold py-4">My App</h1>
//         </div>
//       </header>
//       <main className="container mx-auto px-4 py-4">{children}</main>
//     </div>
//   );
// };

export default LoggedInPageLayout;
