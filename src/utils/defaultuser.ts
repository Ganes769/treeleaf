import { FormValueType } from "./types";
// const createMockImage = (name: string, type: string) => {
//   const mockImage = new Blob([new Uint8Array([0, 0, 0, 0])], { type });
//   return new File([mockImage], name, { type });
// };
import avatarImage from "../assets/pngwing.png";
const createMockImageFromAsset = async (name: string) => {
  const response = await fetch(avatarImage);
  const blob = await response.blob();
  return new File([blob], name, { type: blob.type });
};

const mockImageFile = await createMockImageFromAsset("avatar.png");
const mockImageFile2 = await createMockImageFromAsset("avatar.png");
const mockImageFile3 = await createMockImageFromAsset("avatar.png");
const mockImageFile4 = await createMockImageFromAsset("avatar.png");
const mockImageFile5 = await createMockImageFromAsset("avatar.png");

export const defaultList: FormValueType[] = [
  {
    Name: "Anu",
    Email: "anu.sharma@example.com",
    PhoneNumber: "9812345",
    City: "Kathmandu",
    District: "Kathmandu",
    Province: "3",
    Country: "Nepal",

    id: 1,
    image: mockImageFile,
  },
  {
    Name: "Deepak",
    Email: "deepak.rai@example.com",
    PhoneNumber: "9823456",
    City: "Pokhara",
    District: "Kaski",
    Province: "4",
    Country: "Nepal",
    id: 2,
    image: mockImageFile2,
  },
  {
    Name: "Nisha",
    Email: "nisha.adhikari@example.com",
    PhoneNumber: "9834567",
    City: "Biratnagar",
    District: "Morang",
    Province: "1",
    Country: "Nepal",
    id: 3,
    image: mockImageFile,
  },
  {
    Name: "Rajesh",
    Email: "rajesh.pandey@example.com",
    PhoneNumber: "9845678",
    City: "Birgunj",
    District: "Parsa",
    Province: "2",
    Country: "Nepal",
    DOB: new Date("2026-08-01"),
    id: 4,
    image: mockImageFile3,
  },
  {
    Name: "Sunita",
    Email: "sunita.thapa@example.com",
    PhoneNumber: "9856789",
    City: "Lalitpur",
    District: "Lalitpur",
    Province: "3",
    Country: "Nepal",
    DOB: new Date("2026-08-01"),
    id: 5,
    image: mockImageFile4,
  },
  {
    Name: "Pradeep",
    Email: "pradeep.bhandari@example.com",
    PhoneNumber: " ",
    City: "Nepalgunj",
    District: "Banke",
    Province: "5",
    Country: "Nepal",
    DOB: new Date("2026-08-01"),
    id: 6,
    image: mockImageFile5,
  },
];
