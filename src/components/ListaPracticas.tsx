import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import type { Practica } from '../types';

interface ListaPracticasProps {
  practicas: Practica[];
  onEdit: (practica: Practica) => void;
  onDelete: (id: string) => void;
}

export default function ListaPracticas({ practicas, onEdit, onDelete }: ListaPracticasProps) {
  return (
    <div className="space-y-4">
      {practicas.map((practica) => (
        <div key={practica.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{practica.nombre}</h3>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(practica)}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => onDelete(practica.id)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>Estudiante: {practica.estudiante}</p>
            <p>Fecha: {practica.fecha}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">
              Tareas completadas: {practica.tareas.filter(t => t.completada).length} / {practica.tareas.length}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}