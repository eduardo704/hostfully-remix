import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function UserMenu() {
  const user = useOptionalUser();
  if (user) {
    return (
      <Link
        to="myBookings"
        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
      >
        {user.email}
      </Link>
    );
  } else {
    return (
      <Link
        to="login"
        className="hidden  md:block  text-sm   font-semibold   py-3   px-4   rounded-full   hover:bg-neutral-100   transition   cursor-pointer"
      >
        Login
      </Link>
    );
  }
}
