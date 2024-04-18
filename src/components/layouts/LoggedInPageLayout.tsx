import {
  Container,
  Typography,
  List,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

// Icons
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useAuth } from "../../contexts/AuthProviderContext";
import { Fragment, useEffect, useState } from "react";

const drawerWidth = 200;

interface LayoutListItemProps {
  text: string;
  icon: any;
  link?: string;
  clickAction?: () => void;
  location: string;
}

const LayoutListItem: React.FC<LayoutListItemProps> = ({
  text,
  icon,
  link,
  clickAction,
  location,
}: any) => {
  const CustomListItemButton = ({ children }: any) => {
    if (clickAction) {
      return <ListItemButton onClick={clickAction}>{children}</ListItemButton>;
    } else {
      return (
        <ListItemButton selected={location === link} component={Link} to={link}>
          {children}
        </ListItemButton>
      );
    }
  };
  return (
    <ListItem disablePadding>
      <CustomListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </CustomListItemButton>
    </ListItem>
  );
};

const LoggedInPageLayout = ({ children }: any) => {
  const location = useLocation();
  const { logout, userData, validateLogin } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "Fleet", icon: <RocketLaunchIcon />, link: "/fleet" },
    { text: "Contracts", icon: <AssignmentIcon />, link: "/contracts" },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      clickAction: logout,
      divider: true,
    },
  ];

  useEffect(() => {
    const isValid = validateLogin();
    if (!isValid) {
      logout();
    }
  }, []);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "block" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            SpaceTrader API
          </Typography>
          <Typography variant="h6" noWrap component="div" flex={1}></Typography>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                {userData?.username}'s Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
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
            {menuItems.map((item) => (
              <Fragment key={item.text + "lli"}>
                {item.divider && <Divider />}
                <LayoutListItem
                  text={item.text}
                  icon={item.icon}
                  link={item.link}
                  clickAction={item.clickAction}
                  location={location.pathname}
                />
              </Fragment>
            ))}
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
export default LoggedInPageLayout;
