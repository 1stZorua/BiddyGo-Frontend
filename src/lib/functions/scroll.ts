export default function scrollTo(element: string, id: boolean = false) {
    if (id) { document.getElementById(element)?.scrollIntoView({ block: "start", behavior: "smooth" }); return; }
    document.querySelector(element)?.scrollIntoView({ behavior: "smooth" });
}