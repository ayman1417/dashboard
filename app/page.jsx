import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  
  <div className="flex flex-col items-start p-2 gap-5">
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>SignUp</Link>
          </div>
  );
}
