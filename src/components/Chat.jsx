import { useEffect, useRef } from "react";
import { useChatProvider } from "../context/ChatProvider";
import Formulario from "./Formulario";

const Chat = () => {
  const { mensajes, user, loading } = useChatProvider();
  const refChat = useRef(null); //Se crea una referencia que persiste a travez dek tiempo y que su actualizacion no produce renderizados

    useEffect(() =>{
       if(refChat.current){ //Se comprueba que existe, debido a que tarda en cargar los mensajes antes de hacer la modificacion del scroll
         refChat.current.scrollTop = refChat.current.scrollHeight //Use ref devuelve un objeto con muchos atributos, al hacer una referencia del div puede traer el tamaño del scroll inicial (scrollTop) y final(tamaño total scrollHeight), por lo tanto se iguala el scroll inicial al final, para iniciar la vista desde debajo al renderizar por primera vez y cada vez que se agregue un mensaje
       }
       
    },[mensajes])

  if (loading.cargamens) {
    return (
      <div className="text-center mt-5  justify-center">
        <div className="spinner-border text-dark" role="status"></div>
        <h3 className="sr-only">Loading...</h3>
      </div>
    );
  } else {
    return (
      <div
        className="mt-3 px-2"
        style={{ height: "75vh", overflowY: "scroll" }}
        ref={refChat} //Permite acceder al elemento del dom y modificarlo con un valor mutable que no genera renderizacion
      >
        {" "}
        {/*Se agrega el estilo de tamaño de vista y un scroll, elRef para hacer una referencia del ultimo chat visto */}
        {mensajes.map((mensaje, index) =>
          user.uid === mensaje.uid ? ( //Si el usuario es el logueado mostrara sus mensajes a la derecha por el uid, por lo tanto todos sus mensajes se veran a la derecha
            <div className="d-flex justify-content-start mb-2" key={index}>
              {" "}
              {/*La key siempre debe pi¡onerse en el contenedor  mas cercano del map */}
              <span className="badge text-bg-primary">{mensaje.texto}</span>
            </div>
          ) : (
            <div className="d-flex justify-content-end mb-2" key={index}>
              <span className="badge text-bg-dark">{mensaje.texto}</span>
            </div>
          )
        )}
        <Formulario />
      </div>
    );
  }
};

export default Chat;
