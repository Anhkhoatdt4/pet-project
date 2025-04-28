package com.petprojectbe.petproject.entity;

public enum OrderStatus {
    PENDING,      // Chờ xác nhận
    CONFIRMED,    // Đã xác nhận
    PROCESSING,   // Đang xử lý
    SHIPPED,      // Đã giao hàng, giao cho don vi van chuyen, ch den tay khach
    DELIVERED,    // Đã giao thành công , da den tay khach hang
    CANCELLED     // Đã hủy
}
