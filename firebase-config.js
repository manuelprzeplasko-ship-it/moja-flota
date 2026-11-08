// Wklej tutaj konfigurację aplikacji WWW z Firebase Console > Ustawienia projektu.
// To są publiczne identyfikatory projektu, nie hasła ani klucze administracyjne.
export const firebaseConfig = {
  apiKey: "WKLEJ_API_KEY",
  authDomain: "WKLEJ_AUTH_DOMAIN",
  projectId: "WKLEJ_PROJECT_ID",
  appId: "WKLEJ_APP_ID"
};
export const configured = firebaseConfig.apiKey !== "WKLEJ_API_KEY";
