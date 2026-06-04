import React, { useState } from "react";
import axios from "axios";
const [preview, setPreview] = useState(null);
const [status, setStatus] = useState("");
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
  setStatus("Processing image...");

  const response = await axios.post(
    "https://visioncut-backend-production.up.railway.app/api/process",
    formData,
    { responseType: "blob" }
  );

  const imageUrl = URL.createObjectURL(response.data);
  setResult(imageUrl);
  setStatus("✅ Done! Image processed successfully.");
} catch (error) {
  setStatus("❌ Failed to process image. Please try again.");
} finally {
  setLoading(false);
}
  };

  return (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif"
  }}>
    <div style={{
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      textAlign: "center"
    }}>
      <h1 style={{ marginBottom: "10px" }}>🎨 VisionCut AI</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Smart Image Processing in One Click
      </p>

      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setStatus("");
  }}
/>
{preview && (
  <div style={{ margin: "15px 0" }}>
    <p style={{ marginBottom: "5px", color: "#555" }}>Preview</p>
    <img
      src={preview}
      alt="preview"
      style={{
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #ddd"
      }}
    />
  </div>
)}
      <button
        onClick={upload}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2c5364",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        {loading ? "Processing..." : "Process Image"}
      </button>
{status && (
  <p style={{ marginTop: "15px", color: "#333" }}>
    {status}
  </p>
)}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={result}
            alt="Result"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  </div>
);
}

export default App;