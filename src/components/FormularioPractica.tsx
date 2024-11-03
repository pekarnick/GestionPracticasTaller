import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Practica, Tarea } from '../types';

interface FormularioPracticaProps {
  practica?: Practica;
  onSubmit: (practica: Practica) => void;
  onCancel: () => void;
}

export default function FormularioPractica({ practica, onSubmit, onCancel }: FormularioPracticaProps) {
  const [formData, setFormData] = useState<Practica>(
    practica || {
      id: crypto.randomUUID(),
      nombre: '',
      fecha: new Date().toISOString().split('T')[0],
      estudiante: '',
      tareas: [],
    }
  );

  const agregarTarea = () => {
    const nuevaTarea: Tarea = {
      id: crypto.randomUUID(),
      descripcion: '',
      completada: false,
      retroalimentacion: '',
    };
    setFormData({ ...formData, tareas: [...formData.tareas, nuevaTarea] });
  };

  const eliminarTarea = (id: string) => {
    setFormData({
      ...formData,
      tareas: formData.tareas.filter((t) => t.id !== id),
    });
  };

  const actualizarTarea = (id: string, campo: keyof Tarea, valor: string | boolean) => {
    setFormData({
      ...formData,
      tareas: formData.tareas.map((t) =>
        t.id === id ? { ...t, [campo]: valor } : t
      ),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la Práctica
          </label>
          <input
            type="text"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estudiante
          </label>
          <input
            type="text"
            required
            value={formData.estudiante}
            onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            required
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Tareas</h3>
            <button
              type="button"
              onClick={agregarTarea}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} className="mr-1" /> Agregar Tarea
            </button>
          </div>

          {formData.tareas.map((tarea) => (
            <div key={tarea.id} className="border rounded-md p-4 space-y-3">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Descripción de la tarea"
                  value={tarea.descripcion}
                  onChange={(e) =>
                    actualizarTarea(tarea.id, 'descripcion', e.target.value)
                  }
                  className="flex-1 mr-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => eliminarTarea(tarea.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={(e) =>
                      actualizarTarea(tarea.id, 'completada', e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Completada</span>
                </label>
              </div>

              <textarea
                placeholder="Retroalimentación"
                value={tarea.retroalimentacion}
                onChange={(e) =>
                  actualizarTarea(tarea.id, 'retroalimentacion', e.target.value)
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}