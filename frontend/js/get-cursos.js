const divCursos = document.querySelector("#cursos");

async function consultaCursos() {
  const response = await fetch("http://localhost:3000/cursos");
  const cursos = await response.json();
  preencheTela(cursos);
  console.log(cursos);
}

function preencheTela(cursos) {
  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <div class="cursos">
        <h3>${curso.nome}</h3>
        <p>Carga Horária: ${curso.ch} h</p>
      </div>
    `;
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
  });
}

consultaCursos();
