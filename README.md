# Sistema de Gestión de Tareas con Proyectos y Equipos

Sistema completo de gestión de proyectos y tareas con operaciones CRUD, filtrado, búsqueda y más.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Configurar tu connection string de MongoDB Atlas en `MONGODB_URI`

3. Ejecutar la aplicación:
```bash
npm start
# o para desarrollo con auto-reload
npm run dev
```

## Endpoints

### Users
- `POST /api/users` - Crear usuario
- `GET /api/users` - Listar usuarios (con paginación y filtros)
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Projects
- `POST /api/projects` - Crear proyecto
- `GET /api/projects` - Listar proyectos (con paginación, filtros y búsqueda)
- `GET /api/projects/:id` - Obtener proyecto por ID
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto
- `POST /api/projects/:id/members` - Agregar miembro al equipo
- `DELETE /api/projects/:id/members/:userId` - Remover miembro del equipo

### Tasks
- `POST /api/tasks` - Crear tarea
- `GET /api/tasks` - Listar tareas (con paginación, filtros y búsqueda)
- `GET /api/tasks/:id` - Obtener tarea por ID
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea
- `POST /api/tasks/:id/attachments` - Agregar attachment
- `GET /api/tasks/project/:projectId` - Obtener tareas por proyecto

## Ejemplos de Uso

### Crear un proyecto
```bash
POST /api/projects
{
  "name": "Nuevo Proyecto",
  "description": "Descripción del proyecto",
  "owner": "user_id_aqui",
  "status": "planning",
  "startDate": "2024-01-01",
  "budget": 50000
}
```

### Listar tareas con filtros
```bash
GET /api/tasks?status=in-progress&priority=high&page=1&limit=10&sortBy=dueDate&sortOrder=asc
```

### Buscar proyectos
```bash
GET /api/projects?search=frontend&status=active
```
