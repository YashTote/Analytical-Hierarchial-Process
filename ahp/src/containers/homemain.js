import React, { Children } from 'react'
import { createPortal } from 'react-dom';
import './homemain.css'


export default function Homemain({open,onClose}) {
   if (!open) return null;
    return (
        createPortal
         (<><div  class="overlay"/>
         <div class="matrix">
           <table class="crit-info">
             <tr>
             <th class="head1">Priopr Basic information</th>
               <th class="X-column"><button class = "exit-btn" onClick={onClose}>X</button></th>
             </tr> 
             <tr>
           <section class="data-fields">     
           <form class="form-1">
            <div>
             <label for="quantity">Number of alternatives considered:  </label>
             <input type="number" class="crit-quantity" name="quantity" min="1" max="5"/><br/>
            </div>
            <div>
             <label for="quantity">Number of criteria considered:  </label>
             <input type="number" class="crit-quantity" name="quantity" min="1" max="5"/><br/>
             </div>
             <div class="submit-div">
              <input class = "submit-btn" type="submit" value="Confirm!" onClick={(e) => {e.preventDefault();}}/>
             </div>
           </form>
           </section>
           </tr>
         </table>
         </div>

         </>, document.getElementById('portal'))
  )
}
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
