# ==========================================
# CƠ SỞ DỮ LIỆU GIẢ LẬP (PROTOTYPE DATA)
# ==========================================

# Danh sách tài liệu học tập (Dành cho US 07)
learning_materials = [
    {"id": 1, "name": "Giao_trinh_Python.pdf", "type": ".pdf", "owner": "GV_NguyenVanA"},
    {"id": 2, "name": "Bai_tap_lon.docx", "type": ".docx", "owner": "GV_TranThiB"}
]

# Danh sách người dùng (Dành cho chức năng Quản trị viên - image_3a6d4a.png)
users_list = [
    {"name": "Nguyen Van A", "email": "nva@gmail.com", "role": "Giảng viên", "status": "Hoạt động"},
    {"name": "Tran Thi B", "email": "ttb@gmail.com", "role": "Sinh viên", "status": "Hoạt động"},
    {"name": "Admin Pro", "email": "admin@gmail.com", "role": "Quản trị viên", "status": "Hoạt động"}
]

# ==========================================
# CHỨC NĂNG US 07: QUẢN LÝ TÀI LIỆU
# ==========================================

def upload_material(role):
    """Giảng viên tải lên tài liệu (US 07)"""
    if role != "Giảng viên":
        return "❌ Chỉ Giảng viên mới có quyền tải lên tài liệu!"
    
    name = input("Nhập tên tài liệu: ")
    ext = input("Nhập loại file (.pdf, .docx, .pptx): ").lower()
    
    # Kiểm tra loại file hợp lệ
    if ext not in [".pdf", ".docx", ".pptx"]:
        return "❌ Loại file không hợp lệ! Chỉ chấp nhận .pdf, .docx, .pptx."
    
    new_id = len(learning_materials) + 1
    learning_materials.append({"id": new_id, "name": name + ext, "type": ext, "owner": "Giảng viên"})
    return f"✅ Tải lên tài liệu '{name}{ext}' thành công!"

def delete_material(role):
    """Giảng viên xóa tài liệu (US 07)"""
    if role != "Giảng viên":
        return "❌ Chỉ Giảng viên mới có quyền xóa tài liệu!"
    
    print("\n--- Danh sách tài liệu hiện có ---")
    for doc in learning_materials:
        print(f"ID: {doc['id']} - Tên: {doc['name']}")
    
    doc_id = int(input("Nhập ID tài liệu muốn xóa: "))
    for i, doc in enumerate(learning_materials):
        if doc['id'] == doc_id:
            del learning_materials[i]
            return "✅ Xóa tài liệu thành công!"
    return "❌ Không tìm thấy tài liệu với ID này."

def view_materials():
    """Sinh viên xem danh sách tài liệu (US 07)"""
    print("\n--- 📚 DANH SÁCH TÀI LIỆU HỌC TẬP ---")
    if not learning_materials:
        print("Trống.")
    for doc in learning_materials:
        print(f"[{doc['type'].upper()}] {doc['name']} - Người đăng: {doc['owner']}")

# ==========================================
# CHỨC NĂNG QUẢN TRỊ VIÊN (IMAGE_3A6D4A.PNG)
# ==========================================

def admin_manage_users(role):
    """Quản trị viên quản lý người dùng (image_3a6d4a.png)"""
    if role != "Quản trị viên":
    return "❌ Quyền truy cập bị từ chối! Chỉ dành cho Quản trị viên."
    
    print("\n--- 👥 QUẢN LÝ NGƯỜI DÙNG ---")
    # Hiển thị danh sách với thông tin cơ bản
    for u in users_list:
        print(f"Tên: {u['name']} | Email: {u['email']} | Vai trò: {u['role']} | Trạng thái: {u['status']}")
    
    # Chức năng tìm kiếm và lọc
    search_term = input("\nNhập tên hoặc email để tìm kiếm/lọc: ").lower()
    results = [u for u in users_list if search_term in u['name'].lower() or search_term in u['email'].lower()]
    
    print(f"\n🔍 Kết quả tìm kiếm cho '{search_term}':")
    for r in results:
        print(f"-> {r['name']} ({r['role']})")

# ==========================================
# MENU CHƯƠNG TRÌNH
# ==========================================

def main_menu():
    print("--- 🎓 HỆ THỐNG QUẢN LÝ HỌC TẬP ---")
    role = input("Bạn là ai? (Giảng viên/Sinh viên/Quản trị viên): ")
    
    while True:
        print(f"\n--- MENU ({role.upper()}) ---")
        if role == "Giảng viên":
            print("1. Tải lên tài liệu")
            print("2. Xóa tài liệu")
            print("3. Xem danh sách tài liệu")
        elif role == "Sinh viên":
            print("1. Xem danh sách tài liệu")
        elif role == "Quản trị viên":
            print("1. Quản lý người dùng (Danh sách/Tìm kiếm/Lọc)")
        
        print("0. Thoát")
        choice = input("Chọn chức năng: ")
        
        if choice == "0": break
        
        if role == "Giảng viên":
            if choice == "1": print(upload_material(role))
            elif choice == "2": print(delete_material(role))
            elif choice == "3": view_materials()
        elif role == "Sinh viên" and choice == "1":
            view_materials()
        elif role == "Quản trị viên" and choice == "1":
            admin_manage_users(role)

if __name__ == "__main__":
    main_menu()