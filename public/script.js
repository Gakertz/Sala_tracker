const btn = document.getElementById('mostrarFormulario');
const form = document.getElementById('formularioReserva');

btn.onclick = () => {
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

async function cargarReservas() {
  const res = await fetch('/api/reservas');
  const data = await res.json();
  const container = document.getElementById('registro-salas');
  if (container) {
    container.innerHTML = '';
    data.forEach(r => {
      container.innerHTML += `
        <p>${r.fecha} - Sala ${r.sala}: ${r.horaInicio} a ${r.horaFin} (Docente: ${r.docente})</p>
      `;
    });
  }
}

async function cargarCalendario() {
  const fecha = document.getElementById("fecha-calendario").value;
  if (!fecha) return;

  const res = await fetch('/api/reservas');
  const data = await res.json();
  const reservasDelDia = data.filter(r => r.fecha === fecha);
  reservasDelDia.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

  const tbody = document.querySelector("#tabla-calendario tbody");
  tbody.innerHTML = "";

  if (reservasDelDia.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">No hay reservas para este día.</td></tr>';
  }

  reservasDelDia.forEach(reserva => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${reserva.horaInicio || reserva.hora_inicio}</td>
      <td>${reserva.horaFin || reserva.hora_fin}</td>
      <td>${reserva.sala}</td>
      <td>${reserva.profesor || reserva.docente || '-'}</td>
    `;
    tbody.appendChild(row);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (data.horaInicio >= data.horaFin) {
    alert('La hora de inicio debe ser anterior a la hora de fin.');
    return;
  }

  const res = await fetch('/api/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    alert('Conflicto de horario');
  } else {
    form.reset();
    form.style.display = 'none';
    cargarReservas();
    cargarCalendario();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const hoy = new Date().toISOString().split("T")[0];
  document.getElementById("fecha-calendario").value = hoy;
  cargarReservas();
  cargarCalendario();

  document.getElementById("dia-anterior").onclick = () => {
    cambiarFecha(-1);
  };
  document.getElementById("dia-siguiente").onclick = () => {
    cambiarFecha(1);
  };
});

function cambiarFecha(dias) {
  const input = document.getElementById("fecha-calendario");
  const fechaActual = new Date(input.value);
  fechaActual.setDate(fechaActual.getDate() + dias);
  const nuevaFecha = fechaActual.toISOString().split("T")[0];
  input.value = nuevaFecha;
  cargarCalendario();
}
