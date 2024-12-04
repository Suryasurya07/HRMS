// utils/auth.js
export function isAuthenticated() {
    // Replace with actual authentication and role-checking logic
    const user = JSON.parse(localStorage.getItem('user')); // Example user data in local storage
    if (user && user.isAuthenticated) {
        return { authenticated: true, role: user.role }; // e.g., role: "employee" or "HR"
    }
    return { authenticated: false, role: null };
}
