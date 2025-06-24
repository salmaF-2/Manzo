// import React, { useState } from 'react';

// const MotDePasseOublie = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simule une requête de récupération (à remplacer par un vrai appel backend)
//     if (email) {
//       setMessage('Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
//       setEmail('');
//     } else {
//       setMessage('Veuillez entrer une adresse e-mail valide.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Mot de passe oublié
//         </h2>
//         {message && (
//           <div className="mb-4 text-sm text-green-600 text-center">{message}</div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email" className="block text-gray-700 mb-2">
//             Adresse e-mail :
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="exemple@domaine.com"
//           />
//           <button
//             type="submit"
//             className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Envoyer le lien de réinitialisation
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MotDePasseOublie;
import React, { useState } from 'react';

const MotDePasseOublie = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simule une requête de récupération (à remplacer par un vrai appel backend)
    if (email) {
      setMessage('Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
      setEmail('');
    } else {
      setMessage('Veuillez entrer une adresse e-mail valide.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Mot de passe oublié
        </h2>
        {message && (
          <div className="mb-4 text-sm text-green-600 text-center">{message}</div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Adresse e-mail :
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="exemple@domaine.com"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>
      </div>
    </div>
  );
};

export default MotDePasseOublie;
