import { useEffect } from "react";

function Schedule() {
   useEffect(() => {
      let dayIx = new Date().getDay(); // 0 is Sunday
      dayIx = dayIx === 0 ? 6 : dayIx - 1; // Monday (0) is first in week
   
      let rows = document.querySelector('#calendar').querySelectorAll('tbody tr');
      let rowIx = 0;
      rows.forEach(row => {
         if (rowIx === dayIx)
         row.classList.add('table-success');
         rowIx++;
      })
   });

   return (
      <div className="footer-schedule">
         <table id="calendar" className="table">
            <thead>
               <tr>
                  <th scope="col">Día</th>
                  <th scope="col">Horario</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <th scope="row">Lunes</th>
                  <td>8:00 a 13:00 / 16:00 a 20:30</td>
               </tr>
               <tr>
                  <th scope="row">Martes</th>
                  <td>8:00 a 13:00 / 16:00 a 20:30</td>
               </tr>
               <tr>
                  <th scope="row">Miércoles</th>
                  <td>8:00 a 13:00 / 16:00 a 20:30</td>
               </tr>
               <tr>
                  <th scope="row">Jueves</th>
                  <td>8:00 a 13:00 / 16:00 a 20:30</td>
               </tr>
               <tr>
                  <th scope="row">Viernes</th>
                  <td>8:00 a 13:00 / 16:00 a 20:30</td>
               </tr>
               <tr>
                  <th scope="row">Sábado</th>
                  <td>8:00 a 13:00 / 16:00 a 20:30</td>
               </tr>
               <tr>
                  <th scope="row">Domingo</th>
                  <td>Cerrado</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
}

export default Schedule;