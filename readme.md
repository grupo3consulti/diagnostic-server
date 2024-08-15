# Diagnostic Server API

## Descripción
Este proyecto es una API para el diagnóstico médico utilizando OpenAI.

## Requisitos
- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- PostgreSQL (o cualquier base de datos compatible con Sequelize)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/grupo3consulti/diagnostic-server.git
    cd diagnostic-server
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración del Entorno

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:
    ```dotenv
   OPENAI_API_KEY=tu_api_key_de_openai
   DB_HOST=
   DB_PASSWORD=
   DB_USERNAME=
   ILLNESSES_TASK_SCHEDULE= '0 0 * * *'
   GOOGLE_MAP_API_KEY=
```

2. Asegúrate de que el archivo `.env` esté incluido en el archivo `.gitignore` para evitar subirlo al repositorio.

## Configuración de la Base de Datos

1. Asegúrate de que tu base de datos esté corriendo y accesible.
2. Configura la URL de la base de datos en el archivo `.env`.

## Ejecución de la API

1. Inicia el servidor en modo de desarrollo:
    ```bash
    npm run dev
    ```

3. La API estará corriendo en `http://localhost:3000`.

## Endpoints

### Swagger Ui

1. Accede a la documentación de la API en [Swagger Api](http://localhost:3000/api-docs).
- `GET /api-docs`: Documentación de la API.

## Contribuciones

1. Crea una nueva rama para tu feature o fix:
    ```bash
    git checkout -b feature/nueva-feature
    ```

2. Realiza tus cambios y haz commit:
    ```bash
    git commit -m "Descripción de los cambios"
    ```

3. Sube tu rama:
    ```bash
    git push origin feature/nueva-feature
    ```

4. Crea un Pull Request en GitHub.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.
