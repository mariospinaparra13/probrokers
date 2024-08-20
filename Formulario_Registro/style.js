function validarCampo(){  
    //REcibir datos delinut del formulario
    let nombre=document.getElementById("nombres");
    let nombre1=nombre.value;

    let apellido=document.getElementById("apellido");
    let apellido1=apellido.value;

    let correo=document.getElementById("correo");
    let correo1=correo.value;

    let password=document.getElementById("password");
    let password1=password.value;

    

    //Validar que sea texto
    const uu=/^[a-zA-Z ]*$/;

    // Expresión regular para validar texto y números sin espacios
const regex = /^[a-zA-Z0-9]*$/;
// Validar texto y números sin espacios
const texto = "TextoSinEspacios123";

if (regex.test(texto)) {
  console.log("El texto es válido");
} else {
  console.log("El texto no es válido");
}
    //Validar campo nombre vacio
    if(nombre1.trim()==""){
        alert("Escriba su Nombre");
        nombre.focus();
        return false;
    }//Validar que sea texto
        else if(!nombre1.match(uu)){
            alert("Solo Texto");
            nombre.focus();
            return false;
    }

    //Validar campo apellido vacio
    if(apellido1.trim()==""){
        alert("Escriba su Apellido");
        apellido.focus();
        return false;
    }//Validar que sea texto
        else if(!apellido1.match(uu)){
            alert("Solo Texto");
            apellido.focus();
            return false;
    }

    //Validar campo password vacio
    if(password1.trim()==""){
        alert("Escriba su password");
        password.focus();
        return false;
    }//Validar que sea texto
        else if(!password1.match(regex)){
            alert("Solo Texto");
            password.focus();
            return false;
    }

    //Validar email
    let valEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!valEmail.test(correo1)){
        alert("Email invalido");
        correo.value="";
        correo.focus();
        return false;
    }
    

    //Validar PDF
    let campoArchivo=document.getElementById("campoArchivo");

    let archivo=campoArchivo.files[0];

    if(!archivo){
        alert("Carga Fallida");
        return false;
    }

    let extension=archivo.name.split(".").pop().toLowerCase();

    if(extension!="pdf"){
        alert("Extencion de Archivo Invalida ");
        return false;
    }

}