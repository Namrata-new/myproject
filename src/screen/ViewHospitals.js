import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';

const ViewHospitals = ({ navigation }) => {
    return (
     <View style={styles.container}>
        <Text>Hello</Text>
     </View>
    );
};
export default ViewHospitals;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontSize: 18,
      textAlign: 'center',
    },
    footerHeading: {
      fontSize: 18,
      textAlign: 'center',
      color: 'grey',
    },
    footerText: {
      fontSize: 16,
      textAlign: 'center',
      color: 'grey',
    },
});