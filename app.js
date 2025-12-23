// Dữ liệu giả lập
const dataRooms = [
    { name: "Phòng 101", type: "Standard", price: 500000 },
    { name: "Phòng 201", type: "VIP", price: 1500000 }
];

document.getElementById('searchBtn').addEventListener('click', function() {
    const selectedType = document.getElementById('roomType').value;
    const maxPrice = document.getElementById('priceRange').value;
    const listUl = document.getElementById('roomList');
    const alertMsg = document.getElementById('noRoomAlert');

    // Xóa danh sách cũ
    listUl.innerHTML = "";
    
    // Logic lọc (Checklist mục 2)
    const results = dataRooms.filter(room => {
        return (selectedType === "all" || room.type === selectedType) &&
               (!maxPrice || room.price <= maxPrice);
    });

    // Checklist mục 4 & 5: Hiển thị hoặc thông báo
    if (results.length === 0) {
        alertMsg.classList.remove('hidden'); // Hiện thông báo hết phòng
    } else {
        alertMsg.classList.add('hidden'); // Ẩn thông báo
        results.forEach(room => {
            let li = document.createElement('li');
            li.textContent = `${room.name} - ${room.type} - ${room.price}đ`;
            listUl.appendChild(li);
        });
    }
});