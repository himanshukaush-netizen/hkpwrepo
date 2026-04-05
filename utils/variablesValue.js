import { faker } from "@faker-js/faker";
// Export your data as variables in an object
export const userData = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number("9#########"),
  fileName: faker.system.fileName(),
  file1: "C:\\CV\\HappiestMind\\AD\\UploadFilePW.txt",
  file2: "C:\\CV\\HappiestMind\\AD\\UploadFilePW - Copy.txt",
  OrderId: faker.helpers.replaceSymbols("???-####"),
};
