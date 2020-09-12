import React, { useEffect, useState } from 'react';
import { makeCancelableGet } from './utils';

const Fish = function Fish() {
  const [fish, setFish] = useState(() => {});
  const [count, setCount] = useState(() => 0);
  const [refetchID, setID] = useState(() => 0);
  const reFetch = () => {
    setID((id) => id + 1);
  };

  useEffect(() => {
    console.log('exec');
    let unmount = () => {};
    function fetchFish() {
      const { request, cancel } = makeCancelableGet({
        url: 'https://acnhapi.com/v1/fish',
      });

      request
        .then((res) => {
          setFish(res.data.bitterling);
          setCount((c) => c + 1);
        })
        .catch((error) => {
          console.log(error);
        });
      unmount = cancel;
    }
    fetchFish();

    return unmount;
  }, [refetchID]);

  return (
    <div className="App">
      <button onClick={reFetch}>Refetch</button>
      <br />
      {count}
      <pre>{JSON.stringify(fish, null, 2)}</pre>
    </div>
  );
};

export default function App() {
  const [k, setK] = useState(() => 0);
  return (
    <div>
      <button onClick={() => setK((k) => k + 1)}>Test</button>
      <Fish key={k} />
    </div>
  );
}
