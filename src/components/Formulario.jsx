import React, { useState } from 'react'
import { useChatProvider } from '../context/ChatProvider'

const Formulario = () => {

const {agregarMensaje, user} = useChatProvider();
const [mensaje, setMensaje] = useState("")

const agregarMensajeForm = (e) =>{
  e.preventDefault()
  if(!mensaje.trim()){ //Si el mensaje viene vacio retorna (trim quita los espacios al inicio y final de la cadena de texto, por lo tanto si se limpian)
    return
  }
  agregarMensaje(user.uid, mensaje)
  setMensaje("") //Luego de procesar los datos se setea el mensaje en vacio
}

  return (
    <form className='fixed-bottom input-group p-3' onSubmit={agregarMensajeForm}>  {/* Clase para que quede siempre debajo  */}
        <input type="text" className='form-control'value={mensaje} onChange={e => setMensaje(e.target.value)} /> {/*e => setMensaje(e.target.value) captura el evento y setea el mensaje con el nuevo valor de input */}
        <div className='input-group-append' >{/*Esta clase asocia el boton al input */}
            <button className='btn btn-primary' type='submit'>
                Enviar
            </button>
        </div>
    </form>
  )
}

export default Formulario