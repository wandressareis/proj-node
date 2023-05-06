const add = document.querySelector('#add');

add.addEventListener('click', () => {

    const curso = getDadosForm();

    enviarDadosParaAPI(curso);
});

function getDadosForm() {
    const inpytNome = document.querySelector('#nome');
    const inputCh = document.querySelector('#ch');
    if (inpytNome.value === null || inputCh.value === null) {
        alert('Preencha todos os campos!');
        return;
    }
    const curso = {
        nome: inpytNome.value,
        ch: inputCh.value
    }
    return curso;
}

async function enviarDadosParaAPI(curso) {
    try {
        const response = await fetch('http://localhost:3000/cursos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        });
        if (response.status === 200) {
            alert('Curso adicionado com sucesso!');
            limparCampos();
            window.location.href = 'index.html';
        } else {
            const msg = await response.json();
            console.log('Não foi possível adicionar o curso!', msg);
        }
    } catch (error) {
        console.error(error);
    }
}

function limparCampos() {
    document.querySelector('#nome').value = '';
    document.querySelector('#ch').value = '';
}