import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (name.length > 200 || subject.length > 500 || message.length > 5000) {
      return NextResponse.json(
        { error: "Field length exceeded" },
        { status: 400 }
      );
    }

    // Spam honeypot
    if (body._honeypot) {
      return NextResponse.json({ success: true });
    }

    // Check if Supabase credentials are configured
    const isConfigured = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    );

    if (isConfigured) {
      const supabase = await createAdminSupabaseClient();
      const { error } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (error) {
        console.error("Supabase contact insert error:", error);
        return NextResponse.json(
          { error: "Failed to deliver message to database. Please try again." },
          { status: 500 }
        );
      }
    } else {
      // In local dev/demo without Supabase credentials, log and succeed
      console.log("📬 Demo/Dev Contact Submission Received:", {
        name,
        email,
        subject,
        message,
        receivedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Thank you!",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
