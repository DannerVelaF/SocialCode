# SocialCode

**SocialCode** es una aplicación inspirada en X, diseñada para practicar habilidades de frontend con **React** e **Inertia**, y backend con **Laravel**. Permite a los usuarios crear publicaciones, comentar, dar "me gusta", crear y editar perfiles, y chatear entre sí.

## Funcionalidades

- Crear publicaciones.
- Comentar en publicaciones.
- Dar "me gusta" a publicaciones.
- Crear y editar perfiles de usuario.
- Chatear con otros usuarios.

## Tecnologías

- **Frontend**: React, Inertia.
- **Backend**: Laravel.
- **Base de datos**: MySQL.
- **Estilos**: TailwindCSS.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DannerVelaF/SocialCode.git
   cd SocialCode
    ```

2. Instala las dependencias:

* Frontend
```bash
npm install
```

* Backend
```bash
composer install
```

* Reverb
```bash
php artisan install:broadcasting
composer require laravel/reverb
php artisan reverb:install
```

3. Copiar el archivo .env y generar la clave de la aplicación:
```bash
cp .env.example .env
php artisan key:generate
```

4. Crear un enlace simbólico al directorio de almacenamiento para acceder a las imágenes:
```bash
php artisan storage:link
```

5. Inicializar los servidores
```bash
php artisan serve
npm run dev
php artisan reverb:start
php artisan queue:listen
```


![image](https://github.com/user-attachments/assets/cbe1db46-6c34-4969-8179-423ae9e0babe)

![image](https://github.com/user-attachments/assets/269802f1-8e34-4491-b2cc-e6455e7e4801)
