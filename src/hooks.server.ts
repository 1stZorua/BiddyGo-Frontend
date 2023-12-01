import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async({ event, resolve}) => {
    const session = event.cookies.get("session");

    if (!session) return await resolve(event);

    const decoded = parseJwt(session);
    const email = decoded["email"];
    const id = decoded["id"];

    if (email) {
        event.locals.user = {
            id: id,
            email: email,
            role: "user"
        }
    }

    return await resolve(event);
}

function parseJwt(token: string) {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}