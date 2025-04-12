import { useCallback, useEffect, useReducer } from "react";

type State<T> = {
  data?: T;
  error?: Error;
  isLoading: boolean;
};

type Action<T> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: Error };

const cache: { [url: string]: any } = {};

function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: undefined };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: undefined,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function useFetch<T>(url: string) {
  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: undefined,
    error: undefined,
    isLoading: false,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const response = await fetch(url, {
        method: "GET", // or "POST", "PUT", "DELETE"
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      cache[url] = data; // Optional: Cache the response
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error as Error });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refresh: fetchData }; // Return refresh function
}

export default useFetch;
