import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

interface VerifyOtpProps {
  email?: string;
  onBack: () => void; // optional back action
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ email, onBack }) => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next
    if (text && index < 4) inputs.current[index + 1]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code === "12345") {
      setModalType("success");
      setModalVisible(true);
    } else {
      setModalType("error");
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white p-6">
        {/* Back */}
        <TouchableOpacity onPress={onBack} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-xl font-montserrat-semibold text-center mb-2">
          Verify your email
        </Text>
        <Text className="text-center text-gray-600 mb-6">
          Enter the code sent to {email ?? "your email"}
        </Text>

        {/* OTP Inputs */}
        <View className="flex-row justify-center mb-6">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              className="border border-gray-400 rounded-lg w-12 h-12 text-center text-lg mx-1"
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleVerify}
          className="bg-black py-4 rounded-full"
        >
          <Text className="text-white text-center font-montserrat-semibold">
            Verify
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-8 rounded-2xl items-center w-4/5">
              {modalType === "success" ? (
                <>
                  <Text className="text-lg font-montserrat-semibold mb-4 text-center">
                    🎉 Congratulations! Your account has been created!
                  </Text>
                  <TouchableOpacity
                    className="bg-black py-3 px-6 rounded-full"
                    onPress={() => {
                      setModalVisible(false);
                      router.push({
                        pathname: "/(auth)",
                        params: { form: "signin" },
                      });
                    }}
                  >
                    <Text className="text-white">Proceed to Login</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text className="text-lg font-montserrat-semibold mb-4 text-center text-red-500">
                    ❌ Incorrect OTP, try again
                  </Text>
                  <TouchableOpacity
                    className="bg-black py-3 px-6 rounded-full"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-white">Back</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtp;
