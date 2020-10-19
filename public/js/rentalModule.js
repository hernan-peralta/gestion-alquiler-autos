const alquileres = document.querySelectorAll('#tabla-alquileres > tbody > tr');

for (let i = 1; i < alquileres.length; i++) {
  if (alquileres[i].cells[7].textContent === 'TRUE') {
    alquileres[i].cells[7].style.backgroundColor = 'green';
  } else {
    alquileres[i].cells[7].style.backgroundColor = 'red';
  };
}

function mostrarAlquileresPagos() {
  document.querySelector('tbody.pagos').classList.remove('oculto');
  document.querySelector('tbody.impagos').classList.add('oculto');
}

function mostrarAlquileresImpagos() {
  document.querySelector('tbody.impagos').classList.remove('oculto');
  document.querySelector('tbody.pagos').classList.add('oculto');
}

document.querySelector('#impagos').onclick = () => mostrarAlquileresImpagos();
document.querySelector('#pagos').onclick = () => mostrarAlquileresPagos();

mostrarAlquileresImpagos();
