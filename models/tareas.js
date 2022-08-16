const Tarea = require("./tarea");
var colors = require('colors');

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }
  constructor() {
    this._listado = {};
  }

  borrarTarea( id='') {
    if( this._listado[id] ){
        delete this._listado[id];
    }
  }
  cargarTareasFromArray(tareas) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {

    console.log()
    this.listadoArr.map((tarea, index) =>{
        if(tarea.completadoEn){
            console.log(`${colors.green( index + 1 +'.')} ${tarea.desc} :: ${colors.green('Completada')}`)
        } else {
            console.log(`${colors.red( index + 1 +'.')} ${tarea.desc} :: ${colors.red('Pendiente')}`)
        }
  });
  }

  listarPendietesCompletadas ( done ){
    let indice= 0
    console.log()
      
    this.listadoArr.map((tarea) =>{
        
        if(tarea.completadoEn && done){
            indice++ 
            console.log(`${colors.green( indice +'.')} ${tarea.desc} :: ${colors.green(tarea.completadoEn)}`)
        } 
        else if( !tarea.completadoEn && !done) {
            indice++ 
            console.log(`${colors.red( indice +'.')} ${tarea.desc} :: ${colors.red('Pendiente')}`)
        }
  });
  }

  toggleCompletadas ( ids=[]){
    ids.forEach( id => {
      const tarea = this._listado[id];
      if( !tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString()
      }
    });

    this.listadoArr.forEach( tarea => {
      if( !ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null
      }
    })

  }
}

module.exports = Tareas;
