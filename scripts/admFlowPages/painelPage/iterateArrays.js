// função pega a array de todas as disciplinas e percorre
export function iterateArrays(array, func){
    for (const element of array){
        func(element)
    }
}

