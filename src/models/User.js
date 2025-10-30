import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'developer', 'designer', 'tester'],
    default: 'developer'
  },
  department: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para búsqueda
userSchema.index({ name: 'text', email: 'text' });
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });

// Virtual para obtener proyectos del usuario
userSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'owner'
});

// Virtual para obtener tareas asignadas
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'assignedTo'
});

const User = mongoose.model('User', userSchema);

export default User;
