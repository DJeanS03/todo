// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="text-center bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-xl border border-gray-200 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <p className="w-20 h-20 text-indigo-600 mx-auto mb-6 animate-bounce">😢</p> {/* Ícone com animação */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-indigo-700 mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
          Página Não Encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Ops! Parece que a página que você está procurando não existe. Não se preocupe, isso acontece com os melhores de nós.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}