import { ThemeProvider } from "@mui/material";
import { spaceTheme } from "./Themes";
//import "./index.css";
import ContentRouterLayout from "./components/ContentRouterLayout";

function App() {
  return (
    <ThemeProvider theme={spaceTheme}>
      <ContentRouterLayout />
    </ThemeProvider>
  );
}

export default App;
