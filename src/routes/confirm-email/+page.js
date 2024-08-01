export async function load({ url }) {
    const token = url.searchParams.get('token');

    if (!token) {
        return { valid: false };
    }
  
    const res = await fetch(`http://localhost:8000/validate-token/${token}`);
  
    if (res.ok) {
        const data = await res.json();
        return { valid: data.valid, formData: data.data };
    } else {
        return { valid: false };
    }
}
