import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonGroup,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useAuth } from "./context/AuthContext";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

export default function Page() {
  // email and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation state
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  // Button disabled state
  const [isDisabled, setIsDisabled] = useState(false);

  // Get onRegister from useAuth context
  const { onRegister, onLogin, authState } = useAuth();

  // State to handle the response and loading manually
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  async function handleSubmit() {
    // Reset previous errors
    setIsEmailError(false);
    setIsPasswordError(false);
    setLoginError(null);

    // Validate email and password
    if (password === "" || password.length < 6) {
      setIsPasswordError(true);
    }
    if (email === "" || !email.includes("@")) {
      setIsEmailError(true);
    }

    // If any validation error exists, do not proceed
    if (isPasswordError || isEmailError) {
      setIsDisabled(false);
      return;
    }

    // Disable the button and start loading
    setIsDisabled(true);
    setIsLoading(true);

    // Call the API using onRegister
    try {
      const res = await onRegister?.(email, password);
      setResponse(res); // Store the response if needed
    } catch (e: any) {
      setLoginError(e.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  }

  useEffect(() => {
    if (response && onLogin) {
      const login = async () => {
        const res = await onLogin(email, password);

        if (res) router.push("/home");
      };

      login();
    }
  }, [response]);

  return (
    <View>
      <Center className="h-full w-full flex ">
        <VStack className="max-w-xs w-full gap-4">
          <FormControl isInvalid={isPasswordError}>
            <FormControlLabel>
              <FormControlLabelText>email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="mario.rossi@gmail.com"
                onChangeText={(text) => setEmail(text)}
                size="lg"
              ></InputField>
            </Input>
            <FormControlError>
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={isEmailError}>
            <FormControlLabel>
              <FormControlLabelText>password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                placeholder="password"
                size="lg"
                onChangeText={(text) => setPassword(text)}
              ></InputField>
            </Input>
            <FormControlError>
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <ButtonGroup>
            <Button
              className="w-fit   self-end mt-4"
              size="sm"
              onPress={handleSubmit}
            >
              <ButtonText disabled={isDisabled}>submit</ButtonText>
              {isDisabled && <ButtonSpinner />}
            </Button>
          </ButtonGroup>
        </VStack>
      </Center>
    </View>
  );
}
