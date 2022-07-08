import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../../context/auth-context";
import SearchField from "../../Search/Search";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

export default function ApplicationBar(props) {
  const authContext = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List>
              <ListItem button disabled>
                <ListItemText primary="Profile" />
              </ListItem>

              <ListItem button>
                <ListItemText
                  primary="Logout"
                  onClick={() => authContext.logout()}
                />
              </ListItem>
            </List>
          </Drawer>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, marginRight: -20 }}
          >
            Series
          </Typography>
          <SearchField
            loadSeries={props.loadSeries}
            filterableTitle={props.filterableTitle}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
