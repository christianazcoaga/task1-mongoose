# Configuración de MongoDB Atlas

## Pasos para configurar tu Connection String

### 1. Obtener el Connection String de MongoDB Atlas

1. Inicia sesión en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Selecciona tu cluster
3. Haz clic en el botón **"Connect"**
4. Selecciona **"Connect your application"**
5. Copia el connection string que aparece

### 2. Formato del Connection String

El connection string tendrá este formato:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

### 3. Reemplazar en el archivo .env

Abre el archivo `.env` y reemplaza el valor de `MONGODB_URI`:

```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

**Importante:**
- Reemplaza `<username>` con tu usuario de MongoDB
- Reemplaza `<password>` con tu contraseña
- Reemplaza `<cluster>` con el nombre de tu cluster
- Puedes cambiar `taskmanagement` por el nombre de base de datos que prefieras

### 4. Configurar acceso de red

En MongoDB Atlas:
1. Ve a **Network Access** en el menú lateral
2. Haz clic en **"Add IP Address"**
3. Puedes:
   - Agregar tu IP actual
   - O seleccionar **"Allow access from anywhere"** (0.0.0.0/0) para desarrollo

### 5. Verificar la conexión

Ejecuta el servidor para verificar que la conexión funciona:

```bash
npm start
```

Si todo está configurado correctamente, deberías ver:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: taskmanagement
🚀 Servidor corriendo en puerto 3000
```

## Poblar la Base de Datos con Datos de Prueba

Una vez que la conexión esté funcionando, puedes poblar la base de datos:

```bash
npm run seed
```

Esto creará:
- 5 usuarios de ejemplo
- 3 proyectos de ejemplo
- 10 tareas de ejemplo

## Troubleshooting

### Error: "MongoServerError: bad auth"
- Verifica que el usuario y contraseña sean correctos
- Asegúrate de no tener caracteres especiales sin codificar en la contraseña

### Error: "MongooseServerSelectionError"
- Verifica que tu IP esté en la lista de acceso de MongoDB Atlas
- Comprueba tu conexión a internet

### Error: "Authentication failed"
- Verifica que el usuario tenga permisos de lectura/escritura en la base de datos
- En Atlas: Database Access > Selecciona tu usuario > Verifica los permisos

## Colecciones Creadas

El sistema creará automáticamente estas colecciones:
- `users` - Información de usuarios
- `projects` - Proyectos con equipos
- `tasks` - Tareas asignadas a proyectos

## Índices Creados Automáticamente

El sistema crea índices para optimizar las búsquedas:

### Users
- Índice de texto en `name` y `email`
- Índice único en `email`

### Projects
- Índice de texto en `name`, `description` y `client`
- Índices en `owner`, `status`, `isDeleted`

### Tasks
- Índice de texto en `title`, `description` y `tags`
- Índices compuestos para queries frecuentes
