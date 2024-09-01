import { createContext, useContext } from "react";

// type TLoaderState = {
//     isLoading: boolean
// }

export const LoaderContext = createContext<boolean>(false)


export function useNoteMutateLoader() {
    const loader = useContext(LoaderContext)
    return loader
}
