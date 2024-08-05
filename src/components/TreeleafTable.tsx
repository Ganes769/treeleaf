import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FormValueType } from "../utils/types";
import { useState, useEffect } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface Props {
  tableData: FormValueType[];
  setData: React.Dispatch<React.SetStateAction<FormValueType[]>>;
  handleEdit: (row: FormValueType) => void;
}

export default function TreeleafTable({
  tableData,
  setData,
  handleEdit,
}: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const columns: ColumnDef<FormValueType>[] = [
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }) => {
        const image = row.original.image;
        return image ? (
          <div className="w-16 h-16 border rounded-full overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              alt={image?.name || "Image"}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ) : (
          <span className="text-gray-500">Tap edit to add image</span>
        );
      },
    },
    {
      header: "Name",
      accessorKey: "Name",
    },
    {
      header: "Email",
      accessorKey: "Email",
    },
    {
      header: "Phone Number",
      accessorKey: "PhoneNumber",
    },
    {
      header: "DOB",
      accessorKey: "DOB",
    },
    {
      header: "City",
      accessorKey: "City",
    },
    {
      header: "District",
      accessorKey: "District",
    },
    {
      header: "Province",
      accessorKey: "Province",
    },
    {
      header: "Country",
      accessorKey: "Country",
    },
    {
      header: "Edit",
      id: "edit",
      cell: ({ row }) => (
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          Edit
        </button>
      ),
    },
    {
      header: "Delete",
      id: "delete",
      cell: ({ row }) => (
        <button
          onClick={() => {
            handleDelete(row.original);
            toast.success("Successfully deleted row!");
          }}
          className="text-red-600 hover:text-red-800 font-semibold transition-colors"
        >
          Delete
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        updater instanceof Function
          ? updater(table.getState().pagination)
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
  });

  const handleDelete = (row: FormValueType) => {
    setData((data) => data.filter((item) => item.id !== row.id));
  };

  const canPreviousPage = table.getCanPreviousPage();
  const pageCount = table.getPageCount();

  return (
    <div className="mt-8 w-10/12 mx-auto bg-white shadow-lg rounded-lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Your Form Data
          </h2>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-[14px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-4 text-[16px] font-medium text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
            <Button
              buttonBackGround="bg-blue-500 hover:bg-blue-600"
              textColor="text-white"
              onClick={() => table.previousPage()}
              disabled={!canPreviousPage}
              className="px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageCount}
              </strong>
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 rounded-lg disabled:opacity-50 bg-blue-500 text-white  hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
