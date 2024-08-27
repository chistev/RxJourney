export async function load({ fetch, url }) {
    const token = url.searchParams.get('token');

    if (!token) {
        return {
            status: 400,
            error: new Error('Token is missing')
        };
    }

    try {
        const response = await fetch(`https://rxjourneyserver.pythonanywhere.com/home/validate-token/?token=${token}`);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                status: response.status,
                error: new Error(errorData.message || 'Token validation failed')
            };
        }

        const data = await response.json();

        return {
                valid: data.valid,
        };
    } catch (error) {
        return {
            status: 500,
            error: new Error('Failed to validate the token')
        };
    }
}
