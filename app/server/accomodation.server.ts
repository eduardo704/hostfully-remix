import { DateTime, Interval } from "luxon";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";

export async function createBooking(
  accommodationId: number,
  userId: number,
  from: Date,
  to: Date,
) {
  const response = await prisma.booking.create({
    data: {
      from,
      until: to,
      accommodation: {
        connect: {
          id: accommodationId,
        },
      },

      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return response;
}
export async function updateDatesForBooking(
  bookingId: number,
  from: Date,
  to: Date,
) {
  const response = await prisma.booking.update({
    data: {
      from,
      until: to,
    },
    where: {
      id: bookingId
    }
  });
  return response;
}

export async function getBookedDates(accommodationId: number) {
  const now = new Date();
  const bookings = await prisma.booking.findMany({
    where: {
      until: {
        gte: now,
      },
      accommodationId: {
        equals: accommodationId,
      },
    },
  });
  const dates = bookings
    .flatMap((booking) => {
      return getDatesFromInterval(booking.from, booking.until);
    })
    .map((date) => {
      invariant(date);
      const mappedDate = date?.toJSDate();
      return mappedDate;
    });
  return dates;
}

export function getDatesFromInterval(from: Date, util: Date) {
  const interval = Interval.fromDateTimes(
    DateTime.fromJSDate(from),
    DateTime.fromJSDate(util).plus({ day: 1 }),
  );
  const mappedDates = interval.splitBy({ day: 1 }).map((d) => d.start);

  return mappedDates;
}

export async function getAccomodationDetail(accommodationId: number) {
  const acc$ = prisma.accommodation.findUnique({
    where: {
      id: accommodationId,
    },
  });
  const bookedDates$ = getBookedDates(accommodationId);

  const [acc, booked] = await Promise.all([acc$, bookedDates$]);

  return {
    ...acc,
    bookedDates: booked,
  };
}
