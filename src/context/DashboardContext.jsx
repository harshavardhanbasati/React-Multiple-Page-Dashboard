import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useEffect, useState } from "react";
import { starterProjects } from "../data/projects";
import { getData } from "../services/api";
export const DashboardContext = createContext(undefined);
export function DashboardProvider({ children }) {
    const [projects, setProjects] = useState(starterProjects);
    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    async function refreshData() {
        setLoading(true);
        setError("");
        try {
            const [apiUsers, apiTodos] = await Promise.all([
                getData("/users?_limit=5"),
                getData("/todos?_limit=5"),
            ]);
            setUsers(apiUsers);
            setActivities(apiTodos);
        }
        catch {
            setError("Unable to fetch online data. Your projects are still available.");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        void refreshData();
    }, []);
    function addProject(project) {
        setProjects((currentProjects) => [project, ...currentProjects]);
    }
    function updateProject(updatedProject) {
        setProjects((currentProjects) => currentProjects.map((project) => project.id === updatedProject.id ? updatedProject : project));
    }
    return (_jsx(DashboardContext.Provider, { value: {
            projects,
            users,
            activities,
            loading,
            error,
            refreshData,
            addProject,
            updateProject,
        }, children: children }));
}
