// Função para simular o armazenamento de usuários no localStorage
const storeUserInLocalStorage = (name, email, phone, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ name, email, phone, password });
  localStorage.setItem('users', JSON.stringify(users));
};

// Função para verificar as credenciais de login
const findUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.email === email);
};

const mockApi = {
  async login(email, password) {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
      return { success: true };
    } else {
      throw new Error('Credenciais inválidas');
    }
  },
  
  async register(name, email, phone, password) {
    // Verifica se o email já está cadastrado
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
    storeUserInLocalStorage(name, email, phone, password);
    return { success: true };
  }
};

export const login = async (email, password) => {
  return mockApi.login(email, password);
};

export const register = async (name, email, phone, password) => {
  return mockApi.register(name, email, phone, password);
};
