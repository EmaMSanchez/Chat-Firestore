import { createContext, useContext, useEffect, useRef, useState } from "react";
import { auth, db, provider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";

export const ChatContext = createContext();


const ChatProvider = ({ children }) => {
  
  const dataUsuario = { uid: null, email: null, estado: null };
  const [user, setUser] = useState(dataUsuario);
  const [loading, setLoading] = useState({})
  const [mensajes, setMensajes] = useState([])
  const unsubscribeRef = useRef(); //Permite que no se cause una nueva renderizacion cuando el contenido cambie, debido a que permite persistencia a travez del tiempo
 
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      //onAuthStateChanged nos trae el usuario y su estado, èrcive los cambios en firebase auth, y nos devuelve el usuario
      if (user) {
        setUser({ uid: user.uid, email: user.email, estado: true });
      } else {
        setUser({ uid: null, email: null, estado: false });
      }
    });
    return () => unsuscribe();
  }, []); //onAuthStateChanged debe ser inicializado con un unsuscribe (evitar llamadas repetitivas, solo al cambiar estado)
 
  useEffect(() => {
    cargarMensajes();
    return () => {
      unsubscribeRef.current?.(); //Se ejecuta la desuscripcion al demontarse el componante asi onSnapshot deja de esuchar(evita fugas de memoria y problemas inesperados con la db)
    };
  }, []);

  const ingresoUser = async () => {
    try {
      setLoading((prev)=>( {...prev, usuario:true}))
      await signInWithPopup(auth,provider)
      console.log("aca")
      setLoading((prev)=>( {...prev, usuario:false}))
    } catch (error) {
      console.log(error)
    }
  }

  const cerrarSesion = async () =>{
   try {
    await signOut(auth)
   } catch (error) {
    console.log(error)
   } 
  }


  const cargarMensajes = () => {
    setLoading((prev) =>({...prev, cargamens:true}))
    const dataRef =  collection(db, "chat")
    const q = query(dataRef, orderBy("fechas")) //Ordena por fechas la peticion, si nada es ascendente  y desc es en orden inverso,se debe generar un indice compuesto para evitar a futuro retrasos con los datos(indice compuesto se crea desde consola firebase y se especifica como se van a guardar los datos)
    const obtenerDatosTiempoReal = onSnapshot(q, (querySnapshot) => { //onSnapshot  devuelve si se produjo un cambio en los documentos de la base de datos
      const arraymensajes = querySnapshot.docs.map((item) => item.data());
      setMensajes(arraymensajes);
      setLoading((prev) =>({...prev, cargamens:false}))
    });
  
    unsubscribeRef.current = obtenerDatosTiempoReal; //.current es la propiedad mutable que no causa renderizados
  }

  const agregarMensaje = async(uidChat, textoInput) => {
    try {
      const dataRef =  collection(db, "chat")
      const newDoc = {
        fechas: Date.now(),
        texto: textoInput,
        uid: uidChat
      }
      await addDoc(dataRef, newDoc)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ChatContext.Provider value={{ user, ingresoUser, cerrarSesion, loading, mensajes, agregarMensaje }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChatProvider = () => useContext(ChatContext);
