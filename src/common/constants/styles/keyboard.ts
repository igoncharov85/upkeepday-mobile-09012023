import { KeyboardAvoidingViewProps, Platform } from "react-native"

export const keyboardSettings: KeyboardAvoidingViewProps = {
    behavior: Platform.OS == "ios" ? "padding" : "height",
    keyboardVerticalOffset: 60,
    enabled: true
}