# Ejemplos de Uso del API

## 1. Crear un Usuario

```bash
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "developer",
  "department": "Backend"
}
```

## 2. Listar Usuarios con Filtros

```bash
# Todos los usuarios activos
GET http://localhost:3000/api/users?isActive=true&page=1&limit=10

# Buscar por texto
GET http://localhost:3000/api/users?search=juan&sortBy=name&sortOrder=asc

# Filtrar por rol
GET http://localhost:3000/api/users?role=developer
```

## 3. Crear un Proyecto

```bash
POST http://localhost:3000/api/projects
Content-Type: application/json

{
  "name": "Sistema de E-commerce",
  "description": "Desarrollo de plataforma de ventas online",
  "owner": "USER_ID_AQUI",
  "status": "planning",
  "startDate": "2024-01-15",
  "endDate": "2024-06-30",
  "budget": 100000,
  "client": "TechCorp S.A."
}
```

## 4. Agregar Miembro al Equipo

```bash
POST http://localhost:3000/api/projects/PROJECT_ID/members
Content-Type: application/json

{
  "userId": "USER_ID_AQUI",
  "role": "developer"
}
```

## 5. Crear una Tarea

```bash
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
  "title": "Implementar autenticación de usuarios",
  "description": "Desarrollar sistema de login con JWT",
  "project": "PROJECT_ID_AQUI",
  "assignedTo": "USER_ID_AQUI",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-02-15",
  "estimatedHours": 20,
  "tags": ["backend", "security", "authentication"]
}
```

## 6. Listar Tareas con Filtros Avanzados

```bash
# Tareas de alta prioridad en progreso
GET http://localhost:3000/api/tasks?priority=high&status=in-progress

# Tareas vencidas
GET http://localhost:3000/api/tasks?overdue=true

# Tareas de un proyecto específico
GET http://localhost:3000/api/tasks/project/PROJECT_ID

# Búsqueda por texto
GET http://localhost:3000/api/tasks?search=autenticación

# Filtrar por tags
GET http://localhost:3000/api/tasks?tags=backend,security

# Ordenar por fecha de vencimiento
GET http://localhost:3000/api/tasks?sortBy=dueDate&sortOrder=asc

# Filtros combinados con paginación
GET http://localhost:3000/api/tasks?project=PROJECT_ID&status=todo&priority=critical&page=1&limit=20
```

## 7. Actualizar Tarea

```bash
PUT http://localhost:3000/api/tasks/TASK_ID
Content-Type: application/json

{
  "status": "in-progress",
  "actualHours": 5
}
```

## 8. Agregar Attachment a Tarea

```bash
POST http://localhost:3000/api/tasks/TASK_ID/attachments
Content-Type: application/json

{
  "filename": "diagrama-arquitectura.pdf",
  "url": "https://storage.example.com/files/diagrama.pdf"
}
```

## 9. Listar Proyectos con Búsqueda

```bash
# Buscar proyectos activos
GET http://localhost:3000/api/projects?status=active

# Buscar por texto en nombre, descripción o cliente
GET http://localhost:3000/api/projects?search=ecommerce

# Filtrar por rango de presupuesto
GET http://localhost:3000/api/projects?minBudget=50000&maxBudget=150000

# Filtrar por fecha de inicio
GET http://localhost:3000/api/projects?startDateFrom=2024-01-01&startDateTo=2024-12-31
```

## 10. Actualizar Proyecto

```bash
PUT http://localhost:3000/api/projects/PROJECT_ID
Content-Type: application/json

{
  "status": "active",
  "budget": 120000
}
```

## 11. Eliminar (Soft Delete)

```bash
# Eliminar usuario (desactivar)
DELETE http://localhost:3000/api/users/USER_ID

# Eliminar proyecto
DELETE http://localhost:3000/api/projects/PROJECT_ID

# Eliminar tarea
DELETE http://localhost:3000/api/tasks/TASK_ID
```

## Respuestas de Ejemplo

### Éxito (201 Created)
```json
{
  "success": true,
  "data": {
    "_id": "65abc123def456789",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "developer",
    "isActive": true,
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

### Lista con Paginación (200 OK)
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

### Error de Validación (400 Bad Request)
```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    "El nombre es requerido",
    "Por favor ingrese un email válido"
  ]
}
```

### No Encontrado (404 Not Found)
```json
{
  "success": false,
  "error": "Usuario no encontrado"
}
```
