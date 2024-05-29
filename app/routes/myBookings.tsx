import { faker } from "@faker-js/faker";

import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { FaChevronRight } from "react-icons/fa";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import { Button } from "~/ui/button";
import { Card, CardContent } from "~/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/ui/table";

import { useEffect } from "react";
import { useToast } from "~/ui/use-toast";
import surferImg from "../images/surfer.png";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

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
  return { bookings };
};

export const action = async ({ request }: ActionFunctionArgs) => {
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
};

export default function MyBookingsPage() {
  const { bookings } = useLoaderData<typeof loader>();

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

  return (
    <main className="mx-auto xl:px-20 md-px-10 sm-px-2 px-4">
      <section className="flex items-center flex-col">
        <Card className="w-1/2 bg-amber-100">
          <CardContent>
            <div>
              <img className="w-full aspect-video" src={surferImg} alt="" />
              <h2 className="text-3xl py-4 text-indigo-600 ">
                Thanks for your booking!
              </h2>
              <div className="border-t-2 py-4">
                <p>
                  Your trip to {faker.word.words({ count: 2 })} is coming up
                </p>
              </div>
              <div className="border-t-2  py-4">
                <h4 className="font-bold text-lg">Address</h4>
                <p>{faker.location.streetAddress({ useFullAddress: true })} </p>
              </div>
            </div>
          </CardContent>
          <div className="cursor-pointer flex items-start rounded-md py-4 transition-all hover:bg-accent hover:text-accent-foreground">
            <div className="px-6 w-full flex justify-between">
              <p className="text-sm font-medium leading-none">Contact host</p>
              <FaChevronRight />
            </div>
          </div>
        </Card>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
