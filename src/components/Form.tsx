/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorComponent from "./ErrorComponent";
import { province } from "../utils/Province";
import { schema } from "../utils/formschema";
import { FormValueType } from "../utils/types";
import ImageUpload from "./ImageUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
interface Props {
  userData?: FormValueType[];
  setuserData: React.Dispatch<React.SetStateAction<FormValueType[]>>;
  editingRow: FormValueType | null;
  setEditingRow: React.Dispatch<React.SetStateAction<FormValueType | null>>;
}

export default function TreeleafForm({
  setuserData,
  editingRow,
  setEditingRow,
}: Props) {
  const [countries, setCountries] = useState<any[]>([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const memoizedCountries = useMemo(() => countries, [countries]);
  const data = memoizedCountries.map((item) => item?.name?.common);

  const defaultValues: FormValueType = {
    City: "",
    District: "",
    Email: "",
    Name: "",
    Province: "1",
    Country: "Nepal",
    PhoneNumber: "",
    DOB: undefined,
    id: Math.random(),
  };

  const { handleSubmit, control, formState, reset } = useForm<FormValueType>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (editingRow) {
      reset(editingRow);
    } else {
      reset(defaultValues);
    }
  }, [editingRow, reset]);

  function onSubmit(data: FormValueType) {
    if (editingRow) {
      setuserData((prev) =>
        prev.map((item) => (item.id === editingRow.id ? data : item))
      );
      toast.success("user edited successfully");
      setEditingRow(null);
    } else {
      setuserData((prev) => [...prev, { ...data, id: Math.random() }]);
      toast.success("user added successfully");
    }
    reset(defaultValues);
  }
  const { errors } = formState;

  return (
    <div className="w-1/3 mx-auto mt-8 border-2 shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center text-xl text-white mt-8"
      >
        <h1 className="mt-7 font-semiboldbold text-gray-600 text-2xl">
          Treeleaf Validation
        </h1>
        <div className="p-6 w-full flex flex-col space-y-3">
          <div>
            <label className="mb-2 text-sm font-medium text-gray-600">
              Name *
            </label>
            <Controller
              name="Name"
              control={control}
              render={({ field }) => (
                <input
                  id="Name"
                  {...field}
                  placeholder="...Name"
                  type="text"
                  className="h-10 text-black px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              )}
            />
            {errors.Name && <ErrorComponent message={errors.Name.message} />}
          </div>

          <div>
            <label className="mb-2 text-sm font-medium text-gray-600">
              Email *
            </label>
            <Controller
              name="Email"
              control={control}
              render={({ field }) => (
                <input
                  id="Email"
                  {...field}
                  placeholder="...email"
                  type="email"
                  className="h-10 text-black px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              )}
            />
            {errors.Email && <ErrorComponent message={errors.Email.message} />}
          </div>

          <div>
            <label className="mb-2 text-sm font-medium text-gray-600">
              Phone Number *
            </label>
            <Controller
              name="PhoneNumber"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="PhoneNumber"
                  {...field}
                  placeholder="...number"
                  className="h-10 text-black px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              )}
            />
            {errors.PhoneNumber && (
              <ErrorComponent message={errors.PhoneNumber.message} />
            )}
          </div>
          <div className="bg-red- flex flex-col mt-2">
            <label className="text-sm font-medium text-gray-600">DOB</label>
            <Controller
              name="DOB"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    showTimeSelect={false}
                    dateFormat="MMMM d, yyyy"
                    className="h-10 text-black px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    onChange={onChange}
                    selected={value}
                    placeholderText="Enter your birth date"
                  />
                );
              }}
            />
            {errors.DOB && <ErrorComponent message={errors.DOB.message} />}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-2 text-sm font-medium text-gray-600">
                City
              </label>
              <Controller
                name="City"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="...City"
                    type="text"
                    className="h-10 text-black px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                )}
              />
              {errors.City && <ErrorComponent message={errors.City.message} />}
            </div>

            <div>
              <label className="mb-2 text-sm font-medium text-gray-600">
                District
              </label>
              <Controller
                name="District"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="...District"
                    type="text"
                    className="h-10 text-black px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                )}
              />
              {errors.District && (
                <ErrorComponent message={errors.District.message} />
              )}
            </div>

            <div>
              <label className="mb-2 text-sm font-medium text-gray-600">
                Province
              </label>
              <Controller
                name="Province"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="h-10 px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
                  >
                    {province.map((prov) => (
                      <option key={prov.number} value={prov.number}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.Province && (
                <ErrorComponent message={errors.Province.message} />
              )}
            </div>

            <div>
              <label className="mb-2 text-sm font-medium text-gray-600">
                Country
              </label>
              <Controller
                name="Country"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="h-10 px-4 text-sm border border-gray-300 rounded-md shadow-sm transition-all duration-300 w-full placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
                  >
                    {data.map((item, index) => (
                      <option
                        key={index}
                        className="p-2 text-black"
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.Country && (
                <ErrorComponent message={errors.Country.message} />
              )}
            </div>
          </div>
        </div>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              setImage={field.onChange}
              image={field.value}
              {...field}
            />
          )}
        />
        {errors.image && <ErrorComponent message={errors.image.message} />}

        <button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="m-8 w-1/2 rounded-md bg-blue-800 text-[16px] p-2 hover:bg-blue-600 transition-all duration-100"
        >
          {editingRow ? "Update" : "Proceed"}
        </button>
      </form>
    </div>
  );
}
