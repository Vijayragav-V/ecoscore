import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

const registerUser = async (username, email, password, lifestyleData) => {
  try {
    if (
      !lifestyleData ||
      lifestyleData.transportationMiles === undefined ||
      !lifestyleData.vehicleType ||
      lifestyleData.energyConsumption === undefined ||
      !lifestyleData.dietType ||
      lifestyleData.flyingFrequency === undefined ||
      lifestyleData.recycling === undefined
    ) {
      throw new Error("All lifestyle data fields are required.");
    }

    const { data } = await api.post("/user/register", {
      username,
      email,
      password,
      lifestyleData,
    });
    return data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

const loginUser = async (email, password) => {
  try {
    const { data } = await api.post("/user/login", { email, password });
    return data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "Token not found" };
    }

    const { data } = await api.get("/user/check", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

const getActions = async () => {
  try {
    const { data } = await api.get("/action");
    return data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

const completeAction = async (actionId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "Token not found" };
    }

    const { data } = await api.post(
      "/action",
      { actionId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

const updateUser = async (email, oldPassword, newPassword, lifestyleData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "Token not found" };
    }

    if (
      !lifestyleData ||
      lifestyleData.transportationMiles === undefined ||
      !lifestyleData.vehicleType ||
      lifestyleData.energyConsumption === undefined ||
      !lifestyleData.dietType ||
      lifestyleData.flyingFrequency === undefined ||
      lifestyleData.recycling === undefined
    ) {
      throw new Error("All lifestyle data fields are required.");
    }

    const { data } = await api.put(
      "/user/update",
      { email, oldPassword, newPassword, lifestyleData },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "Token not found" };
    }

    const { data } = await api.get("/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    } else {
      return { error: error.message };
    }
  }
};

export {
  registerUser,
  loginUser,
  checkAuth,
  getActions,
  completeAction,
  getUser,
  updateUser,
};
