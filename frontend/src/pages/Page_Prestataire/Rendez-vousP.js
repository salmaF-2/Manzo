import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { motion } from "framer-motion";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuration du calendrier
moment.locale('fr');
const localizer = momentLocalizer(moment);

const RendezVousP = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [showCalendar, setShowCalendar] = useState(true);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Consultation dentaire',
      start: new Date(new Date().setHours(10, 0, 0)),
      end: new Date(new Date().setHours(11, 0, 0)),
      client: 'Sophie Martin',
      clientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      service: 'Contrôle annuel',
      dateDemande: moment().subtract(3, 'days').toDate(),
      dateSouhaitee: new Date(),
      status: 'confirmé',
      phone: '06 12 34 56 78'
    },
    {
      id: 2,
      title: 'Orthodontie',
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      client: 'Lucas Bernard',
      clientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      service: 'Ajustement appareil',
      dateDemande: moment().subtract(1, 'week').toDate(),
      dateSouhaitee: new Date(new Date().setDate(new Date().getDate() + 2)),
      status: 'confirmé',
      phone: '07 89 01 23 45'
    },
    {
      id: 3,
      title: 'Urgence carie',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      client: 'Emma Dubois',
      clientImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      service: 'Soin carie',
      dateDemande: moment().subtract(2, 'days').toDate(),
      dateSouhaitee: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: 'confirmé',
      phone: '06 45 67 89 01'
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectEvent = (event) => {
    alert(`Rendez-vous avec ${event.client}\nService: ${event.service}\nTéléphone: ${event.phone}`);
  };

  const handleMarkAsDone = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  const handleCancel = (id) => {
    if (window.confirm("Annuler ce rendez-vous ?")) {
      setAppointments(appointments.filter(app => app.id !== id));
    }
  };

  const toggleCalendarView = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      <div className="flex-1 ml-60 p-6 mt-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.3 }} 
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          📅 Rendez-vous confirmés
        </motion.h1>

        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleCalendarView}
            className="px-4 py-2 bg-[#5869A3] text-white rounded-lg shadow-md hover:bg-[#5869A3] transition flex items-center"
          >
            {showCalendar ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Afficher la liste
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Afficher le calendrier
              </>
            )}
          </motion.button>
          
          <div className="flex space-x-2 bg-indigo-50 p-1 rounded-lg">
            {['day', 'week', 'month'].map((v) => (
              <motion.button
                key={v}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded-md text-sm capitalize ${view === v ? 'bg-[#5869A3] text-white shadow' : 'text-[#4D6099] hover:bg-indigo-100'}`}
              >
                {v === 'day' ? 'Jour' : v === 'week' ? 'Semaine' : 'Mois'}
              </motion.button>
            ))}
          </div>
        </div>

        {showCalendar ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100"
          >
            <Calendar
              localizer={localizer}
              events={appointments}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 650 }}
              onSelectEvent={handleSelectEvent}
              view={view}
              onView={setView}
              date={selectedDate}
              onNavigate={setSelectedDate}
              messages={{
                today: "Aujourd'hui",
                previous: 'Précédent',
                next: 'Suivant',
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                agenda: 'Agenda',
                date: 'Date',
                time: 'Heure',
                event: 'Événement',
                noEventsInRange: 'Aucun rendez-vous cette semaine.',
              }}
              defaultView="week"
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.service.includes('Urgence') ? '#f87171' : '#818cf8',
                  borderRadius: '4px',
                  border: 'none',
                  color: 'white',
                },
              })}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#5869A3]/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Date demandée</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Date souhaitée</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-indigo-50/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={appointment.clientImage} 
                            alt={appointment.client}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          <div className="font-medium text-indigo-900">{appointment.client}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(appointment.dateDemande).format('DD/MM/YYYY')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {moment(appointment.dateDemande).format('HH:mm')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(appointment.dateSouhaitee).format('DD/MM/YYYY')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {moment(appointment.dateSouhaitee).format('HH:mm')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMarkAsDone(appointment.id)}
                          className="px-3 py-1 bg-emerald-500 text-white rounded-md text-xs flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Terminé
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancel(appointment.id)}
                          className="px-3 py-1 bg-rose-500 text-white rounded-md text-xs flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Annuler
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RendezVousP;