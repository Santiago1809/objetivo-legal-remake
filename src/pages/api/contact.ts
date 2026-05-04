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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #401C34; border-bottom: 2px solid #9A8C5B; padding-bottom: 10px;">
            Nuevo Contacto desde la Web
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #401C34; width: 140px;">
                Nombre:
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #401C34;">
                Teléfono:
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">
                ${phone}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #401C34; vertical-align: top;">
                Mensaje:
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </td>
            </tr>
          </table>
          
          <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
            Este mensaje fue enviado desde el formulario de contacto de objetivo-legal.vercel.app
          </p>
        </div>
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