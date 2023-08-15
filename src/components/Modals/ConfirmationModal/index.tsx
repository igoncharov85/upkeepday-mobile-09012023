import React, {FC, ReactNode, useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

interface IProps {
  show: boolean;
  children: ReactNode;
  result: (value: boolean) => void;
}

export const ConfirmationModal: FC<IProps> = ({children, show, result}) => {
  const [isOpened, setIsOpened] = useState<boolean>(show);
  
  useEffect(() => {setIsOpened(show)}, [show]);
  
  const handleConfirm = (value: boolean) => {
    result(value);
    setIsOpened(false);
  }

  return (
    <>
      {
        isOpened && (
          <LinearGradient
            colors={['rgba(178, 178, 178, 0.8)', 'rgba(23, 25, 48, 0.90)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.wrap}
          >
            <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center'}}>
              <View style={styles.modal}>
                {children}
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity 
                style={styles.done}
                onPress={() => {handleConfirm(true)}}
              >
                <Text style={styles.doneText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.back} onPress={() => {handleConfirm(false)}}>
                <Text style={styles.doneText}>Back</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )
      }
    </>
  )
}