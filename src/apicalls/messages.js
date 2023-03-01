import { axiosInstance } from ".";

export const SendMessage = async (message) => {
  try {
    const response = await axiosInstance.post(
      "https://textmeapplication-server.onrender.com/api/messages/new-message",
      message
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `https://textmeapplication-server.onrender.com/api/messages/get-all-messages/${chatId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
