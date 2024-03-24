"use client";

// import { useState } from "react";
import PropTypes from "prop-types";
// import { useRouter } from "next/navigation";
import { addQuizToCourse } from "@/actions/faculty/Courses";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

const QuestionsMain = ({ quizTitle, quizDescription }) => {
    const courseID = useSearchParams().get("courseID");
    const [quizID, setQuizID] = useState(null);
    // const router = useRouter();
    // const [noOfQuestions, setNoOfQuestions] = useState(
    //     document.getElementById("questions")?.childElementCount === 0 ? 1 : document.getElementById("questions")?.childElementCount
    // );

    const submitHandler = async (e) => {
        e.preventDefault();
        let form = e.target;
        let qstnName = form.elements.question.value;
        let points = parseInt(form.elements.points.value);
        let options = [];
        let correctAns = form.elements.correctAns?.value - 1;
        for (let i = 0; i < form.elements.option?.length; i++) {
            options.push(form.elements.option[i].value);
        }
        if (options.length < 2 || options.length > 4 || correctAns < 0 || correctAns > options.length - 1) {
            toast.error("Please Check the options and correct answer");
            return;
        }
        let res = await addQuizToCourse(courseID, quizID, { qstnName, points, options, correctAns, quizTitle, quizDescription });
        if (res.status === 200) {
            setQuizID(res.quizID);
            toast.success("Question Added Successfully", {
                onClose: () => {
                    setQuizID(res.quizID);
                },
                onClick: () => {
                    setQuizID(res.quizID);
                }
            });
            for (let i = 0; i < options.length; i++) {
                form.elements[2 + (2 * i)].disabled = true;
                form.elements[2 + (2 * i) + 1].classList.add("hidden");
            }
            form.elements[form.elements.length - 1].disabled = true;
            form.elements[form.elements.length - 2].innerHTML = "Edit Question";
            form.elements[form.elements.length - 2].classList.add("bg-purple-500");
            form.elements[form.elements.length - 2].classList.add("hover:bg-purple-700");
            form.elements[form.elements.length - 2].onclick = (e) => {
                e.preventDefault();
                form.elements.question.disabled = false;
                form.elements.points.disabled = false;
                form.elements.correctAns.disabled = false;
                for (let i = 0; i < options.length; i++) {
                    form.elements[2 + (2 * i)].disabled = false;
                    form.elements[2 + (2 * i) + 1].classList.remove("hidden");
                }
                form.elements[form.elements.length - 1].disabled = false;
                form.elements[form.elements.length - 2].innerHTML = "Save Question";
                form.elements[form.elements.length - 2].classList.remove("bg-purple-500");
                form.elements[form.elements.length - 2].classList.remove("hover:bg-purple-700");
                form.elements[form.elements.length - 2].onclick = async (e) => {
                    e.preventDefault();
                    let id = e.target.id;
                    let form = document.getElementById(id);
                    let options = [];
                    for (let i = 0; i < form.elements.option?.length; i++) {
                        options.push(form.elements.option[i].value);
                    }
                    if (options.length < 2 || options.length > 4 || correctAns < 0 || correctAns > options.length - 1) {
                        toast.error("Please Check the options and correct answer");
                        return;
                    }
                    let result = await addQuizToCourse(courseID, quizID, {
                        qstnName: form.elements.question.value,
                        points: parseInt(form.elements.points.value),
                        options: options,
                        correctAns: form.elements.correctAns.value - 1,
                        quizTitle,
                        quizDescription
                    });
                    console.log(result.message);
                };
                form.elements[form.elements.length - 4].disabled = false;
            };
            form.elements[form.elements.length - 4].disabled = true;
            form.elements.question.disabled = true;
            form.elements.points.disabled = true;
            form.elements.correctAns.disabled = true;
        }
        else {
            toast.error(res.message);
        }
    };

    const createOption = (e) => {
        let qid = e.target.parentElement.id;
        let optionsId = "options" + qid;
        let nop = document.getElementById(optionsId)?.childElementCount;
        if (nop >= 4) {
            alert("You can only add 4 options");
            return;
        }

        const options = document.getElementById("options" + qid);
        const option = document.createElement("div");
        option.className = "flex gap-2 w-full flex items-center justify-center";

        const input = document.createElement("input");
        input.type = "text";
        input.name = "option";
        input.placeholder = "Enter your option here";
        input.required = true;
        input.className = "block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-300";
        option.innerHTML = nop + 1 + ".";
        option.appendChild(input);

        const button = document.createElement("button");
        button.className = "bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900";
        button.innerHTML = "Delete";
        button.onclick = () => {
            option.remove();
        };
        option.appendChild(button);
        options.appendChild(option);
    };

    const addQuestion = () => {
        const questions = document.getElementById("questions");
        const question = document.createElement("form");
        question.onsubmit = submitHandler;
        question.method = "POST";

        let impMark = document.createElement("span");
        impMark.className = "text-red-500";
        impMark.innerHTML = " *";

        question.className = "rounded-md p-4 shadow-md mt-4 bg-white";
        question.id = "q-" + (questions.childElementCount + 1);

        const label = document.createElement("label");
        label.className = "text-sm text-gray-700 font-semibold";
        label.htmlFor = "question";
        label.innerHTML = "Question " + (questions.childElementCount + 1);
        label.innerHTML += impMark.outerHTML;

        question.appendChild(label);

        const input = document.createElement("input");
        input.type = "text";
        input.name = "question";
        input.placeholder = "Enter your question here";
        input.required = true;
        input.className = "block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-300";

        question.appendChild(input);

        const label2 = document.createElement("label");
        label2.className = "text-sm text-gray-700 font-semibold";
        label2.htmlFor = "points";
        label2.innerHTML = "Points";
        label2.innerHTML += impMark.outerHTML;
        question.appendChild(label2);
        const input2 = document.createElement("input");
        input2.type = "number";
        input2.name = "points";
        input2.placeholder = "Enter points for this question";
        input2.required = true;
        input2.className = "block w-full md:w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-300";

        question.appendChild(input2);

        const label3 = document.createElement("label");
        label3.className = "text-sm text-gray-700 font-semibold";
        label3.htmlFor = "options";
        label3.innerHTML = "Options";
        label3.innerHTML += impMark.outerHTML;
        question.appendChild(label3);
        const options = document.createElement("div");
        options.className = "flex flex-wrap gap-4";
        options.id = "options" + question.id;
        question.appendChild(options);

        const button = document.createElement("button");
        button.className = "bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md mt-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900";
        button.innerHTML = "Add Option";
        button.onclick = createOption;
        question.appendChild(button);
        const correctAnsDiv = document.createElement("div");
        correctAnsDiv.className = "flex flex-col my-2 gap-y-1";

        const label4 = document.createElement("label");
        label4.htmlFor = "correctAns";
        label4.className = "text-sm text-green-700 font-semibold";
        label4.innerHTML = "Correct Answer";
        correctAnsDiv.appendChild(label4);
        const select = document.createElement("select");
        select.name = "correctAns";
        select.id = "correctAns";
        select.className = "block w-fit rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900";
        select.defaultValue = 0;
        const option = document.createElement("option");
        option.value = 0;
        option.innerHTML = "Select correct answer";
        select.appendChild(option);
        for (let i = 1; i <= 4; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.innerHTML = "Option " + i;
            select.appendChild(option);
        }
        correctAnsDiv.appendChild(select);

        const btnGrp = document.createElement("div");
        btnGrp.className = "flex flex-row justify-between";

        const saveButton = document.createElement("button");
        saveButton.className = "bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md mt-2 w-fit disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900";
        saveButton.innerHTML = "Save Question";
        saveButton.type = "submit";
        saveButton.id = question.id;
        saveButton.onsubmit = submitHandler;
        btnGrp.appendChild(saveButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = "bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-2 w-fit disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900";
        deleteButton.innerHTML = "Delete Question";
        deleteButton.onclick = () => {
            question.remove();
        };
        btnGrp.appendChild(deleteButton);

        question.appendChild(correctAnsDiv);
        question.appendChild(btnGrp);
        questions.appendChild(question);
    };

    return (
        <div>
            <span
                className="text-lg text-gray-900 font-semibold"
            >
                Questions
            </span>
            <br />
            <span>
                Name and describe your quiz, so that students can easily understand the purpose of the quiz.
            </span>
            <div id="questions">
            </div>
            <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 my-6 rounded-md"
                onClick={addQuestion}
            >
                Add Question
            </button>
        </div>
    );
};

QuestionsMain.propTypes = {
    quizTitle: PropTypes.string,
    quizDescription: PropTypes.string
};

export default QuestionsMain;