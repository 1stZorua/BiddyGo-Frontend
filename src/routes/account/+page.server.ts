import { redirect } from "sveltekit-flash-message/server";

export const load = async (event) => {
    if (!event.locals.user) {
        throw redirect(302, "/login");
    }
}