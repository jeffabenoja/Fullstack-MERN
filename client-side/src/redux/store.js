import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { persistStore } from "redux-persist"

// Combine all the individual reducers into a single rootReducer
const rootReducer = combineReducers({
  user: userReducer, // Add the user slice reducer
})

// Configuration object for redux-persist
const persistConfig = {
  key: "root", // Key for the storage
  storage, // Use local storage for persistence
  version: 1, // Versioning for migration
}

// Create a persisted reducer using the configuration
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }), // Ensure the middleware array is returned
})

export const persistor = persistStore(store)

// Note: Ensure you have the necessary packages installed:
// - @reduxjs/toolkit
// - redux-persist
// - redux-persist/lib/storage
