import { PaperProvider } from "react-native-paper";
import Home from "./Home";

export default function App() {
  return (
    <PaperProvider>
      <Home />
    </PaperProvider>
  );
}
