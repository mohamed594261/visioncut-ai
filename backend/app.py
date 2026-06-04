from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

@app.route("/api/process", methods=["POST"])
def process():
    file = request.files["file"]
    img = Image.open(file)

    # تجربة: تحويل الصورة إلى أبيض وأسود
    img = img.convert("L")
    img.save("output.png")

    return send_file("output.png", mimetype="image/png")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)