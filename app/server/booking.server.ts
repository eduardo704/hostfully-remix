import { prisma } from "~/db.server";

export async function findBookingByAccomodationId(accId: number) {
  return await prisma.booking.findFirst({
    where: {
      accommodationId: accId,
    },
    include: {
      accommodation: {
        include: { images: true, location: true, reviews: true },
      },
    },
  });
}
export async function deleteBookingById(bookingId: number) {
  return await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
}
export async function findBookingId(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: {
      accommodation: {
        include: { images: true, location: true, reviews: true },
      },
    },
  });
}
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
export async function findBookignsByUser(userId: number) {
  return await prisma.booking.findMany({
    where: {
      userId: userId,
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
}
