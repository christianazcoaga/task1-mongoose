import Project from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';

// CREATE - Crear nuevo proyecto
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    
    // Populate owner
    await project.populate('owner', 'name email');
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// READ - Obtener proyecto por ID
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .notDeleted()
      .populate('owner', 'name email role')
      .populate('teamMembers.user', 'name email role');
    
    if (!project) {
      return next(new AppError('Proyecto no encontrado', 404));
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE - Actualizar proyecto
export const updateProject = async (req, res, next) => {
  try {
    // No permitir actualizar isDeleted directamente
    delete req.body.isDeleted;
    
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('owner', 'name email')
    .populate('teamMembers.user', 'name email');
    
    if (!project) {
      return next(new AppError('Proyecto no encontrado', 404));
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - Eliminar proyecto (soft delete)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    
    if (!project) {
      return next(new AppError('Proyecto no encontrado', 404));
    }
    
    res.status(200).json({
      success: true,
      message: 'Proyecto eliminado correctamente',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// LIST - Listar proyectos con paginación y filtros
export const listProjects = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      owner,
      search,
      minBudget,
      maxBudget,
      startDateFrom,
      startDateTo
    } = req.query;

    // Construir filtros
    const filter = { isDeleted: false };
    
    if (status) {
      filter.status = status;
    }
    
    if (owner) {
      filter.owner = owner;
    }
    
    // Búsqueda por texto completo
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Filtro por presupuesto
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = Number(minBudget);
      if (maxBudget) filter.budget.$lte = Number(maxBudget);
    }
    
    // Filtro por fecha de inicio
    if (startDateFrom || startDateTo) {
      filter.startDate = {};
      if (startDateFrom) filter.startDate.$gte = new Date(startDateFrom);
      if (startDateTo) filter.startDate.$lte = new Date(startDateTo);
    }

    // Configurar ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Ejecutar query con paginación
    const skip = (Number(page) - 1) * Number(limit);
    
    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate('owner', 'name email')
        .populate('teamMembers.user', 'name email'),
      Project.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: projects,
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

// Agregar miembro al equipo
export const addTeamMember = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    
    if (!userId) {
      return next(new AppError('userId es requerido', 400));
    }
    
    const project = await Project.findOne({
      _id: req.params.id,
      isDeleted: false
    });
    
    if (!project) {
      return next(new AppError('Proyecto no encontrado', 404));
    }
    
    await project.addTeamMember(userId, role);
    await project.populate('teamMembers.user', 'name email role');
    
    res.status(200).json({
      success: true,
      message: 'Miembro agregado correctamente',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Remover miembro del equipo
export const removeTeamMember = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const project = await Project.findOne({
      _id: req.params.id,
      isDeleted: false
    });
    
    if (!project) {
      return next(new AppError('Proyecto no encontrado', 404));
    }
    
    await project.removeTeamMember(userId);
    
    res.status(200).json({
      success: true,
      message: 'Miembro removido correctamente',
      data: project
    });
  } catch (error) {
    next(error);
  }
};
