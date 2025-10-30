import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del proyecto es requerido'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El proyecto debe tener un owner']
  },
  teamMembers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['manager', 'developer', 'designer', 'tester'],
      default: 'developer'
    }
  }],
  status: {
    type: String,
    enum: ['planning', 'active', 'on-hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  budget: {
    type: Number,
    min: [0, 'El presupuesto no puede ser negativo']
  },
  client: {
    type: String,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices para búsqueda y filtrado
projectSchema.index({ name: 'text', description: 'text', client: 'text' });
projectSchema.index({ owner: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ isDeleted: 1 });
projectSchema.index({ startDate: 1, endDate: 1 });

// Virtual para obtener tareas del proyecto
projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project'
});

// Middleware pre-save para validaciones
projectSchema.pre('save', function(next) {
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    next(new Error('La fecha de fin no puede ser anterior a la fecha de inicio'));
  }
  next();
});

// Método para agregar miembro al equipo
projectSchema.methods.addTeamMember = function(userId, role = 'developer') {
  const exists = this.teamMembers.some(member => 
    member.user.toString() === userId.toString()
  );
  
  if (!exists) {
    this.teamMembers.push({ user: userId, role });
  }
  
  return this.save();
};

// Método para remover miembro del equipo
projectSchema.methods.removeTeamMember = function(userId) {
  this.teamMembers = this.teamMembers.filter(member => 
    member.user.toString() !== userId.toString()
  );
  
  return this.save();
};

// Query helper para excluir proyectos eliminados
projectSchema.query.notDeleted = function() {
  return this.where({ isDeleted: false });
};

const Project = mongoose.model('Project', projectSchema);

export default Project;
