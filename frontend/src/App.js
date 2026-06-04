import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!image) {
      alert("اختر صورة أولاً");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://visioncut-backend-production.up.railway.app/api/process",
        formData,
        { responseType: "blob" }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setResult(imageUrl);
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالسيرفر");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>🔥 VisionCut AI</h1>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <br /><br />
       <h2>Upload Image</h2>
      <button onClick={upload} disabled={loading}>
        {loading ? "Processing..." : "Process Image"}
      </button>

      <br /><br />

      {result && <img src={result} alt="Result" width="300" />}
    </div>
  );
}

export default App;