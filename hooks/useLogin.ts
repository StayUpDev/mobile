import { useEffect, useState } from "react";

export default function useLogin(
  email: string,
  password: string,
  onRegister?: (email: string, password: string) => Promise<any>
) {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    if (onRegister && email && password) {
      const registerUser = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const res = await onRegister(email, password);
          setResponse(res);
        } catch (e) {
          setError("Registration failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      registerUser();
    } else {
      setError("Unexpected error during login");
    }
  }, [email, password, onRegister]);

  return { error, isLoading, response };
}
