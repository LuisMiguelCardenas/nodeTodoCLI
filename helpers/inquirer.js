const inquirer = require('inquirer');


require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name:`${'1.'.blue} Crear tarea`
            },
            {
                value: '2',
                name:`${'2.'.blue} Listar tareas`
            },
            {
                value: '3',
                name:`${'3.'.blue} Listar tareas completadas`
            },
            {
                value: '4',
                name:`${'4.'.blue} Listar tareas pendientes`
            },
            {
                value: '5',
                name:`${'5.'.blue} Completar tarea(s)`
            },
            {
                value: '6',
                name:`${'6.'.blue} Borrar terea`
            },
            {
                value: '0',
                name:`${'0.'.blue} Salir`
            },
        ]
    }
]


const inquirerMenu = async() => {

    console.clear();
    console.log('========================'.green)
    console.log(' Seleccione una opción '.white)
    console.log('========================\n'.green)

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion
};

const pausa = async() => {

    console.log('\n')
    await inquirer.prompt([
        {
            type: 'input',
            message:`Presione ${'ENTER'.green} para continuar`,
            name: 'pausa'
        }
    ]) 
};

const leerInput = async( mensaje) => {

    const quiestion = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(quiestion);
    return desc
}

const listadoTareasBorrar = async( tareas = [] ) => {

        const choices = tareas.map( (tarea, index) => {

            const idx = `${index + 1}.`.green

            return {
                value: tarea.id,
                name: `${idx} ${tarea.desc}`
            }
        });

    
        choices.unshift({
            value: '0',
            name: '0.'.green + ' Cancelar'
        })
        const preguntas = [
            {
                type: 'list',
                name: 'id',
                message: 'Borrar',
                choices: choices
            }
        ]


        const { id } = await inquirer.prompt(preguntas);
        return id
}

const mostrarLisadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {

        const idx = `${index + 1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    ]


    const { ids } = await inquirer.prompt(preguntas);
    return ids
}

const confirmar = async (msj) => {

    const question = [
        {
            type:'confirm',
            name: 'ok',
            message: msj
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}


module.exports = {

    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarLisadoChecklist
}