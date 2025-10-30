// Script para poblar la base de datos con datos de prueba

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

dotenv.config();

const users = [
  {
    name: 'María García',
    email: 'maria@example.com',
    role: 'manager',
    department: 'Management'
  },
  {
    name: 'Carlos López',
    email: 'carlos@example.com',
    role: 'developer',
    department: 'Backend'
  },
  {
    name: 'Ana Martínez',
    email: 'ana@example.com',
    role: 'designer',
    department: 'UI/UX'
  },
  {
    name: 'Pedro Sánchez',
    email: 'pedro@example.com',
    role: 'tester',
    department: 'QA'
  },
  {
    name: 'Laura Rodríguez',
    email: 'laura@example.com',
    role: 'developer',
    department: 'Frontend'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones
    console.log('\n🗑️  Limpiando colecciones...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('✅ Colecciones limpiadas');

    // Crear usuarios
    console.log('\n👥 Creando usuarios...');
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} usuarios creados`);

    // Crear proyectos
    console.log('\n📁 Creando proyectos...');
    const projects = [
      {
        name: 'Sistema de E-commerce',
        description: 'Plataforma de ventas online con carrito de compras y pagos',
        owner: createdUsers[0]._id,
        teamMembers: [
          { user: createdUsers[1]._id, role: 'developer' },
          { user: createdUsers[2]._id, role: 'designer' },
          { user: createdUsers[3]._id, role: 'tester' }
        ],
        status: 'active',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-30'),
        budget: 100000,
        client: 'TechCorp S.A.'
      },
      {
        name: 'App Móvil Fitness',
        description: 'Aplicación para seguimiento de ejercicios y nutrición',
        owner: createdUsers[0]._id,
        teamMembers: [
          { user: createdUsers[4]._id, role: 'developer' },
          { user: createdUsers[2]._id, role: 'designer' }
        ],
        status: 'planning',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-08-31'),
        budget: 75000,
        client: 'FitLife Inc.'
      },
      {
        name: 'Dashboard Analítico',
        description: 'Panel de control con visualización de datos y reportes',
        owner: createdUsers[0]._id,
        teamMembers: [
          { user: createdUsers[1]._id, role: 'developer' },
          { user: createdUsers[4]._id, role: 'developer' }
        ],
        status: 'on-hold',
        startDate: new Date('2024-02-01'),
        budget: 50000,
        client: 'DataViz Corp'
      }
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`✅ ${createdProjects.length} proyectos creados`);

    // Crear tareas
    console.log('\n✅ Creando tareas...');
    const tasks = [
      // Tareas para E-commerce
      {
        title: 'Implementar autenticación de usuarios',
        description: 'Sistema de login y registro con JWT',
        project: createdProjects[0]._id,
        assignedTo: createdUsers[1]._id,
        status: 'completed',
        priority: 'high',
        dueDate: new Date('2024-02-15'),
        estimatedHours: 20,
        actualHours: 18,
        tags: ['backend', 'security', 'authentication']
      },
      {
        title: 'Diseñar carrito de compras',
        description: 'Mockups y flujo de usuario para el carrito',
        project: createdProjects[0]._id,
        assignedTo: createdUsers[2]._id,
        status: 'completed',
        priority: 'high',
        dueDate: new Date('2024-02-20'),
        estimatedHours: 16,
        actualHours: 20,
        tags: ['design', 'ui/ux']
      },
      {
        title: 'Desarrollar módulo de pagos',
        description: 'Integración con pasarela de pagos',
        project: createdProjects[0]._id,
        assignedTo: createdUsers[1]._id,
        status: 'in-progress',
        priority: 'critical',
        dueDate: new Date('2024-03-10'),
        estimatedHours: 30,
        actualHours: 15,
        tags: ['backend', 'payments', 'api']
      },
      {
        title: 'Testing de integración',
        description: 'Pruebas end-to-end del flujo de compra',
        project: createdProjects[0]._id,
        assignedTo: createdUsers[3]._id,
        status: 'todo',
        priority: 'high',
        dueDate: new Date('2024-03-20'),
        estimatedHours: 25,
        tags: ['testing', 'qa']
      },
      {
        title: 'Optimizar rendimiento',
        description: 'Mejorar tiempos de carga y queries',
        project: createdProjects[0]._id,
        assignedTo: createdUsers[1]._id,
        status: 'todo',
        priority: 'medium',
        dueDate: new Date('2024-04-05'),
        estimatedHours: 20,
        tags: ['performance', 'optimization']
      },
      // Tareas para App Móvil
      {
        title: 'Definir arquitectura de la app',
        description: 'Decisiones técnicas y estructura del proyecto',
        project: createdProjects[1]._id,
        assignedTo: createdUsers[4]._id,
        status: 'in-progress',
        priority: 'critical',
        dueDate: new Date('2024-03-10'),
        estimatedHours: 12,
        actualHours: 8,
        tags: ['architecture', 'planning']
      },
      {
        title: 'Crear sistema de diseño',
        description: 'Componentes y guía de estilo',
        project: createdProjects[1]._id,
        assignedTo: createdUsers[2]._id,
        status: 'review',
        priority: 'high',
        dueDate: new Date('2024-03-15'),
        estimatedHours: 24,
        actualHours: 26,
        tags: ['design', 'ui/ux', 'components']
      },
      {
        title: 'Implementar tracking de ejercicios',
        description: 'Módulo para registrar y visualizar rutinas',
        project: createdProjects[1]._id,
        assignedTo: createdUsers[4]._id,
        status: 'todo',
        priority: 'high',
        dueDate: new Date('2024-04-01'),
        estimatedHours: 35,
        tags: ['mobile', 'features']
      },
      // Tareas para Dashboard
      {
        title: 'Configurar conexión a base de datos',
        description: 'Setup de MongoDB y modelos de datos',
        project: createdProjects[2]._id,
        assignedTo: createdUsers[1]._id,
        status: 'completed',
        priority: 'critical',
        dueDate: new Date('2024-02-10'),
        estimatedHours: 8,
        actualHours: 6,
        tags: ['backend', 'database']
      },
      {
        title: 'Crear gráficos interactivos',
        description: 'Implementar visualizaciones con Chart.js',
        project: createdProjects[2]._id,
        assignedTo: createdUsers[4]._id,
        status: 'todo',
        priority: 'medium',
        dueDate: new Date('2024-03-25'),
        estimatedHours: 28,
        tags: ['frontend', 'charts', 'visualization']
      }
    ];

    const createdTasks = await Task.insertMany(tasks);
    console.log(`✅ ${createdTasks.length} tareas creadas`);

    // Agregar dependencias a algunas tareas
    console.log('\n🔗 Agregando dependencias entre tareas...');
    await Task.findByIdAndUpdate(createdTasks[2]._id, {
      dependencies: [createdTasks[0]._id]
    });
    await Task.findByIdAndUpdate(createdTasks[3]._id, {
      dependencies: [createdTasks[2]._id]
    });
    console.log('✅ Dependencias agregadas');

    // Resumen
    console.log('\n📊 RESUMEN DE DATOS CREADOS:');
    console.log(`   Usuarios: ${createdUsers.length}`);
    console.log(`   Proyectos: ${createdProjects.length}`);
    console.log(`   Tareas: ${createdTasks.length}`);
    
    console.log('\n✅ ¡Base de datos poblada exitosamente!');
    console.log('\n📝 IDs de ejemplo para usar en el API:');
    console.log(`   Usuario: ${createdUsers[0]._id}`);
    console.log(`   Proyecto: ${createdProjects[0]._id}`);
    console.log(`   Tarea: ${createdTasks[0]._id}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();
