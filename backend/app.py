from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)  # ✅ هذا السطر هو الحل

@app.route("/api/process", methods=["POST"])
def process():
    file = request.files["file"]
    img = Image.open(file)

    # تحويل الصورة إلى أبيض وأسود (تجربة)
    img = img.convert("L")

    img.save("output.png")

    return send_file("output.png", mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True)