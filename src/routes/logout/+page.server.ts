import { redirect } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async() => {
    throw redirect(302, "/");
}

export const actions: Actions = {
    default({ cookies }) {
        cookies.delete("session", { path: "/"});
        throw redirect(302, "/login");
    }
}