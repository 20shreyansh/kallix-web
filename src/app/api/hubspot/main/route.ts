import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, website, automate } = await request.json();

    if (!name || !email || !phone || !automate) {
      return NextResponse.json(
        { error: 'Name, email, phone, and automation interest are required' },
        { status: 400 }
      );
    }

    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

    if (!portalId || !formId) {
      return NextResponse.json(
        { error: 'HubSpot configuration missing' },
        { status: 500 }
      );
    }

    // Use HubSpot's modern API for better reliability
    const nameParts = name.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    const hubspotData = {
      fields: [
        {
          objectTypeId: "0-1",
          name: "firstname",
          value: firstname
        },
        {
          objectTypeId: "0-1",
          name: "lastname",
          value: lastname
        },
        {
          objectTypeId: "0-1",
          name: "email",
          value: email
        },
        {
          objectTypeId: "0-1",
          name: "phone",
          value: phone
        },
        {
          objectTypeId: "0-1",
          name: "website",
          value: website || ''
        },
        {
          objectTypeId: "0-1",
          name: "automation_interest",
          value: automate
        },
        {
          objectTypeId: "0-1",
          name: "lead_source",
          value: "Website - Strategy Call Form"
        }
      ],
      context: {
        pageUri: "https://kallix.ai",
        pageName: "Book Your Strategy Call"
      }
    };

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotData)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('HubSpot API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `HubSpot submission failed: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}