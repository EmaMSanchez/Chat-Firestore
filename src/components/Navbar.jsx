import { useChatProvider } from "../context/ChatProvider"


const Navbar = () => {

  const {user, ingresoUser, cerrarSesion} = useChatProvider()

  return (
    <nav className='navbar navbar-dark bg-dark'>
        <span className='navbar-brand'>
            Chat
        </span>
        
         {
          user.estado?
            <button className="btn btn-outline-danger m-2" onClick={cerrarSesion}>
               Cerrar Sesion
            </button> :  <button className="btn btn-outline-success m-2" onClick={ingresoUser}>
                Acceder
           </button>
         }
        

    </nav>
  )
}

export default Navbar