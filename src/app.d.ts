declare global {
	namespace App {
		interface PageData {
			flash?: {
				type: "success" | "error";
				message: string;
			}
			user?: {
				id: string,
				email: string,
				role: string
			}
		}

		interface Locals {
			user: { 
				id: string,
				email: string,
				role: string
			}
		}
	}
}

export {};
