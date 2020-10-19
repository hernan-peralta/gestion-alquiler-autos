document.querySelectorAll('.delete').forEach((elem) => elem.addEventListener('click', (e) => {
  if (confirm('¿Está seguro de realizar esta acción? El resultado será irreversible')) {
    return true;
  }

  e.preventDefault();
  return false;
}));
