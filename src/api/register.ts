interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string
}

function preprocess(registerData: RegisterData) {
  const payload : { [key: string]: string } = {};

  for (let field in registerData) {
    const fieldName = field as keyof RegisterData;
    if (fieldName === "firstName") {
      payload["first_name"] = registerData[fieldName][0].toUpperCase() + registerData[fieldName].slice(1);
    } else if (fieldName === "lastName") {
      payload["last_name"] = registerData[fieldName][0].toUpperCase() + registerData[fieldName].slice(1) || "";
    } else if (fieldName === "role") continue;
    else {
      payload[fieldName] = registerData[fieldName];
    }
  }
  console.log(payload);
  return payload;
}

export async function registerUser(registerData: RegisterData) {
  
  console.log("Register data:", registerData)
  let payload = preprocess(registerData);
  console.log("Payload", payload)

  let URL = '';
  if (registerData.role === "STUDENT") URL = 'http://localhost:8000/students';
  else if (registerData.role === "INSTRUCTOR") URL = 'http://localhost:8000/instructors';
  else {
    console.log("Invalid role");
    return;
  }
  console.log(URL);
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (data.id) return {newUser: data};
    else if (data.detail) return {error: data.detail};
    else return {error: "Could not register. Please try again!"};
  }
  catch(err) {
    console.log(err);
  }
  
}