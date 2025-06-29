import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SideBarClient from "./SideBarClient";

const SettingSection = ({ title, children }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-sm p-4 space-y-4 border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
      <span className="w-1.5 h-5 bg-blue-500 rounded-full mr-2"></span>
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </motion.div>
);

const SettingRow = ({ label, description, toggle, checked, onChange, onClick }) => (
  <div 
    className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
    onClick={!toggle ? onClick : undefined}
  >
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
    {toggle ? (
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? "bg-blue-500" : "bg-gray-300"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            checked ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform shadow-sm`}
        />
      </Switch>
    ) : (
      <button 
        onClick={onClick}
        className="text-blue-500 hover:text-blue-600 text-xs font-medium transition-colors"
      >
        Modifier
      </button>
    )}
  </div>
);

const PasswordDialog = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de changement de mot de passe
    console.log({ currentPassword, newPassword, confirmPassword });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Changer le mot de passe
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mot de passe actuel
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Mettre à jour
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const ParametreC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  return (
    <div className={`flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 to-gray-50 min-h-[calc(100vh-5rem)] mt-20 ${isPasswordDialogOpen ? 'overflow-hidden' : ''}`}>
      <div className={`${isPasswordDialogOpen ? 'opacity-50' : ''}`}>
        <SideBarClient />
      </div>

      <div className={`flex-1 p-6 space-y-6 ml-60 mt-4 ${isPasswordDialogOpen ? 'opacity-50 pointer-events-none' : ''}`}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          ⚙️ Paramètres
          <p className="text-sm text-gray-500">Gérez vos paramètres de compte et préférences</p>
        </motion.h1>

        <SettingSection title="Paramètres du compte">
          <div className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded-md transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-800">Langue</p>
              <p className="text-xs text-gray-500">Sélectionnez votre langue préférée</p>
            </div>
            <select 
              className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue="fr"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded-md transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-800">Fuseau horaire</p>
              <p className="text-xs text-gray-500">Définir votre fuseau horaire</p>
            </div>
            <select 
              className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue="Africa/Casablanca"
            >
              <option value="Africa/Casablanca">Maroc (UTC+1)</option>
            </select>
          </div>
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingRow
            label="Activer & Désactiver la notifications"
            description="Recevoir des notifications"
            toggle
            checked={emailNotifs}
            onChange={setEmailNotifs}
          />
          {/* <SettingRow
            label="Notifications par email"
            description="Recevoir des notifications par email"
            toggle
            checked={emailNotifs}
            onChange={setEmailNotifs}
          /> */}
          {/* <SettingRow
            label="Notifications push"
            description="Recevoir des notifications push"
            toggle
            checked={pushNotifs}
            onChange={setPushNotifs}
          />
          <SettingRow
            label="Notifications SMS"
            description="Recevoir des notifications par SMS"
            toggle
            checked={smsNotifs}
            onChange={setSmsNotifs}
          /> */}
        </SettingSection>

        <SettingSection title="Sécurité">
          <SettingRow 
            label="Changer le mot de passe" 
            description="Modifier votre mot de passe actuel" 
            toggle={false}
            onClick={() => setIsPasswordDialogOpen(true)}
          />

          <PasswordDialog 
            isOpen={isPasswordDialogOpen} 
            onClose={() => setIsPasswordDialogOpen(false)}
          />
        </SettingSection>

        <SettingSection title="Confidentialité">
          <SettingRow
            label="Profil public"
            description="Rendre votre profil visible publiquement"
            toggle
            checked={isPublic}
            onChange={setIsPublic}
          />
          <SettingRow
            label="Partage de données"
            description="Autoriser le partage de données analytiques"
            toggle
            checked={dataSharing}
            onChange={setDataSharing}
          />
        </SettingSection>

        <SettingSection title="Supprimer le compte">
          <p className="text-sm text-gray-600">Cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
          <label className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            Je comprends que cette action est irréversible
          </label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe pour confirmer"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-300 focus:border-transparent"
          />
          <button className="mt-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors shadow-sm">
            Supprimer mon compte
          </button>
        </SettingSection>
      </div>
    </div>
  );
};

export default ParametreC;