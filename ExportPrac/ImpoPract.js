// // // const ExpoModule=require("./../ExportPrac/ExpoModule")

// // // ExpoModule.sayHello();

// // // console.log(ExpoModule.PI);
// // // console.log(ExpoModule.Employee);


// // const {sayHello,PI,Employee}=require("./../ExportPrac/ExpoModuleTwo")

// // sayHello();

// // console.log(PI);

// // console.log(Employee);
// const path = require("path");

// const absolutePath = path.resolve("./../ExportPrac/ExpoModule"); // Resolving to an absolute path
// const filePath = path.parse(absolutePath); // Parsing the absolute path




// console.log(filePath);

const os=require("os")

console.log(os.type());
console.log(os.userInfo());
console.log(os.totalmem());
console.log(os.freemem());
