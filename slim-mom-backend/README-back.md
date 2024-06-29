# Backend structure

slim-mom-backend/
├── controllers/
│ ├── authController.js # Controler pentru autentificare
│ ├── userController.js # Controler pentru utilizatori
│ ├── productController.js # Controler pentru produse
├── middleware/
│ ├── authMiddleware.js # Middleware pentru autorizare
├── models/
│ ├── User.js # Modelul utilizatorului (doar pentru validare)
├── routes/
│ ├── auth.js # Rutele pentru autentificare
│ ├── users.js # Rutele pentru utilizatori
│ ├── products.js # Rutele pentru produse
├── data/
│ ├── db.json # Fișierul JSON cu datele produselor
├── utils/
│ ├── fileOperations.js # Utilitar pentru operațiuni cu fișiere
├── docs/
│ ├── swagger.json # Documentația Swagger
├── app.js # Configurarea aplicației Express
├── server.js # Pornirea serverului
├── .env # Fișier pentru variabile de mediu
├── package.json
└── README.md
