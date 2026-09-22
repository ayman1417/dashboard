
import Link from "next/link";
import Login from "./login/page";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, sortByPrice, resetProducts, sortByStock } from "./redux/productsSlice";
import Loading from "./loading";
import Sidebar from "./components/sidebar";
import Table from "./components/table";
import SalesChart from "./components/saleschart";
import ProductsPDF from "./components/ProductsPdf";
import data from "./data/products.json"


export default function Home() {

  return (

    <div className=" min-h-dvh p-5  ml-[15%]">

      <Table />

    </div>

  );
}