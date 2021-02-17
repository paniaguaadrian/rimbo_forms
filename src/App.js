// React Components
import { Route } from "react-router-dom";

// Custom Components
import RegisterTenancy from "./components/RegisterTenancy";

// Normalize & Generic styles
import "./styles/generic.scss";

const App = () => {
  return (
    <>
      <Route exact path="/register/rj1" component={RegisterTenancy} />;
    </>
  );
};

export default App;
