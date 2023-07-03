import "./src/config/firebase";
import Router from "./src/rooter";
import { Root as PopupRootProvider } from "react-native-popup-confirm-toast";
export default function App() {
  return (
    <PopupRootProvider>
      <Router />
    </PopupRootProvider>
  );
}
