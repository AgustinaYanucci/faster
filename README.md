# Faster · carta web (HTML + CSS + JS + Bootstrap 5.3)

Abrí `index.html` en el navegador (necesita internet para Bootstrap y las tipografías, que se cargan por CDN).

- `index.html`     estructura (navbar, portada, panel de pedido con Offcanvas, aviso con Toast)
- `css/styles.css` paleta del logo, tipografías y ajustes sobre Bootstrap
- `js/scenes.js`   escenas animadas del fondo (lomito, milanesa, hamburguesa, papas) y el video de la pizza
- `js/main.js`     datos de la carta, carrito y envío por WhatsApp
- `img/logo.png`   logo con fondo transparente (`logo-original.png` es el original)
- `video/pizza-cheese.mp4` video de la pizza

Para cambiar productos, precios o ingredientes: editá `MENU` y `PROMOS` al principio de `js/main.js`.
Para que el pedido llegue al local: poné el número en `WA_NUMBER` (ej. `'5493851234567'`).
