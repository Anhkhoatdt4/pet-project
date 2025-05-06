package com.petprojectbe.petproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue
    private UUID id;

    @Temporal(TemporalType.TIMESTAMP)
    // TemporalType.TIMESTAMP will store both date and time
    private Date orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    // FechType.LAZY will load the user only when it's needed
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "address_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    // Tostring.exclude khong bao gom address trong toString
    private Address address;

    @Column(nullable = false)
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private String shipmentTrackingNumber;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDeliveryDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<OrderItem> orderItems;

    private Double discount;

    @OneToOne(fetch = FetchType.LAZY,mappedBy = "order",cascade = CascadeType.ALL)
    @ToString.Exclude
    private Payment payment;
}
