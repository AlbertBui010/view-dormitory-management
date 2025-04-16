import mockApiService from "./mockApi";

const isDevelopment = process.env.NODE_ENV === "development";

// For development, use the mock API
const api = isDevelopment
  ? mockApiService
  : {
      // Your real API implementation
      get: async (url) => {
        // Real API implementation using fetch or axios
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return { data };
      },

      post: async (url, data) => {
        // Real API implementation
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return { data: responseData };
      },

      put: async (url, data) => {
        // Real API implementation
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return { data: responseData };
      },

      delete: async (url) => {
        // Real API implementation
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return { status: response.status };
      },
    };

export default api;
