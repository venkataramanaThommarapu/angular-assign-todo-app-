
var base_url = 'http://localhost:3001/'

export const APIS = {
    CREATE_TODOS: base_url + 'todos',
    GET_TODOS: base_url + 'todos',
    DELETE_TODOS: (id: string) => base_url + 'todos/' + id,
    UPDATE_TODOS: (id: string) => base_url + 'todos/' + id,
}