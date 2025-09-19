interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

function matchRegisterDataFields(registerData: RegisterData) {
  const payload : { [key: string]: string } = {};
  for (let field in registerData) {
    const fieldName = field as keyof RegisterData;
    if (fieldName === "firstName") {
      payload["first_name"] = registerData[fieldName];
    } else if (fieldName === "lastName") {
      payload["last_name"] = registerData[fieldName];
    } else {
      payload[fieldName] = registerData[fieldName];
    }
  }
  console.log(payload);
  return payload;
}

export async function registerStudent(registerData: RegisterData) {
  
  console.log(registerData)
  const payload = matchRegisterDataFields(registerData);
  console.log(payload)

  try {
    const response = await fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
  }
  catch(err) {
    console.log(err);
  }
  
  
}