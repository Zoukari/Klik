import { useRouteError, NavLink } from 'react-router-dom';

export default function ErrorFallback() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite';

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-violet-500/20 flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Oups !</h1>
        <p className="text-slate-600 mb-6">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 transition-colors"
          >
            Rafraîchir
          </button>
          <NavLink
            to="/"
            className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
          >
            Retour à l'accueil
          </NavLink>
        </div>
      </div>
    </div>
  );
}
