export function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', { minute:"numeric", hour:"numeric"});
}
