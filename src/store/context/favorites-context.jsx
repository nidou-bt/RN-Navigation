import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

export function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  useEffect(() => {
    console.log("favoriteMealIds", favoriteMealIds);
  }, [favoriteMealIds]);

  const addFavorite = useCallback((id) => {
    return setFavoriteMealIds((prevValues) => {
      return [...prevValues, id];
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    return setFavoriteMealIds((prevValues) =>
      prevValues.filter((favorite) => {
        return favorite !== id;
      })
    );
  }, []);

  const value = {
    ids: favoriteMealIds,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default function useFavorites() {
  return useContext(FavoritesContext);
}
