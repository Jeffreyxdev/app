import { SafeAreaView } from 'react-native-safe-area-context'
import { View,Text } from 'react-native'

const Welcome = () => {
  return (
   <SafeAreaView>
    <View className='flex min-h-screen justify-center items-center'>  
        <Text className='font-bold  text-center'>Onboarding. Hi</Text>
    </View>
   </SafeAreaView>
  )
}

export default Welcome