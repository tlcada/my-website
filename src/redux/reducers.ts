import authReducer from "../app/components/Login/slices/auth";
import { pokemonApi } from "../app/components/Login/services/pokemon";

const rootReducer = {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    auth: authReducer,
};

export default rootReducer;
