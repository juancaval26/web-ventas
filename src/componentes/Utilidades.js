// e:/sitios-web/my-app/src/componentes/Utilidades.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

export const handleImageChange = async (e, nuevoProducto, setNuevoProducto, setLoading) => {
  const fileList = Array.from(e.target.files);
  
  if (fileList.length > 0) {
    setLoading(true);
    const storageRef = firebase.storage().ref();

    const urlsPromises = fileList.map((file) => {
      const imageRef = storageRef.child(`img/${nuevoProducto.marca}/${file.name}`);
      return imageRef.put(file).then(() => imageRef.getDownloadURL());
    });

    const urls = await Promise.all(urlsPromises);

    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      imagenUrls: prevProducto.imagenUrls.concat(urls),
    }));

    setLoading(false);
  }
};
