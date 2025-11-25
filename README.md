# Nhap-m-n-cnpm-nhom3-quan-li-he-thong-khach-san
#Một ứng dụng quản lí he thong khach san đơn giản bằng Python.
#Họ tên: Ngô Thị Huyền Phúc
#MSSV: 24S1020061
#https://github.com/Huyenphuc1234
#Email: huyenphuc1235@example.com
# src/main.py

from utils import calculate_sum

def run_project():
    """Hàm chạy logic chính của dự án."""
    a = 5
    b = 10
    result = calculate_sum(a, b)
    print(f"Kết quả của {a} + {b} là: {result}")

if __name__ == "__main__":
    run_project()
from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def welcome():
    # Lấy tên khách nếu URL có ?name=...
    guest_name = request.args.get("name", "Quý khách")

    message = f"Chào mừng {guest_name} đến với khách sạn Sunshine Hotel! Chúc quý khách một ngày tốt lành 🌟"
    return message

if __name__ == "__main__":
    app.run(debug=True)
if
SELECT id, username, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC;
SELECT id, username, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC;

.
