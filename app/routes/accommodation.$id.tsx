import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import invariant from "tiny-invariant";

import AccomodationDetail from "~/features/accommodation/detail/accommodation-detail";
import { Accommodation } from "~/models/accommodation.model";
import {
  findAccommodationById,
  getBookedDates,
} from "~/server/accomodation.server";
import { createBooking } from "~/server/booking.server";
import { FullAccommodation, prismaAccToFrontAcc } from "~/server/mappers/accommodation.mapper";
import { requireUserId } from "~/session.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Id must be present and be a number");
  const accId = parseInt(params.id);

  const accommodation = await findAccommodationById(accId) as FullAccommodation;
  const bookedDates = await getBookedDates(accId);
  const mappedAccomodation = prismaAccToFrontAcc(accommodation);

  return { accommodation: mappedAccomodation, bookedDates };
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const accId = formData.get("id") as string;
  const from = formData.get("from") as string;
  const until = formData.get("until") as string;

  const booking = await createBooking(
    parseInt(accId),
    userId,
    DateTime.fromISO(from).toJSDate(),
    DateTime.fromISO(until).toJSDate(),
  );
  return redirect(`/mybookings?booking_id=${booking.id}`);
};

export default function AccommodationPage() {
  const { accommodation } = useLoaderData<typeof loader>();
  const mappedAcc: Accommodation = {
    ...accommodation,
    createdAt: new Date(accommodation.createdAt),
    updatedAt: new Date(accommodation.updatedAt),
  };

  return <AccomodationDetail accommodation={mappedAcc} />;
}
