import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título de la tarea es requerido'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'La tarea debe estar asociada a un proyecto']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'review', 'completed'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  estimatedHours: {
    type: Number,
    min: [0, 'Las horas estimadas no pueden ser negativas']
  },
  actualHours: {
    type: Number,
    min: [0, 'Las horas actuales no pueden ser negativas']
  },
  tags: [{
    type: String,
    trim: true
  }],
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  attachments: [{
    filename: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices para búsqueda y filtrado
taskSchema.index({ title: 'text', description: 'text', tags: 'text' });
taskSchema.index({ project: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ isDeleted: 1 });

// Índice compuesto para queries comunes
taskSchema.index({ project: 1, status: 1, priority: 1 });

// Virtual para calcular si está vencida
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status === 'completed') {
    return false;
  }
  return new Date() > this.dueDate;
});

// Virtual para calcular diferencia de horas
taskSchema.virtual('hoursDifference').get(function() {
  if (this.estimatedHours && this.actualHours) {
    return this.actualHours - this.estimatedHours;
  }
  return null;
});

// Middleware pre-save para validaciones
taskSchema.pre('save', function(next) {
  // Validar que la tarea no dependa de sí misma
  if (this.dependencies && this.dependencies.length > 0) {
    const selfReference = this.dependencies.some(dep => 
      dep.toString() === this._id.toString()
    );
    if (selfReference) {
      return next(new Error('Una tarea no puede depender de sí misma'));
    }
  }
  next();
});

// Método para agregar attachment
taskSchema.methods.addAttachment = function(filename, url) {
  this.attachments.push({
    filename,
    url,
    uploadedAt: new Date()
  });
  return this.save();
};

// Query helper para excluir tareas eliminadas
taskSchema.query.notDeleted = function() {
  return this.where({ isDeleted: false });
};

// Configurar toJSON para incluir virtuals
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
