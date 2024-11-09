import React, { useState, useEffect } from "react";
import { getUser, getActions, completeAction } from "../services/api"; 
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [actions, setActions] = useState([]);
  const [completedActions, setCompletedActions] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EcoScore - Profile";

    getUser().then((data) => {
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setUser(data);
        setCompletedActions(
          data.actionsCompleted.map((action) => action.actionId)
        );
      }
      setLoading(false);
    });

    getActions().then((data) => {
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setActions(data);
      }
    });
  }, []);

  const handleCompleteAction = (actionId, CO2Saved) => {
    setCompletedActions((prev) => [...prev, actionId]);

    if (user) {
      completeAction(actionId).then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          getUser().then((updatedUserData) => {
            if (updatedUserData.error) {
              setErrorMessage(updatedUserData.error);
            } else {
              setUser(updatedUserData);
            }
          });
        }
      });
    }
  };

  const handleClosePopup = () => {
    setErrorMessage(null); 
  };

  const randomIndex = Math.floor(Math.random() * 83);

  if (loading) return <div>Loading...</div>;

  const ecoScorePercentage = user.ecoScore / 100 * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 to-blue-300 pt-20 pb-5">
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

        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          EcoScore Dashboard
        </h1>

        <section className="profile-info mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {user.username}
          </h2>
        </section>

        <section className="eco-score mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">EcoScore</h2>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
            <div
              className="bg-green-500 h-6 rounded-full"
              style={{ width: `${ecoScorePercentage}%` }}
            ></div>
          </div>
          <p className="text-center text-lg font-semibold text-green-700">
            {Math.floor(user.ecoScore)} / 100
          </p>
        </section>

        <section className="actions-recommended mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Actions Recommended for You
          </h2>
          <div className="flex flex-wrap -mx-2">
            {actions.slice(randomIndex, randomIndex + 3).map((action) => (
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
          <button
            onClick={() => navigate("/actions")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View All Actions
          </button>
        </section>

        <section className="actions-completed">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Actions Completed
          </h2>
          {user.actionsCompleted.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-600">
              {user.actionsCompleted.map((action, index) => {
                const matchedAction = actions.find(
                  (a) => a._id === action.actionId
                );
                return (
                  <li key={index}>
                    {matchedAction
                      ? matchedAction.actionName
                      : "Action not found"}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No actions completed yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
