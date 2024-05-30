import { Link } from "@remix-run/react";
import logoImg from "../../../images/logo.svg";

export default function Logo() {
  // const router = useRouter();
  return (
    <Link to=''>
    <img
      // onClick={() => router.push("/")}
      className="cursor-pointer fill-indigo-600 stroke-red-700"
      src={logoImg}
      height="100"
      width="100"
      alt="Logo"
    />
    </Link>
  );
}
