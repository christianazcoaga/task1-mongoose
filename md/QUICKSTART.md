# 🚀 Guía de Inicio Rápido

## Paso 1: Configurar MongoDB Atlas

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza el valor de `MONGODB_URI` con tu connection string de MongoDB Atlas

Ejemplo:
```
MONGODB_URI=mongodb+srv://tuusuario:tupassword@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

📖 **Más detalles**: Ver archivo `MONGODB_SETUP.md`

## Paso 2: Instalar Dependencias (Ya hecho)

Las dependencias ya están instaladas. Si necesitas reinstalar:
```powershell
npm install
```

## Paso 3: Poblar la Base de Datos

Para crear datos de ejemplo (usuarios, proyectos y tareas):
```powershell
npm run seed
```

Esto creará:
- ✅ 5 usuarios de ejemplo
- ✅ 3 proyectos de ejemplo
- ✅ 10 tareas de ejemplo

## Paso 4: Iniciar el Servidor

```powershell
npm start
```

El servidor se iniciará en: `http://localhost:3000`

Para desarrollo con auto-reload:
```powershell
npm run dev
```

## Paso 5: Probar el API

### Opción A: Usando el navegador

Abre en tu navegador:
```
http://localhost:3000
```

### Opción B: Usando cURL (PowerShell)

```powershell
# Ver info del API
curl http://localhost:3000

# Listar usuarios
curl http://localhost:3000/api/users

# Listar proyectos
curl http://localhost:3000/api/projects

# Listar tareas
curl http://localhost:3000/api/tasks
```

### Opción C: Usando Postman o Thunder Client

Importa estas URLs:
- GET `http://localhost:3000/api/users`
- GET `http://localhost:3000/api/projects`
- GET `http://localhost:3000/api/tasks`

## 🎯 Ejemplos Rápidos de Uso

### Crear un Usuario
```powershell
curl -X POST http://localhost:3000/api/users `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"role\":\"developer\"}'
```

### Listar Tareas con Filtros
```powershell
# Tareas de alta prioridad
curl "http://localhost:3000/api/tasks?priority=high"

# Tareas vencidas
curl "http://localhost:3000/api/tasks?overdue=true"

# Buscar por texto
curl "http://localhost:3000/api/tasks?search=autenticacion"
```

### Ver Tarea por ID
```powershell
curl http://localhost:3000/api/tasks/ID_DE_TAREA_AQUI
```

## 📚 Documentación Completa

- **README.md** - Información general y endpoints
- **EXAMPLES.md** - Ejemplos básicos de uso
- **ADVANCED_EXAMPLES.md** - Consultas avanzadas y filtros
- **MONGODB_SETUP.md** - Configuración de MongoDB Atlas
- **CHECKLIST.md** - Lista de todas las funcionalidades

## 🔍 Verificar que Todo Funciona

Si ves este mensaje al iniciar, ¡todo está listo! ✅

```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: taskmanagement
🚀 Servidor corriendo en puerto 3000
📍 URL: http://localhost:3000
```

## 🛠️ Troubleshooting Rápido

### Error de conexión a MongoDB
- ✅ Verifica que tu connection string sea correcto en `.env`
- ✅ Asegúrate de que tu IP esté permitida en MongoDB Atlas (Network Access)

### Error "Cannot find module"
```powershell
npm install
```

### Puerto 3000 en uso
Cambia el puerto en `.env`:
```
PORT=8080
```

## 📊 Estructura de Respuestas del API

### Respuesta Exitosa
```json
{
  "success": true,
  "data": { ... }
}
```

### Respuesta con Lista
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "error": "Mensaje de error",
  "details": "Información adicional"
}
```

## 🎉 ¡Listo para Usar!

El sistema está completamente funcional con:
- ✅ CRUD completo para Users, Projects y Tasks
- ✅ Búsqueda de texto completo
- ✅ Filtrado por múltiples criterios
- ✅ Paginación y ordenamiento
- ✅ Populate de referencias
- ✅ Validaciones robustas
- ✅ Manejo de errores completo
- ✅ Soft delete
- ✅ Timestamps automáticos

## 📞 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Listar usuarios |
| POST | `/api/users` | Crear usuario |
| GET | `/api/users/:id` | Ver usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |
| GET | `/api/projects` | Listar proyectos |
| POST | `/api/projects` | Crear proyecto |
| GET | `/api/projects/:id` | Ver proyecto |
| GET | `/api/tasks` | Listar tareas |
| POST | `/api/tasks` | Crear tarea |
| GET | `/api/tasks/:id` | Ver tarea |

Ver `README.md` para la lista completa de endpoints.
