// types.ts

// User type
export interface User {
    id: string; // UUID
    name: string;
    email: string;
    created_at: string; // Timestamp
    updated_at: string; // Timestamp
}
  
// Court type
export interface Court {
    id?: string; // UUID
    name: string;
    location: string;
    description: string;
    host_id?: string; // Foreign Key - User (host) ID
}

// Court Image type
export interface CourtImage {
    id: string; // UUID
    court_id: string; // Foreign Key - Court ID
    image_url: string; // URL of the court image
    created_at: string; // Timestamp
    updated_at: string; // Timestamp
}
  
// Slot type
export interface Slot {
    id: string; // UUID
    court_id: string; // Foreign Key - Court ID
    start_time: string; // not Timestamp
    end_time: string; // not Timestamp
    price: number; // Price for the slot
    is_booked: boolean; // Whether the slot is booked or not
    created_at: string; // Timestamp
    updated_at: string; // Timestamp
}
  
// Booking type
export interface Booking {
    id: string; // UUID
    user_id: string; // Foreign Key - User ID
    slot_id: string; // Foreign Key - Slot ID
    total_price: number; // Total price for the booking
    payment_status: 'Pending' | 'Completed' | 'Failed'; // Payment status
    payment_id: string | null; // Payment ID (nullable if no payment)
    created_at: string; // Timestamp
}
  
// Payment type
export interface Payment {
    id: string; // UUID
    booking_id: string; // Foreign Key - Booking ID
    payment_status: 'Success' | 'Failure'; // Payment status
    amount: number; // Amount paid
    transaction_id: string; // Transaction ID (unique for each transaction)
    created_at: string; // Timestamp
}
