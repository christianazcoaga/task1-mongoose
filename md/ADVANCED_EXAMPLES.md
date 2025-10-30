# Ejemplos de Consultas Avanzadas

Este archivo contiene ejemplos de las operaciones CRUDL con todas las funcionalidades implementadas.

## 1. CREATE - Operaciones de Creación

### Crear Usuario
```javascript
POST /api/users
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "developer",
  "department": "Backend"
}
```

### Crear Proyecto con Team Members
```javascript
POST /api/projects
{
  "name": "Sistema de Inventario",
  "description": "Sistema para gestión de stock y almacenes",
  "owner": "65abc123...",
  "teamMembers": [
    {
      "user": "65abc456...",
      "role": "developer"
    },
    {
      "user": "65abc789...",
      "role": "designer"
    }
  ],
  "status": "planning",
  "startDate": "2024-02-01",
  "endDate": "2024-07-31",
  "budget": 85000,
  "client": "Almacenes XYZ"
}
```

### Crear Tarea con Dependencias
```javascript
POST /api/tasks
{
  "title": "Implementar API REST",
  "description": "Desarrollar endpoints para CRUD de productos",
  "project": "65abc123...",
  "assignedTo": "65abc456...",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-03-15",
  "estimatedHours": 25,
  "tags": ["backend", "api", "rest"],
  "dependencies": ["65abc789..."]
}
```

## 2. READ - Operaciones de Lectura

### Obtener Usuario por ID con Populate
```javascript
GET /api/users/65abc123...
// Respuesta incluye usuario completo
```

### Obtener Proyecto con Team Members Populados
```javascript
GET /api/projects/65abc123...
// Respuesta:
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "name": "Sistema de Inventario",
    "owner": {
      "_id": "65abc456...",
      "name": "María García",
      "email": "maria@example.com",
      "role": "manager"
    },
    "teamMembers": [
      {
        "user": {
          "_id": "65abc789...",
          "name": "Carlos López",
          "email": "carlos@example.com"
        },
        "role": "developer"
      }
    ],
    "status": "active",
    // ... otros campos
  }
}
```

### Obtener Tarea con Referencias Populadas
```javascript
GET /api/tasks/65abc123...
// Incluye: project, assignedTo, dependencies
```

## 3. UPDATE - Operaciones de Actualización

### Actualización Parcial de Usuario
```javascript
PUT /api/users/65abc123...
{
  "department": "Frontend",
  "role": "manager"
}
// Solo actualiza los campos enviados
```

### Actualizar Estado de Proyecto
```javascript
PUT /api/projects/65abc123...
{
  "status": "active",
  "startDate": "2024-02-15"
}
```

### Actualizar Tarea y Registrar Horas
```javascript
PUT /api/tasks/65abc123...
{
  "status": "completed",
  "actualHours": 28
}
```

## 4. DELETE - Operaciones de Eliminación (Soft Delete)

### Desactivar Usuario
```javascript
DELETE /api/users/65abc123...
// Cambia isActive a false
```

### Eliminar Proyecto
```javascript
DELETE /api/projects/65abc123...
// Cambia isDeleted a true
```

### Eliminar Tarea
```javascript
DELETE /api/tasks/65abc123...
// Cambia isDeleted a true
```

## 5. LIST - Operaciones de Listado con Filtros

### Listar Usuarios con Paginación
```javascript
GET /api/users?page=1&limit=10&sortBy=name&sortOrder=asc
```

### Búsqueda de Texto Completo en Usuarios
```javascript
GET /api/users?search=juan developer
// Busca en name y email
```

### Filtrar Usuarios por Rol y Estado
```javascript
GET /api/users?role=developer&isActive=true
```

### Listar Proyectos Activos
```javascript
GET /api/projects?status=active&page=1&limit=20
```

### Búsqueda de Proyectos por Texto
```javascript
GET /api/projects?search=inventario
// Busca en name, description y client
```

### Filtrar Proyectos por Rango de Presupuesto
```javascript
GET /api/projects?minBudget=50000&maxBudget=100000
```

### Filtrar Proyectos por Fecha
```javascript
GET /api/projects?startDateFrom=2024-01-01&startDateTo=2024-06-30
```

### Filtrar Proyectos por Owner
```javascript
GET /api/projects?owner=65abc123...
```

### Listar Tareas por Estado y Prioridad
```javascript
GET /api/tasks?status=in-progress&priority=high
```

### Tareas Vencidas
```javascript
GET /api/tasks?overdue=true
// Retorna tareas con dueDate < hoy y status != completed
```

### Búsqueda de Texto en Tareas
```javascript
GET /api/tasks?search=autenticación jwt
// Busca en title, description y tags
```

### Filtrar Tareas por Tags
```javascript
GET /api/tasks?tags=backend,security
// Tareas que contengan backend O security
```

