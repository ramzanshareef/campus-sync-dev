"use client";

import Image from "next/image";
import PropTypes from "prop-types";
import { FaUniversity } from "react-icons/fa";
import { AiOutlineIdcard } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AttemptQuizModal } from "@/ui/components/modals/students/AttemptQuiz";

const IndCourse = ({ courseData }) => {
    const [showAllQuizzes, setShowAllQuizzes] = useState(false);
    const [showAttemptQuiz, setShowAttemptQuiz] = useState(false);
    const [clickedQuiz, setClickedQuiz] = useState({});
    const router = useRouter();

    return (
        <>
            <div>
                <Image src={courseData.image} alt="Course Image" width={300} height={300}
                    className="rounded-2xl w-full h-60 object-center"
                />
                <h2
                    className="text-2xl md:text-3xl font-semibold text-gray-800 mt-5"
                >
                    {courseData.name}
                </h2>
                <div
                    className="flex items-center mt-3 gap-x-2"
                >
                    <Image
                        src={courseData.faculty.image ? courseData.faculty.image : "/logo.svg"}
                        alt="Faculty Image" width={50} height={50}
                        className="rounded-full w-5 h-5 object-center"
                    />
                    <p
                        className="text-sm text-indigo-600"
                    >
                        {courseData.faculty.name}
                    </p>
                </div>
                <div
                    className="flex flex-wrap mt-3 gap-x-6 w-fit"
                >
                    <span
                        className="text-sm text-gray-600 flex items-center justify-center mt-3 gap-x-2 w-fit"
                    >
                        <FaUniversity className="inline-block" />
                        <span>
                            {courseData.department}
                        </span>
                    </span>
                    <span
                        className="text-sm text-gray-600 flex items-center justify-center mt-3 gap-x-2 w-fit"
                    >
                        <AiOutlineIdcard className="inline-block" />
                        <span>
                            {courseData.code}
                        </span>
                    </span>
                </div>
                <div className="mt-6">
                    <span
                        className="text-lg font-semibold text-gray-800"
                    >
                        Description
                    </span>
                    <div
                        className="text-base text-gray-600 mt-2"
                    >
                        {courseData.description}
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae debitis est nulla non similique dolorum recusandae animi beatae, ratione unde dolor laboriosam reiciendis adipisci, esse eius quas officiis facere accusantium provident accusamus. Aliquam mollitia eligendi et commodi numquam labore dolorum quod vitae veniam aliquid repudiandae incidunt, quas natus. At, nesciunt corrupti ut nisi asperiores voluptates esse? Optio, officiis repellendus veniam et aspernatur deleniti vero repudiandae impedit molestiae adipisci, at sint ipsa. Aspernatur facilis saepe sed, fugiat totam in veritatis repudiandae velit asperiores quisquam dicta dolores itaque! Nihil, possimus! Sed sequi placeat maxime fuga atque ducimus numquam iste autem dicta sapiente facere consequuntur aliquid dolorem, ea quidem laudantium velit sunt vero ad error at tempora quaerat nostrum! Asperiores accusamus labore sapiente placeat temporibus, autem et ea obcaecati, totam dolor adipisci omnis voluptatem doloremque neque reiciendis mollitia? Vel sed eaque ab magnam ipsum sint autem? Asperiores, quaerat! Dicta officiis, porro harum nesciunt assumenda tenetur tempora amet impedit dolore, consectetur explicabo recusandae illo ab eum voluptatum ratione rerum molestias repudiandae id mollitia nihil sit doloremque culpa voluptatem. Natus laboriosam ipsam deserunt inventore nostrum minus nemo praesentium nulla distinctio? Repudiandae, nemo magnam. Nobis repudiandae omnis, labore commodi eum unde. Animi excepturi fugit dolorum eaque voluptate placeat natus, numquam suscipit exercitationem tempora deleniti dicta at harum totam ex hic reiciendis aperiam modi minima veniam id maxime! Suscipit, vitae. Corrupti id rem temporibus illum delectus quo nobis sed impedit pariatur placeat assumenda, quasi modi doloremque alias animi ab hic, dolores dolore perferendis. Nulla ipsam dolore a repudiandae mollitia corrupti suscipit doloribus quo, deserunt voluptate itaque consectetur nihil est porro quos. Facilis, eos aliquid? Placeat, doloremque, omnis ipsa qui obcaecati fugiat nulla officia itaque molestiae rem ipsam est eos iusto neque soluta officiis rerum sequi harum. In perspiciatis, nesciunt at, odit voluptatibus autem perferendis facilis temporibus fugit doloremque aut? Sint optio voluptate aliquid repudiandae adipisci debitis temporibus earum sit velit totam commodi, dicta veniam quae nemo, minus eaque nulla, reprehenderit nostrum. Beatae ipsa autem maxime necessitatibus? Quo eum inventore qui debitis explicabo. Illum quo non inventore impedit cupiditate veniam explicabo in, laborum, voluptates voluptate praesentium et! Debitis dolorum repellat voluptate culpa nobis quae omnis nisi possimus, reprehenderit sapiente fugit deserunt unde perferendis alias sint vitae, sunt et ut explicabo atque dolor provident illum ratione eius? Odio expedita iste minima architecto deserunt, rem suscipit, provident nostrum, laudantium quibusdam voluptates consectetur rerum fugit nisi perspiciatis possimus enim? Repudiandae id sint quibusdam quaerat inventore provident fuga architecto explicabo, nisi perferendis facilis! Repellendus exercitationem officiis esse iusto ipsum iste laboriosam possimus? Harum nostrum porro veritatis ducimus ipsam vero quasi, sit quam voluptate nemo numquam! Beatae, earum? Ea neque distinctio aspernatur porro quod odit perferendis necessitatibus! Cumque fuga illum esse adipisci quasi aspernatur, nihil placeat voluptatibus quo consequatur quae nisi, nulla, molestiae temporibus nesciunt ducimus ratione est fugit. Sapiente quis qui, magni esse obcaecati dignissimos cupiditate ducimus voluptas facilis, molestias temporibus modi, accusantium reprehenderit harum. Perspiciatis consequuntur animi repellat maiores mollitia reiciendis assumenda, quos reprehenderit fugiat dolores eveniet exercitationem explicabo totam quidem!
                    </div>
                </div>
                <div className="mt-6"
                    id="all-quizzes-btn"
                >
                    <span
                        className="text-lg font-semibold text-gray-800"
                    >
                        Quizzes
                    </span>
                    <button
                        className="text-white py-2 px-4 max-md:px-2 rounded-md flex items-center mt-2 bg-purple-500 hover:bg-purple-700"
                        onClick={() => {
                            if (showAllQuizzes === true) {
                                setShowAllQuizzes(!showAllQuizzes);
                                router.push(`/student/courses/view?courseID=${courseData._id}#all-quizzes-btn`);
                            }
                            else {
                                setShowAllQuizzes(!showAllQuizzes);
                                router.push(`/student/courses/view?courseID=${courseData._id}#all-quizzes`);
                            }
                        }}
                    >
                        {showAllQuizzes === false ? "View All Quizzes" : "Close All Quizzes"}
                    </button>
                </div>
                <div
                    className={`${showAllQuizzes === false ? "hidden" : ""}
                        mt-4 gap-y-6 flex flex-col border border-gray-200 rounded-md p-4 shadow-md shadow-indigo-500
                    `}
                    id="all-quizzes"
                >
                    {courseData.quizzes.map(async (quiz, ind) => {
                        return (
                            <div
                                key={ind}
                                className="flex flex-row justify-between items-center border border-gray-200 rounded-md p-4 shadow-lg"
                            >
                                <div>
                                    <h4
                                        className="text-lg font-semibold"
                                    >
                                        {quiz.title}
                                    </h4>
                                    <p
                                        className="text-sm text-gray-500"
                                    >
                                        {quiz.description}
                                    </p>
                                </div>
                                <div
                                    className="flex gap-x-2"
                                >
                                    <button
                                        className="text-white py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-700"
                                        onClick={async () => {
                                            setClickedQuiz(quiz);
                                            setShowAttemptQuiz(true);
                                        }}
                                    >
                                        Attempt Quiz
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {courseData.quizzes.length === 0 && (
                        <div
                            className="text-center"
                        >
                            No quizzes found.
                        </div>
                    )}
                </div>
                <AttemptQuizModal
                    isOpen={showAttemptQuiz}
                    onClose={() => setShowAttemptQuiz(false)}
                    quiz={clickedQuiz}
                />
            </div>
        </>
    );
};

export default IndCourse;
IndCourse.propTypes = {
    courseData: PropTypes.object.isRequired
};