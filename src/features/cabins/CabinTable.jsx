import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useFetchCabins } from "./useFetchCabins";
import toast from "react-hot-toast";

function CabinTable() {
  const { cabins, isLoading, error } = useFetchCabins();
  if (isLoading) return <Spinner />;
  if (error) return toast.error("Sorry, we could'n get the cabins");

  return (
    <Menus>
      <Table data={cabins} columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header
          columnsName={[
            "img",
            "name",
            "max capacity",
            "price",
            "discount",
            "actions",
          ]}
        />
        <Table.Body
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
