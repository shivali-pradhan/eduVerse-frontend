interface LoginData {
  username: string;
  password: string;
}

export async function loginUser(loginData: LoginData) {
  const formData = new URLSearchParams();
  formData.append('username', loginData.username);
  formData.append('password', loginData.password);

  try {
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    const data = await response.json();
    return data;
  }
  catch(err) {
    console.log(err);
  } 
  
}