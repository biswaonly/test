import { useState } from "react";
import "./App.css";
import { getRandomBool, getSuggestions } from "./utils";

function App() {
  const [searchData, setSearchData] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [err, setErr] = useState(false);

  const handleChange = e => {
    setSearchData(e.target.value);
    (async () => {
      try {
        let res = await getSuggestions(e.target.value);
        setErr(false);
        setSearchRes(res);
      } catch (error) {

        setErr(true);
        setSearchRes([]);
      }
    })();
  };

  return (
    <div className="App">
      <input type="text" onChange={handleChange} value={searchData} />

      <div>
        {(searchRes.length &&
          !err &&
          searchRes.map(e => {
            return <div key={e}>{e}</div>;
          })) || <div>No Data Found</div>}
      </div>
    </div>
  );
}

export default App;
