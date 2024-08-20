import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import TableSinhVien from "./TableSinhVien";
import InputCustom from "./InputCustom";
import { useEffect } from "react";
import { getValueLocalStorage, setValueLocalStorage } from "./util/util";
import * as yup from "yup";

const FormSinhVien = () => {
  const [arrSinhVien, setArrSinhVien] = useState([]);
  const [sinhVien, setSinhVien] = useState();
  const [searchSinhVien, setSearchSinhVien] = useState("");
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const mssvRegExp = /^\d{6}$/;
  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
    handleReset,
    errors,
    touched,
    handleBlur,
    setValues,
    isValid,
  } = useFormik({
    initialValues: {
      mssv: "",
      tenSinhVien: "",
      email: "",
      soDienThoai: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const newArrSinhVien = [...arrSinhVien, values];
      setArrSinhVien(newArrSinhVien);
      setValueLocalStorage("arrSinhVien", newArrSinhVien);
      resetForm();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Vui lòng nhập định dạng email")
        .required("Vui lòng nhập dữ liệu"),
      mssv: yup
        .string()
        .matches(mssvRegExp, "Nhập đúng định dạng mã số sinh viên")
        .required("Vui lòng nhập dữ liệu")
        .max(6, "Vui lòng nhập 6 ký số")
        .min(6, "Vui lòng nhập 6 ký số"),
      soDienThoai: yup
        .string()
        .matches(phoneRegExp, "Nhập đúng định dạng số điện thoại")
        .max(10, "Số điện thoại phải 10 chữ số")
        .min(10, "Số điện thoại phải 10 chữ số")
        .required("Vui lòng nhập dữ liệu"),
    }),
  });
  useEffect(() => {
    const data = getValueLocalStorage("arrSinhVien");
    data && setArrSinhVien(data);
  }, []);

  useEffect(() => {
    sinhVien && setValues(sinhVien);
  }, [sinhVien]);

  const handleDeleteSinhVien = (mssv) => {
    const newArrSinhVien = [...arrSinhVien];
    let index = newArrSinhVien.findIndex((item) => item.mssv == mssv);
    if (index != -1) {
      newArrSinhVien.splice(index, 1);
      setArrSinhVien(newArrSinhVien);
      setValueLocalStorage("arrSinhVien", newArrSinhVien);
    }
  };

  const handleGetSinhVien = (sinhVien) => {
    setSinhVien(sinhVien);
  };

  const handleSearchChange = (event) => {
    setSearchSinhVien(event.target.value);
  };

  const arrSinhVienFilter = arrSinhVien.filter((item) =>
    item.mssv.toLowerCase().includes(searchSinhVien.toLowerCase())
  );

  return (
    <main
      className="flex-1"
      style={{
        padding: "0px 48px 48px 48px",
        background: "#F5F5F5",
      }}
    >
      <div
        className="h-full"
        style={{
          background: "rgb(255,255,255)",
          minHeight: "280px",
          padding: "0px 24px 24px 24px",
          borderRadius: "8px",
        }}
      >
        <h2
          className="text-center text-white px-2 py-2 uppercase mb-5"
          style={{ backgroundColor: "#00152A" }}
        >
          Thông Tin Sinh Viên
        </h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <InputCustom
                contentLabel={"MSSV"}
                placeHolder={"Vui lòng nhập mã số nhân viên"}
                name={"mssv"}
                value={values.mssv}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.mssv}
                touched={touched.mssv}
              />
              <InputCustom
                contentLabel={"Họ tên"}
                placeHolder={"Vui lòng nhập tên nhân viên"}
                name={"tenSinhVien"}
                value={values.tenSinhVien}
                onChange={handleChange}
              />

              <InputCustom
                contentLabel={"Email"}
                placeHolder={"Vui lòng nhập email"}
                name={"email"}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />

              <InputCustom
                contentLabel={"Số điện thoại"}
                placeHolder={"Vui lòng nhập số điện thoại"}
                name={"soDienThoai"}
                value={values.soDienThoai}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.soDienThoai}
                touched={touched.soDienThoai}
              />
            </div>
            <div className="space-x-5 text-center mb-5">
              <button
                type="submit"
                className="py-2 px-5 bg-green-500 text-white rounded-lg"
              >
                Thêm sinh viên
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-black text-white rounded-lg"
                onClick={() => {
                  resetForm();
                }}
              >
                Reset form
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-cyan-500 text-white rounded-lg"
                onClick={() => {
                  if (!isValid) {
                    return;
                  }
                }}
              >
                Cập nhật sinh viên
              </button>
            </div>
          </form>

          <form className="max-w-2xl mx-auto mb-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Nhập mã số sinh viên"
                required
                value={searchSinhVien}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <TableSinhVien
          handleDelete={handleDeleteSinhVien}
          handleGetSinhVien={handleGetSinhVien}
          arrSinhVien={arrSinhVienFilter}
        />
      </div>
    </main>
  );
};

export default FormSinhVien;
