import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import appReducer from './app'
import authReducer from './auth'
import cacheReducer from './cached'
import classesReducer from './classes'
import { durationReducer } from './duration/durationSlice'
import locationReducer from './location'
import rootSaga from './saga/rootSaga'
import scheduleReducer from './shedule'
import userReducer from './user'

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

//reducer
const reducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    cache: cacheReducer,
    schedule: scheduleReducer,
    location: locationReducer,
    user: userReducer,
    classes: classesReducer,
    duration: durationReducer
})

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, reducer);
const middleware = [sagaMiddleware];


export const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware
})
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);
export const dispatch = store.dispatch
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
