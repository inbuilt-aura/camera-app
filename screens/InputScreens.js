import React, { useState } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { Checkbox } from '@react-native-community/checkbox';

const InputScreen = ({ route, navigation }) => {
  const { scannedData, capturedImage } = route.params; // Get scanned data and captured image
  const [truckLength, setTruckLength] = useState('');
  const [allLogsFixed, setAllLogsFixed] = useState(false);
  const [multipleSegments, setMultipleSegments] = useState(false);
  const [error, setError] = useState(null); // State for error message

  const validateTruckLength = () => {
    const trimmedTruckLength = truckLength.trim();
    if (trimmedTruckLength === '') {
      setError('Please enter the truck length.');
      return false;
    }

    // Additional validation (optional)
    // You can add checks for valid number format or unit (e.g., "10 ft")
    // setError('Invalid truck length format');

    setError(null); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async () => {
    if (!validateTruckLength()) return; // Exit if truck length is invalid

    try {
      // Simulate backend call with scanned data, captured image, and user input
      console.log('Scanned Data:', scannedData);
      console.log('Captured Image:', capturedImage); // Log image URI for reference
      console.log('Truck Length:', truckLength);
      console.log('All Logs Fixed:', allLogsFixed);
      console.log('Multiple Segments:', multipleSegments);

      // Replace with actual backend call when ready
      // const response = await fetch('your-backend-endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     scannedData,
      //     capturedImage, // Send image URI
      //     truckLength,
      //     allLogsFixed,
      //     multipleSegments,
      //   }),
      // });

      // Handle successful backend response
      navigation.navigate('Success'); // Navigate to SuccessScreen
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('An error occurred. Please try again.'); // Generic error for user
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        value={truckLength}
        onChangeText={setTruckLength}
        placeholder="Truck Length"
        keyboardType="numeric"
        onBlur={validateTruckLength}
        style={[styles.textInput, error ? styles.errorInput : '']} // Set error style
      />
      <Checkbox
        value={allLogsFixed}
        onValueChange={setAllLogsFixed}
        label="Are all logs fixed?"
      />
      <Checkbox
        value={multipleSegments}
        onValueChange={setMultipleSegments}
        label="Are they multiple segments?"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default InputScreen;
