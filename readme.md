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

1. Accede a la documentación de la API en `http://localhost:3000/api-docs`.
- `GET /api-docs`: Documentación de la API.

### Usuarios

- `POST /usuarios`: Crea un nuevo usuario.
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com",
      "password": "password123"
    }
    ```

- `GET /usuarios`: Obtiene una lista de usuarios.

- `GET /usuarios/:id`: Obtiene la información de un usuario específico por ID.

- `GET /usuarios/search`: Busca usuarios por parámetros.

- `PUT /usuarios/:id`: Actualiza la información de un usuario específico por ID.
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com"
    }
    ```

- `DELETE /usuarios/:id`: Elimina un usuario específico por ID.

- `POST /usuarios/login`: Inicia sesión de un usuario.
    ```json
    {
      "email": "juan.perez@example.com",
      "password": "password123"
    }
    ```

### Síntomas

- `POST /sintomas`: Crea un nuevo síntoma.
    ```json
    {
      "nombre": "Fiebre",
      "descripcion": "Aumento de la temperatura corporal"
    }
    ```

- `GET /sintomas`: Obtiene una lista de síntomas.

- `GET /sintomas/:id`: Obtiene la información de un síntoma específico por ID.

- `GET /sintomas/search`: Busca síntomas por parámetros.

- `PUT /sintomas/:id`: Actualiza la información de un síntoma específico por ID.
    ```json
    {
      "nombre": "Fiebre",
      "descripcion": "Aumento de la temperatura corporal"
    }
    ```

- `DELETE /sintomas/:id`: Elimina un síntoma específico por ID.

### Consulta de Síntomas

- `POST /consultaSintomas`: Crea una nueva consulta de síntomas.
    ```json
    {
      "usuarioId": 1,
      "sintomas": ["Fiebre", "Tos"]
    }
    ```

- `GET /consultaSintomas`: Obtiene una lista de consultas de síntomas.

- `GET /consultaSintomas/:id`: Obtiene la información de una consulta de síntomas específica por ID.

- `GET /consultaSintomas/search`: Busca consultas de síntomas por parámetros.

- `PUT /consultaSintomas/:id`: Actualiza la información de una consulta de síntomas específica por ID.
    ```json
    {
      "usuarioId": 1,
      "sintomas": ["Fiebre", "Tos"]
    }
    ```

- `DELETE /consultaSintomas/:id`: Elimina una consulta de síntomas específica por ID.

### Instituciones Médicas

- `POST /institucionesMedicas`: Crea una nueva institución médica.
    ```json
    {
      "nombre": "Hospital General",
      "direccion": "Calle Falsa 123"
    }
    ```

- `GET /institucionesMedicas`: Obtiene una lista de instituciones médicas.

- `GET /institucionesMedicas/:id`: Obtiene la información de una institución médica específica por ID.

- `GET /institucionesMedicas/search`: Busca instituciones médicas por parámetros.

- `PUT /institucionesMedicas/:id`: Actualiza la información de una institución médica específica por ID.
    ```json
    {
      "nombre": "Hospital General",
      "direccion": "Calle Falsa 123"
    }
    ```

- `DELETE /institucionesMedicas/:id`: Elimina una institución médica específica por ID.

### Médicos

- `POST /medicos`: Crea un nuevo médico.
    ```json
    {
      "nombre": "Dr. Ana Gómez",
      "especialidad": "Cardiología"
    }
    ```

- `GET /medicos`: Obtiene una lista de médicos.

- `GET /medicos/:id`: Obtiene la información de un médico específico por ID.

- `GET /medicos/search`: Busca médicos por parámetros.

- `PUT /medicos/:id`: Actualiza la información de un médico específico por ID.
    ```json
    {
      "nombre": "Dr. Ana Gómez",
      "especialidad": "Cardiología"
    }
    ```

- `DELETE /medicos/:id`: Elimina un médico específico por ID.

### Citas

