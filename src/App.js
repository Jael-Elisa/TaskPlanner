import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Componentes y páginas
import Login from "./components/Auth/Login";
import Dashboard from './pages/Dashboard';
import TaskCrudPage from './pages/TaskCrudPage';
import AnnualTasks from './pages/AnnualTasks'

import Diario from './pages/Diario';
import Estudio from './pages/Estudio';
import Metas from './pages/Metas';
import Anual from './pages/AnnualTasks';
import MonthlyTasks from './pages/MonthlyTasks';
import WeeklyTasks from './pages/WeeklyTasks';
import Planificadores from './pages/Planificadores';
import Personal from './pages/Personal';
import Estadisticas from './pages/Estadisticas';
import TaskForm from './components/Tasks/TaskForm';


import EditarTask from './components/Tasks/EditarTask';
import EditarStudyTask from './components/Estudio/EditarStudyTask';
import StudyList from './components/Estudio/StudyList';
import AnnualTaskForm from './components/AnnualTasks/AnnualTaskForm'

// **Importa GoalForm**
import GoalForm from './components/Metas/GoalForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Login />} />

        {/* Otras páginas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskCrudPage />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/estudio" element={<Estudio />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="/anual" element={<Anual />} />
        <Route path="/mensual" element={<MonthlyTasks />} />
        <Route path="/semanal" element={<WeeklyTasks />} />
        <Route path="/planificadores" element={<Planificadores />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/task-form" element={<TaskForm />} />
        <Route path="/task-form/:id" element={<EditarTask />} />

        {/* Página de lista de tareas de estudio */}
        <Route path="/estudio-lista" element={<StudyList />} />

        {/* Página para editar tarea de estudio */}
        <Route path="/editar/:id" element={<EditarStudyTask />} />

        {/* Rutas para metas */}
        <Route path="/metas/nueva" element={<GoalForm />} />
        <Route path="/metas/editar/:id" element={<GoalForm />} />


        <Route path="/annual-tasks" element={<AnnualTasks />} />
        <Route path="/annual-tasks/new" element={<AnnualTaskForm />} />
        <Route path="/annual-tasks/edit/:id" element={<AnnualTaskForm />} />


      </Routes>
    </Router>
  );
}

export default App;
