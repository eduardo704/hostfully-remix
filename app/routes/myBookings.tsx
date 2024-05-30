import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect } from "react";

import { prisma } from "~/db.server";
import { NewBookingCard } from "~/features/booking/new.booking-card";
import { findBookignsByUser, findBookingId } from "~/server/booking.server";
import { requireUserId } from "~/session.server";
import { Button, buttonVariants } from "~/ui/button";
import { Table, TableBody, TableCell, TableRow } from "~/ui/table";
import { useToast } from "~/ui/use-toast";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const booking_id = new URL(request.url).searchParams.get("booking_id");
  let booking;
  if (booking_id && parseInt(booking_id)) {
    booking = await findBookingId(parseInt(booking_id));
  }

  const bookings = await findBookignsByUser(userId);
  return { bookings, booking };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    const bookingId = parseInt(id);
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
                <TableCell className="hidden sm:table-cell">
                  <img
                    className="aspect-square rounded-md object-cover"
                    width="64"
                    src={booking.accommodation.images?.src}
                    alt=""
                  />
                </TableCell>
                <TableCell className="font-medium text-sm sm:text-base">
                  {booking.accommodation.location?.name}
                </TableCell>
                <TableCell className="font-medium text-xs sm:text-base">
                  <span className="font-light">from: </span>
                  {new Date(booking.from).toDateString()},
                  <span className="font-light"> until: </span>
                  {new Date(booking.until).toDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-end flex-col sm:flex-row">
                    <Link
                      className={buttonVariants({
                        variant: "secondary",
                        size: "sm",
                      })}
                      to={`../booking/update/${booking.id}`}
                    >
                      Update
                    </Link>
                    <Form className="w-full" method="DELETE">
                      <input type="hidden" value={booking.id} name="id" />
                      <Button className="w-full sm:w-auto" type="submit" size="sm" variant="destructive">
                        Cancel
                      </Button>
                    </Form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
