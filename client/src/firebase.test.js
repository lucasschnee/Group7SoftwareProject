import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { db } from './firebase';

jest.mock("firebase/app");
jest.mock("firebase/firestore");

describe("Firebase Configuration", () => {
  it("initializes Firebase app with correct configuration", () => {
    // Expected Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCc7X1IWwzV-n2eIDcSe605brdRWAHYQrQ",
      authDomain: "swe-project-304dd.firebaseapp.com",
      databaseURL: "https://swe-project-304dd-default-rtdb.firebaseio.com",
      projectId: "swe-project-304dd",
      storageBucket: "swe-project-304dd.appspot.com",
      messagingSenderId: "414472923061",
      appId: "1:414472923061:web:f9cc87465d661fee24dbfc",
      measurementId: "G-7TWZD35N23"
    };

    // Check if Firebase app is initialized with the correct config
    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });

  it("initializes Firestore correctly", () => {
    // Check if Firestore is initialized
    expect(getFirestore).toHaveBeenCalled();
    expect(db).toBeDefined();
  });
});
