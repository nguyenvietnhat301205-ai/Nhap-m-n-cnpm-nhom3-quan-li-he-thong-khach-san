# Nhap-m-n-cnpm-nhom3-quan-li-he-thong-khach-san
Một ứng dụng quản lí he thong khach san đơn giản bằng Python.
Họ và tên: Nguyễn Hà Châu
MSSV: 24S1020013
----------------------------
from django.db import models
from django.conf import settings


class GuestActivityLog(models.Model):
    """
    Model lưu lịch sử hoạt động của Guest/User trong hệ thống.
    Dùng cho mục đích theo dõi, kiểm tra và phân tích hành vi.
    """

    # Người thực hiện hành động (có thể null nếu là guest)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Người thực hiện"
    )

    # Mã phiên cho guest chưa đăng nhập
    session_key = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Session key"
    )

    # Hành động được thực hiện (ví dụ: view_room, login, book_room)
    action = models.CharField(
        max_length=150,
        verbose_name="Hành động"
    )

    # Mô tả chi tiết hành động
    description = models.TextField(
        blank=True,
        verbose_name="Mô tả chi tiết"
    )

    # Địa chỉ IP
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        verbose_name="Địa chỉ IP"
    )

    # Trình duyệt / thiết bị
    user_agent = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="User agent"
    )

    # Thời điểm ghi log
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Thời gian tạo"
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Guest Activity Log"
        verbose_name_plural = "Guest Activity Logs"

    def __str__(self):
        actor = self.user.username if self.user else "Guest"
        return f"{actor} - {self.action} - {self.created_at}"

