export async function load({ fetch }) {
    try {
        console.log('Fetching admin status from API...');

        const response = await fetch('http://localhost:8000/check-admin-status/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        console.log('Response Status:', response.status); // Log the response status
        const data = await response.json();

        console.log('Fetched Data:', data); // Log the fetched data

        return {
            isAdmin: data.is_admin,
            isAuthenticated: data.is_authenticated,
        };
    } catch (error) {
        console.error('Error fetching admin status:', error);
        return {
            isAdmin: false,
            isAuthenticated: false,
        };
    }
}
