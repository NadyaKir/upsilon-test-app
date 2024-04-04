import axios from "axios";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <Provider store={store}></Provider>;
}

export default App;
