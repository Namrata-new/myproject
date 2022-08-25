import React, { useState } from 'react'
import { View, Button } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'

const Dates = () => {
    
  const [showDatePicker, setShowDatePicker] = useState(false)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const onConfirm = ( date ) => {
    // You should close the modal in here
    setShowDatePicker(false)
    
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    console.log(date.dateString)
  }

  return (
    <View>
      <Button title={'open'} onPress={openDatePicker}/>
      <DatePicker
        isVisible={showDatePicker}
        mode={'single'}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </View>
  )
}

export default Dates