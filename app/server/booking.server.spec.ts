import prisma from "~/__mocks__/prisma";
import {
  createBooking,
  deleteBookingById,
  findBookignsByUser,
  findBookingByAccomodationId,
  findBookingId,
} from "./booking.server";
describe("Accommodation server functions ", () => {
  beforeEach(() => {
    vi.mock("../db.server", () => ({ prisma: prisma }));
  });

  describe("Calling findBookingByAccomodationId ", () => {
    test(" should return a Booking", async () => {
      const mockBooking = {
        accommodationId: 1,
        userId: 1,
        from: new Date(),
        until: new Date(),
        id: 1,
      };
      const spy = prisma.booking.findFirst.mockResolvedValue({
        ...mockBooking,
      });

      const response = await findBookingByAccomodationId(1);

      expect(response).toEqual(mockBooking);

      expect(spy).toBeCalledWith({
        where: {
          accommodationId: 1,
        },
        include: {
          accommodation: {
            include: { images: true, location: true, reviews: true },
          },
        },
      });
    });
  });
  describe("Calling findBookingId ", () => {
    test(" should return a Booking", async () => {
      const mockBooking = {
        accommodationId: 1,
        userId: 1,
        from: new Date(),
        until: new Date(),
        id: 1,
      };
      const spy = prisma.booking.findFirst.mockResolvedValue({
        ...mockBooking,
      });

      const response = await findBookingId(1);

      expect(response).toEqual(mockBooking);

      expect(spy).toBeCalledWith({
        where: {
          id: 1,
        },
        include: {
          accommodation: {
            include: { images: true, location: true, reviews: true },
          },
        },
      });
    });
  });
  describe("Calling findBookignsByUser ", () => {
    test(" should return a Booking", async () => {
      const mockBookings = [
        {
          accommodationId: 1,
          userId: 1,
          from: new Date(),
          until: new Date(),
          id: 1,
        },
        {
          accommodationId: 2,
          userId: 2,
          from: new Date(),
          until: new Date(),
          id: 2,
        },
      ];
      const spy = prisma.booking.findMany.mockResolvedValue([...mockBookings]);

      const response = await findBookignsByUser(1);

      expect(response).toEqual(mockBookings);

      expect(spy).toBeCalledWith({
        where: {
          userId: 1,
        },
        include: {
          accommodation: {
            include: { images: true, location: true, reviews: true },
          },
        },
        orderBy: {
          from: "asc",
        },
      });
    });
  });
  describe("Calling deleteBookingById ", () => {
    test(" should delete a booking", async () => {
      const mockBooking = {
        accommodationId: 1,
        userId: 1,
        from: new Date(),
        until: new Date(),
        id: 1,
      };
      const spy = prisma.booking.delete.mockResolvedValue({ ...mockBooking });

      const response = await deleteBookingById(1);

      expect(response).toEqual(mockBooking);

      expect(spy).toBeCalledWith({
        where: {
          id: 1,
        },
      });
    });
  });
  describe("Calling createBooking ", () => {
    test(" should create a booking", async () => {
      const mockBooking = {
        accommodationId: 3,
        userId: 2,
        from: new Date(),
        until: new Date(),
        id: 1,
      };
      const spy = prisma.booking.create.mockResolvedValue({ ...mockBooking });
      const from = new Date();
      const until = new Date();
      const response = await createBooking(2, 3, from, until);

      expect(response).toEqual(mockBooking);

      expect(spy).toBeCalledWith({
        data: {
          from,
          until,
          accommodation: {
            connect: {
              id: 2,
            },
          },

          user: {
            connect: {
              id: 3,
            },
          },
        },
      });
    });
  });
});
