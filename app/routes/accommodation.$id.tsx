import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import AccomodationDetail from "~/features/accommodation/detail/accommodation-detail";
import { createBooking, getBookedDates } from "~/server/accomodation.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Id must be present and be a number")
  const accId = parseInt(params.id);
  const accommodation = await prisma.accommodation.findFirst({
    include: { images: true, location: true, reviews: true },
    where: {
      id: accId,
    },
  });
  const bookings = await prisma.booking.findFirst({
    where: {
      accommodationId: accId,
    },
  });
  const bookedDates = await getBookedDates(accId);

  return { accommodation, bookings, bookedDates };
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  console.log(formData);
  const accId = formData.get("id") as string;
  const from = formData.get("from") as string;
  const until = formData.get("until") as string;
  // const userId = 1;
  // const body = formData.get("body");

  const booking = await createBooking(
    parseInt(accId),
    userId,
    DateTime.fromISO(from).toJSDate(),
    DateTime.fromISO(until).toJSDate(),
  );

  return booking;
};

export default function AccommodationPage() {
  const { accommodation, bookedDates } =
    useLoaderData<typeof loader>();

  return (
    <AccomodationDetail
      accommodation={accommodation}
      bookedDates={bookedDates}
    />
  );
}
