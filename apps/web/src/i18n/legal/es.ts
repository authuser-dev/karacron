export const terms = `
## Terminos y condiciones

**Ultima actualizacion: 2 de mayo de 2026**

Lee estos Terminos y condiciones detenidamente antes de usar Kara. Al acceder o utilizar la aplicacion, aceptas quedar vinculado por estos terminos. Si no estas de acuerdo con alguna parte, no debes usar el servicio.

## 1. Aceptacion de los terminos

Al instalar, acceder o usar Kara ("la Aplicacion", "el Servicio"), confirmas que tienes al menos 16 anos, que has leido y comprendido estos Terminos y que aceptas quedar legalmente vinculado por ellos. Si usas Kara en nombre de una organizacion, declaras que tienes autoridad para vincular a dicha organizacion con estos Terminos.

## 2. Descripcion del servicio

Kara es un **asistente de IA local-first** que funciona principalmente en tu dispositivo. Tus conversaciones, el contexto aprendido y tu configuracion se almacenan localmente. Kara puede conectarse opcionalmente a proveedores de IA de terceros (como Anthropic u OpenAI) unicamente cuando configures de forma explicita una clave API para dichos servicios.

## 3. Licencia y uso permitido

Sujeto a estos Terminos, te concedemos una licencia limitada, no exclusiva, intransferible y revocable para usar Kara con fines personales o empresariales internos.

Aceptas **no**:

- Aplicar ingenieria inversa, descompilar o desensamblar ninguna parte de la Aplicacion
- Usar el Servicio para cualquier proposito ilegal, fraudulento o malicioso
- Intentar acceder de forma no autorizada a ningun sistema o red
- Redistribuir, sublicenciar o vender la Aplicacion sin permiso escrito expreso
- Usar herramientas automatizadas para extraer datos del Servicio

## 4. Cuentas de usuario y seguridad

Eres el unico responsable de mantener la confidencialidad de tus credenciales y de toda la actividad que tenga lugar en tu cuenta. Debes notificarnos de inmediato ante cualquier violacion de seguridad o uso no autorizado de tu cuenta.

Kara almacena las credenciales sensibles (claves API, tokens) exclusivamente en el llavero nativo de tu sistema operativo (Keychain de macOS, Secret Service de Linux, Credential Manager de Windows). Nunca almacenamos secretos en texto plano.

## 5. Proveedores de IA de terceros

Cuando configuras un proveedor de IA en la nube (Anthropic, OpenAI, Google, etc.), tus mensajes y el contexto relevante se transmiten a ese proveedor para generar respuestas. Esta transmision esta sujeta a la **politica de privacidad y los terminos de servicio del proveedor en cuestion**, no a los de Kara.

Reconoces que Kara no es responsable de las practicas de datos de los proveedores de IA de terceros. Si prefieres que ningun dato salga de tu dispositivo, puedes configurar Kara para usar exclusivamente un modelo de IA local.

## 6. Propiedad intelectual

Todos los derechos, titulos e intereses sobre el Servicio (excluido el contenido generado por el usuario) son y seguiran siendo propiedad exclusiva de Kara y sus licenciantes. Nada en estos Terminos te otorga derecho a usar ninguna marca comercial, logo o nombre comercial.

## 7. Exclusion de garantias

El Servicio se proporciona **"tal cual"** y **"segun disponibilidad"**, sin garantias de ningun tipo, ya sean expresas o implicitas, incluyendo pero no limitadas a las garantias implicitas de comerciabilidad, idoneidad para un fin determinado o no infraccion.

No garantizamos que el Servicio sea ininterrumpido, libre de errores o exento de componentes daninos.

## 8. Limitacion de responsabilidad

En la maxima medida permitida por la ley aplicable, Kara y sus afiliados no seran responsables de ningun dano indirecto, incidental, especial, consecuente o punitivo derivado de o relacionado con tu uso del Servicio o la imposibilidad de utilizarlo.

En ningun caso nuestra responsabilidad total hacia ti superara el importe que hayas pagado por el Servicio en los doce (12) meses anteriores a la reclamacion.

## 9. Terminacion

Nos reservamos el derecho de suspender o cancelar tu acceso al Servicio en cualquier momento, con o sin previo aviso, en caso de conductas que consideremos que infringen estos Terminos o que sean perjudiciales para otros usuarios, para nosotros o para terceros.

Tras la terminacion, la licencia aqui concedida expirara automaticamente. Las disposiciones que por su naturaleza deban sobrevivir a la terminacion seguiran vigentes.

## 10. Ley aplicable

Estos Terminos se regiran e interpretaran de conformidad con la ley aplicable. Cualquier disputa que surja en virtud de estos Terminos se resolvera mediante negociacion de buena fe antes de recurrir a procedimientos legales formales.

## 11. Modificaciones de los terminos

Podemos revisar estos Terminos en cualquier momento publicando una version actualizada en la Aplicacion. Los cambios materiales se notificaran mediante una notificacion dentro de la aplicacion. El uso continuado del Servicio tras la entrada en vigor de los cambios constituye la aceptacion de los Terminos revisados.

## 12. Contacto

Si tienes alguna pregunta sobre estos Terminos, puedes ponerte en contacto a traves de los canales de soporte oficiales de Kara.
`;

