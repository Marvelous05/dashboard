export type Stock = {
    id: string;
    imei: string;
    dateIn: string;
    checkInBy: string;
    checkOutBy: string;
    source: string;
    model: string;
    type: string;
  };
  
  export const fakeData: Stock[] = [
    {
      id: '9s41rp',
      imei:'123456789012345',
      dateIn: '23/23/01',
      checkInBy:'Tinashe',
      checkOutBy:'Prof',
      source:'Returned Stock',
      model:'fmb125',
      type:'fuel',
    },
     {
      id: '9s41rp',
      imei:'123456789012345',
      dateIn: '23/23/01',
      checkInBy:'Tinashe',
      checkOutBy:'Prof',
      source:'Returned Stock',
      model:'fmb125',
      type:'fuel',
    },
    
  ];
  
  export const stockSources =[
'Returned Stock',
'Manufacturer'
  ];
  export const stockModels =[
    'fmb 920',
    'fmb 125',
    'econet',
    'netone'
      ];
      export const stockTypes =[
        'sim',
        'sensor',
        'device',
        'fuel',
        'accessory'
          ];