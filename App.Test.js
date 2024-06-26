import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GeolocationScreen from '../screens/GeolocationScreen';

jest.mock('react-native-geolocation-service', () => {
  return {
    getCurrentPosition: jest.fn((success, error) => {
      success({
        coords: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
      });
    }),
  };
});

describe('GeolocationScreen', () => {
  it('should request location permission and get current location', () => {
    const { getByText } = render(<GeolocationScreen />);
    const button = getByText('Get Current Location');

    fireEvent.press(button);

    expect(getByText('Latitude: 37.78825, Longitude: -122.4324')).toBeTruthy();
  });
});
