import "./src/config/firebase";
import Router from "./src/rooter";
import { Root } from "popup-ui";
export default function App() {
  return (
    <Root>
      <Router />
    </Root>
  );
}
