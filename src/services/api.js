const API_URL = import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com";
export async function getData(path) {
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok) {
        throw new Error("Could not load data. Please try again.");
    }
    return (await response.json());
}
