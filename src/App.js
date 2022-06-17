import { Provider } from "react-redux";
import { MatrixMain } from "./components/MatrixMain";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <MatrixMain />
   </Provider>
  )
 
}

export default App;
