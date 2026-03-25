# Puerta Caribe

Plataforma web estatica para promocion turistica de Barranquilla y el Atlantico.

## Que incluye
- Catalogo de atractivos con filtros por categoria y busqueda.
- Agenda cultural con vista mensual/anual, filtro por fecha y ubicacion.
- Servicios turisticos: canales de atencion, hoteles y agencias.
- Formulario de contacto funcional (almacenamiento local).
- Registro, login, recuperacion de contrasena y cierre de sesion.
- Roles: `Usuario`, `Empleado`, `Admin`, `Dueño`.
- Acceso administrativo separado en `admin-login.html` y `admin-dashboard.html`.

## Estructura principal
- `index.html`, `landing.html`: inicio y entrada.
- `descubre.html`: atractivos turisticos.
- `agenda.html`: agenda cultural.
- `servicios.html`: hoteles, agencias y contacto.
- `perfil.html`, `mi-cuenta.html`, `recuperar-contrasena.html`: autenticacion y cuenta.
- `admin-login.html`, `admin-dashboard.html`: acceso de funcionarios.
- `js/script.js`: logica principal (datos locales, auth, filtros, agenda, formularios).
- `css/style.css`: estilos globales.

## Datos locales (localStorage)
La app trabaja con datos locales para demo:
- Catalogos: atractivos, hoteles, agencias, eventos y canales de atencion.
- Usuarios semilla por rol.
- Solicitudes de contacto y flujo de recuperacion de contrasena.

Se agrego una limpieza de testing que elimina cuentas basura y residuos de pruebas, conservando los usuarios base por rol y los datos semilla del proyecto.

## Como usar
1. Abre `landing.html` o `index.html` en el navegador.
2. Navega por las secciones publicas.
3. Usa `perfil.html` para login/registro de usuario final.
4. Usa `admin-login.html` para acceso de funcionarios.

## Alcance del sprint validado
Implementado y validado:
- HU-15.02, HU-15.03
- HU-16.02, HU-16.03, HU-16.04
- HU-17.01, HU-17.02
- HU-18.01, HU-18.04, HU-18.05
- HU-19.01, HU-19.02

Se omitio intencionalmente:
- HU-27.01 y HU-27.02 (correo)
- HU-27.04 (ultima HU solicitada para omitir)
