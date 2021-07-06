const alquileres = document.querySelectorAll('#tabla-alquileres > tbody > tr');

for (let i = 1; i < alquileres.length; i++) {
  if (alquileres[i].cells[7].textContent === 'TRUE') {
    alquileres[i].cells[7].style.backgroundColor = 'green';
  } else {
    alquileres[i].cells[7].style.backgroundColor = 'red';
  }
}

document.querySelectorAll('.delete').forEach((elem) => elem.addEventListener('click', (e) => {
  if (confirm('¿Está seguro de realizar esta acción? El resultado será irreversible')) {
    return true;
  }

  e.preventDefault();
  return false;
}));

function mostrarAlquileresPagos() {
  document.querySelector('tbody.pagos').classList.remove('oculto');
  document.querySelector('tbody.impagos').classList.add('oculto');
}

function mostrarAlquileresImpagos() {
  document.querySelector('tbody.impagos').classList.remove('oculto');
  document.querySelector('tbody.pagos').classList.add('oculto');
}

function mostrarTodos() {
  document.querySelector('tbody.impagos').classList.remove('oculto');
  document.querySelector('tbody.pagos').classList.remove('oculto');
}

document.querySelector('#impagos').onclick = () => mostrarAlquileresImpagos();
document.querySelector('#pagos').onclick = () => mostrarAlquileresPagos();
document.querySelector('#todos').onclick = () => mostrarTodos();

mostrarAlquileresImpagos();
