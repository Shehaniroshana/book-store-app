import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Platform } from 'react-native';
import Styles from '../../assets/styles/signup.styles';
import COLORS from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';


export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {}


  
  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      
    <View style={Styles.container}>

           <View style={Styles.card}>
             {/* Header */}
              
              <View style={Styles.header}>
                <Text style={Styles.title}>Book Store</Text>
                <Text style={Styles.subtitle}>Share your favorite books</Text>
              </View>
                

             <View style={Styles.formContainer}>
                {/* Name Input */}
                <View style={Styles.inputGroup}>
                  <Text style={Styles.label}>Name</Text>
                  <View style={Styles.inputContainer}>
                    <Ionicons
                      name="person-outline"
                      size={24}
                      color={COLORS.primary}
                      style={Styles.inputIcon}
                    ></Ionicons>
                    <TextInput
                      style={Styles.input}
                      placeholder="Enter your name"
                      placeholderTextColor={COLORS.placeholderText}
                      value={userName}
                      onChangeText={setUserName}
                      autoCapitalize="none"
                    ></TextInput>
                  </View>
                </View>
                  

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
                    ></Ionicons>
                    <TextInput
                      style={Styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.placeholderText}
                      value={password}
                      onChangeText={setPassword}                    
                      secureTextEntry={!showPassword}
                    ></TextInput>    
                   <TouchableOpacity 
                   onPress={() => setShowPassword(!showPassword)}
                   >
                   <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color={COLORS.primary}
                      style={Styles.eyeIcon}
                    ></Ionicons>
                   </TouchableOpacity>
                  </View>
                </View>

             </View>


             <TouchableOpacity
            style={Styles.button}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={Styles.buttonText}>Sign up</Text>
            )}
          </TouchableOpacity>

          <View style={Styles.footer}>
            <Text style={Styles.footerText}>Already have an account?</Text>
            <Link href="/(auth)" asChild>
            <TouchableOpacity>
              <Text style={Styles.link}>Login</Text>
            </TouchableOpacity>
            </Link>
          </View>
           </View>

       
    </View>
    
     
    </KeyboardAvoidingView>
  )
}