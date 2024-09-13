import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = (loadingInference,setLoadingInference) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);



  const runInference = async () => {

    setTimeout(() => {
        // setLoadingInference(false);
        moveToComparison()
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      {!loading && (
        <h2>
            Start Inference
        </h2>
      )}

      {loading && (
        <div>
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
          <p>Running inference, please wait...</p>
        </div>
      )}

      {result && <p>{result}</p>}
    </div>
  );
};

export default Loader;
