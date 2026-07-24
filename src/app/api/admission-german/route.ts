import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Backend honeypot check
    if (body.website) {
      return NextResponse.json(
        { success: false, message: "Invalid submission" },
        { status: 400 }
      );
    }

    // Turnstile verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && body.turnstileToken) {
      try {
        const verifyResponse = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              secret: turnstileSecret,
              response: body.turnstileToken,
            }),
          }
        );

        const verifyResult = await verifyResponse.json();
        if (!verifyResult.success) {
          return NextResponse.json(
            { success: false, message: "Security verification failed. Please try again." },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error("Turnstile verification error:", error);
      }
    }

    // Remove internal fields before sending to Google Sheets
    delete body.website;
    delete body.turnstileToken;
    const submissionData = body;

    const scriptUrl = process.env.GERMAN_GOOGLE_SHEET_SCRIPT_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        { success: false, message: "German Google Sheet script URL missing. Please set GERMAN_GOOGLE_SHEET_SCRIPT_URL." },
        { status: 500 }
      );
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("German Admission API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting the German admission form",
      },
      { status: 500 }
    );
  }
}
