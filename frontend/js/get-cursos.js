const divCursos = document.querySelector("#cursos");
const submitForm = document.querySelector("#add-course form");

async function consultarCursos() {
  const response = await fetch("http://localhost:3000/cursos");
  const cursos = await response.json();
  preencherTela(cursos);
} // função para fazer a consulta de todos os cursos fazendo requisição para o backend

async function consultarUmCurso(id) {
  const response = await fetch(`http://localhost:3000/cursos/${id}`);
  const curso = await response.json();
  
  return curso [0];
} // função para fazer a consulta de um curso específico fazendo requisição para o backend

async function removerCurso (id) {
  const response = await fetch(`http://localhost:3000/cursos/delete/${id}`, {
    method: "DELETE",
  });
  consultarCursos();
} // função para remover um curso específico fazendo requisição para o backend

async function atualizarCurso(id, data) {
  const response = await fetch(`http://localhost:3000/cursos/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({nome: data.nome, ch: data.ch}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  consultarCursos();
} // função para atualizar um curso específico fazendo requisição para o backend

function preencherTela(cursos) {
  divCursos.innerHTML = "";
  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <div id="cursos${curso.id}" class="cursos">
      <button class="btn" onclick="removerCurso(${curso.id})">
        <img src="./img/delete_FILL0_wght400_GRAD0_opsz48.svg">
      </button>
      <button class="btn" onclick="editarCurso(${curso.id})">
        <img src="./img/edit_FILL0_wght400_GRAD0_opsz48.svg">
      </button>
      <h3>${curso.nome}</h3>
      <p>Carga Horária: ${curso.ch}h </p>
    </div>
    `;
      divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
  });

}

async function editarCurso(id) {

  const curso = await consultarUmCurso(id);
  const cursoParaEditar = document.querySelector(`#curso${id}`);

  const novoCursoHTML = `
  <div id="curso-${curso.id}" class="edit-cursos">
    <form id="form${curso.id}">
    <div class="info-form">
      Nome:
      <input class="input-txt" id="nome" type="text" placeholder="${curso.nome}" value="${curso.nome}" />
      <br> <br>
      Carga Horária:
      <input class="input-txt" id="ch" type="number" placeholder="${curso.ch}" value="${curso.ch}" />
      <br> <br>
      </div>
    </div>
      <div class="submit">
        <button type="submit">Salvar</button>
      </div>
    </form>
  </div>
  `;

  cursoParaEditar.innerHTML = novoCursoHTML;

  const submitForm = document.querySelector(`#form${curso.id}`);

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();

    atualizarCurso(curso.id, {
      nome: event.target[0].value,
      ch: event.target[1].value,
    });
  });
}

consultarCursos();