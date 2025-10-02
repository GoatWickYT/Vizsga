const API_BASE = 'https://vizsga.onrender.com/auth'; // adjust to your backend

// Static test data
const testRegisterData = {
    username: 'testuser123',
    name: 'Test User',
    email: 'testuser123@example.com',
    password: 'password123',
};

const testLoginData = {
    usernameOrEmail: 'testuser123',
    password: 'password123',
};

async function registerUser() {
    console.log('Registering user...');
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testRegisterData),
    });
    const data = await res.json();
    console.log('Register response:', data);
}

async function loginUser() {
    console.log('Logging in...');
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testLoginData),
    });
    const data = await res.json();
    console.log('Login response:', data);
    return data;
}

async function main() {
    await registerUser();
    const loginRes = await loginUser();
    console.log('Received token:', loginRes.token);
}

main().catch((err) => console.error('Error:', err));
