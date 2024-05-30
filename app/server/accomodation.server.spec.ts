// import { prismaMock } from "prisma.mock.singleton"
import { expect, vi } from "vitest";
import { DateTime } from "luxon";

import prisma from "~/__mocks__/prisma";

import {
  getAccomodationDetail,
  updateDatesForBooking,
} from "./accomodation.server";
// import { getPrismaClient } from "~/db.server";

describe("Accommodation server functions ", () => {
  beforeEach(() => {
    vi.mock("../db.server", () => ({ prisma: prisma }));
  });
  describe("Given a valid id from an existing item ", () => {
    test("getAccomodationDetail should get an Accommodation from the database and booked dates correctly for it ", async () => {
      const acc = {
        // bookedDates: [],
        id: 1,
        userId: 1,
        level: "Intermediate",
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.accommodation.findUnique.mockResolvedValue({ ...acc });

      const testedAcc = await getAccomodationDetail(1);

      expect(testedAcc.level).toEqual("Intermediate");
    });
  });
  // describe("Given a booking id and dates ", () => {
  //   test("updateDatesForBooking should update booking correctly", async () => {
  //     console.log(prisma.booking);
  //     const spy = prisma.booking.update;

  //     const from = DateTime.now();
  //     const until = DateTime.now().plus({ day: 5 });

  //     await updateDatesForBooking(1, from.toJSDate(), until.toJSDate());

  //     expect(spy).toBeCalledWith({
  //       data: {
  //         from,
  //         until,
  //       },
  //       where: {
  //         id: 1,
  //       },
  //     });
  //   });
  // });
});
