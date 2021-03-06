import Axios from "axios";
import React, { useEffect, useState } from "react";
import api from "./utils";

const Fish = function Fish() {
  const [fish, setFish] = useState(() => {});
  const [isLoading, setLoading] = useState(() => false);
  const [fishId, setID] = useState(() => 1);
  const reFetch = () => {
    setID((id) => id + 1);
  };

  useEffect(() => {
    let unmount = () => {};
    function fetchFish() {
      setLoading(true);
      const request = api.get("https://acnhapi.com/v1a/fish/" + fishId);
      request
        .then((res) => {
          setFish(res.data);
          setLoading(false);
        })
        .catch((error) => {
          if (!Axios.isCancel(error)) {
            setLoading(false);
          }
        });
      unmount = request.cancel;
    }
    fetchFish();

    return unmount;
  }, [fishId]);

  return (
    <div className="App">
      <button onClick={reFetch}>Next fish</button>
      <br />
      {isLoading ? (
        <pre>Loading...</pre>
      ) : (
        <pre>{JSON.stringify(fish, null, 2)}</pre>
      )}
    </div>
  );
};

export default function App() {
  const [k, setK] = useState(0);
  return (
    <div>
      <button onClick={() => setK((k) => k + 1)}>Reset</button>
      <Fish key={k} />
    </div>
  );
}
