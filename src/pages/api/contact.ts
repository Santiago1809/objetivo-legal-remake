import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, phone, message } = data;

    // Validate required fields
    if (!name || !phone || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Todos los campos son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get SMTP config from environment variables
    const smtpHost = import.meta.env.SMTP_HOST;
    const smtpPort = import.meta.env.SMTP_PORT;
    const smtpUser = import.meta.env.SMTP_USER;
    const smtpPass = import.meta.env.SMTP_PASS;
    const emailTo = import.meta.env.EMAIL_TO;

    // Check if SMTP config exists
    if (!smtpHost || !smtpUser || !smtpPass || !emailTo) {
      console.error('SMTP configuration missing');
      return new Response(
        JSON.stringify({ success: false, error: 'Configuración de correo no disponible' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || '587'),
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // Email content
    const mailOptions = {
      from: `"Objetivo Legal" <${smtpUser}>`,
      to: emailTo,
      subject: `Nuevo contacto desde la web - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #401C34; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #401C34;">
            <tr>
              <td align="center" style="padding: 60px 20px;">
                <!-- Main Card -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 24px; overflow: hidden;">
                  <!-- Accent Line -->
                  <tr>
                    <td style="height: 4px; background: linear-gradient(90deg, #401C34 0%, #5a2a47 50%, #401C34 100%);"></td>
                  </tr>
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 48px 48px 32px 48px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="vertical-align: middle;">
                            <span style="display: inline-block; width: 8px; height: 8px; background-color: #9A8C5B; border-radius: 50%; margin-right: 12px; vertical-align: middle;"></span>
                            <span style="color: #9A8C5B; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; vertical-align: middle;">Nuevo Contacto</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top: 16px;">
                            <h1 style="margin: 0; color: #401C34; font-size: 32px; font-weight: 500; letter-spacing: -0.5px; line-height: 1.2;">
                              Tienes un nuevo mensaje
                            </h1>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top: 12px;">
                            <p style="margin: 0; color: #71717a; font-size: 15px; line-height: 1.6;">
                              Alguien ha completado el formulario de contacto en tu sitio web.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Divider -->
                  <tr>
                    <td style="padding: 0 48px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="height: 1px; background-color: #e4e4e7;"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Contact Info -->
                  <tr>
                    <td style="padding: 32px 48px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        
                        <!-- Nombre -->
                        <tr>
                          <td style="padding-bottom: 24px;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="width: 48px; height: 48px; background-color: #faf8f9; border-radius: 12px; vertical-align: middle; text-align: center; font-size: 20px; color: #9A8C5B; line-height: 48px;">
                                  &#9679;
                                </td>
                                <td style="padding-left: 16px; vertical-align: middle;">
                                  <p style="margin: 0; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Nombre</p>
                                  <p style="margin: 4px 0 0 0; color: #18181b; font-size: 17px; font-weight: 500;">${name}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Teléfono -->
                        <tr>
                          <td style="padding-bottom: 24px;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="width: 48px; height: 48px; background-color: #faf8f9; border-radius: 12px; vertical-align: middle; text-align: center; font-size: 20px; color: #9A8C5B; line-height: 48px;">
                                  &#9742;
                                </td>
                                <td style="padding-left: 16px; vertical-align: middle;">
                                  <p style="margin: 0; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Teléfono</p>
                                  <p style="margin: 4px 0 0 0;">
                                    <a href="tel:${phone}" style="color: #9A8C5B; font-size: 17px; font-weight: 500; text-decoration: none;">${phone}</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Mensaje -->
                        <tr>
                          <td>
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="width: 48px; height: 48px; background-color: #faf8f9; border-radius: 12px; vertical-align: top; text-align: center; font-size: 20px; color: #9A8C5B; line-height: 48px;">
                                  &#9998;
                                </td>
                                <td style="padding-left: 16px; vertical-align: top;">
                                  <p style="margin: 0; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Mensaje</p>
                                  <p style="margin: 8px 0 0 0; color: #3f3f46; font-size: 15px; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                      </table>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 48px 32px 48px; background-color: #faf8f9; border-radius: 0 0 24px 24px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="text-align: center;">
                            <p style="margin: 0; color: #a1a1aa; font-size: 12px;">
                              Correo enviado automáticamente desde <span style="color: #401C34;">Objetivo Legal</span>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Brand -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin-top: 32px;">
                  <tr>
                    <td style="text-align: center; padding: 24px;">
                      <span style="display: inline-block; width: 32px; height: 2px; background-color: #9A8C5B; vertical-align: middle; margin-right: 12px;"></span>
                      <span style="color: #9A8C5B; font-size: 13px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; vertical-align: middle;">Objetivo Legal</span>
                      <span style="display: inline-block; width: 32px; height: 2px; background-color: #9A8C5B; vertical-align: middle; margin-left: 12px;"></span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Correo enviado exitosamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error al enviar el correo' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};