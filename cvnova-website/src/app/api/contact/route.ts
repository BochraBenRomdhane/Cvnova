import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected form data structure
interface ContactFormData {
  name: string;           // Required
  email: string;          // Required
  phone: string;          // Required
  service: string;        // Required - "Personal & Career Branding" or "Digital Presence & Product Development"
  message?: string;       // Optional - additional message
  preferredDate: string;  // Required - preferred meeting date
  preferredTime: string;  // Required - preferred meeting time
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.preferredDate || !formData.preferredTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, phone, service, preferredDate, and preferredTime are required' },
        { status: 400 }
      );
    }
    
    // Validate service field
    const validServices = ['Personal & Career Branding', 'Digital Presence & Product Development'];
    if (!validServices.includes(formData.service)) {
      return NextResponse.json(
        { success: false, error: 'Invalid service. Must be either "Personal & Career Branding" or "Digital Presence & Product Development"' },
        { status: 400 }
      );
    }
    
    // Debug: Log received form data
    console.log("Received form data:", formData);
    console.log("Environment check - YOUR_EMAIL:", process.env.YOUR_EMAIL ? "✅ Set" : "❌ Missing");
    console.log("Environment check - COMPANY_EMAIL:", process.env.COMPANY_EMAIL ? "✅ Set" : "❌ Missing");
    console.log("Environment check - YOUR_EMAIL_PASS:", process.env.YOUR_EMAIL_PASS ? "✅ Set" : "❌ Missing");
    
    // Create transporter using your email credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.YOUR_EMAIL,
        pass: process.env.YOUR_EMAIL_PASS
      }
    });

    // Create a professional HTML email structure with CVnova theme
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Client Meeting Request - CVnova</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #171717; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }
          .container { 
            max-width: 750px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #e2e8f0;
          }
          .header { 
            background: linear-gradient(135deg, #8c52ff 0%, #7c3aed 100%); 
            color: white; 
            padding: 60px 50px; 
            text-align: center; 
            position: relative;
            overflow: hidden;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          .header-content {
            position: relative;
            z-index: 1;
          }
          .gradient-line {
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #ffffff, rgba(255,255,255,0.6));
            border-radius: 2px;
            margin: 0 auto 20px;
          }
          .header-subtitle {
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
            opacity: 0.9;
          }
          .header h1 { 
            margin: 0 0 20px 0; 
            font-size: 32px; 
            font-weight: 800; 
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            line-height: 1.2;
          }
          .header p { 
            margin: 0; 
            font-size: 18px; 
            opacity: 0.95; 
            font-weight: 400;
          }
          .content { 
            padding: 60px 50px; 
            background: white;
          }
          .section-title { 
            font-size: 24px; 
            font-weight: 800; 
            color: #8c52ff; 
            margin: 0 0 35px 0; 
            padding-bottom: 15px; 
            border-bottom: 3px solid #8c52ff; 
            position: relative;
            text-align: center;
          }
          .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #8c52ff, #7c3aed);
            border-radius: 2px;
          }
          .field { 
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
            padding: 30px; 
            margin: 25px 0; 
            border-radius: 16px; 
            border-left: 6px solid #8c52ff; 
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .field::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #8c52ff, #7c3aed, #8c52ff);
            opacity: 0.7;
          }
          .field-label { 
            font-weight: 800; 
            color: #1e293b; 
            margin-bottom: 15px; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 1.5px;
            display: flex;
            align-items: center;
          }
          .field-label::before {
            content: '●';
            color: #8c52ff;
            margin-right: 10px;
            font-size: 14px;
          }
          .field-value { 
            color: #475569; 
            font-size: 16px; 
            word-break: break-word;
            line-height: 1.6;
            font-weight: 500;
          }
          .field-value a { 
            color: #8c52ff; 
            text-decoration: none; 
            font-weight: 700;
            padding: 4px 12px;
            background: rgba(140, 82, 255, 0.1);
            border-radius: 8px;
            transition: all 0.3s ease;
            display: inline-block;
          }
          .field-value a:hover { 
            background: rgba(140, 82, 255, 0.2);
            text-decoration: none;
          }
          .footer { 
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
            padding: 50px; 
            text-align: center; 
            border-top: 1px solid #e2e8f0; 
            position: relative;
          }
          .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 4px;
            background: linear-gradient(90deg, #8c52ff, #7c3aed);
            border-radius: 2px;
          }
          .timestamp { 
            color: #64748b; 
            font-size: 14px; 
            margin: 0;
            font-weight: 600;
          }
          .company-info {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
            font-weight: 500;
          }
          .company-info strong {
            color: #8c52ff;
            font-weight: 800;
            font-size: 16px;
          }
          .priority-badge {
            display: inline-block;
            background: linear-gradient(135deg, #8c52ff, #7c3aed);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 15px;
            box-shadow: 0 4px 12px rgba(140, 82, 255, 0.3);
          }
          .meeting-preference {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
            border-left: 6px solid #0ea5e9 !important;
            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.15) !important;
          }
          .meeting-preference .field-label {
            color: #0c4a6e !important;
          }
          .meeting-preference .field-value {
            color: #0c4a6e !important;
            font-weight: 700 !important;
          }
        </style>
      </head>
      <body>

          
          <div class="content">
            <h2 class="section-title">📋 Client Information</h2>
            ${Object.entries(formData)
              .filter(([, value]) => value && value.toString().trim() !== '')
              .map(([key, value]) => {
                const displayKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                const displayValue = value.toString().trim();
                
                // Special handling for different field types
                let formattedValue = displayValue;
                if (key === 'email' || key === 'userEmail') {
                  formattedValue = `<a href="mailto:${displayValue}">${displayValue}</a>`;
                } else if (key === 'phone') {
                  formattedValue = `<a href="tel:${displayValue}">${displayValue}</a>`;
                } else if (key === 'preferredDate') {
                  const date = new Date(displayValue);
                  formattedValue = date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  });
                } else if (key === 'preferredTime') {
                  const time = new Date(`2000-01-01T${displayValue}`);
                  formattedValue = time.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Africa/Tunis'
                  }) + ' (Tunisia Time)';
                } else if (key === 'message' && displayValue.length > 100) {
                  formattedValue = displayValue.substring(0, 100) + '...';
                }
                
                return `
                  <div class="field">
                    <div class="field-label">${displayKey}</div>
                    <div class="field-value">${formattedValue}</div>
                  </div>
                `;
              }).join('')}
              
              ${formData.preferredDate && formData.preferredTime ? `
                <div class="field meeting-preference">
                  <div class="field-label">📅 Meeting Preference</div>
                  <div class="field-value">
                    ${new Date(formData.preferredDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} at ${new Date(`2000-01-01T${formData.preferredTime}`).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true,
                      timeZone: 'Africa/Tunis'
                    })} (Tunisia Time)
                  </div>
                </div>
              ` : ''}
          </div>
          
          <div class="footer">
            <div class="timestamp">
              📅 Submitted on: ${new Date().toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </div>
            <div class="company-info">
              <strong>CVnova</strong><br>
              Professional CV & Career Services<br>
              Website Contact Form • Automated Notification
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email from your email to company email
    await transporter.sendMail({
      from: `"CVnova Website" <${process.env.YOUR_EMAIL}>`,
      to: process.env.COMPANY_EMAIL, // Send to company email
      subject: `New Client Meeting - ${formData.name} (${formData.service})`,
      html: htmlEmail,
      text: `New client meeting request received from ${formData.name}.\n\nContact Details:\n${Object.entries(formData)
        .filter(([, value]) => value && value.toString().trim() !== '')
        .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value.toString().trim()}`)
        .join('\n')}\n\nSubmitted on: ${new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      })}`,
      replyTo: formData.email
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully!'
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
