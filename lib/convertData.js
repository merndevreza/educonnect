
export const replaceMongoIdInArray = (array) => {
   const updatedArray = array.map((item) => {
     const { _id, ...rest } = item;
     return {
       id: _id.toString(),
       ...rest,
     };
   });
   return updatedArray;
 };
 
 export const replaceMongoIdInObject = (obj) => {
   const { _id, ...rest } = obj;
   return { id: _id.toString(), ...rest }; 
 };

