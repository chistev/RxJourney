export async function load({ url }) {
    const token = url.searchParams.get('token');
    console.log('Token:', token);
  
    if (!token) {
        return { valid: false };
    }
  
    const res = await fetch(`http://localhost:8000/validate-token/${token}`);
    console.log('Fetch Response:', res); 
  
    if (res.ok) {
        const data = await res.json();
        console.log('Response Data:', data); 
        return { valid: data.valid, formData: data.data };
    } else {
        return { valid: false };
    }
}
