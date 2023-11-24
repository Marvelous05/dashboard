export type User = {
    id: string;
    raisedBy: string;
    clientName: string;
    contactPhone: string;
    location:string;
    fault: string;
   status: string;
   issueType: string;
  };
  
  export const fakeData: User[] = [
    {
      id: '9s41rp',
      raisedBy: 'Charity',
      clientName: 'Kelvin',
      contactPhone: '07834589234',
      location:'Mbare',
      fault: 'offline for too long',
      status: 'On It',
      issueType: 'Rework',
    },
    {
      id: '9s41rp',
      raisedBy: 'Charity',
      clientName: 'Odzi',
      contactPhone: '07834589234',
      location:'Willowvale',
      fault: 'fuel drainage',
      status: 'On It',
      issueType: 'Rework',
    },
    {
      id: '9s41rp',
      raisedBy: 'Faith',
      clientName: 'Simbisa',
      contactPhone: '07834589234',
      location:'Aspindale',
      fault: 'offline for too long',
      status: 'On It',
      issueType: 'Rework',
    },
    
    {
      id: '9s41rp',
      raisedBy: 'Melania',
      clientName: 'Bluestar',
      contactPhone: '07834589234',
      location:'Willowvale',
      fault: 'offline for too long',
      status: 'On It',
      issueType: 'Rework',
    },
    {
      id: '9s41rp',
      raisedBy: 'Rejoice',
      clientName: 'Red Rose',
      contactPhone: '07834589234',
      location:'Willowvale',
      fault: 'offline for too long',
      status: 'On It',
      issueType: 'Rework',
    },
   
  ];
  
  //5 fanDepartments array
  export const issueStatus = [
    'On It',
    'On Hold',
    'Done',
    
  ];