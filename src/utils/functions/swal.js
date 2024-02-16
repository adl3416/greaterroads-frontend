import Swal from "sweetalert2"

export const question = (title,text="") => {   // giristen sonra cikmak istedigimizde mesaj verecek.CIKMAK istiyormusun eve yada cansel
   return  Swal.fire({
          title,
          text, 
          icon: "question",
          showCancelButton: true,
         
         
        });
 };