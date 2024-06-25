import React, { useState, useEffect } from 'react';
import { ImagePickerIOS, ImagePicker } from 'react-native'; // For image picker
import { View, Button, Image, Alert, ActivityIndicator } from 'react-native'; // For UI elements
import LoadingScreen from '../components/Loading/LoadingScreen'; // Import LoadingScreen

const ScanScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [mockBackendResponse, setMockBackendResponse] = useState(null);
  const [error, setError] = useState(null); // State for error message

  // Optional: Request camera permission before taking picture
  const requestCameraPermission = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    if (cameraPermission.status !== 'granted') {
      setError('Camera access is required to capture logs.');
      return;
    }
  };

  const takePicture = async () => {
    // Optional: Call permission request before image picker
    await requestCameraPermission();

    setIsLoading(true); // Show loading indicator
    setError(null); // Clear any previous error

    let result;
    try {
      if (Platform.OS === 'ios') {
        result = await ImagePickerIOS.showImagePicker({ sourceType: 'camera' });
      } else {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.cancelled) {
        setImageUri(result.uri);

        // Optional: Image pre-processing (resize, format conversion)
        // ... (your pre-processing logic here)

        // Simulate backend processing (replace with actual backend call)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

        const response = {
          success: true, // Change to false for simulated errors
          message: 'Log analysis successful (simulated)',
          logStatus: 'Valid', // Include additional data from backend analysis
          segmentCount: 2, // Include additional data from backend analysis
        };

        setMockBackendResponse(response);

        // Navigate to InputScreen with captured image data
        navigation.navigate('Input', { capturedImage: result.uri });
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      setError('Failed to capture image. Please try again.');
    } finally {
      setIsLoading(false); // Hide loading indicator after processing
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          ) : (
            <Text>Capture a log image</Text>
          )}
          <Button title="Capture Log" onPress={takePicture} />
        </>
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {mockBackendResponse && (
        <Button
          title={mockBackendResponse.success ? 'See Results' : 'Retry Analysis'}
          onPress={() => {
            if (mockBackendResponse.success) {
              navigation.navigate('Success', {
                logStatus: mockBackendResponse.logStatus,
                segmentCount: mockBackendResponse.segmentCount,
              });
            } else {
              Alert.alert('Error!', mockBackendResponse.message || 'Analysis failed (simulated)');
            }
          }}
        />
      )}
    </View>
  );
};

export default ScanScreen;
