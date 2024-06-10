import { DateTime } from "luxon";
import { expect, vi } from "vitest";

import prisma from "~/__mocks__/prisma";

import {
  getAccommodations,
  getAccomodationDetail,
  getBookingAndDatesExcludingCurrentBooking,
  updateDatesForBooking,
} from "./accomodation.server";

describe("Accommodation server functions ", () => {
  beforeEach(() => {
    vi.mock("../db.server", () => ({ prisma: prisma }));
  });
  describe("Given a valid id from an existing item ", () => {
    test("getAccomodationDetail should get an Accommodation from the database and booked dates correctly for it ", async () => {
      const acc = {
        id: 1,
        userId: 1,
        level: "Intermediate",
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockedBookings = [
        {
          id: 1,
          accommodationId: 1,
          userId: 1,
          from: DateTime.fromISO("2024-06-01").toJSDate(),
          until: DateTime.fromISO("2024-06-05").toJSDate(),
        },
        {
          id: 1,
          accommodationId: 1,
          userId: 1,
          from: DateTime.fromISO("2024-06-10").toJSDate(),
          until: DateTime.fromISO("2024-06-15").toJSDate(),
        },
      ];

      const expectedBookedDates = [
        DateTime.fromISO("2024-06-01").toJSDate(),
        DateTime.fromISO("2024-06-02").toJSDate(),
        DateTime.fromISO("2024-06-03").toJSDate(),
        DateTime.fromISO("2024-06-04").toJSDate(),
        DateTime.fromISO("2024-06-05").toJSDate(),
        DateTime.fromISO("2024-06-10").toJSDate(),
        DateTime.fromISO("2024-06-11").toJSDate(),
        DateTime.fromISO("2024-06-12").toJSDate(),
        DateTime.fromISO("2024-06-13").toJSDate(),
        DateTime.fromISO("2024-06-14").toJSDate(),
        DateTime.fromISO("2024-06-15").toJSDate(),
      ];

      prisma.accommodation.findUnique.mockResolvedValue({ ...acc });
      prisma.booking.findMany.mockResolvedValue([...mockedBookings]);

      const testedAcc = await getAccomodationDetail(1);

      expect(testedAcc.level).toEqual("Intermediate");
      expect(testedAcc.price).toEqual(200);
      expect(testedAcc.bookedDates).toEqual(expectedBookedDates);
    });
  });
  describe("Given a booking id and dates ", () => {
    test("updateDatesForBooking should update booking correctly", async () => {
      const spy = prisma.booking.update;

      const from = DateTime.now().toJSDate();
      const until = DateTime.now().plus({ day: 5 }).toJSDate();

      await updateDatesForBooking(1, from, until);

      expect(spy).toBeCalledWith({
        data: {
          from,
          until,
        },
        where: {
          id: 1,
        },
      });
    });
  });
  describe("Calling getAccommodations ", () => {
    test(" should return a list of accommodations", async () => {
      const spy = prisma.accommodation.findMany;
      const mockAccommodations=[
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 1,
          level: 'intermediate',
          price: 200,
          userId: 1,

        }
      ]

      spy.mockResolvedValue(mockAccommodations)

      const response=await getAccommodations();

      expect(response).toEqual(mockAccommodations)

      expect(spy).toBeCalledWith({
        include: { images: true, location: true, reviews: true },
      });
    });
  });

  
  describe("Given a booking id from an existing item ", () => {
    test("getBookingAndDatesExcludingCurrentBooking should get an Booking and booking dates excluding current one id ", async () => {
      const acc = {
        id: 1,
        userId: 1,
        level: "Intermediate",
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockedBookings = [
        {
          id: 1,
          accommodationId: 1,
          userId: 1,
          from: DateTime.fromISO("2024-06-01").toJSDate(),
          until: DateTime.fromISO("2024-06-05").toJSDate(),
        },
        {
          id: 2,
          accommodationId: 2,
          userId: 2,
          from: DateTime.fromISO("2024-06-10").toJSDate(),
          until: DateTime.fromISO("2024-06-15").toJSDate(),
        },
      ];

      const expectedBookedDates = [
        DateTime.fromISO("2024-06-10").toJSDate(),
        DateTime.fromISO("2024-06-11").toJSDate(),
        DateTime.fromISO("2024-06-12").toJSDate(),
        DateTime.fromISO("2024-06-13").toJSDate(),
        DateTime.fromISO("2024-06-14").toJSDate(),
        DateTime.fromISO("2024-06-15").toJSDate(),
      ];

      prisma.accommodation.findUnique.mockResolvedValue({ ...acc });
      prisma.booking.findMany.mockResolvedValue([...mockedBookings]);
      prisma.booking.findFirst.mockResolvedValue({...mockedBookings[0]});

      const response = await getBookingAndDatesExcludingCurrentBooking(1);

      expect(response.booking.id).toEqual(1);
      expect(response.datesToBlock).toEqual(expectedBookedDates);
    });
  });
});
