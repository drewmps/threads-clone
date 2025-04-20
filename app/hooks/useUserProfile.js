import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../queries/queriesAndMutations";
import { useEffect } from "react";

export function useUserProfile() {
  const [handleGetCurrentUser, { data, loading, error }] = useLazyQuery(
    GET_CURRENT_USER,
    {
      onError: (result) => {
        Alert.alert(result.message);
      },
    }
  );
  useEffect(() => {
    handleGetCurrentUser();
  }, []);
  return {
    userProfile: data?.getCurrentUser,
    isLoading: loading,
    error: !!error,
  };
}
