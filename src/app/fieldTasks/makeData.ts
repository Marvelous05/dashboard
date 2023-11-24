export type Task = {
    id: string;
   technician: string;
    supervisor: string;
    taskType:string;
    type: string;
    status: string;
    stock: string;
  };
  
  export const fakeData: Task[] = [
    {
      id: '9s41rp',
      technician: 'Kelvin',
      supervisor: 'Langosh',
      taskType:'Device Reconnection',
      type: 'Rework',
      status: 'On Hold',
      stock:'none'
    },

  ];

  export const taskType= [
   'Rework',
   'New Installation',
  ];
  export const taskStatus= [
    'On it',
    'On Hold',
    'Done',
  ]