# ================================
# QUẢN LÝ KHÁCH SẠN - PYTHON CONSOLE
# ================================

from datetime import datetime

# -------------------------------
# DỮ LIỆU PHÒNG
# -------------------------------
rooms = [
    {"so_phong": "101", "loai": "Đơn", "gia": 500000, "tinh_trang": "Trống"},
    {"so_phong": "102", "loai": "Đôi", "gia": 800000, "tinh_trang": "Trống"},
    {"so_phong": "201", "loai": "VIP", "gia": 1500000, "tinh_trang": "Trống"},
]

bookings = []


# -------------------------------
def hien_thi_phong():
    print("\nDANH SÁCH PHÒNG")
    print("{:<10}{:<10}{:<15}{:<15}".format(
        "Số phòng", "Loại", "Giá", "Tình trạng"
    ))
    for r in rooms:
        print("{:<10}{:<10}{:<15}{:<15}".format(
            r["so_phong"], r["loai"], f"{r['gia']:,}", r["tinh_trang"]
        ))


# -------------------------------
def dat_phong():
    hien_thi_phong()
    so_phong = input("\nNhập số phòng muốn đặt: ")

    for r in rooms:
        if r["so_phong"] == so_phong and r["tinh_trang"] == "Trống":
            ten = input("Tên khách hàng: ")
            ngay_den = input("Ngày đến (dd/mm/yyyy): ")

            bookings.append({
                "so_phong": so_phong,
                "ten": ten,
                "ngay_den": ngay_den,
                "ngay_di": None
            })

            r["tinh_trang"] = "Đã đặt"
            print("✅ Đặt phòng thành công!")
            return

    print("❌ Phòng không tồn tại hoặc không trống!")


# -------------------------------
def check_in():
    so_phong = input("Nhập số phòng check-in: ")

    for r in rooms:
        if r["so_phong"] == so_phong and r["tinh_trang"] == "Đã đặt":
            r["tinh_trang"] = "Đang ở"
            print("✅ Check-in thành công!")
            return

    print("❌ Phòng chưa được đặt hoặc không tồn tại!")


# -------------------------------
def check_out():
    so_phong = input("Nhập số phòng check-out: ")

    for r in rooms:
        if r["so_phong"] == so_phong and r["tinh_trang"] == "Đang ở":
            ngay_di = input("Ngày trả phòng (dd/mm/yyyy): ")

            for b in bookings:
                if b["so_phong"] == so_phong and b["ngay_di"] is None:
                    b["ngay_di"] = ngay_di
                    xuat_hoa_don(b, r)
                    r["tinh_trang"] = "Trống"
                    print("✅ Check-out thành công!")
                    return

    print("❌ Phòng không đang ở!")


# -------------------------------
def xuat_hoa_don(booking, room):
    fmt = "%d/%m/%Y"
    d1 = datetime.strptime(booking["ngay_den"], fmt)
    d2 = datetime.strptime(booking["ngay_di"], fmt)

    so_ngay = (d2 - d1).days
    if so_ngay == 0:
        so_ngay = 1

    tong_tien = so_ngay * room["gia"]

    print("\n===== HÓA ĐƠN =====")
    print("Khách hàng:", booking["ten"])
    print("Số phòng:", booking["so_phong"])
    print("Số ngày ở:", so_ngay)
    print("Đơn giá:", f"{room['gia']:,} VNĐ")
    print("TỔNG TIỀN:", f"{tong_tien:,} VNĐ")
    print("===================")


# -------------------------------
def bao_gia():
    hien_thi_phong()
    so_phong = input("\nNhập số phòng cần báo giá: ")

    for r in rooms:
        if r["so_phong"] == so_phong:
            so_ngay = int(input("Số ngày dự kiến ở: "))
            print("💰 Giá dự kiến:",
                  f"{so_ngay * r['gia']:,} VNĐ")
            return

    print("❌ Không tìm thấy phòng!")


# -------------------------------
def menu():
    while True:
        print("\n===== MENU =====")
        print("1. Tạo đặt phòng")
        print("2. Check in")
        print("3. Check out")
        print("4. Báo giá / Xuất hóa đơn")
        print("5. Xem danh sách phòng")
        print("0. Thoát")

        ch = input("Chọn: ")

        if ch == "1":
            dat_phong()
        elif ch == "2":
            check_in()
        elif ch == "3":
            check_out()
        elif ch == "4":
            bao_gia()
        elif ch == "5":
            hien_thi_phong()
        elif ch == "0":
            print("👋 Thoát chương trình")
            break
        else:
            print("❌ Lựa chọn không hợp lệ!")


# -------------------------------
menu()
