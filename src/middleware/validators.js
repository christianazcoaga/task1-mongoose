import mongoose from 'mongoose';
import { AppError } from './errorHandler.js';

// Validar ObjectId
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(`${paramName} inválido`, 400));
    }
    
    next();
  };
};

// Validar campos requeridos
export const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return next(new AppError(
        `Campos requeridos faltantes: ${missingFields.join(', ')}`,
        400
      ));
    }
    
    next();
  };
};

// Validar enums
export const validateEnum = (field, allowedValues) => {
  return (req, res, next) => {
    if (req.body[field] && !allowedValues.includes(req.body[field])) {
      return next(new AppError(
        `${field} debe ser uno de: ${allowedValues.join(', ')}`,
        400
      ));
    }
    
    next();
  };
};

// Validar fechas
export const validateDates = (req, res, next) => {
  const { startDate, endDate, dueDate } = req.body;
  
  if (startDate && isNaN(Date.parse(startDate))) {
    return next(new AppError('startDate no es una fecha válida', 400));
  }
  
  if (endDate && isNaN(Date.parse(endDate))) {
    return next(new AppError('endDate no es una fecha válida', 400));
  }
  
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return next(new AppError('dueDate no es una fecha válida', 400));
  }
  
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    return next(new AppError('endDate no puede ser anterior a startDate', 400));
  }
  
  next();
};

// Validar números positivos
export const validatePositiveNumber = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        const value = Number(req.body[field]);
        if (isNaN(value) || value < 0) {
          return next(new AppError(`${field} debe ser un número positivo`, 400));
        }
      }
    }
    next();
  };
};

// Validar query params de paginación
export const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;
  
  if (page && (isNaN(page) || Number(page) < 1)) {
    return next(new AppError('page debe ser un número mayor a 0', 400));
  }
  
  if (limit && (isNaN(limit) || Number(limit) < 1 || Number(limit) > 100)) {
    return next(new AppError('limit debe ser un número entre 1 y 100', 400));
  }
  
  next();
};
