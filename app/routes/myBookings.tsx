import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect } from "react";

import { prisma } from "~/db.server";
import { NewBookingCard } from "~/features/booking/new.booking-card";
import { requireUserId } from "~/session.server";
import { Button } from "~/ui/button";
import { Table, TableBody, TableCell, TableRow } from "~/ui/table";
import { useToast } from "~/ui/use-toast";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  // request.url
  const booking_id = new URL(request.url).searchParams.get("booking_id");
  let booking;
  if (booking_id && parseInt(booking_id)) {
    booking = await prisma.booking.findFirst({
      where: {
        id: parseInt(booking_id),
      },
      include: {
        accommodation: {
          include: { images: true, location: true, reviews: true },
        },
      },
    });
  }

  const bookings = await prisma.booking.findMany({
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
  return { bookings, booking };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "DELETE") {
    // const userId = await requireUserId(request);
    console.log(request);

    const formData = await request.formData();
    // console.log(formData);
    const id = formData.get("id") as string;

    const bookingId = parseInt(id);
    // const body = formData.get("body");
    console.log(bookingId);
    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });

    return null;
  }
};

export default function MyBookingsPage() {
  const { bookings, booking } = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const { toast } = useToast();

  useEffect(() => {
    if (navigation.state === "submitting") {
      toast({
        title: "Booking Cancelled!",
        description: "Sometimes it is nice to stay at home",
      });
    }
  }, [navigation.state, toast]);

  let bookinCard = <></>;
  if (booking) {
    bookinCard = <NewBookingCard booking={booking}></NewBookingCard>;
  }

  return (
    <main className="mx-auto xl:px-20 md-px-10 sm-px-2 px-4">
      <section className="flex items-center flex-col">
        {bookinCard}
        <div></div>
      </section>
      <section>
        <h2 className="text-3xl py-4 text-center">My Trips</h2>
        <Table>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <img
                    className="aspect-square rounded-md object-cover"
                    width="64"
                    src={booking.accommodation.images?.src}
                    alt=""
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {booking.accommodation.location?.name}
                </TableCell>
                <TableCell className="font-medium">
                  <span className="font-light">from: </span>
                  {new Date(booking.from).toDateString()},
                  <span className="font-light"> until: </span>
                  {new Date(booking.until).toDateString()}
                </TableCell>
                <TableCell>
                  <Form method="DELETE">
                    <input type="hidden" value={booking.id} name="id" />
                    <Button type="submit" variant="destructive">
                      Cancel
                    </Button>
                  </Form>
                  <Link to={`../booking/update/${booking.id}`}>
                    <Button type="button" variant="secondary">Update</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
