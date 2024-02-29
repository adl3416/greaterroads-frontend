import Swal from "sweetalert2"

export const question = (title,text="") => {   // giristen sonra cikmak istedigimizde mesaj verecek.CIKMAK istiyormusun eve yada cansel
   return  Swal.fire({
          title,
          text, 
          icon: "question",
          showCancelButton: true,
         
         
        });
 };

export const toast =(title,icon="info") =>{ // succes  warning question error info  =>    icon a gelecek alternativler
       Swal.fire({
              position: "top-end",
              icon: icon,
              title: title,
              showConfirmButton: false,
              timer: 3500
            });
}



  