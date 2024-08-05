import { FileWithURL } from "../components/ImageUpload";

export interface FormValueType {
  Name: string;
  Email: string;
  PhoneNumber?: string;
  DOB?: Date;
  City?: string;
  District?: string;
  Province?: string;
  Country?: string;
  id?: number;
  image?: FileWithURL | null;
}