export const privacy = `
## Politica de uso de datos

**Ultima actualizacion: 2 de mayo de 2026**

Tu privacidad es un principio fundamental de Kara, no una caracteristica adicional. Kara esta construido con arquitectura **local-first**: tus datos viven en tu dispositivo por defecto. Esta politica explica exactamente que datos gestionamos, como y por que.

## 1. Nuestro principio fundamental

Kara opera bajo un modelo estricto de **opt-in**. Nada se comparte con servicios externos sin tu autorizacion explicita y previa. Recopilamos el minimo de datos necesarios para operar el Servicio.

## 2. Datos almacenados localmente en tu dispositivo

Los siguientes datos se almacenan **exclusivamente en tu dispositivo** y nunca se transmiten a los servidores de Kara:

- **Historial de conversaciones** - todos los mensajes y contexto, almacenados en una base de datos SQLite local
- **Memoria y hechos aprendidos** - informacion contextual que el asistente aprende sobre ti
- **Configuracion del usuario** - preferencias, ajustes y estado de la aplicacion
- **Claves API y tokens** - almacenados en el llavero nativo de tu sistema operativo (cifrado)
- **Modelos de IA locales** - binarios de modelo descargados en tu almacenamiento local
- **Skills y plugins** - instalados localmente bajo tu control

## 3. Datos que pueden salir de tu dispositivo

Kara solo puede transmitir datos fuera de tu dispositivo en los siguientes escenarios explicitamente opt-in:

**3.1 Solicitudes a proveedores de IA en la nube**

Si configuras un proveedor de IA en la nube (Anthropic, OpenAI, Google, etc.), el contenido de tus mensajes y una ventana de contexto minima relevante se enviaran a ese proveedor para generar respuestas. Esto es necesario para que funcione la IA. Estos datos estan sujetos a la **politica de privacidad del proveedor correspondiente**.

**3.2 Integraciones de skills con servicios externos**

Si instalas una skill que se conecta a un servicio externo (ej. Telegram, GitHub, Notion), solo los datos estrictamente necesarios para la funcion de esa skill se transmitiran a dicho servicio. Debes instalar y configurar cada skill de forma explicita, proporcionando las credenciales necesarias.

**3.3 Verificaciones anonimas de actualizaciones**

Si esta habilitado (desactivado por defecto), Kara puede contactar con servidores de actualizacion para comprobar si hay nuevas versiones. Esta solicitud contiene unicamente tu version actual de Kara y tu plataforma (ej. macOS, Windows). No se incluyen datos personales, contenido de conversaciones ni configuracion.

## 4. Datos que no recopilamos

Kara **no** recopila ni transmite:

- Tu historial completo de conversaciones a nuestros servidores
- Archivos o codigo con los que interactuas
- Tu ubicacion
- Analitica de comportamiento o telemetria de uso (salvo opt-in explicito)
- Ningun dato con fines publicitarios

## 5. Seguridad

Aplicamos las mejores practicas de seguridad del sector:

- **Los secretos (claves API, tokens)** se almacenan exclusivamente en el llavero nativo del SO, nunca en texto plano
- **La base de datos local** solo es accesible por el proceso daemon de Kara (permisos de archivo 600)
- **La comunicacion de red** con el daemon local ocurre unicamente a traves de loopback (localhost), sin exposicion a la red
- **El cifrado en reposo** para la configuracion sensible esta disponible como ajuste opt-in

## 6. Retencion y eliminacion de datos

Los datos locales se conservan indefinidamente a menos que decidas eliminarlos. Tienes control total:

- Eliminar sesiones individuales desde los ajustes de la cuenta
- Purgar todos los datos locales en cualquier momento
- Exportar tus datos antes de eliminarlos

Los datos transmitidos a proveedores de IA de terceros estan sujetos a **sus** politicas de retencion.

## 7. Tus derechos

Dependiendo de tu jurisdiccion, puedes tener derechos que incluyen acceso a tus datos, rectificacion, supresion y portabilidad. Dado que la mayoria de los datos se almacenan localmente, puedes ejercer estos derechos directamente desde la aplicacion en cualquier momento.

## 8. Cambios en esta politica

Si realizamos cambios materiales en esta politica, te notificaremos mediante un aviso en la aplicacion antes de que el cambio entre en vigor. El uso continuado del Servicio tras la fecha de vigencia constituye la aceptacion del cambio.

## 9. Contacto

Para preguntas o solicitudes relacionadas con la privacidad, contactanos a traves de los canales de soporte oficiales de Kara.
`;
