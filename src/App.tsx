import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import Router from "./router/router";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </ThemeProvider>
  );
}
