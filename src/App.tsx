import { Provider } from "react-redux";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Main />
    </Provider>
  );
}

export default App;
