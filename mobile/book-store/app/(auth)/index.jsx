import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import Styles from "../../assets/styles/login.styels";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Link } from "expo-router";
import { Platform } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {};

  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={Styles.container}>
      <View style={Styles.topIllustration}>
        <Image
          source={require("../../assets/images/login-bg.png")}
          style={Styles.illustrationImage}
          resizeMode="contain"
        ></Image>
      </View>

      <View style={Styles.card}>
        <View style={Styles.formContainer}>
           {/* Email Input */} 
          <View style={Styles.inputGroup}>
            <Text style={Styles.label}>Email</Text>
            <View style={Styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={COLORS.primary}
                style={Styles.inputIcon}
              ></Ionicons>

              <TextInput
                style={Styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              ></TextInput>
            </View>
          </View>
          {/* Password Input */}
          <View style={Styles.inputGroup}>
            <Text style={Styles.label}>Password</Text>

            <View style={Styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={COLORS.primary}
                style={Styles.inputIcon}
              />

              <TextInput
                style={Styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              ></TextInput>

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color={COLORS.primary}
                  style={Styles.eyeIcon}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
           
           {/* Login Button */}
          <TouchableOpacity
            style={Styles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={Styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={Styles.footer}>
            <Text style={Styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={Styles.link}>Sign up</Text>
            </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>   
    </KeyboardAvoidingView>
  );
}
