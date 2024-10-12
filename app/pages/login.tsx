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
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { Divider } from "@/components/ui/divider";
import { UserRole } from "../types";

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
  const { onLogin, authState } = useAuth();

  // State to handle the response and loading manually
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  async function handleSubmit() {
    console.log("login submit");
    // Reset previous errors
    setIsEmailError(false);
    setIsPasswordError(false);
    setLoginError(null);
    // Call the API using onRegister
    try {
      console.log("on login...", onLogin);
      const res = await onLogin?.(email, password);
    } catch (e: any) {
      setLoginError(e.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  }

  console.log("auth state> ", authState?.authenticated);
  console.log("auth user role> ", authState?.userRole);
  return authState?.authenticated ? (
    authState.userRole === "promoter" ? (
      <Redirect href={"/pages/protected/promoter/home"} />
    ) : (
      <Redirect href={"/pages/protected/participant/home"} />
    )
  ) : (
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
        <Divider />
        <Button variant="link">
          <Link href={"/pages/register"}>register</Link>
        </Button>
      </Center>
    </View>
  );
}
