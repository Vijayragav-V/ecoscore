import React, { useState, useEffect } from "react";
import { getActions, completeAction, getUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Actions = () => {
  const [actions, setActions] = useState([]);
  const [user, setUser] = useState(null);
  const [completedActions, setCompletedActions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EcoScore - Actions";

    if (token) {
      getUser().then((data) => {
        setUser(data);
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setCompletedActions(
            data.actionsCompleted.map((action) => action.actionId)
          );
        }
      });
    }

    getActions().then((data) => {
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setActions(data);
      }
    });
  }, [token]);

  const handleCompleteAction = (actionId, CO2Saved) => {
    setCompletedActions((prev) => [...prev, actionId]);

    if (user) {
      completeAction(actionId).then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        }
      });
    }
  };

  const handleClosePopup = () => {
    setErrorMessage(null); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-blue-700 pt-20 pb-5">
      <div className="container mx-auto max-w-5xl p-8 shadow-lg rounded-lg bg-white">
        {errorMessage && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
              <p className="text-red-500 font-semibold mb-4 text-center">
                {errorMessage}
              </p>
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <Link to="/profile" style={{ color: "green", fontSize: "24px" }}>
          <FaArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Actions
        </h1>

        <section className="actions-list mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recommended Actions for You
          </h2>
          <div className="flex flex-wrap -mx-2">
            {actions.map((action) => (
              <div key={action._id} className="w-full sm:w-1/3 px-2 mb-4">
                <div className="border p-4 rounded-lg shadow-sm bg-gray-50 flex flex-col justify-evenly h-64">
                  <h3 className="font-semibold text-green-600">
                    {action.actionName}
                  </h3>
                  <p className="text-gray-600">{action.description}</p>
                  <p className="text-gray-500">
                    CO2 Saved: {action.CO2Saved} kg
                  </p>
                  <button
                    onClick={() =>
                      handleCompleteAction(action._id, action.CO2Saved)
                    }
                    disabled={completedActions.includes(action._id)}
                    className={`mt-4 px-4 py-2 w-full rounded ${
                      completedActions.includes(action._id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {completedActions.includes(action._id)
                      ? "Completed"
                      : "Complete Action"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {!user && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              To save completed actions to your profile, please{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                log in
              </span>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Actions;
