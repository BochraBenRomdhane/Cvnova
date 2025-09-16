import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected form data structure
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  preferredDate: string;
  preferredTime: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.preferredDate || !formData.preferredTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.YOUR_EMAIL || !process.env.YOUR_EMAIL_PASS) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.YOUR_EMAIL,
        pass: process.env.YOUR_EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: `"CVnova Website" <${process.env.YOUR_EMAIL}>`,
      to: 'cvnovawebsite@gmail.com',
      subject: `New Contact Form Submission - ${formData.service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Service:</strong> ${formData.service}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Preferred Date:</strong> ${formData.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>
        ${formData.message ? `<p><strong>Message:</strong> ${formData.message}</p>` : ''}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}



