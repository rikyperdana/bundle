(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var i18n = Package['anti:i18n'].i18n;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var check = Package.check.check;
var Match = Package.check.Match;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var AccountsEntry, SimpleForm;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/server/entry.js                                                      //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
Meteor.startup(function() {
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };

  Accounts.urls.enrollAccount = function(token) {
    return Meteor.absoluteUrl('enroll-account/' + token);
  };

  AccountsEntry = {
    settings: {},
    config: function(appConfig) {
      this.settings = _.extend(this.settings, appConfig);
    }
  };
  this.AccountsEntry = AccountsEntry;

  Accounts.validateLoginAttempt(function(attemptInfo) {

    var requirePasswordConfirmation = AccountsEntry.settings.requirePasswordConfirmation || false;

    if ( requirePasswordConfirmation === true){

      if (attemptInfo.type == 'resume') {
        return true;
      } 

      if (attemptInfo.methodName == 'createUser') {
        return false;
      } 

      if (attemptInfo.methodName == 'login' && attemptInfo.allowed) {

        var verified = false;
        var email = attemptInfo.methodArguments[0].user.email;
        attemptInfo.user.emails.forEach(function(value, index) {
          if (email == value.address && value.verified) {
            verified = true;
          }
        });
        if (!verified) {
          throw new Meteor.Error(403, 'Verify Email first!');
        }
      }
    }
    return true;
  });

});
Meteor.methods({
  entryValidateSignupCode: function(signupCode) {
    check(signupCode, Match.OneOf(String, null, undefined));
    return !AccountsEntry.settings.signupCode || signupCode === AccountsEntry.settings.signupCode;
  },
  entryCreateUser: function(user) {
    var profile, userId;
    try{
      check(user, Object);
      profile = AccountsEntry.settings.defaultProfile || {};

      if (user.username) {
        userId = Accounts.createUser({
          username: user.username,
          email: user.email,
          password: user.password,
          profile: _.extend(profile, user.profile)
        });
      } else {
        userId = Accounts.createUser({email: user.email, password: user.password, profile: _.extend(profile, user.profile)});
      }
      if (user.email && Accounts._options.sendVerificationEmail) {
        Accounts.sendVerificationEmail(userId, user.email);
      }
    }catch(ex){
      console.log(ex)
      throw new Meteor.Error(403, ex.message);
    }

  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/router.js                                                     //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var exclusions;

Router.route("entrySignIn", {
  path: "/sign-in",
  name: 'entrySignIn',
  template: 'entrySignIn',
  onBeforeAction: function() {
    Alerts.clear();
    Session.set('buttonText', 'in');
    this.next();
  },
  onRun: function() {
    var pkgRendered, userRendered;
    if (Meteor.userId()) {
      Router.go(AccountsEntry.settings.dashboardRoute);
    }
    if (AccountsEntry.settings.signInTemplate) {
      this.template = AccountsEntry.settings.signInTemplate;
      pkgRendered = Template.entrySignIn.rendered;
      userRendered = Template[this.template].rendered;
      if (userRendered) {
        Template[this.template].rendered = function() {
          pkgRendered.call(this);
          return userRendered.call(this);
        };
      } else {
        Template[this.template].rendered = pkgRendered;
      }
      Template[this.template].events(AccountsEntry.entrySignInEvents);
      Template[this.template].helpers(AccountsEntry.entrySignInHelpers);
    }
    this.next();
  }
});
Router.route("entrySignUp", {
  path: "/sign-up",
  name: 'entrySignUp',
  template: 'entrySignUp',
  onBeforeAction: function() {
    Alerts.clear();
    Session.set('buttonText', 'up');
    this.next();
  },
  onRun: function() {
    var pkgRendered, userRendered;
    if (AccountsEntry.settings.signUpTemplate) {
      this.template = AccountsEntry.settings.signUpTemplate;
      pkgRendered = Template.entrySignUp.rendered;
      userRendered = Template[this.template].rendered;
      if (userRendered) {
        Template[this.template].rendered = function() {
          pkgRendered.call(this);
          userRendered.call(this);
        };
      } else {
        Template[this.template].rendered = pkgRendered;
      }
      Template[this.template].events(AccountsEntry.entrySignUpEvents);
      Template[this.template].helpers(AccountsEntry.entrySignUpHelpers);
    }
    this.next();
  }
});
Router.route("entryForgotPassword", {
  path: "/forgot-password",
  name: 'entryForgotPassword',
  template: 'entryForgotPassword',
  onBeforeAction: function() {
    Alerts.clear();
    this.next();
  }
});
Router.route('entrySignOut', {
  path: '/sign-out',
  name: 'entrySignOut',
  template: 'entrySignOut',
  onBeforeAction: function() {
    Alerts.clear();
    if (AccountsEntry.settings.homeRoute) {
      Meteor.logout();
      Router.go(AccountsEntry.settings.homeRoute);
    }
    this.next();
  }
});
Router.route('entryResetPassword', {
  path: 'reset-password/:resetToken',
  name: 'entryResetPassword',
  template: 'entryResetPassword',
  onBeforeAction: function() {
    Alerts.clear();
    Session.set('resetToken', this.params.resetToken);
    this.next();
  }
});
Router.route('entryEnrollAccount', {
  path: 'enroll-account/:resetToken',
  name: 'entryEnrollAccount',
  template: 'entryEnrollAccount',
  onBeforeAction: function() {
    Alerts.clear();
    Session.set('resetToken', this.params.resetToken);
    this.next();
  }
});

Router.route('entryEmailVerificationPending', {
  path: '/verification-pending',
  name: 'entryEmailVerificationPending',
  template: 'entryEmailVerificationPending',
  onBeforeAction: function() {
    Alerts.clear();
    this.next();
  }
});

exclusions = [];

_.each(Router.routes, function(route) {
  return exclusions.push(route.name);
});

Router.onStop(function() {
  if (!_.contains(exclusions, (Router.current().route) !== null ? Router.current().path : undefined)) {
    Session.set('fromWhere', Router.current().path);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_ar.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var ar = {
  signIn: "تسجيل الدخول",
  signin: "تسجيل الدخول",
  signOut: "تسجيل الخروج",
  signUp: "افتح حساب جديد",
  OR: "او",
  forgotPassword: "نسيت كلمة السر؟",
  emailAddress: "البريد الالكترونى",
  emailResetLink: "اعادة تعيين البريد الالكترونى",
  dontHaveAnAccount: "ليس عندك حساب؟",
  resetYourPassword: "اعادة تعيين كلمة السر",
  updateYourPassword: "جدد كلمة السر",
  password: "كلمة السر",
  usernameOrEmail: "اسم المستخدم او البريد الالكترونى",
  email: "البريد الالكترونى",
  ifYouAlreadyHaveAnAccount: "اذا كان عندك حساب",
  signUpWithYourEmailAddress: "سجل ببريدك الالكترونى",
  username: "اسم المستخدم",
  optional: "اختيارى",
  signupCode: "رمز التسجيل",
  clickAgree: "بفتح حسابك انت توافق على",
  privacyPolicy: "سياسة الخصوصية",
  terms: "شروط الاستخدام",
  sign: "تسجيل",
  configure: "تعديل",
  "with": "مع",
  createAccount: "افتح حساب جديد",
  and: "و",
  "Match failed": "المطابقة فشلت",
  "User not found": "اسم المستخدم غير موجود",
  error: {
    minChar: "سبعة حروف هو الحد الادنى لكلمة السر",
    pwOneLetter: "كلمة السر تحتاج الى حرف اخر",
    pwOneDigit: "كلمة السر يجب ان تحتوى على رقم واحد على الاقل",
    usernameRequired: "اسم المستخدم مطلوب",
    emailRequired: "البريد الالكترونى مطلوب",
    signupCodeRequired: "رمز التسجيل مطلوب",
    signupCodeIncorrect: "رمز التسجيل غير صحيح",
    signInRequired: "عليك بتسجبل الدخول لفعل ذلك",
    usernameIsEmail: "اسم المستخدم لا يمكن ان يكون بريد الكترونى"
  }
};

i18n.map("ar", ar);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_de.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var de = {
  signIn: "Anmelden",
  signin: "anmelden",
  signOut: "Abmelden",
  signUp: "Registrieren",
  OR: "ODER",
  forgotPassword: "Passwort vergessen?",
  emailAddress: "E-Mail Adresse",
  emailResetLink: "Senden",
  dontHaveAnAccount: "Noch kein Konto?",
  resetYourPassword: "Passwort zurücksetzen",
  updateYourPassword: "Passwort aktualisieren",
  password: "Passwort",
  usernameOrEmail: "Benutzername oder E-Mail",
  email: "E-Mail",
  ifYouAlreadyHaveAnAccount: "Falls Sie ein Konto haben, bitte hier",
  signUpWithYourEmailAddress: "Mit E-Mail registrieren",
  username: "Benutzername",
  optional: "Optional",
  signupCode: "Registrierungscode",
  clickAgree: "Durch die Registrierung akzeptieren Sie unsere",
  privacyPolicy: "Datenschutzerklärung",
  terms: "Geschäftsbedingungen",
  sign: "Anmelden",
  configure: "Konfigurieren",
  "with": "mit",
  createAccount: "Konto erzeugen",
  and: "und",
  error: {
    minChar: "Passwort muss mindesten 7 Zeichen lang sein.",
    pwOneLetter: "Passwort muss mindestens einen Buchstaben enthalten.",
    pwOneDigit: "Passwort muss mindestens eine Ziffer enthalten.",
    usernameRequired: "Benutzername benötigt.",
    emailRequired: "E-Mail benötigt.",
    signupCodeRequired: "Registrierungscode benötigt.",
    signupCodeIncorrect: "Registrierungscode ungültig.",
    signInRequired: "Sie müssen sich anmelden.",
    usernameIsEmail: "Benutzername kann nicht eine E-Mail."
  }
};

i18n.map("de", de);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_el.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var el = {
  signIn: "Είσοδος",
  signin: "Είσοδος",
  signOut: "Αποσύνδεση",
  signUp: "Εγγραφή",
  OR: "Ή",
  forgotPassword: "Ξεχάσατε τον κωδικό σας;",
  emailAddress: "Ηλεκτρονικό ταχυδρομείο (email)",
  emailResetLink: "Σύνδεσμος ακύρωσης Λογαριασμού Ηλεκτρονικού Ταχυδρομείου",
  dontHaveAnAccount: "Δημιουργία λογαριασμού",
  resetYourPassword: "Ακύρωση κωδικού",
  updateYourPassword: "Αλλαγή κωδικού",
  password: "κωδικός",
  usernameOrEmail: "Όνομα χρήστη ή Λογαριασμός Ηλεκτρονικού Ταχυδρομείου",
  email: "Ηλεκτρονικό ταχυδρομείο (email)",
  ifYouAlreadyHaveAnAccount: "Έχετε ήδη λογαριασμό",
  signUpWithYourEmailAddress: "Εγγραφή με Λογαριασμό Ηλεκτρονικού Ταχυδρομείου",
  username: "Όνομα χρήστη",
  optional: "Προαιρετικό",
  signupCode: "Κωδικός εγγραφής",
  clickAgree: "Με την εγγραφή, συμφωνείτε με",
  privacyPolicy: "Πολιτική Προστασίας Προσωπικών Δεδομένων",
  terms: "Όροι Χρήσης",
  sign: "Είσοδος",
  configure: "Διαμόρφωση",
  "with": "με",
  createAccount: "Δημιουργία λογαριασμού",
  and: "και",
  "Match failed": "Οι κωδικοί δεν ταιριάζουν.",
  "User not found": "Δεν βρέθηκε το Όνομα Χρήστη.",
  error: {
    minChar: "Ο κωδικός πρέπει να είναι τουλάχιστον 7 χαρακτήρες",
    pwOneLetter: "Ο κωδικός πρέπει να περιλαμβάνει 1 χαρακτήρα τουλάχιστον.",
    pwOneDigit: "Ο κωδικός πρέπει να περιλαμβάνει 1 νούμερο τουλάχιστον.",
    usernameRequired: "Το Όνομα Χρήστη απαιτείται.",
    emailRequired: "Το Όνομα χρήστη απαιτείται.",
    signupCodeRequired: "Ο Κωδικός εγγραφής απαιτείται.",
    signupCodeIncorrect: "Ο Κωδικός εγγραφής είναι λάθος.",
    signInRequired: "Συνδεθείτε για να αποκτήσετε πρόσβαση.",
    usernameIsEmail: "Το Όνομα Χρήστη δεν μπορεί να είναι ο Λογαριασμός Ηλεκτρονικού Ταχυδρομείου."
  }
};



i18n.map("el", el)
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_en.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var en = {
  signIn: "Sign In",
  signin: "sign in",
  signOut: "Sign Out",
  signUp: "Register",
  OR: "OR",
  forgotPassword: "Forgot your password?",
  emailAddress: "Email Address",
  emailResetLink: "Email Reset Link",
  dontHaveAnAccount: "Don't have an account?",
  resetYourPassword: "Reset your password",
  updateYourPassword: "Update your password",
  confirmPassword: "Confirm Password",
  password: "Password",
  usernameOrEmail: "Username or email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "If you already have an account",
  signUpWithYourEmailAddress: "Register with your email address",
  username: "Username",
  optional: "Optional",
  signupCode: "Registration Code",
  clickAgree: "By clicking Register, you agree to our",
  privacyPolicy: "Privacy Policy",
  terms: "Terms of Use",
  sign: "Sign",
  configure: "Configure",
  "with": "with",
  createAccount: "Create an Account",
  and: "and",
  "Match failed": "Match failed",
  "User not found": "User not found",
  verificationPending: "Confirm your email address",
  verificationPendingDetails: "A confirmation email has been sent to the email address you provided. Click on the confirmation link in the email to activate your account.",
  info:{
    emailSent: "Email sent",
    emailVerified: "Email verified",
    passwordChanged: "Password changed",
    passwordReset: "Password reset",

  },
  error: {
    minChar: "7 character minimum password.",
    pwOneLetter: "Password requires 1 letter.",
    pwOneDigit: "Password must have at least one digit.",
    pwNoMatch: "Passwords must match.",
    usernameRequired: "Username is required.",
    emailRequired: "Email is required.",
    signupCodeRequired: "Registration code is required.",
    signupCodeIncorrect: "Registration code is incorrect.",
    signInRequired: "You must be signed in to do that.",
    usernameIsEmail: "Username cannot be an email address.",
    emailNotVerified: "Please verify your email address first!"
  }
};

i18n.map("en", en);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_es.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var es = {
  signIn: "Entrar",
  signOut: "Salir",
  signUp: "Suscribir",
  OR: "O",
  forgotPassword: "Contraseña olvidada?",
  emailAddress: "Dirección de Email",
  emailResetLink: "Reiniciar Email",
  dontHaveAnAccount: "No tenés una cuenta?",
  resetYourPassword: "Resetear tu contraseña",
  updateYourPassword: "Actualizar tu contraseña",
  password: "Contraseña",
  usernameOrEmail: "Usuario o email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Si ya tenés una cuenta",
  signUpWithYourEmailAddress: "Suscribir con tu email",
  username: "Usuario",
  optional: "Opcional",
  signupCode: "Codigo para suscribir",
  clickAgree: "Si haces clic en Sucribir estas de acuerdo con la",
  privacyPolicy: "Póliza de Privacidad",
  terms: "Terminos de Uso",
  sign: "Ingresar",
  configure: "Disposición",
  "with": "con",
  createAccount: "Crear cuenta",
  and: "y",
  error: {
    minChar: "7 carácteres mínimo.",
    pwOneLetter: "mínimo una letra.",
    pwOneDigit: "mínimo un dígito.",
    usernameRequired: "Usuario es necesario.",
    emailRequired: "Email es necesario.",
    signupCodeRequired: "Código para suscribir es necesario.",
    signupCodeIncorrect: "Código para suscribir no coincide.",
    signInRequired: "Debes iniciar sesión para hacer eso.",
    usernameIsEmail: "Usuario no puede ser Email."
  }
};

i18n.map("es", es);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_fr.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var fr = {
  signIn: "Se Connecter",
  signin: "se connecter",
  signOut: "Se Deconnecter",
  signUp: "S'enregistrer",
  OR: "OU",
  forgotPassword: "Vous avez oublié votre mot de passe ?",
  emailAddress: "Adresse Email",
  emailResetLink: "Adresse pour reinitialiser votre mot de passe",
  dontHaveAnAccount: "Vous n'avez pas de compte ?",
  resetYourPassword: "Reinitialiser votre mot de passe",
  updateYourPassword: "Mettre à jour le mot de passe",
  password: "Mot de passe",
  usernameOrEmail: "Nom d'utilisateur ou email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Si vous avez déjà un compte",
  signUpWithYourEmailAddress: "S'enregistrer avec votre adresse email",
  username: "Nom d'utilisateur",
  optional: "Optionnel",
  signupCode: "Code d'inscription",
  clickAgree: "En cliquant sur S'enregistrer, vous acceptez notre",
  privacyPolicy: "Politique de confidentialité",
  terms: "Conditions d'utilisation",
  sign: "S'enregistrer",
  configure: "Configurer",
  "with": "avec",
  createAccount: "Créer un compte",
  and: "et",
  error: {
    minChar: "Votre mot de passe doit contenir au minimum 7 caractères.",
    pwOneLetter: "Votre mot de passe doit contenir au moins une lettre.",
    pwOneDigit: "Votre mot de passe doit contenir au moins un chiffre.",
    usernameRequired: "Un nom d'utilisateur est requis.",
    emailRequired: "Un email est requis.",
    signupCodeRequired: "Un code d'inscription est requis.",
    signupCodeIncorrect: "Le code d'enregistrement est incorrect.",
    signInRequired: "Vous devez être connecté pour continuer.",
    usernameIsEmail: "Le nom d'utilisateur ne peut être le même que l'adresse email."
  }
};

i18n.map("fr", fr);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_it.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var it = {
  signIn: "Accedi",
  signin: "accedi",
  signOut: "Esci",
  signUp: "Registrati",
  OR: "OPPURE",
  forgotPassword: "Hai dimenticato la password?",
  emailAddress: "Indirizzo Email",
  emailResetLink: "Invia Link di Reset",
  dontHaveAnAccount: "Non hai un account?",
  resetYourPassword: "Reimposta la password",
  updateYourPassword: "Aggiorna la password",
  password: "Password",
  usernameOrEmail: "Nome utente o email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Se hai già un account",
  signUpWithYourEmailAddress: "Registrati con il tuo indirizzo email",
  username: "Username",
  optional: "Opzionale",
  signupCode: "Codice di Registrazione",
  clickAgree: "Cliccando Registrati, accetti la nostra",
  privacyPolicy: "Privacy Policy",
  terms: "Termini di Servizio",
  sign: "Accedi",
  configure: "Configura",
  "with": "con",
  createAccount: "Crea un Account",
  and: "e",
  "Match failed": "Riscontro fallito",
  "User not found": "Utente non trovato",
  error: {
    minChar: "Password di almeno 7 caratteri.",
    pwOneLetter: "La Password deve contenere 1 lettera.",
    pwOneDigit: "La Password deve contenere almeno un numero.",
    usernameRequired: "Il Nome utente è obbligatorio.",
    emailRequired: "L'Email è obbligatoria.",
    signupCodeRequired: "Il Codice di Registrazione è obbligatorio.",
    signupCodeIncorrect: "Codice di Registrazione errato.",
    signInRequired: "Per fare questo devi accedere.",
    usernameIsEmail: "Il Nome Utente non può essere un indirizzo email."
  }
};

i18n.map("it", it);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_pl.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var pl = {
  signIn: "Zaloguj się",
  signin: "zaloguj się",
  signOut: "Wyloguj się",
  signUp: "Zarejestruj się",
  OR: "LUB",
  forgotPassword: "Zapomniałeś hasła?",
  emailAddress: "Adres email",
  emailResetLink: "Wyślij email z linkiem do zmiany hasła",
  dontHaveAnAccount: "Nie masz konta?",
  resetYourPassword: "Ustaw nowe hasło",
  updateYourPassword: "Zaktualizuj swoje hasło",
  password: "Hasło",
  usernameOrEmail: "Nazwa użytkownika lub email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Jeżeli już masz konto",
  signUpWithYourEmailAddress: "Zarejestruj się używając adresu email",
  username: "Nazwa użytkownika",
  optional: "Nieobowiązkowe",
  signupCode: "Kod rejestracji",
  clickAgree: "Klikając na Zarejestruj się zgadzasz się z naszą",
  privacyPolicy: "polityką prywatności",
  terms: "warunkami korzystania z serwisu",
  sign: "Podpisz",
  configure: "Konfiguruj",
  "with": "z",
  createAccount: "Utwórz konto",
  and: "i",
  error: {
    minChar: "7 znaków to minimalna długość hasła.",
    pwOneLetter: "Hasło musi zawierać 1 literę.",
    pwOneDigit: "Hasło musi zawierać przynajmniej jedną cyfrę.",
    usernameRequired: "Wymagana jest nazwa użytkownika.",
    emailRequired: "Wymagany jest adres email.",
    signupCodeRequired: "Wymagany jest kod rejestracji.",
    signupCodeIncorrect: "Kod rejestracji jest nieprawidłowy.",
    signInRequired: "Musisz być zalogowany, aby to zrobić.",
    usernameIsEmail: "Nazwa użytkownika nie może być adres e-mail."
  }
};

i18n.map("pl", pl);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_pt.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var pt = {
  signIn: "Entrar",
  signin: "Entrar",
  signOut: "Sair",
  signUp: "Registrar",
  OR: "OU",
  forgotPassword: "Esqueceu sua senha?",
  emailAddress: "Endereço de e-mail",
  emailResetLink: "Gerar nova senha",
  dontHaveAnAccount: "Não tem conta?",
  resetYourPassword: "Gerar nova senha",
  updateYourPassword: "Atualizar senha",
  password: "Senha",
  usernameOrEmail: "Usuario ou e-mail",
  email: "E-mail",
  ifYouAlreadyHaveAnAccount: "Se você já tem uma conta",
  signUpWithYourEmailAddress: "Entre usando seu endereço de e-mail",
  username: "Nome de usuário",
  optional: "Opcional",
  signupCode: "Código de acesso",
  clickAgree: "Ao clicar em Entrar, você aceita nosso",
  privacyPolicy: "Política de Privacidade",
  terms: "Termos de Uso",
  sign: "Entrar",
  configure: "Configurar",
  "with": "com",
  createAccount: "Criar Conta",
  and: "e",
  "Match failed": "Usuário ou senha não encontrado",
  "User not found": "Usuário não encontrado",
  error: {
    minChar: "Senha requer um mínimo de 7 caracteres.",
    pwOneLetter: "Senha deve conter pelo menos uma letra.",
    pwOneDigit: "Senha deve conter pelo menos um digito.",
    usernameRequired: "Nome de usuário é obrigatório.",
    emailRequired: "E-mail é obrigatório.",
    signupCodeRequired: "É necessário um código de acesso.",
    signupCodeIncorrect: "Código de acesso incorreto.",
    signInRequired: "Você precisa estar logado para fazer isso.",
    usernameIsEmail: "Nome de usuário não pode ser um endereço de e-mail."
  }
};

i18n.map("pt", pt);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_ru.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var ru = {
  signIn: "Войти",
  signin: "Войти",
  signOut: "Выйти",
  signUp: "Регистрация",
  OR: "ИЛИ",
  forgotPassword: "Забыли пароль?",
  emailAddress: "Email",
  emailResetLink: "Отправить ссылку для сброса",
  dontHaveAnAccount: "Нет аккаунта?",
  resetYourPassword: "Сбросить пароль",
  updateYourPassword: "Обновить пароль",
  password: "Пароль",
  usernameOrEmail: "Имя пользователя или email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Если у вас уже есть аккаунт",
  signUpWithYourEmailAddress: "Зарегистрируйтесь с вашим email адресом",
  username: "Имя пользователя",
  optional: "Необязательно",
  signupCode: "Регистрационный код",
  clickAgree: "Нажав на Регистрация вы соглашаетесь с условиями",
  privacyPolicy: "Политики безопасности",
  terms: "Условиями пользования",
  sign: "Подпись",
  configure: "Конфигурировать",
  "with": "с",
  createAccount: "Создать аккаунт",
  and: "и",
  "Match failed": "Не совпадают",
  "User not found": "Пользователь не найден",
  error: {
    minChar: "Минимальное кол-во символов для пароля 7.",
    pwOneLetter: "В пароле должна быть хотя бы одна буква.",
    pwOneDigit: "В пароле должна быть хотя бы одна цифра.",
    usernameRequired: "Имя пользователя обязательно.",
    emailRequired: "Email обязательно.",
    signupCodeRequired: "Необходим регистрациооный код.",
    signupCodeIncorrect: "Неправильный регистрационный код.",
    signInRequired: "Необходимо войти для чтобы продолжить.",
    usernameIsEmail: "Имя пользователя не может быть адресом email."
  }
};

i18n.map("ru", ru);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_sl.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var sl = {
  signIn: "Prijava",
  signin: "se prijavi",
  signOut: "Odjava",
  signUp: "Registracija",
  OR: "ALI",
  forgotPassword: "Pozabljeno geslo?",
  emailAddress: "Email naslov",
  emailResetLink: "Pošlji ponastavitveno povezavo",
  dontHaveAnAccount: "Nisi registriran(a)?",
  resetYourPassword: "Ponastavi geslo",
  updateYourPassword: "Spremeni geslo",
  password: "Geslo",
  usernameOrEmail: "Uporabniško ime ali email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Če si že registriran(a),",
  signUpWithYourEmailAddress: "Prijava z email naslovom",
  username: "Uporabniško ime",
  optional: "Po želji",
  signupCode: "Prijavna koda",
  clickAgree: "S klikom na Registracija se strinjaš",
  privacyPolicy: "z našimi pogoji uporabe",
  terms: "Pogoji uporabe",
  sign: "Prijava",
  configure: "Nastavi",
  "with": "z",
  createAccount: "Nova registracija",
  and: "in",
  "Match failed": "Prijava neuspešna",
  "User not found": "Uporabnik ne obstaja",
  "Incorrect password": "Napačno geslo",
  "Email already exists.": "Email že obstaja.",
  "Email is required": "Email je obvezen podatek",
  error: {
    minChar: "Geslo mora imeti vsaj sedem znakov.",
    pwOneLetter: "V geslu mora biti vsaj ena črka.",
    pwOneDigit: "V geslu mora biti vsaj ena številka.",
    usernameRequired: "Uporabniško ime je obvezen vnos.",
    emailRequired: "Email je obvezen vnos.",
    signupCodeRequired: "Prijavna koda je obvezen vnos.",
    signupCodeIncorrect: "Prijavna koda je napačna.",
    signInRequired: "Za to moraš biti prijavljen(a).",
    usernameIsEmail: "Uporabniško ime ne more biti email naslov."
  }
};

i18n.map("sl", sl);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/selaias_accounts-entry/shared/i18n/i18n_sv.js                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var sv = {
  signIn: "Logga in",
  signin: "logga in",
  signOut: "Logga ut",
  signUp: "Skapa konto",
  OR: "ELLER",
  forgotPassword: "Glömt din e-postadress?",
  emailAddress: "E-postadress",
  emailResetLink: "E-post återställningslänk",
  dontHaveAnAccount: "Har du inget konto?",
  resetYourPassword: "Återställ ditt lösenord",
  updateYourPassword: "Uppdatera ditt lösenord",
  password: "Lösenord",
  usernameOrEmail: "Användarnamn eller e-postadress",
  email: "E-postadress",
  ifYouAlreadyHaveAnAccount: "Om du redan har ett konto",
  signUpWithYourEmailAddress: "Skapa ett konto med din e-postadress",
  username: "Användarnamn",
  optional: "Valfri",
  signupCode: "Registreringskod",
  clickAgree: "När du väljer att skapa ett konto så godkänner du också vår",
  privacyPolicy: "integritetspolicy",
  terms: "användarvilkor",
  sign: "Logga",
  configure: "Konfigurera",
  "with": "med",
  createAccount: "Skapa ett konto",
  and: "och",
  "Match failed": "Matchning misslyckades",
  "User not found": "Användaren hittades inte",
  error: {
    minChar: "Det krävs minst 7 tecken i ditt lösenord.",
    pwOneLetter: "Lösenordet måste ha minst 1 bokstav.",
    pwOneDigit: "Lösenordet måste ha minst 1 siffra.",
    usernameRequired: "Det krävs ett användarnamn.",
    emailRequired: "Det krävs ett lösenord.",
    signupCodeRequired: "Det krävs en registreringskod.",
    signupCodeIncorrect: "Registreringskoden är felaktig.",
    signInRequired: "Inloggning krävs här.",
    usernameIsEmail: "Användarnamnet kan inte vara en e-postadress."
  }
};

i18n.map("sv", sv);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['selaias:accounts-entry'] = {}, {
  AccountsEntry: AccountsEntry,
  SimpleForm: SimpleForm
});

})();
