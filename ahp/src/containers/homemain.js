import React, { Children } from 'react'
import { createPortal } from 'react-dom';
import './homemain.css'


export default function Homemain({open,children,onClose}) {
   if (!open) return null;
    return (
        createPortal
         (<><div  class="overlay"/>
         <div class="matrix">
            
           <button onClick={onClose}>X</button> 
         </div>

         </>, document.getElementById('portal'))
  )
}
