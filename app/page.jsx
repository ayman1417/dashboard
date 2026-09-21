
import Link from "next/link";
import Login from "./login/page";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, sortByPrice, resetProducts, sortByStock } from "./redux/productsSlice";
import Loading from "./loading";
import Sidebar from "./components/sidebar";
import Table from "./components/table";



export default function Home() {

  return (

    <div className="min-h-dvh  ">
      <div className=" ">
        <Sidebar />
        <Table />
      </div>

    </div>

  );
}