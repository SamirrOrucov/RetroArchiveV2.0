import React, { createContext, useState, useEffect, useContext } from "react";
import useLocalHook from "../hook/useLocalHook";
import { UserTokenContext } from "./UserTokenContext";

export const WatchlistContext = createContext();

function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useLocalHook("watchlist", []);
  const { decodedToken, tokenn } = useContext(UserTokenContext);

  async function addToWatchlist(item) {
    try {
      const index = watchlist.findIndex((x) => x === item._id);
      if (index === -1) {
        const response = await fetch(
          `http://localhost:3003/user/${decodedToken.userId}/watchlist`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenn}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: decodedToken.userId,
              filmId: item._id,
            }),
          }
        );

        if (response.ok) {
          setWatchlist([...watchlist, item._id]);
        } else {
          console.error(
            "Failed to add item to watchlist:",
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error adding item to watchlist:", error);
    }
  }

  async function removeFromWatchlist(item) {
    try {
      const response = await fetch(
        `http://localhost:3003/user/${decodedToken.userId}/watchlist`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenn}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: decodedToken.userId,
            filmId: item._id,
          }),
        }
      );

      if (response.ok) {
        setWatchlist(watchlist.filter((x) => x !== item._id));
      } else {
        console.error(
          "Failed to remove item from watchlist:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error removing item from watchlist:", error);
    }
  }

  async function fetchWatchlistFromDB() {
    try {
      const response = await fetch(
        `http://localhost:3003/user/${decodedToken.userId}`
      );
      if (response.ok) {
        const text = await response.text();
        const userData = text ? JSON.parse(text) : {}; // Parse JSON if response contains data, otherwise use empty object
        const watchlist = userData.wishlist || [];
        setWatchlist(watchlist);
      } else {
        console.error("Failed to fetch watchlist:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  }
  useEffect(() => {
    if (tokenn) {
      fetchWatchlistFromDB();
    } else {
      setWatchlist([]);
    }
  }, [tokenn]);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistProvider;
