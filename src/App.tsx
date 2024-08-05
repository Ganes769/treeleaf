import { useState } from "react";
import TreeleafForm from "./components/Form";
import { FormValueType } from "./utils/types";
import TreeleafTable from "./components/TreeleafTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defaultList } from "./utils/defaultuser";

function App() {
  const [userdata, setUserData] = useState<FormValueType[]>(defaultList);
  const [editingRow, setEditingRow] = useState<FormValueType | null>(null);
  const handleEdit = (row: FormValueType) => {
    setEditingRow(row);
  };

  return (
    <div>
      <TreeleafForm
        setuserData={setUserData}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
      />
      <TreeleafTable
        tableData={userdata}
        setData={setUserData}
        handleEdit={handleEdit}
      />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
