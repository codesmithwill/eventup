import { useState, useEffect } from "react";
import { mockAuth } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = mockAuth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }

      (async () => {
        try {
          const full = await mockAuth.getFullUserData(user.uid || user.uid === 0 ? user.uid : user.uid);
          if (full) {
            setUser({
              uid: String(full.id),
              email: full.email,
              displayName: full.username,
              birthDate: full.birthDate,
              favorites: Array.isArray(full.favorites) ? full.favorites : [],
            });
          } else {
            setUser(user);
          }
        } catch (err) {
          console.error("Erro ao carregar dados completos do usuário:", err);
          setUser(user);
        } finally {
          setLoading(false);
        }
      })();
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
