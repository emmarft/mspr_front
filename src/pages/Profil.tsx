import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { User, Mail, Phone, MapPin, Building, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Profil: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nom: user?.nom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    adresse: user?.adresse || '',
  });

  const handleSave = async () => {
    try {
      // Ici vous feriez l'appel API pour mettre à jour le profil
      console.log('Mise à jour du profil:', editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      nom: user?.nom || '',
      email: user?.email || '',
      telephone: user?.telephone || '',
      adresse: user?.adresse || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Connexion requise</h3>
        <p className="text-gray-600">
          Vous devez être connecté pour voir votre profil
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600 mt-2">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2">
          <Card 
            title="Informations personnelles"
            action={
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                    >
                      <Save className="h-4 w-4" />
                      <span>Sauvegarder</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                      <span>Annuler</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-1 text-coffee-600 hover:text-coffee-700"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Modifier</span>
                  </button>
                )}
              </div>
            }
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.nom}
                      onChange={(e) => setEditData({ ...editData, nom: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{user.nom}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.telephone}
                      onChange={(e) => setEditData({ ...editData, telephone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{user.telephone || 'Non renseigné'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de compte
                  </label>
                  <div className="flex items-center space-x-2">
                    {user.type === 'professionnel' ? (
                      <Building className="h-4 w-4 text-gray-400" />
                    ) : (
                      <User className="h-4 w-4 text-gray-400" />
                    )}
                    <Badge variant={user.type === 'professionnel' ? 'info' : 'default'}>
                      {user.type === 'professionnel' ? 'Professionnel' : 'Particulier'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.adresse}
                    onChange={(e) => setEditData({ ...editData, adresse: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                    <span className="text-gray-900">{user.adresse || 'Non renseignée'}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar avec informations supplémentaires */}
        <div className="space-y-6">
          <Card title="Statistiques">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Commandes passées</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total dépensé</span>
                <span className="font-semibold text-gray-900">456.78 €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Membre depuis</span>
                <span className="font-semibold text-gray-900">Jan 2024</span>
              </div>
            </div>
          </Card>

          <Card title="Préférences">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Notifications email</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Newsletter</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Offres spéciales</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};