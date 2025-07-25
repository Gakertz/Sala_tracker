document.getElementById('btnTest').addEventListener('click', async () => {
  const res = await fetch('http://localhost:5500/api/schedule/test', {
    method: 'POST'
  });
  if (res.ok) loadData();
});

async function loadData() {
  const res = await fetch('http://localhost:5500/api/schedule');
  const data = await res.json();

  const tabla = document.createElement('table');
  const horas = Array.from({length: 18}, (_, i) => 8 + i * 0.5);
  const horasTexto = horas.map(h => {
    const hora = Math.floor(h);
    const minutos = (h % 1) * 60;
    return \`\${String(hora).padStart(2, '0')}:\${String(minutos).padStart(2, '0')}\`;
  });

  const header = '<tr><th></th><th>sala 1</th><th>sala 2</th><th>sala 3</th><th>sala 4</th></tr>';
  tabla.innerHTML = header;

  horasTexto.forEach(hora => {
    const row = document.createElement('tr');
    const tdHora = document.createElement('td');
    tdHora.textContent = hora;
    row.appendChild(tdHora);

    for (let i = 1; i <= 4; i++) {
      const td = document.createElement('td');
      const item = data.find(x => x.sala === 'Sala ' + i && x.hora_inicio === hora);
      if (item) {
        td.textContent = \`Docente: \${item.docente}\`;
        td.classList.add('highlight');
        td.rowSpan = 3;
      }
      row.appendChild(td);
    }
    tabla.appendChild(row);
  });

  const contenedor = document.getElementById('tablaContenedor');
  contenedor.innerHTML = '';
  contenedor.appendChild(tabla);
}

loadData();