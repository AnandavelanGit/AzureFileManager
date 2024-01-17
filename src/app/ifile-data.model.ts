export interface IFileData {

    name: string;
    uploadeddate:Date
  uploadedby: string;
  size: number;
 // uploadeddate: Date;
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
