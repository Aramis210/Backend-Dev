const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { GMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_REDIRECT_URI } = process.env;
const { generateConfirmationToken } = require('./functionsConfirmEmail');

const sendNotification = async (email, full_name, rol_type) => {
  let result;

  try {
    const token = generateConfirmationToken(email);
    const confirmationLink = `https://front-end-beige-two.vercel.app/confirm/`;

    const oAuth2Client = new google.auth.OAuth2(
      GMAIL_CLIENT_ID,
      GMAIL_CLIENT_SECRET,
      GMAIL_REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
   

    const mailOptionsWelcomeCompany = {
      from: GMAIL_USER,
      to: email,
      subject: `Welcome  ${full_name} to DEVPOOL`,
      html: `
        <div style="background-color: #f2f2f2; padding: 20px;">
          <h1 style="color: #333333; text-align: center;">¡Bienvenido(a) ${full_name} a nuestra plataforma de búsqueda de desarrolladores web!</h1>
          <p style="color: #333333;">Estamos encantados de contar contigo como parte de nuestra comunidad. Nuestro objetivo es brindarte una experiencia excepcional para que encuentres a los mejores talentos en desarrollo web que se ajusten a tus necesidades.</p>
          <p style="color: #333333;">Con nuestra plataforma, podrás explorar perfiles de desarrolladores altamente calificados, revisar su experiencia y habilidades, y conectarte directamente con aquellos que mejor se adapten a tus requisitos. Te ofrecemos una amplia gama de opciones para encontrar al candidato perfecto que impulse el crecimiento y éxito de tu empresa.</p>
          <p style="color: #333333;">No dudes en explorar todas las funciones y herramientas que nuestra plataforma tiene para ofrecerte. Si tienes alguna pregunta o necesitas asistencia en cualquier momento, nuestro equipo de soporte estará encantado de ayudarte.</p>
          <p style="color: #333333;">¡Una vez más, te damos la bienvenida a nuestra comunidad de búsqueda de desarrolladores web! Esperamos que encuentres a los profesionales más talentosos que impulsen el éxito de tus proyectos.</p>
          <p style="color: #333333;">¡Mucho éxito en tu búsqueda!</p>
          <h1 style="color: #333333;">Confirma tu dirección de correo electrónico</h1>
          <p style="color: #333333;">Haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico:</p>
          <a href="${confirmationLink}" style="color: #007bff; text-decoration: none;">${confirmationLink}</a>
          <p style="color: #333333;">Atentamente,</p>
          <p style="color: #333333;">El equipo de DevPool</p>
        </div>
      `
    };

    const mailOptionsWelcomeDeveloper = {
      from: GMAIL_USER,
      to: email,
      subject: `Welcome  ${full_name} to DEVPOOL`,
      html: `
        <div style="background-color: #f2f2f2; padding: 20px;">
          <h1 style="color: #333333; text-align: center;">¡Bienvenido(a) a nuestra plataforma de búsqueda de desarrolladores web, ${full_name}!</h1>
          <p style="color: #333333;">Estamos encantados de contar contigo como parte de nuestra comunidad de talentosos desarrolladores. Nuestro objetivo es brindarte una experiencia excepcional para que puedas destacarte en el mundo del desarrollo web y encontrar oportunidades emocionantes que se ajusten a tus habilidades y necesidades.</p>
          <p style="color: #333333;">Con nuestra plataforma, podrás explorar diversas oportunidades laborales, revisar los perfiles de empresas y proyectos interesantes, y conectarte directamente con aquellos que mejor se alineen con tus objetivos y pasiones. Te ofrecemos una amplia gama de opciones para impulsar tu crecimiento profesional y encontrar proyectos desafiantes que te inspiren.</p>
          <p style="color: #333333;">No dudes en explorar todas las funciones y herramientas que nuestra plataforma tiene para ofrecerte. Desde la posibilidad de mostrar tu experiencia y habilidades a través de tu perfil, hasta la interacción con empleadores y otros desarrolladores de alto nivel, estamos aquí para apoyarte en cada paso de tu trayectoria.</p>
          <p style="color: #333333;">Si tienes alguna pregunta o necesitas asistencia en cualquier momento, nuestro equipo de soporte estará encantado de ayudarte. Queremos asegurarnos de que tengas todas las herramientas y recursos necesarios para destacar en la búsqueda de nuevas oportunidades y el desarrollo de tu carrera profesional.</p>
          <p style="color: #333333;">Una vez más, te damos la bienvenida a nuestra comunidad de búsqueda de desarrolladores web. Esperamos que encuentres proyectos apasionantes, establezcas conexiones valiosas y alcances nuevos niveles de éxito en tu camino como desarrollador.</p>
          <p style="color: #333333;">¡Mucho éxito en tu búsqueda y en tu desarrollo profesional!</p>
          <h1 style="color: #333333;">Confirma tu dirección de correo electrónico</h1>
          <p style="color: #333333;">Haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico:</p>
          <a href="${confirmationLink}" style="color: #007bff; text-decoration: none;">${confirmationLink}</a>
          <p style="color: #333333;">Atentamente,</p>
          <p style="color: #333333;">El equipo de DevPool</p>
        </div>
      `
    };
    const mailOptionsNewPost = {
      from: GMAIL_USER,
      to: email,
      subject: "New Post Notification",
      html: `
        <div style="background-color: #f2f2f2; padding: 20px;">
          <h1 style="color: #333333; text-align: center;">¡Hola, ${full_name}!</h1>
          <p style="color: #333333;">Queríamos informarte que has realizado un nuevo post en nuestra plataforma de búsqueda de desarrolladores web. Agradecemos tu participación activa en nuestra comunidad y valoramos que compartas tus ideas y experiencias con nosotros.</p>
          <p style="color: #333333;">Nuestra plataforma está diseñada para fomentar el intercambio de conocimientos y fortalecer las conexiones entre profesionales como tú. Al publicar tus mensajes, contribuyes al crecimiento y la colaboración dentro de nuestra comunidad.</p>
          <p style="color: #333333;">Te animamos a seguir explorando y participando activamente. No dudes en hacer preguntas, compartir tus logros o buscar consejos de otros desarrolladores talentosos que están aquí para apoyarte en tu trayectoria profesional.</p>
          <p style="color: #333333;">Recuerda que nuestro equipo de soporte siempre está disponible para ayudarte en caso de que necesites alguna asistencia adicional. Estamos comprometidos en brindarte una experiencia excepcional mientras te embarcas en tu viaje en busca de talentosos desarrolladores web.</p>
          <p style="color: #333333;">¡Una vez más, te agradecemos por tu nuevo post y te damos la bienvenida a nuestra comunidad de búsqueda de desarrolladores web! Esperamos que tengas éxito en tus futuras interacciones y descubrimientos.</p>
          <p style="color: #333333;">Atentamente,</p>
          <p style="color: #333333;">El equipo de DevPool</p>
        </div>
      `
    };
    const mailOptionsWelcomeAdmin = {
      from: GMAIL_USER,
      to: email,
      subject: `¡Bienvenido(a) como Administrador(a) de DEVPOOL!`,
      html: `
        <div style="background-color: #f2f2f2; padding: 20px;">
          <h1 style="color: #333333; text-align: center;">¡Bienvenido(a) como Administrador(a) de DEVPOOL!</h1>
          <p style="color: #333333;">Estamos encantados de darte la bienvenida como administrador(a) de nuestra plataforma de búsqueda de desarrolladores web. Tu rol es fundamental para garantizar el buen funcionamiento y la calidad de la comunidad.</p>
          <p style="color: #333333;">Como administrador(a), tendrás acceso a una amplia gama de herramientas y funciones que te permitirán gestionar perfiles de desarrolladores, revisar candidaturas, moderar contenidos y colaborar con otros miembros del equipo de administración.</p>
          <p style="color: #333333;">Queremos que te sientas empoderado(a) y preparado(a) para realizar tus tareas de manera eficiente. Si tienes alguna pregunta o necesitas asistencia en cualquier momento, nuestro equipo de soporte estará encantado de ayudarte.</p>
          <p style="color: #333333;">Te animamos a explorar todas las funciones y herramientas que nuestra plataforma tiene para ofrecerte. Tu contribución es fundamental para crear una comunidad sólida y exitosa en DEVPOOL.</p>
          <p style="color: #333333;">¡Una vez más, te damos la bienvenida como administrador(a) de DEVPOOL! Esperamos que tu experiencia en nuestra plataforma sea gratificante y que juntos logremos alcanzar nuestros objetivos.</p>
          <p style="color: #333333;">¡Mucho éxito en tu labor como administrador(a)!</p>
          <h1 style="color: #333333;">Confirma tu dirección de correo electrónico</h1>
          <p style="color: #333333;">Haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico:</p>
          <a href="${confirmationLink}" style="color: #007bff; text-decoration: none;">${confirmationLink}</a>
          <p style="color: #333333;">Atentamente,</p>
          <p style="color: #333333;">El equipo de DevPool</p>
        </div>
      `
    };
    
    
    if(!rol_type) {const result = await transporter.sendMail(mailOptionsNewPost)
      console.log('Notification email sent: ' + result.response);
    }
    if (rol_type === "company") {const result = await transporter.sendMail(mailOptionsWelcomeCompany)
      console.log('Notification email sent: ' + result.response);
    }
    if (rol_type === "developer") {const result = await transporter.sendMail(mailOptionsWelcomeDeveloper)
      console.log('Notification email sent: ' + result.response);
    }
    if (rol_type === "admin") {const result = await transporter.sendMail(mailOptionsWelcomeAdmin)
      console.log('Notification email sent: ' + result.response);
    }
    return result

  } catch (error) {
    console.log('Error in sending notification email: ' + error);   
  }
  
};


module.exports= { sendNotification };