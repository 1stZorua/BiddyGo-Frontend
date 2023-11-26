export async function load(event) {
    const user  = event.data.user;
    return {
        user
    }
}