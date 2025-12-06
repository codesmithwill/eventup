let currentUser = null;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getUsers = async () => {
  try {
    const response = await fetch("/dbUsers.json");
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    return [];
  }
};

const saveUsers = async (users) => {
  try {
    const response = await fetch("/api/saveUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar usuários");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao salvar usuários:", error);
    throw error;
  }
};

export const mockAuth = {
  signIn: async (email, password) => {
    await delay(500);

    const users = await getUsers();

    const user = users.find(
      (u) =>
        (u.email === email || u.username === email) && u.password === password
    );

    if (!user) {
      throw new Error("Usuário ou senha inválidos.");
    }

    currentUser = {
      uid: user.id,
      email: user.email,
      displayName: user.username,
      birthDate: user.birthDate,
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    return currentUser;
  },

  signUp: async (username, email, birthDate, password) => {
    await delay(500);

    const users = await getUsers();

    const emailExists = users.some((u) => u.email === email);
    if (emailExists) {
      throw new Error("Este email já está registrado.");
    }

    const usernameExists = users.some((u) => u.username === username);
    if (usernameExists) {
      throw new Error("Este nome de usuário já está em uso.");
    }

    const newUser = {
      id: String(Math.max(...users.map((u) => parseInt(u.id)), 0) + 1),
      username,
      email,
      password,
      birthDate,
    };

    users.push(newUser);
    await saveUsers(users);

    currentUser = {
      uid: newUser.id,
      email: newUser.email,
      displayName: newUser.username,
      birthDate: newUser.birthDate,
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    return currentUser;
  },

  signOut: () => {
    currentUser = null;
    localStorage.removeItem("currentUser");
  },

  getCurrentUser: () => {
    if (!currentUser) {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        currentUser = JSON.parse(stored);
      }
    }
    return currentUser;
  },

  _listeners: [],
  onAuthStateChanged: (callback) => {
    const user = mockAuth.getCurrentUser();
    try {
      callback(user);
    } catch (e) {
      console.error("Erro no callback de onAuthStateChanged:", e);
    }

    mockAuth._listeners.push(callback);

    return () => {
      mockAuth._listeners = mockAuth._listeners.filter((l) => l !== callback);
    };
  },

  getFullUserData: async (uid) => {
    const users = await getUsers();
    const u = users.find((usr) => String(usr.id) === String(uid));
    return u || null;
  },

  toggleFavorite: async (uid, eventId) => {
    const users = await getUsers();
    const idx = users.findIndex((u) => String(u.id) === String(uid));
    if (idx === -1) throw new Error("Usuário não encontrado");

    const user = users[idx];
    user.favorites = Array.isArray(user.favorites) ? [...user.favorites] : [];

    const exists = user.favorites.includes(eventId);
    if (exists) {
      user.favorites = user.favorites.filter((id) => id !== eventId);
    } else {
      user.favorites.push(eventId);
    }

    await saveUsers(users);

    const stored = mockAuth.getCurrentUser();
    if (stored && String(stored.uid) === String(uid)) {
      const updated = { ...stored, favorites: user.favorites };
      currentUser = updated;
      localStorage.setItem("currentUser", JSON.stringify(updated));
    }

    mockAuth._listeners.forEach((cb) => {
      try {
        cb(mockAuth.getCurrentUser());
      } catch (e) {
        console.error("Erro ao notificar listener:", e);
      }
    });

    return user.favorites;
  },
};
