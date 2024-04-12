import { ThemeProvider } from "@mui/material";
import { spaceTheme } from "./Themes";
import "./App.css";
import ContentRouterLayout from "./components/ContentRouterLayout";

function App() {
  return (
    <ThemeProvider theme={spaceTheme}>
      <ContentRouterLayout />
    </ThemeProvider>
  );
}

export default App;
