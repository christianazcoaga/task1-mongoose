import Task from '../models/Task.js';
import { AppError } from '../middleware/errorHandler.js';

// CREATE - Crear nueva tarea
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    
    // Populate referencias
    await task.populate([
      { path: 'project', select: 'name status' },
      { path: 'assignedTo', select: 'name email' }
    ]);
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// READ - Obtener tarea por ID
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .notDeleted()
      .populate('project', 'name status owner')
      .populate('assignedTo', 'name email role')
      .populate('dependencies', 'title status priority');
    
    if (!task) {
      return next(new AppError('Tarea no encontrada', 404));
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE - Actualizar tarea
export const updateTask = async (req, res, next) => {
  try {
    // No permitir actualizar isDeleted directamente
    delete req.body.isDeleted;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('project', 'name status')
    .populate('assignedTo', 'name email')
    .populate('dependencies', 'title status');
    
    if (!task) {
      return next(new AppError('Tarea no encontrada', 404));
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - Eliminar tarea (soft delete)
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    
    if (!task) {
      return next(new AppError('Tarea no encontrada', 404));
    }
    
    res.status(200).json({
      success: true,
      message: 'Tarea eliminada correctamente',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// LIST - Listar tareas con paginación y filtros
export const listTasks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      priority,
      project,
      assignedTo,
      search,
      tags,
      dueDateFrom,
      dueDateTo,
      overdue
    } = req.query;

    // Construir filtros
    const filter = { isDeleted: false };
    
    if (status) {
      filter.status = status;
    }
    
    if (priority) {
      filter.priority = priority;
    }
    
    if (project) {
      filter.project = project;
    }
    
    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }
    
    // Búsqueda por texto completo
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Filtro por tags
    if (tags) {
      const tagsArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagsArray };
    }
    
    // Filtro por fecha de vencimiento
    if (dueDateFrom || dueDateTo) {
      filter.dueDate = {};
      if (dueDateFrom) filter.dueDate.$gte = new Date(dueDateFrom);
      if (dueDateTo) filter.dueDate.$lte = new Date(dueDateTo);
    }
    
    // Filtro por tareas vencidas
    if (overdue === 'true') {
      filter.dueDate = { $lt: new Date() };
      filter.status = { $ne: 'completed' };
    }

    // Configurar ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Ejecutar query con paginación
    const skip = (Number(page) - 1) * Number(limit);
    
    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate('project', 'name status')
        .populate('assignedTo', 'name email')
        .populate('dependencies', 'title status'),
      Task.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Obtener tareas por proyecto
export const getTasksByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { status, priority } = req.query;
    
    const filter = {
      project: projectId,
      isDeleted: false
    };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    const tasks = await Task.find(filter)
      .sort({ priority: -1, dueDate: 1 })
      .populate('assignedTo', 'name email')
      .populate('dependencies', 'title status');
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// Agregar attachment a una tarea
export const addAttachment = async (req, res, next) => {
  try {
    const { filename, url } = req.body;
    
    if (!filename || !url) {
      return next(new AppError('filename y url son requeridos', 400));
    }
    
    const task = await Task.findOne({
      _id: req.params.id,
      isDeleted: false
    });
    
    if (!task) {
      return next(new AppError('Tarea no encontrada', 404));
    }
    
    await task.addAttachment(filename, url);
    
    res.status(200).json({
      success: true,
      message: 'Attachment agregado correctamente',
      data: task
    });
  } catch (error) {
    next(error);
  }
};
