import { NewMatchForm } from './components/NewMatchForm';

export default function NewMatchPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Match</h1>
        <p className="text-gray-600">Record a new match result</p>
      </div>
      <NewMatchForm />
    </div>
  );
}