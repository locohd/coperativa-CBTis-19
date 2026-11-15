// IMPORTAR FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCU5hqrwn8sJacmOr3YL_I8zPOdoXiLE4g",
  authDomain: "coperativa-cbtis-19-29c77.firebaseapp.com",
  projectId: "coperativa-cbtis-19-29c77",
  storageBucket: "coperativa-cbtis-19-29c77.firebasestorage.app",
  messagingSenderId: "1089480551361",
  appId: "1:1089480551361:web:6770e32f300c05e0861d40"
};

// INICIAR FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//carrito
let carrito = {
  tacos: 0,
  santa: 0,
  refresco: 0,
  agua: 0,
  torta: 0,
  hamburguesa: 0,
  hotdog: 0
};

window.cambiarCantidad = function(producto, cambio){

  carrito[producto] += cambio;

  if(carrito[producto] < 0){
    carrito[producto] = 0;
  }

  document.getElementById("cant-" + producto).innerText =
    carrito[producto];

  calcularTotal();
};

// CALCULAR TOTAL
// CALCULAR TOTAL
window.calcularTotal = function () {

  let total =
    carrito.tacos * 15 +
    carrito.santa * 15 +
    carrito.refresco * 22 +
    carrito.agua * 10 +
    carrito.torta * 30 +
    carrito.hamburguesa * 30 +
    carrito.hotdog * 25;

  document.getElementById("total").innerText = total;
};
//para limpiar el carrito al enviar el pedido
carrito = {
  tacos: 0,
  santa: 0,
  refresco: 0,
  agua: 0,
  torta: 0,
  hamburguesa: 0,
  hotdog: 0
};

document.getElementById("cant-tacos").innerText = 0;
document.getElementById("cant-santa").innerText = 0;
document.getElementById("cant-refresco").innerText = 0;
document.getElementById("cant-agua").innerText = 0;
document.getElementById("cant-torta").innerText = 0;
document.getElementById("cant-hamburguesa").innerText = 0;
document.getElementById("cant-hotdog").innerText = 0;
// ENVIAR PEDIDO
window.enviarPedido = async function () {

  let nombre = document.getElementById("nombre").value;
  let total = document.getElementById("total").innerText;
  let tipoTorta = document.getElementById("tipo-torta").value;
  let tipoSanta = document.getElementById("tipo-santa").value;
  let tipoRefresco = document.getElementById("tipo-refresco").value;

  let productos = [];

for(let producto in carrito){

  if(carrito[producto] > 0){

    if(producto === "torta"){
      productos.push(
        "Torta de " + tipoTorta + " x" + carrito[producto]
      );
    }
    else if(producto === "refresco"){
      productos.push(
        "Refresco " + tipoRefresco + " x" + carrito[producto]
      );
    }
    else if(producto === "santa"){
      productos.push(
        "Santa Clara " + tipoSanta + " x" + carrito[producto]
      );
    }
    else{
      productos.push(
        producto + " x" + carrito[producto]
      );
    }

  }

}

  // VALIDACIÓN
  if (nombre === "" || productos.length === 0) {
    alert("Escribe tu nombre y selecciona comida");
    return;
  }

  // GUARDAR EN FIREBASE
  await addDoc(collection(db, "pedidos"), {
    nombre: nombre,
    producto: productos.join(", "),
    total: total,
    estado: "Pendiente"
  });

  // MENSAJE
  document.getElementById("resumen").innerHTML =
    "Pedido enviado ✅<br>" +
    "Cliente: " + nombre +
    "<br>Total: $" + total;

  // LIMPIAR
  document.getElementById("nombre").value = "";
  document.getElementById("total").innerText = "0";


};
// CAMBIAR IMAGEN SEGÚN LA OPCIÓN
const imagenes = {
  refresco: {
    "Coca Cola": "cocacola.webp",
    "Sprite": "sprite.webp",
    "Fanta": "fanta.webp",
    "Manzanita": "manzanita.webp"
  },
  santa: {
    "Chocolate": "santaclara.jpg",
    "Fresa": "fresa.webp"
  },
  torta: {
    "Jamón": "torta.webp",
    "Lomo": "lomo.webp",
    "Milanesa": "milanesa.webp",
    "Pierna": "pierna.webp"
  }
};


window.cambiarImagen = function (producto) {
  const select = document.getElementById("tipo-" + producto);
  const img = document.getElementById("img-" + producto);
  img.src = imagenes[producto][select.value];
};