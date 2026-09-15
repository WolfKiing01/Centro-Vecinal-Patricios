# Centro Vecinal Patricios

Sitio institucional en HTML, CSS y JavaScript, preparado para editar con Visual Studio Code. Contenido actualizado con la información aportada hasta el 14 de septiembre de 2026.

## Abrir el proyecto

1. Descomprimí el ZIP completo.
2. En Visual Studio Code elegí **Archivo → Abrir carpeta** y seleccioná `centro-vecinal-patricios-html`.
3. Abrí `index.html` con tu navegador. También podés usar la extensión Live Server de VS Code y elegir **Open with Live Server**.

No requiere instalar Node.js, React, paquetes ni ejecutar una compilación. Las imágenes están incluidas. WhatsApp, Instagram, Facebook y Google Maps necesitan conexión a Internet.

## Archivos principales

| Archivo/carpeta | Qué contiene |
| --- | --- |
| `index.html` | Inicio, actividades, salud, salón, historia del barrio y contacto |
| `talleres.html` | Información y galerías de talleres y cursos |
| `quienes-somos.html` | Historia y participación del centro vecinal |
| `actividades/` | Una página HTML por actividad |
| `salud/` | Una página HTML por servicio |
| `css/styles.css` | Colores, tipografías, distribución y adaptación a celulares |
| `js/main.js` | Menú móvil, carruseles y visor de fotos |
| `assets/` | Fotos, flyers y logotipos locales |
| `GALERIAS.json` | Inventario informativo de galerías al entregar esta versión; no controla la web |
| `PENDIENTES.md` | Datos que aún necesitan confirmación |
| `CREDITOS.md` | Procedencia de los logotipos y del contenido |

## Qué lenguaje usa y para qué

**HTML** es el lenguaje de marcado que organiza títulos, párrafos, enlaces, imágenes y secciones. **CSS** define su presentación y cómo se acomodan en distintos tamaños de pantalla. **JavaScript** es el lenguaje de programación que hace funcionar los controles: abrir el menú, avanzar por las imágenes y ampliar una foto.

Esta entrega es una versión estática independiente del prototipo previo, que utilizaba React y TypeScript. El sitio entregado al navegador no depende de ese prototipo ni de un servidor de aplicaciones. No tiene base de datos, panel de administración ni sistema de reservas. Las consultas se realizan en WhatsApp.

## Modificar textos y contactos

Buscá el texto que querés cambiar dentro del HTML correspondiente. Si modificás un horario, revisá también su tarjeta en `index.html` para mantener ambas páginas coherentes.

Un enlace de contacto tiene esta forma:

```html
<a href="https://wa.me/5493512714805?text=Hola%2C%20me%20interesa%20Baile%20Fitness."
   target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
```

El número no lleva espacios, guiones ni `+`. Los enlaces ya incluyen mensajes específicos. Reemplazá tanto el número del enlace como el teléfono visible si cambia un responsable.

## Agregar fotos a una galería (hasta 10)

1. Guardá la nueva foto dentro de `assets`, con un nombre sencillo, por ejemplo `folclore-06.jpeg`.
2. Abrí el HTML del taller o actividad y buscá `gallery-slides`.
3. Copiá uno de sus botones `data-slide` y pegalo dentro del mismo contenedor. A las fotos posteriores a la primera agregales `hidden`.
4. Cambiá `src`, `alt` y `aria-label`. En una página dentro de `actividades/` o `salud/`, la ruta empieza con `../assets/`; en las páginas principales, empieza con `assets/`.
5. Actualizá el contador inicial `1 / N` del elemento `data-count`. JavaScript calcula automáticamente los siguientes valores según la cantidad de fotos.

Ejemplo para una página de actividad:

```html
<button type="button" class="gallery-slide" hidden data-slide
        aria-label="Ampliar foto del grupo de folclore">
  <img src="../assets/folclore-06.jpeg"
       alt="Grupo de folclore durante un encuentro"
       loading="lazy" decoding="async">
</button>
```

El visor permite avanzar o retroceder, usar las flechas del teclado, deslizar en el celular y cerrar con Escape. Las fotos se muestran completas, manteniendo su proporción. No hay avance automático para que cada persona pueda mirar a su ritmo.

## Publicación y portfolio

Podés subir **todo el contenido** de esta carpeta a un alojamiento para sitios estáticos. `index.html` debe quedar en la raíz pública, junto a `assets`, `css` y `js`. Las rutas son relativas y permiten alojarlo también en un subdirectorio de un repositorio.

Para GitHub, creá tu repositorio y subí el contenido completo. Esta carpeta incluye `.gitignore` para excluir archivos temporales. No contiene credenciales ni dependencias del entorno de desarrollo original. Los teléfonos incluidos son los contactos públicos proporcionados para la web del centro.

Cuando se elija hosting y dominio, habrá que conectar el dominio y revisar los enlaces desde esa dirección. El ZIP funciona por sí mismo y no modifica automáticamente la versión alojada del prototipo.

Las fotos de maquillaje conservan los archivos originales. El atributo data-crop y js/main.js ajustan el encuadre visible para ocultar las franjas de las capturas, también en el visor ampliado.
