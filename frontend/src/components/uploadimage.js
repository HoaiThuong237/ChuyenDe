import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const handleUploadImage = async (file) => {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage,  `recipe-images/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
};

export default handleUploadImage;