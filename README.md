# APICA — Am I me?

Sitio estático hecho con HTML, CSS y JavaScript. No necesita instalación ni compilación.

## Estructura

- `index.html`: estructura y secciones de la página.
- `styles.css`: colores, componentes, diseño adaptable y animaciones.
- `content.js`: proyectos, tecnologías, enlaces, galería y novedades de WHOAMI.
- `locales.js`: todos los textos en español, inglés y catalán.
- `script.js`: renderizado, interacciones, terminal y cambio de idioma.
- `assets/`: imágenes, logos, vídeo y otros recursos locales.

Abre `index.html` en el navegador o publica la carpeta completa en un hosting estático. Conserva juntos `index.html`, `content.js`, `locales.js` y `script.js`.

## Traducir la página

Edita `locales.js`. Cada idioma (`es`, `en`, `ca`) contiene las mismas claves; cambia solo el texto entre comillas y conserva las claves. Por ejemplo, `"musicTitle"` debe existir en los tres idiomas.

Los textos de las secciones dinámicas también se traducen ahí. Las descripciones de herramientas se asocian por identificador (`luau`, `html`, `css`, `javascript`, `godot`) para que reordenar las tarjetas no mezcle las traducciones.

Las entradas del diario también están en `journalEntries` dentro de cada idioma, para que la página no mezcle idiomas al cambiar la selección.

Para añadir una frase nueva, crea la misma clave en los tres idiomas y úsala desde `script.js`. El contenido fijo del HTML usa atributos como `data-i18n="aboutTitle"`.

Para añadir otro idioma, duplica el bloque de un idioma en `locales.js`, traduce sus valores y añade una opción con el mismo código en el menú de idiomas de `index.html`.

## Actualizar contenido y diseño

- Para cambiar imágenes, enlaces, herramientas o la galería, edita `content.js`.
- Para modificar la estructura de una sección, edita `index.html`.
- Para colores y tipografías, empieza por `:root` en `styles.css`; las secciones están agrupadas y los ajustes móviles aparecen en los bloques `@media`.
- Las imágenes se sirven desde `assets/`, así que publica esa carpeta junto con la página.
