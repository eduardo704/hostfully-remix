import { FaChevronRight } from "react-icons/fa";
import { Booking } from "~/models/booking.model";
import { Card, CardContent } from "~/ui/card";
import surferImg from "../../images/surfer.png";
import { faker } from "@faker-js/faker";

export interface bookinCardProps {
  booking: Booking;
}

export function NewBookingCard({ booking }: bookinCardProps) {
  return (
    <Card className="w-1/2 bg-amber-100">
      <CardContent>
        <div>
          <img className="w-full aspect-video" src={surferImg} alt="" />
          <h2 className="text-3xl py-4 text-indigo-600 ">
            Thanks for your booking!
          </h2>
          <div className="border-t-2 py-4">
            <p>
              Your trip to {booking.accommodation.location.name} is coming up
            </p>
          </div>
          <div className="border-t-2  py-4">
            <p>{faker.location.streetAddress({ useFullAddress: true })} </p>
            <p>testeeeeeee </p>
          </div>
          <div className="border-t-2  py-4">
            <h4 className="font-bold text-lg">Check-In</h4>
            <p>
              Check in from: {new Date(booking.from).toDateString()} 8am until
              22pm{" "}
            </p>
          </div>
          <div className="border-t-2  py-4">
            <h4 className="font-bold text-lg">Check-Out</h4>
            <p>
              Check out: {new Date(booking.until).toDateString()} until 1pm{" "}
            </p>
          </div>
        </div>
      </CardContent>
      <div className="cursor-pointer flex items-start rounded-md py-4 transition-all hover:bg-indigo-600 hover:text-white">
        <div className="px-6 w-full flex justify-between">
          <p className="text-sm font-medium leading-none">Contact host</p>
          <FaChevronRight />
        </div>
      </div>
    </Card>
  );
}
