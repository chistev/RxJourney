export async function load({ fetch, url }) {
    // Extract the token from the query parameters
    const token = url.searchParams.get('token');

    if (!token) {
        return {
            status: 400,
            error: new Error('Token is missing')
        };
    }

    try {
        const response = await fetch(`http://localhost:8000/home/validate-token/?token=${token}`);

        // If the response is not ok, throw an error
        if (!response.ok) {
            const errorData = await response.json();
            return {
                status: response.status,
                error: new Error(errorData.message || 'Token validation failed')
            };
        }

        // Parse the response
        const data = await response.json();

        // Return the validated email and other data to the Svelte page
        return {
                valid: data.valid,
                email: data.data?.email || null
        };
    } catch (error) {
        return {
            status: 500,
            error: new Error('Failed to validate the token')
        };
    }
}
