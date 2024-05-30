// import { prismaMock } from "prisma.mock.singleton"
import { expect, vi } from "vitest";

import prisma from "~/__mocks__/prisma";

import {
  getAccomodationDetail,
  updateDatesForBooking,
} from "./accomodation.server";

import { Prisma } from "@prisma/client";

test("should getAccomodationDetail ", async () => {
  const acc = {
    // bookedDates: [],
    id: 1,
    userId: 1,
    level: "Intermediate",
    price: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  vi.mock("~/db.server");

  prisma.accommodation.findUnique.mockResolvedValue({ ...acc });

  const testedAcc = await getAccomodationDetail(1);

  expect(testedAcc.level).toEqual("Intermediate");
});
