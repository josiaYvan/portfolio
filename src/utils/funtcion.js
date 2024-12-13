/* eslint-disable no-alert */
const { Modal } = require('antd');
const { default: ApiService } = require('./apiService');
const { removeSessionAndLogoutUser } = require('./authentication');
const { default: notificationWithIcon } = require('./notification');

exports.userLogout = async () => {
  // Utiliser la méthode Modal.confirm d'Ant Design
  Modal.confirm({
    title: 'Es-tu sûr(e) de vouloir te déconnecter ?',
    okText: 'Oui',
    cancelText: 'Non',
    onOk: async () => {
      try {
        const response = await ApiService.post('/auth/logout');
        if (response?.result_code === 0) {
          removeSessionAndLogoutUser();
        } else {
          notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
          removeSessionAndLogoutUser();
        }
      } catch (error) {
        notificationWithIcon('error', 'ERROR', error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
        removeSessionAndLogoutUser();
      }
    },
    onCancel() {
      notificationWithIcon('info', 'INFO', 'Déconnexion annulée');
    }
  });
};

exports.addDaysToDate = (days) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  const formattedDate = currentDate.toISOString();
  // const offset = currentDate.getTimezoneOffset();
  // const hoursOffset = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
  // const minutesOffset = Math.abs(offset % 60).toString().padStart(2, '0');
  // const timeZone = `${(offset > 0 ? '-' : '+') + hoursOffset}:${minutesOffset}`;
  // const finalDate = formattedDate.replace('Z', timeZone);

  return formattedDate;
};

exports.getCurrentDateFormatted = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  // const offset = currentDate.getTimezoneOffset();
  // const hoursOffset = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
  // const minutesOffset = Math.abs(offset % 60).toString().padStart(2, '0');
  // const timeZone = `${(offset > 0 ? '-' : '+') + hoursOffset}:${minutesOffset}`;
  // const finalDate = formattedDate.replace('Z', timeZone);

  return formattedDate;
};

exports.extractNameFromMail = (email) => {
  const regex = /^([^@]+)@/;
  const match = email.match(regex);

  if (match) {
    let nomComplet = match[1];

    nomComplet = nomComplet.replace(/\./g, ' ').replace(/_/g, ' ');
    return nomComplet;
  }
  return null;
};

exports.getCurrentLocation = () => {
  const res = { lat: null, lng: null };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        res.lat = latitude;
        res.lng = longitude;
      },
      (error) => {
        console.error(`Erreur de géolocalisation: ${error.message}`);
      },
      {
        enableHighAccuracy: true, // Utilisez le GPS si disponible
        timeout: 10000, // Délai maximum avant de lancer une erreur
        maximumAge: 0 // Ne pas utiliser de données mises en cache
      }
    );
  } else {
    console.error("La géolocalisation n'est pas supportée par ce navigateur.");
  }
  return res;
};

exports.checkProfileCompletion = (values) => {
  if (!values) return false;

  const requiredFields = ['name', 'firstname', 'email', 'phone', 'address', 'district', 'birthday', 'birthplace', 'sexe', 'identityCard'];

  return requiredFields.every((field) => !!values[field]);
};

exports.fetchPlaceName = (lat, lng) => new Promise((resolve, reject) => {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
      let placeName = results[0].formatted_address;
      if (placeName.includes('+')) {
        for (let i = 1; i < results.length; i++) {
          placeName = results[i].formatted_address;
          if (!placeName.includes('+')) {
            placeName = `${results[0].address_components[0].long_name}, ${placeName}`;
            break;
          }
        }
      }
      const placeId = results[0].place_id;
      resolve({ placeName, placeId });
    } else {
      reject(new Error(`Erreur de géocodage : ${status}`));
    }
  });
});
exports.initLocation = {
  placeName: '',
  placeId: '',
  latLng: { lat: '', lng: '' }
};
