import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import authReducer from './auth'
import appReducer from './app'
import cacheReducer from './cached'
import rootSaga from './saga/rootSaga';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

//reducer
const reducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    cache: cacheReducer
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
