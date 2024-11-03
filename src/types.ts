export interface Tarea {
  id: string;
  descripcion: string;
  completada: boolean;
  retroalimentacion: string;
}

export interface Practica {
  id: string;
  nombre: string;
  fecha: string;
  estudiante: string;
  tareas: Tarea[];
}