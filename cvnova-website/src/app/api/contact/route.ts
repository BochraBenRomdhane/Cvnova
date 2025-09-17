import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
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
      to: process.env.COMPANY_EMAIL,
      subject: `New meeting - ${formData.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8c52ff; border-bottom: 2px solid #8c52ff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8c52ff; margin-top: 0;">Service Requested</h3>
            <p style="font-size: 18px; font-weight: bold; color: #171717;">${formData.service}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #8c52ff; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #8c52ff;">${formData.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${formData.phone}" style="color: #8c52ff;">${formData.phone}</a></p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8c52ff; margin-top: 0;">Preferred Meeting Time</h3>
            <p><strong>Date:</strong> ${formData.preferredDate}</p>
            <p><strong>Time:</strong> ${formData.preferredTime}</p>
          </div>
          
          ${formData.message ? `
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8c52ff; margin-top: 0;">Additional Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            <em>This message was sent from your CVNOVA website contact form.</em>
          </p>
        </div>
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



