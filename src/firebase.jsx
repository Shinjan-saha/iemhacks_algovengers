import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase,set,ref,get,child, update } from "firebase/database";
import { getStorage, uploadBytes ,ref as rf, getDownloadURL} from "firebase/storage";
import { v4} from 'uuid';


const firebaseConfig = {
  apiKey: "AIzaSyDS0LCqYnG4zow_wkv0ZoSiQMKdAyId78M",
  authDomain: "ragfreecampus.firebaseapp.com",
  projectId: "ragfreecampus",
  storageBucket: "ragfreecampus.appspot.com",
  messagingSenderId: "1043344147809",
  appId: "1:1043344147809:web:2f02644193060ac300f120",
  databaseURL : "https://ragfreecampus-default-rtdb.firebaseio.com/",
  storageBucket : "gs://ragfreecampus.appspot.com"
};

const app = initializeApp(firebaseConfig);

//  Authorisation

const auth =  getAuth();

//signup function
export const signUp = async(email,password) => {
  try{
    const userCreditinal = await createUserWithEmailAndPassword(auth,email,password);
    const user = userCreditinal.user;
    console.log(user);
    return user;
  }
  catch(error){
    console.log("OOPS")
    throw error;
    
  }
};

//login function
export const logIn = async(email,password)=>{
  try{
    const userCreditinal = await signInWithEmailAndPassword(auth,email,password);
    const user = userCreditinal.user;
    return user;
  }
  catch(error){
    console.log(error);
    
  }
}

// Storing the data of the new Users in realtime database 
const database = getDatabase(app);
 const collegeExist = async(CollegeName)=>{
  const dbref = ref(getDatabase());
  const path = `College/${CollegeName}`;
  const snapshot = await get(child(dbref, path));

  
    if(snapshot.exists()){
      console.log('In the college  Exist function my college exist');
      return true;

    }
    else{
      console.log("nooo my college doesnot exist");
      return false;
    }

}
const createCollege = async(CollegeName)=>{
  const dbref = ref(getDatabase());
  const path = `College/${CollegeName}`;
  const snapshot = await set(child(dbref,path),{
    Students : "yes",
    Teachers : "Yay"
  });
    console.log("College Created");
  
}
const addTeacher =async(CollegeName,CollegeId,email)=>{
  const exist = await collegeIdExist(CollegeName,CollegeId,"Teachers");
  if(exist){
    alert("This teacher already exist");
    console.log("This teacher already exist");
    return;
  }
  const dbref = ref(getDatabase());
  let teachers = `College/${CollegeName}/Teachers/${CollegeId}`;
  try{
  const snapshot = await set(child(dbref,teachers),{
   Email:email,
    Complains : "0"
  });
  console.log("Teacher Added");
}catch(error){
 throw error;
}
};
const collegeIdExist = async(CollegeName,CollegeId,Category)=>{
  const dbref = ref(getDatabase());
  let check = `College/${CollegeName}/${Category}/${CollegeId}`;
  const snapshot = await get(child(dbref,check ));

  
    if(snapshot.exists()){
      console.log('This College Id already exist');
      return true;

    }
    else{
      console.log("College Id does not exist");
      return false;
    }
};
const addStudent = async(CollegeName,CollegeId,email)=>{
  let exist = await collegeIdExist(CollegeName,CollegeId,"Students");
  if(exist){
    alert('You are already registerd')
    return
  }
  const dbref = ref(getDatabase());
  let teachers = `College/${CollegeName}/Students/${CollegeId}`;
  try{
  const snapshot = await set(child(dbref,teachers),{
   Email:email,
   Complains : "0"

  });
  console.log("Student Added");
}catch(error){
 throw error;
}

}
export async function storeUserdata(CollegeName, CollegeId , email, teacherStatus){
  console.log(teacherStatus);
  if(teacherStatus === 'yes'){
    let exist = await collegeExist(CollegeName);
    if(exist){
      console.log("I am a teacher and my college already exist, that means I am a 2nd or nth teacher");
    }
    else{
    console.log("I am a teacher I need to create the  college");
   await createCollege(CollegeName);
  }
  await addTeacher(CollegeName,CollegeId,email);
  }
  else{
    let exist = await collegeExist(CollegeName);
    if(exist){
     await addStudent(CollegeName,CollegeId,email);
    }
    else{
      console.log('Where is my college?');
      return false;
    }
  }
  return true;
}
export async function createUser(CollegeName,Category,CollegeId,email,uid){
  const dbref = ref(getDatabase());
  let path = `Users`;
  try{

  const snapshot = await set(child(dbref,`${path}/${uid}`),{
    CollegeName: CollegeName,
    Category: Category,
    Email: email,
    CollegeId : CollegeId

  });
  console.log("Student Added");
}catch(error){
 throw error;
}
}
export async function getUserdata(uid){
  const dbref = ref(getDatabase());
  let check = `Users/${uid}`;
  let arr = [];
  
  const snapshot = await get(child(dbref,check ));
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    arr.push(childData)
  });
  
  return arr;
}
// Find existing complains
export async function findExistingcomplains(path){
  const dbref = ref(getDatabase());
  let arr = [ ];
  
  const snapshot = await get(child(dbref,path));
  console.log("This is snapshot val")
  console.log(snapshot.val());
  if(snapshot.val() === "0"){
    return arr;
  }
 
  snapshot.forEach((childSnapshot)=>{
    const complain =  childSnapshot;
    let comp = {};
    console.log(complain)
    if(complain=="0"){
      return arr;
    }
    complain.forEach((compid)=>{
      let childKey = compid.key;
      let childData = compid.val();
      const newProperty = {
    };
    newProperty[childKey] = childData;
      comp = {
        ...comp,
        ...newProperty
      }
    })
    arr.push(comp);
  })
  console.log(arr);
  return arr;
}
// Making a complain
 async function getTeacherId(CollegeName){
  let arr = [];
  const dbref = ref(getDatabase());
  let path = `College/${CollegeName}/Teachers`
  const snapshot = await get(child(dbref,path));
  snapshot.forEach((compid)=>{
    let childekey = compid.key
    arr.push(childekey);
  })
  return arr;
}
async function addComplaintoStudent(CollegeName,CollegeId,obj,id){
  let path = `College/${CollegeName}/Students/${CollegeId}/Complains/${id}`;
  const dbref = ref(getDatabase());
  try{
    const snapshot = await set(child(dbref,path),obj);
    console.log("Complain Added");
  }catch(error){
   throw error;
  }
}
async function addComplaintoTeacher(CollegeName,obj,CollegeId,arr,id){
  const dbref = ref(getDatabase());
  obj["CollegeId"] =CollegeId;
  obj["CollegeName"] =CollegeName;
  for (let i = 0; i < arr.length; i++) {
    let path = `College/${CollegeName}/Teachers/${arr[i]}/Complains/${id}`
    try{
      const snapshot = await set(child(dbref,path),obj);
      console.log("Complain Added");
    }catch(error){
     throw error;
    }
  }
}