- `POST /citas`: Crea una nueva cita.
    ```json
    {
      "usuarioId": 1,
      "medicoId": 2,
      "fecha": "2023-10-01T10:00:00Z"
    }
    ```

- `GET /citas`: Obtiene una lista de citas.

- `GET /citas/:id`: Obtiene la información de una cita específica por ID.

- `GET /citas/search`: Busca citas por parámetros.

- `PUT /citas/:id`: Actualiza la información de una cita específica por ID.
    ```json
    {
      "usuarioId": 1,
      "medicoId": 2,
      "fecha": "2023-10-01T10:00:00Z"
    }
    ```

- `DELETE /citas/:id`: Elimina una cita específica por ID.

### Consultas Auditorias

- `POST /consultasAuditorias`: Crea una nueva consulta auditoria.
    ```json
    {
      "consultaId": 1,
      "usuarioId": 2,
      "accion": "CREAR"
    }
    ```

- `GET /consultasAuditorias`: Obtiene una lista de consultas auditorias.

- `GET /consultasAuditorias/:id`: Obtiene la información de una consulta auditoria específica por ID.

- `GET /consultasAuditorias/search`: Busca consultas auditorias por parámetros.

- `PUT /consultasAuditorias/:id`: Actualiza la información de una consulta auditoria específica por ID.
    ```json
    {
      "consultaId": 1,
      "usuarioId": 2,
      "accion": "ACTUALIZAR"
    }
    ```

### Consultas

- `POST /consultas`: Crea una nueva consulta.
    ```json
    {
      "usuarioId": 1,
      "medicoId": 2,
      "sintomas": ["Fiebre", "Tos"]
    }
    ```

- `GET /consultas`: Obtiene una lista de consultas.

- `GET /consultas/:id`: Obtiene la información de una consulta específica por ID.

- `GET /consultas/search`: Busca consultas por parámetros.

- `PUT /consultas/:id`: Actualiza la información de una consulta específica por ID.
    ```json
    {
      "usuarioId": 1,
      "medicoId": 2,
      "sintomas": ["Fiebre", "Tos"]
    }
    ```

- `DELETE /consultas/:id`: Elimina una consulta específica por ID.

### Parámetros Cabecera

- `POST /parametrosCab`: Crea un nuevo parámetro cabecera.
    ```json
    {
      "nombre": "Tipo de Sangre",
      "descripcion": "Tipos de sangre disponibles"
    }
    ```

- `GET /parametrosCab`: Obtiene una lista de parámetros cabecera.

- `GET /parametrosCab/:id`: Obtiene la información de un parámetro cabecera específico por ID.

- `PUT /parametrosCab/:id`: Actualiza la información de un parámetro cabecera específico por ID.
    ```json
    {
      "nombre": "Tipo de Sangre",
      "descripcion": "Tipos de sangre disponibles"
    }
    ```

- `DELETE /parametrosCab/:id`: Elimina un parámetro cabecera específico por ID.

### Parámetros Detalle

- `POST /parametrosDet`: Crea un nuevo parámetro detalle.
    ```json
    {
      "parametroCabId": 1,
      "nombre": "O+",
      "descripcion": "Tipo de sangre O positivo"
    }
    ```

- `GET /parametrosDet`: Obtiene una lista de parámetros detalle.

- `GET /parametrosDet/:id`: Obtiene la información de un parámetro detalle específico por ID.

- `GET /parametrosDet/cab/:parametro_cab_id`: Obtiene los parámetros detalle por ID de cabecera.

- `PUT /parametrosDet/:id`: Actualiza la información de un parámetro detalle específico por ID.
    ```json
    {
      "parametroCabId": 1,
      "nombre": "O+",
      "descripcion": "Tipo de sangre O positivo"
    }
    ```

- `DELETE /parametrosDet/:id`: Elimina un parámetro detalle específico por ID.

### Prediagnóstico

- `POST /prediagnostico`: Genera un prediagnóstico.
    ```json
    {
      "usuarioId": 1,
      "sintomas": ["Fiebre", "Tos"]
    }
    ```

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