### Filtrar Tareas por Rango de Fechas
```javascript
GET /api/tasks?dueDateFrom=2024-02-01&dueDateTo=2024-02-29
```

### Tareas Asignadas a un Usuario
```javascript
GET /api/tasks?assignedTo=65abc123...
```

### Tareas de un Proyecto Específico
```javascript
GET /api/tasks/project/65abc123...
// También acepta filtros adicionales:
GET /api/tasks/project/65abc123...?status=todo&priority=critical
```

### Ordenamiento Personalizado
```javascript
// Por prioridad descendente
GET /api/tasks?sortBy=priority&sortOrder=desc

// Por fecha de vencimiento ascendente
GET /api/tasks?sortBy=dueDate&sortOrder=asc

// Por fecha de creación
GET /api/tasks?sortBy=createdAt&sortOrder=desc
```

## 6. Operaciones Especiales

### Agregar Miembro al Equipo del Proyecto
```javascript
POST /api/projects/65abc123.../members
{
  "userId": "65abc456...",
  "role": "tester"
}
```

### Remover Miembro del Equipo
```javascript
DELETE /api/projects/65abc123.../members/65abc456...
```

### Agregar Attachment a Tarea
```javascript
POST /api/tasks/65abc123.../attachments
{
  "filename": "especificaciones.pdf",
  "url": "https://storage.example.com/files/specs.pdf"
}
```

## 7. Consultas Combinadas Complejas

### Proyectos activos de un owner específico con presupuesto alto
```javascript
GET /api/projects?owner=65abc123...&status=active&minBudget=75000&sortBy=budget&sortOrder=desc
```

### Tareas críticas vencidas de un proyecto
```javascript
GET /api/tasks?project=65abc123...&priority=critical&overdue=true
```

### Búsqueda con filtros múltiples y paginación
```javascript
GET /api/tasks?search=api&status=in-progress&priority=high&page=1&limit=10&sortBy=dueDate&sortOrder=asc
```

### Todas las tareas de un proyecto ordenadas por prioridad
```javascript
GET /api/tasks/project/65abc123...?sortBy=priority&sortOrder=desc
```

## 8. Ejemplos de Respuestas

### Lista con Paginación
```json
{
  "success": true,
  "data": [
    {
      "_id": "65abc123...",
      "title": "Implementar autenticación",
      "status": "in-progress",
      "priority": "high",
      "project": {
        "_id": "65def456...",
        "name": "E-commerce",
        "status": "active"
      },
      "assignedTo": {
        "_id": "65ghi789...",
        "name": "Carlos López",
        "email": "carlos@example.com"
      },
      "dueDate": "2024-03-15T00:00:00.000Z",
      "estimatedHours": 20,
      "actualHours": 10,
      "tags": ["backend", "security"],
      "isOverdue": false,
      "hoursDifference": -10,
      "createdAt": "2024-02-01T10:00:00.000Z",
      "updatedAt": "2024-02-10T15:30:00.000Z"
    }
    // ... más tareas
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### Tarea con Virtuals
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "title": "Implementar autenticación",
    "estimatedHours": 20,
    "actualHours": 25,
    "dueDate": "2024-02-10T00:00:00.000Z",
    "status": "completed",
    // Virtuals calculados:
    "isOverdue": false,  // completada antes de vencer
    "hoursDifference": 5 // 5 horas más de lo estimado
  }
}
```

## 9. Validaciones Implementadas

### Validación de Campos Requeridos
```javascript
POST /api/tasks
{
  "title": "Nueva tarea"
  // Falta "project" requerido
}
// Error 400: "Campos requeridos faltantes: project"
```

### Validación de Enums
```javascript
PUT /api/tasks/65abc123...
{
  "status": "invalid-status"
}
// Error 400: "status debe ser uno de: todo, in-progress, review, completed"
```

### Validación de Fechas
```javascript
POST /api/projects
{
  "startDate": "2024-06-01",
  "endDate": "2024-01-01"
}
// Error 400: "endDate no puede ser anterior a startDate"
```

### Validación de ObjectId
```javascript
GET /api/tasks/invalid-id
// Error 400: "id inválido"
```

### Validación de Números Positivos
```javascript
PUT /api/tasks/65abc123...
{
  "estimatedHours": -10
}
// Error 400: "estimatedHours debe ser un número positivo"
```

## 10. Manejo de Errores

### Recurso No Encontrado
```json
{
  "success": false,
  "error": "Tarea no encontrada"
}
```

### Error de Validación
```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    "El título de la tarea es requerido",
    "Por favor ingrese un email válido"
  ]
}
```

### Error de Duplicado
```json
{
  "success": false,
  "error": "Registro duplicado",
  "details": "Ya existe un registro con ese email"
}
```
