import { ThemeProvider } from "@mui/material";
import { spaceTheme } from "./Themes";
//import "./index.css";
import ContentRouterLayout from "./components/ContentRouterLayout";
import { useSpaceTrader } from "./contexts/SpaceTraderContext";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthProviderContext";
function App() {
  const { token } = useAuth();
  const { clearData } = useSpaceTrader();
  console.log("App");
  useEffect(() => {
    console.log("App useEffect");
    if (!localStorage.getItem("token")) {
      console.log("clearing data");
      clearData();
    }
  }, [token]);

  return (
    <ThemeProvider theme={spaceTheme}>
      <ContentRouterLayout />
    </ThemeProvider>
  );
}

export default App;
