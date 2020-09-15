document.querySelectorAll('.delete-car').forEach(elem => elem.addEventListener('click', (e) => {
  if (confirm('¿Desea borrar el auto?')) {
    return true;
  }
  else{
    e.preventDefault();
    return false;
  }
}));
