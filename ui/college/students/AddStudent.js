"use client";

import { SubmitButton } from "@/ui/user/SubmitButton";
import { AddStudents } from "@/actions/college/AddStudents";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const xlsx = require("xlsx");

export default function AddStudentComp() {
    const [state, addStudentAction] = useFormState(AddStudents, null);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (state?.status === 200) {
            toast.success(state.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("addStudentForm").reset();
                    setData([]);
                },
            });
        }
    }, [state]);

    return (
        <>
            <p>
                Add Student
            </p>
            <div className="flex justify-center">

            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-2xl my-4">
                    Upload in Bulk
                </h2>
                <form action={addStudentAction} id="addStudentForm">
                    <input
                        id="image"
                        required={true}
                        type="file"
                        name="students"
                        accept=".xlsx"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsBinaryString(file);
                            reader.onload = (e) => {
                                const bstr = e.target.result;
                                const workbook = xlsx.read(bstr, { type: "binary" });
                                const sheetName = workbook.SheetNames[0];
                                const worksheet = workbook.Sheets[sheetName];
                                const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                                setData(data);
                            };
                        }
                        }
                    />
                    <input type="hidden" name="studentsToAdd"
                        value={data}

                    />
                    <SubmitButton title="Add Students" size="fit" />
                </form>
            </div>

            <div className="flex flex-col justify-center">
                <h2 className="text-2xl my-4">
                    Preview
                </h2>
                <div className="flex justify-center">
                    <table className="table-auto">
                        <thead>
                            {data?.length > 0 && data[0].map((cell, i) => (
                                <th key={i} className="border px-4 py-2">{cell}</th>
                            ))}
                        </thead>
                        <tbody>
                            {data?.length > 0 && data.slice(1).map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="border px-4 py-2">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

}