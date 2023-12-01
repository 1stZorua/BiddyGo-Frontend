import type { LayoutServerLoad } from "./$types";
import { loadFlash } from "sveltekit-flash-message/server";

export const load: LayoutServerLoad = loadFlash(async (event) => {
    if (event.url.pathname !== '/login') {
        event.cookies.set("intendedPage", event.url.pathname, {
            path: "/"
        });
    }

    return {
        user: event.locals.user,
    }
});