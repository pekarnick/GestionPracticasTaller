import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import type { Practica } from './types';
import ListaPracticas from './components/ListaPracticas';
import FormularioPractica from './components/FormularioPractica';

function App() {
  const [practicas, setPracticas] = useState<Practica[]>([]);
  const [practicaEditar, setPracticaEditar] = useState<Practica | undefined>();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const guardarPractica = (practica: Practica) => {
    if (practicaEditar) {
      setPracticas(practicas.map((p) => (p.id === practica.id ? practica : p)));
    } else {
      setPracticas([...practicas, practica]);
    }
    setMostrarFormulario(false);
    setPracticaEditar(undefined);
  };

  const eliminarPractica = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta práctica?')) {
      setPracticas(practicas.filter((p) => p.id !== id));
    }
  };

  const editarPractica = (practica: Practica) => {
    setPracticaEditar(practica);
    setMostrarFormulario(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ClipboardList className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Gestión de Prácticas de Taller
              </h1>
            </div>
            {!mostrarFormulario && (
              <button
                onClick={() => setMostrarFormulario(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Nueva Práctica
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {mostrarFormulario ? (
          <FormularioPractica
            practica={practicaEditar}
            onSubmit={guardarPractica}
            onCancel={() => {
              setMostrarFormulario(false);
              setPracticaEditar(undefined);
            }}
          />
        ) : (
          <div className="space-y-6">
            {practicas.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No hay prácticas registradas
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comience creando una nueva práctica de taller.
                </p>
              </div>
            ) : (
              <ListaPracticas
                practicas={practicas}
                onEdit={editarPractica}
                onDelete={eliminarPractica}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;