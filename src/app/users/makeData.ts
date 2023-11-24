export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password:string;
   department: string;
  };
  
  export const fakeData: User[] = [
    {
      id: '9s41rp',
      firstName: 'Kelvin',
      lastName: 'Langosh',
      email: 'Jerod14@hotmail.com',
      password:'finance',
     department: 'Finance',
    },
    {
      id: '08m6rx',
      firstName: 'Molly',
      lastName: 'Purdy',
      email: 'Hugh.Dach79@hotmail.com',
      password:'finance',
     department: 'Finance',
    },
    {
      id: '5ymtrc',
      firstName: 'Henry',
      lastName: 'Lynch',
      email: 'Camden.Macejkovic@yahoo.com',
      password:'finance',
     department: 'Finance',
    },
    {
      id: 'ek5b97',
      firstName: 'Glenda',
      lastName: 'Douglas',
      email: 'Eric0@yahoo.com',
      password:'finance',
     department: 'Finance',
    },
    {
      id: 'xxtydd',
      firstName: 'Leone',
      lastName: 'Williamson',
      email: 'Ericka_Mueller52@yahoo.com',
      password:'finance',
     department: 'Admin',
    },
    {
      id: 'wzxj9m',
      firstName: 'Mckenna',
      lastName: 'Friesen',
      email: 'Veda_Feeney@yahoo.com',
      password:'finance',
     department: 'Sales',
    },
    {
      id: '21dwtz',
      firstName: 'Wyman',
      lastName: 'Jast',
      email: 'Melvin.Pacocha@yahoo.com',
      password:'sales',
     department: 'Sales',
    },
    {
      id: 'o8oe4k',
      firstName: 'Janick',
      lastName: 'Willms',
      email: 'Delfina12@gmail.com',
      password:'sales',
     department: 'Sales',
    },
  ];
  
  //5 fanDepartments array
  export const fanDepartments = [
    'Finance',
    'Technical Team',
    'Sales',
    'Admin',
    'Customer Service Department'
  ];