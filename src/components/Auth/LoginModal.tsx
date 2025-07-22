import React, { useState } from 'react';
import { X, Coffee, User, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    adresse: {
      line1: '',
      line2: '',
      postal_code: '',
      city: '',
      country: 'France',
    },
    type: 'particulier' as 'particulier' | 'professionnel',
    company_name: '',
    siret: '',
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      console.log("Données envoyées à login:", loginData);
      const success = await login(loginData.email, loginData.password);
      closeLoginModal();
      // La redirection se fera automatiquement via le composant HomePage

    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (registerData.type === 'professionnel') {
      if (!registerData.company_name.trim()) {
        setError('Le nom de la société est obligatoire pour les professionnels');
        setLoading(false);
        return;
      }
      if (
        registerData.siret.trim().length < 9 ||
        registerData.siret.trim().length > 14
      ) {
        setError('Le SIRET doit contenir entre 9 et 14 caractères');
        setLoading(false);
        return;
      }
    }

    try {

      console.log("Données envoyées à register:", {

        last_name: registerData.nom,
        first_name: 'Prénom',
        email: registerData.email,
        password: registerData.password,
        phone: registerData.telephone,
        role: 'Professionnel',
        company: registerData.type === 'professionnel'
          ? {
            name: registerData.company_name,
            siret: registerData.siret,
          }
          : {},
        address: {
          ...registerData.adresse,
          country: 'France', // si non modifiable
        },
      });

      await register({
        last_name: registerData.nom,
        first_name: registerData.prenom,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.telephone,
        role: "Professionnel",
        company: registerData.type === 'professionnel'
          ? {
            name: registerData.company_name,
            siret: registerData.siret,
          }
          : {},
        address: {
          ...registerData.adresse,
          country: 'France', // si non modifiable
        },
      });


    } catch (err) {
      setError("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Coffee className="h-6 w-6 text-coffee-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h2>
          </div>
          <button
            onClick={closeLoginModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-coffee-600 text-white py-2 px-4 rounded-lg"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setRegisterData({ ...registerData, type: 'particulier' })}
                  className={`flex-1 px-4 py-2 rounded border ${registerData.type === 'particulier'
                    ? 'bg-coffee-100 border-coffee-600'
                    : 'border-gray-300'
                    }`}
                >
                  <User className="inline-block mr-2 h-4 w-4" />
                  Particulier
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterData({ ...registerData, type: 'professionnel' })}
                  className={`flex-1 px-4 py-2 rounded border ${registerData.type === 'professionnel'
                    ? 'bg-coffee-100 border-coffee-600'
                    : 'border-gray-300'
                    }`}
                >
                  <Building className="inline-block mr-2 h-4 w-4" />
                  Professionnel
                </button>
              </div>

              <input
                type="text"
                placeholder="Nom"
                required
                value={registerData.nom}
                onChange={(e) => setRegisterData({ ...registerData, nom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Prenom"
                required
                value={registerData.prenom}
                onChange={(e) => setRegisterData({ ...registerData, prenom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={registerData.telephone}
                onChange={(e) => setRegisterData({ ...registerData, telephone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Adresse (ligne 1)"
                value={registerData.adresse.line1}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    adresse: { ...registerData.adresse, line1: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />

              <input
                type="text"
                placeholder="Adresse (ligne 2)"
                value={registerData.adresse.line2}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    adresse: { ...registerData.adresse, line2: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />

              <input
                type="text"
                placeholder="Code postal"
                value={registerData.adresse.postal_code}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    adresse: { ...registerData.adresse, postal_code: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />

              <input
                type="text"
                placeholder="Ville"
                value={registerData.adresse.city}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    adresse: { ...registerData.adresse, city: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />

              {registerData.type === 'professionnel' && (
                <>
                  <input
                    type="text"
                    placeholder="Nom de la société"
                    required
                    value={registerData.company_name}
                    onChange={(e) => setRegisterData({ ...registerData, company_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="SIRET"
                    required
                    value={registerData.siret}
                    onChange={(e) => setRegisterData({ ...registerData, siret: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </>
              )}
              <input
                type="password"
                placeholder="Mot de passe"
                required
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                required
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({ ...registerData, confirmPassword: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-coffee-600 text-white py-2 px-4 rounded-lg"
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setError('');
                setIsLogin(!isLogin);
              }}
              className="text-coffee-600 hover:underline"
              type="button"
            >
              {isLogin
                ? "Pas encore de compte ? Inscrivez-vous"
                : "Déjà un compte ? Connectez-vous"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