export async function createComplain(CollegeName,CollegeId,obj){
  let arr = await getTeacherId(CollegeName);
  let id = v4();
  obj["id"] =id;
  await addComplaintoStudent(CollegeName,CollegeId,obj,id);
  await addComplaintoTeacher(CollegeName,obj,CollegeId,arr,id);

}
// Using Storage 

const storage = getStorage();

export async function uploadMedia(file){
  let address = v4()+file.name 
  let storageref =  rf(storage, `media/${address}`);
  uploadBytes(storageref,file).then(()=>{
    console.log("fileUploaded");
  })
  return address;
}
// Resolving issues
export async function resolveStudent(path) {
  const dbref = ref(getDatabase());
  try {
    const updates = {
      [`${path}/status`]: "resolved",
    };
    await update(dbref, updates);
    console.log("Resolved in student db");
  } catch (error) {
    throw error;
  }
}
export async function resolveteacher(CollegeName, CollegeId, id) {
  let arr = await getTeacherId(CollegeName);
  for (let i = 0; i < arr.length; i++) {
    const dbref = ref(getDatabase());
    try {
      let path = `College/${CollegeName}/Teachers/${arr[i]}/Complains/${id}`;
      const updates = {
        [`${path}/status`]: "resolved",
      };
      await update(dbref, updates);
      console.log("Resolved in teacher db");
      console.log(path);
    } catch (error) {
      throw error;
    }
  }
}


export async function getMedia(media, cb) {
  let path = `media/${media}`;
  console.log(path);
  let strf = rf(storage, path);
  let ans = "";
  getDownloadURL(strf).then((url) => {
    ans = url;
    cb(ans);
  });
}