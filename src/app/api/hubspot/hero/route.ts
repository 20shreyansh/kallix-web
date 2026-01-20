import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    const heroFormId = process.env.NEXT_PUBLIC_HUBSPOT_HERO_FORM_ID;

    if (!portalId || !heroFormId) {
      return NextResponse.json(
        { error: 'HubSpot configuration missing' },
        { status: 500 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    // Create URL-encoded form data
    const formDataParams = new URLSearchParams();
    formDataParams.append('firstname', firstname);
    formDataParams.append('lastname', lastname);
    formDataParams.append('email', email);
    formDataParams.append('lead_source', 'Website - Hero Form');

    const url = `https://forms.hubspot.com/uploads/form/v2/${portalId}/${heroFormId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDataParams.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('HubSpot API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `HubSpot submission failed: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully' });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
