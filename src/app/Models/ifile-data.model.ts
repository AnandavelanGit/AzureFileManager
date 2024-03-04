export interface IFileData {

    name: string;
    size: number;
    uploadedDate:Date;
 
}
export class FileDataToDisplay {

 constructor( name: string,
sizeinkb: number,
uploadedby: string,
 )
 {}
// uploadeddate: Date;
}

export interface IFileDataAzure {
  name: string;
  uploadedDate: Date;
  uploadedBy: string;
  size: number; 
}


export class qaclass
  {
    public question: string;
    public answer: string;
  }
