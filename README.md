# Nhap-m-n-cnpm-nhom3-quan-li-he-thong-khach-san
#Một ứng dụng quản lí he thong khach san đơn giản bằng Python.
Nhận phòng
class Room:
    def __init__(self, room_number, room_type, price):
        self.room_number = room_number
        self.room_type = room_type
        self.price = price
        self.is_available = True
        self.guest_name = None

    def check_in(self, guest_name):
        if self.is_available:
            self.is_available = False
            self.guest_name = guest_name
            print(f"✓ Nhận phòng {self.room_number} cho khách {guest_name}")
        else:
            print(f"✗ Phòng {self.room_number} đã có khách.")
class Hotel:
    def __init__(self):
        self.rooms = [
            Room(101, "Đơn", 300000),
            Room(102, "Đơn", 300000),
            Room(201, "Đôi", 500000),
            Room(202, "Đôi", 500000)
        ]

    def check_in_room(self):
        room_number = int(input("Nhập số phòng muốn nhận: "))
        guest_name = input("Tên khách: ")

        for room in self.rooms:
            if room.room_number == room_number:
                room.check_in(guest_name)
                return
        
        print("✗ Không tìm thấy phòng!")

        print()
