interface HubSpotFormData {
    name: string;
    email: string;
    phone: string;
    website?: string;
    automate: string;
}

interface HubSpotHeroFormData {
    name: string;
    email: string;
}

export async function submitToHubSpot(formData: HubSpotFormData) {
    try {
        const response = await fetch('/api/hubspot/main', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                website: formData.website,
                automate: formData.automate,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(`HubSpot submission failed: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        return await response.json();
    } catch (error) {
        console.error('HubSpot Main Form Error:', error);
        throw error;
    }
}

// Hero form submission (name + phone only) - Uses server-side API route to avoid CORS
export async function submitHeroFormToHubSpot(formData: HubSpotHeroFormData) {
    try {
        const response = await fetch('/api/hubspot/hero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(`Hero form submission failed: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        return await response.json();
    } catch (error) {
        console.error('HubSpot Hero Form Error:', error);
        throw error;
    }
}

// Alternative method using HubSpot's legacy forms API (more reliable)
export async function submitToHubSpotLegacy(formData: HubSpotFormData) {
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

    if (!portalId || !formId) {
        throw new Error('HubSpot configuration missing');
    }

    // Split name into first and last name
    const nameParts = formData.name.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    const formDataPayload = new FormData();
    formDataPayload.append('firstname', firstname);
    formDataPayload.append('lastname', lastname);
    formDataPayload.append('email', formData.email);
    formDataPayload.append('phone', formData.phone);
    if (formData.website) {
        formDataPayload.append('website', formData.website);
    }
    formDataPayload.append('automation_interest', formData.automate);
    formDataPayload.append('lead_source', 'Website - Strategy Call Form');

    const url = `https://forms.hubspot.com/uploads/form/v2/${portalId}/${formId}`;

    const response = await fetch(url, {
        method: 'POST',
        body: formDataPayload,
    });

    if (!response.ok) {
        throw new Error(`HubSpot submission failed: ${response.status} ${response.statusText}`);
    }

    return response;
}