import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function UserMenu() {
  const user = useOptionalUser();
  const classes="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
  if (user) {
    return (
      <Link
        to="myBookings"
        className={classes}
      >
        {user.email}
      </Link>
    );
  } else {
    return (
      <Link
        to="login"
        className={classes}
      >
        Login
      </Link>
    );
  }
}
