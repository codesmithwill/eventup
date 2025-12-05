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

  onAuthStateChanged: (callback) => {
    const user = mockAuth.getCurrentUser();
    callback(user);

    return () => {};
  },
};
