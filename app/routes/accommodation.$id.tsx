import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import { prisma } from "~/db.server";
import AccomodationDetail from "~/features/accommodation/detail/accommodation-detail";

import { createNote } from "~/models/note.server";
import { createBooking } from "~/server/accomodation.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = parseInt(params.id);
  const accommodation = await prisma.accommodation.findFirst({
    include: { images: true, location: true, reviews: true },
    where: {
      id: id,
    },
  });
  const bookings = await prisma.booking.findFirst({
    where: {
      accommodationId: id,
    },
  });

  return { accommodation, bookings };
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

  return redirect(``);
};

export default function AccommodationPage() {
  const { accommodation , bookings } = useLoaderData<typeof loader>();

  console.log(bookings)

  return <AccomodationDetail accommodation={accommodation} />;
}
