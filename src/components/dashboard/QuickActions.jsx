import { FaUserPlus, FaChalkboardTeacher, FaCalendar } from "react-icons/fa";

const QuickActions = () => {
  return (
    <div className="bg-teal-900 text-white p-5 rounded-2xl shadow-md">
      <h3 className="font-semibold mb-4">Quick Management</h3>

      <div className="space-y-3">
        <button className="flex justify-between items-center w-full bg-teal-800 px-4 py-3 rounded-lg hover:bg-teal-700">
          <span className="flex items-center gap-2">
            <FaUserPlus /> Add Student
          </span>
          →
        </button>

        <button className="flex justify-between items-center w-full bg-teal-800 px-4 py-3 rounded-lg hover:bg-teal-700">
          <span className="flex items-center gap-2">
            <FaChalkboardTeacher /> Add Teacher
          </span>
          →
        </button>

        <button className="flex justify-between items-center w-full bg-teal-800 px-4 py-3 rounded-lg hover:bg-teal-700">
          <span className="flex items-center gap-2">
            <FaCalendar /> Schedule Exam
          </span>
          →
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
