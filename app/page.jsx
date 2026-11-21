import ProtectedRoute from "./components/protectedRoute";
import Table from "./components/table";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-dvh p-5 ml-[50px] md:ml-[220px]">
        <Table />
      </div>
    </ProtectedRoute>
  );
}
