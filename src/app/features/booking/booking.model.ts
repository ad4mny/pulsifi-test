export interface BookingFilters {
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

export interface Destination {
  id: number;
  name: string;
}

export interface Booking {
  id: number;
  userId: number;
  destinationId: number;
  status: string;
  checkInDate: Date;
  checkOutDate: Date;
  roomType: string;
  addOns: string;
  cancelReason: string;
  cancelBy: string;
  destination?: Destination;
}
