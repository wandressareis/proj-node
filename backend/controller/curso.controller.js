export class CursoController {
  constructor(CursoModel) {
    this.curso = CursoModel;
  }

  async getAll() {
    const cursos = await this.curso.findAll();
    return cursos;
  }

  async get(id) {
    const curso = await this.curso.findByPk(id);
    return curso;
  }

  async adicionar(cursoDTO) {
    try {
      console.log(cursoDTO);
      await this.curso.create(cursoDTO);
    } catch (error) {
      console.log(error);
    }
  }
  async excluir(id) {
    await this.curso.destroy({ where: { id:id } });
  }

  async atualizar(id, cursoDTO) {
    await this.curso.update(cursoDTO, { where: { id:id } });
  }

}
