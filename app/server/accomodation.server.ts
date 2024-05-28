import { DateTime, Interval } from "luxon";

import { prisma } from "~/db.server";
// import * as runtime from '@prisma/client/runtime/library';
// import $Types = runtime.Types // general types
// import $Public = runtime.Types.Public
// import $Utils = runtime.Types.Utils
// import $Extensions = runtime.Types.Extensions

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

export async function getBookedDates(accommodationId: number) {
  const now = new Date();
  // const formattedValue = DateTime.fromISO(now, {zone: 'utc'});
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
      return date?.toJSDate();
    });
  return dates;
}

function getDatesFromInterval(from: Date, util: Date) {
  const interval = Interval.fromDateTimes(
    DateTime.fromJSDate(from),
    DateTime.fromJSDate(util).plus({day: 1}),
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
