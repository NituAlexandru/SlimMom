# Backend Structure

**slim-mom-backend/**

├── **controllers/** 📂 _Controller Files_
│ ├── **authController.js** - Controler pentru autentificare
│ - Conține funcții pentru înregistrarea și autentificarea utilizatorilor.
│ - Funcții principale: `registerUser`, `loginUser`.
│ ├── **userController.js** - Controler pentru utilizatori
│ - Conține funcții pentru gestionarea operațiunilor legate de utilizatori.
│ - Funcții principale: (potențial `getUser`, `updateUser`, `deleteUser` dacă sunt necesare).
│ ├── **productController.js** - Controler pentru produse
│ - Conține funcții pentru gestionarea produselor.
│ - Funcții principale: `getProducts`, `addProduct`, `deleteProduct`, `searchProducts`.
│ ├── **calorieController.js** - Controler pentru calorii
│ - Conține funcții pentru calcularea aportului zilnic de calorii și obținerea listei de produse nerecomandate.
│ - Funcții principale: `getDailyIntake`.
│ ├── **userCalorieController.js** - Controler pentru caloriile utilizatorilor
│ - Conține funcții pentru gestionarea aportului zilnic de calorii al utilizatorilor.
│ - Funcții principale: `saveDailyIntake`, `getUserDailyIntake`.
│ ├── **consumedProductController.js** - Controler pentru produsele consumate
│ - Conține funcții pentru gestionarea produselor consumate de utilizatori.
│ - Funcții principale: `addConsumedProduct`, `deleteConsumedProduct`.
│ ├── **dayInfoController.js** - Controler pentru informațiile zilnice
│ - Conține funcții pentru obținerea informațiilor zilnice despre produsele consumate de utilizatori.
│ - Funcții principale: `getDayInfo`.
├── **middleware/** 🔒 _Middleware Files_
│ ├── **authMiddleware.js** - Middleware pentru autorizare
│ - Verifică dacă utilizatorul este autentificat înainte de a accesa rutele protejate.
├── **models/** 📦 _Model Files_
│ ├── **user.js** - Modelul utilizatorului
│ - Definește schema și modelul utilizatorului pentru MongoDB.
│ ├── **userCalorie.js** - Modelul pentru caloriile utilizatorilor
│ - Definește schema și modelul pentru gestionarea aportului zilnic de calorii al utilizatorilor.
│ ├── **consumedProduct.js** - Modelul pentru produsele consumate
│ - Definește schema și modelul pentru produsele consumate de utilizatori.
├── **routes/** 🌐 _Route Files_
│ ├── **auth.js** - Rutele pentru autentificare
│ - Definește rutele pentru înregistrare, autentificare și deconectare.
│ ├── **products.js** - Rutele pentru produse
│ - Definește rutele pentru obținerea, adăugarea, ștergerea și căutarea produselor.
│ ├── **calories.js** - Rutele pentru calorii
│ - Definește ruta publică pentru obținerea aportului zilnic de kcal și lista de produse nerecomandate.
│ ├── **userCalories.js** - Rutele pentru caloriile utilizatorilor
│ - Definește rutele pentru obținerea și salvarea aportului zilnic de kcal pentru utilizatori.
│ ├── **consumedProducts.js** - Rutele pentru produsele consumate
│ - Definește rutele pentru adăugarea și ștergerea produselor consumate de utilizatori.
│ ├── **dayInfo.js** - Rutele pentru informațiile zilnice
│ - Definește ruta pentru obținerea informațiilor zilnice despre produsele consumate.
├── **data/** 📂 _Data Files_
│ ├── **db.json** - Fișierul JSON cu datele produselor
│ - Stochează local datele despre produse.
├── **utils/** 🛠️ _Utility Files_
│ ├── **fileOperations.js** - Utilitar pentru operațiuni cu fișiere
│ - Conține funcții pentru citirea și scrierea datelor în fișierul `db.json`.
├── **docs/** 📄 _Documentation_
│ ├── **swagger.json** - Documentația Swagger
│ - Conține definițiile API-ului pentru documentare și testare cu Swagger.
├── **app.js** - Configurarea aplicației Express
│ - Configurează middleware-urile, rutele și exportă aplicația Express.
├── **server.js** - Pornirea serverului
│ - Conectează la baza de date MongoDB și pornește serverul Express.
├── **.env** - Fișier pentru variabile de mediu
│ - Conține variabile de mediu cum ar fi `PORT`, `DB_URI`, și `SECRET_KEY`.
├── **package.json** - Fișierul de configurare npm
│ - Specifică dependențele și scripturile pentru proiect.
└── **README.md** - Documentația proiectului
│ - Furnizează informații despre proiect, cum ar fi instrucțiunile de instalare și utilizare.
