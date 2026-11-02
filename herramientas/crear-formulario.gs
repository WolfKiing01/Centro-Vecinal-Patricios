// Ejecutar desde https://script.google.com con la cuenta Google del centro.
// Guarda el ID para evitar formularios duplicados si se ejecuta nuevamente.
function crearFormularioReclamos() {
  const props = PropertiesService.getScriptProperties();
  const existente = props.getProperty('FORMULARIO_RECLAMOS_ID');
  if (existente) { const form=FormApp.openById(existente); console.log('Editar: '+form.getEditUrl()); console.log('Responder: '+form.getPublishedUrl()); return; }
  const form=FormApp.create('Reclamos y sugerencias · Centro Vecinal Patricios', false);
  props.setProperty('FORMULARIO_RECLAMOS_ID',form.getId());
  form.setDescription('Contanos qué sucede en el barrio. La comisión recibirá tus respuestas de forma privada para evaluar y orientar la consulta. Este formulario no reemplaza emergencias ni reclamos formales ante prestadores. Contacto: centrovecinalpatricios@outlook.com. No incluyas DNI, contraseñas ni datos sensibles de otras personas.');
  form.setCollectEmail(false).setPublishingSummary(false).setConfirmationMessage('Recibimos tu mensaje. Gracias por ayudarnos a mejorar el barrio.');
  form.addTextItem().setTitle('Nombre (opcional)');
  form.addTextItem().setTitle('Teléfono o correo para responderte (opcional)');
  form.addListItem().setTitle('Tema').setChoiceValues(['Agua','Gas','Alumbrado','Calles y veredas','Residuos y limpieza','Espacios públicos','Sugerencia','Otro']).setRequired(true);
  form.addTextItem().setTitle('Calle, esquina o lugar del problema').setRequired(true);
  form.addParagraphTextItem().setTitle('Describí el reclamo o sugerencia').setRequired(true);
  form.addCheckboxItem().setTitle('Uso de la información').setChoiceValues(['Acepto que el centro vecinal use estos datos para gestionar mi consulta.']).setRequired(true);
  console.log('Editar y publicar: '+form.getEditUrl());
  console.log('Enlace para responder (funcionará después de publicar): '+form.getPublishedUrl());
}
