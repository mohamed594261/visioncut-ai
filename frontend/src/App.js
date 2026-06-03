import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);

  const upload = async () => {
    if (!image) {
      alert("اختر صورة أولاً");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    const res = await axios.post("http://127.0.0.1:5000/api/process", formData, {
      responseType: "blob",
    });

    const url = URL.createObjectURL(res.data);
    document.getElementById("result").src = url;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🔥 VisionCut AI</h1>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <br /><br />

      <button onClick={upload}>Process Image</button>

      <br /><br />
      <img id="result" width="300" alt="result" />
    </div>
  );
}

export default App;