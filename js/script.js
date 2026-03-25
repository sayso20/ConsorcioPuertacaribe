// script.js - Puerta Caribe local features (DB mock + UI flows)
(function () {
    'use strict';

    const STORAGE_KEYS = {
        seeded: 'pc_seeded_v1',
        testingCleanupDone: 'pc_testing_cleanup_v1',
        attractions: 'pc_attractions',
        hotels: 'pc_hotels',
        agencies: 'pc_agencies',
        events: 'pc_events',
        supportChannels: 'pc_support_channels',
        contactRequests: 'pc_contact_requests',
        recoveryTokens: 'pc_recovery_tokens',
        recoveryAttempts: 'pc_recovery_attempts',
        recoveryOutbox: 'pc_recovery_outbox',
        users: 'pc_users',
        session: 'pc_session',
    };

    const SeedData = {
        attractions: [
            { id: 1, nombre: 'Gran Malecon del Rio', categoria: 'Naturaleza', ubicacion: 'Barranquilla', descripcion: 'Recorrido junto al rio Magdalena, miradores y zona gastronomica.', contacto: '+57 300 111 1001', imagen: 'assets/imgs/turismo_sostnibleimg1.png', gancho: 'Vista al rio y sunsets imperdibles' },
            { id: 2, nombre: 'Museo del Caribe', categoria: 'Cultura', ubicacion: 'Centro Historico', descripcion: 'Exhibiciones sobre identidad, musica y patrimonio del Caribe colombiano.', contacto: '+57 300 111 1002', imagen: 'assets/banner/agenda_cultural.png', gancho: 'Plan cultural ideal para todo el dia' },
            { id: 3, nombre: 'Barrio Abajo y Carnaval', categoria: 'Cultura', ubicacion: 'Barrio Abajo', descripcion: 'Ruta guiada por historia del Carnaval y casas tradicionales.', contacto: '+57 300 111 1003', imagen: 'assets/imgs/servicios_turisticos_img.jpg', gancho: 'Tradicion viva y color en cada calle' },
            { id: 4, nombre: 'Playas de Puerto Colombia', categoria: 'Naturaleza', ubicacion: 'Puerto Colombia', descripcion: 'Plan de playa, gastronomia y atardeceres en el muelle.', contacto: '+57 300 111 1004', imagen: 'assets/imgs/turismo_sostenibleimg2.jpg', gancho: 'Brisa, mar y gastronomia local' },
            { id: 5, nombre: 'Ruta de Sabores del Atlantico', categoria: 'Gastronomia', ubicacion: 'Barranquilla', descripcion: 'Degustacion de butifarra, arepa de huevo y cocina local.', contacto: '+57 300 111 1005', imagen: 'assets/imgs/turismo_sostenibleimg2.jpg', gancho: 'Sabores tipicos en formato de experiencia' },
            { id: 6, nombre: 'Castillo de Salgar', categoria: 'Historia', ubicacion: 'Puerto Colombia', descripcion: 'Recorrido historico con vista al mar Caribe.', contacto: '+57 300 111 1006', imagen: 'assets/banner/desc_barranquilla.png', gancho: 'Panoramica costera para fotos memorables' },
        ],
        hotels: [
            { id: 1, nombre: 'Hotel Caribe Norte', zona: 'norte', tipo: '5estrellas', telefono: '+57 300 201 0001', email: 'reservas@caribenorte.demo', direccion: 'Cra 52 #80-20', imagen: 'assets/imgs/servicios_turisticos_img.jpg', precioDesde: '$420.000', destaque: 'Roof pool y skyline', puntuacion: '4.8' },
            { id: 2, nombre: 'Suites Malecon', zona: 'centro', tipo: '4estrellas', telefono: '+57 300 201 0002', email: 'info@suitesmalecon.demo', direccion: 'Via 40 #75-10', imagen: 'assets/banner/desc_barranquilla.png', precioDesde: '$310.000', destaque: 'Vista al malecon', puntuacion: '4.6' },
            { id: 3, nombre: 'Posada Rio Vivo', zona: 'centro', tipo: '3estrellas', telefono: '+57 300 201 0003', email: 'contacto@riovivo.demo', direccion: 'Calle 30 #45-08', imagen: 'assets/banner/agenda_cultural.png', precioDesde: '$220.000', destaque: 'Cercania a sitios culturales', puntuacion: '4.4' },
            { id: 4, nombre: 'Hostal La Arenosa', zona: 'sur', tipo: 'hostal', telefono: '+57 300 201 0004', email: 'hola@hostalarenosa.demo', direccion: 'Cra 8 #38-44', imagen: 'assets/imgs/turismo_sostnibleimg1.png', precioDesde: '$95.000', destaque: 'Plan economico y social', puntuacion: '4.2' },
            { id: 5, nombre: 'Eco Playa Lodge', zona: 'playa', tipo: '4estrellas', telefono: '+57 300 201 0005', email: 'ventas@ecoplaya.demo', direccion: 'Km 12 Via al Mar', imagen: 'assets/imgs/turismo_sostenibleimg2.jpg', precioDesde: '$360.000', destaque: 'A pasos del mar', puntuacion: '4.7' },
        ],
        agencies: [
            { id: 1, nombre: 'Viajes Puerta Dorada', telefono: '+57 300 301 0001', email: 'comercial@puertadorada.demo', horario: 'Lun-Vie 8:00-18:00 / Sab 8:00-13:00', especialidad: 'Circuitos urbanos' },
            { id: 2, nombre: 'Atlante Travel', telefono: '+57 300 301 0002', email: 'ventas@atlantetravel.demo', horario: 'Lun-Sab 9:00-18:00', especialidad: 'Paquetes premium' },
            { id: 3, nombre: 'Rutas Caribe SAS', telefono: '+57 300 301 0003', email: 'servicio@rutascaribe.demo', horario: 'Lun-Vie 8:30-17:30', especialidad: 'Tours gastronomicos' },
            { id: 4, nombre: 'Explora Barranquilla', telefono: '+57 300 301 0004', email: 'info@explorabq.demo', horario: 'Todos los dias 8:00-20:00', especialidad: 'Experiencias culturales' },
        ],
        events: [
            { id: 1, nombre: 'Noche de Tambora', categoria: 'Musica', fecha: '2026-03-28', lugar: 'Plaza de la Paz', ubicacion: 'Barranquilla', hora: '19:00', descripcion: 'Concierto de ritmos caribenos y agrupaciones locales.' },
            { id: 2, nombre: 'Feria Artesanal del Atlantico', categoria: 'Cultura', fecha: '2026-04-06', lugar: 'Centro de Eventos Puerta de Oro', ubicacion: 'Centro Historico', hora: '10:00', descripcion: 'Muestra de artesanos y diseno regional.' },
            { id: 3, nombre: 'Ruta Ecologica Manglar Vivo', categoria: 'Naturaleza', fecha: '2026-04-12', lugar: 'Cienaga de Mallorquin', ubicacion: 'Puerto Colombia', hora: '07:30', descripcion: 'Recorrido guiado por ecosistemas costeros.' },
            { id: 4, nombre: 'Festival de Cocina de Rio', categoria: 'Gastronomia', fecha: '2026-04-20', lugar: 'Malecon del Rio', ubicacion: 'Barranquilla', hora: '12:00', descripcion: 'Cocina en vivo y degustaciones de chefs locales.' },
            { id: 5, nombre: 'Encuentro de Danzas del Caribe', categoria: 'Cultura', fecha: '2026-05-03', lugar: 'Teatro Amira de la Rosa', hora: '18:30', descripcion: 'Presentaciones folcloricas de diferentes regiones.' },
            { id: 6, nombre: 'Sesion de Jazz al Rio', categoria: 'Musica', fecha: '2026-05-10', lugar: 'Gran Malecon', ubicacion: 'Barranquilla', hora: '20:00', descripcion: 'Concierto al aire libre con artistas invitados.' },
        ],
        supportChannels: [
            { id: 1, canal: 'Linea de atencion general', telefono: '+57 (5) 345 2200', correo: 'atencion@puertacaribe.com', horario: 'Lun-Vie 8:00-18:00' },
            { id: 2, canal: 'Soporte de reservas', telefono: '+57 300 555 1100', correo: 'reservas@puertacaribe.com', horario: 'Todos los dias 7:00-22:00' },
            { id: 3, canal: 'Asesoria a prestadores', telefono: '+57 300 555 1101', correo: 'prestadores@puertacaribe.com', horario: 'Lun-Vie 8:30-17:30' },
        ],
        contactRequests: [],
        recoveryTokens: [],
        recoveryAttempts: [],
        recoveryOutbox: [],
        users: [
            // Usuario Regular
            {
                id: 1001,
                username: 'visitante',
                email: 'visitante@puertacaribe.com',
                password: 'Visitante2026',
                nombre: 'Juan',
                apellido: 'Pérez',
                role: 'Usuario',
                createdAt: new Date().toISOString(),
            },
            // Empleado
            {
                id: 1002,
                username: 'empleado',
                email: 'empleado@puertacaribe.com',
                password: 'Empleado2026',
                nombre: 'María',
                apellido: 'García',
                role: 'Empleado',
                createdAt: new Date().toISOString(),
            },
            // Admin
            {
                id: 1003,
                username: 'admin',
                email: 'admin@puertacaribe.com',
                password: 'Admin2026',
                nombre: 'Carlos',
                apellido: 'Martínez',
                role: 'Admin',
                createdAt: new Date().toISOString(),
            },
            // Dueño
            {
                id: 1004,
                username: 'dueno',
                email: 'dueno@puertacaribe.com',
                password: 'Dueno2026',
                nombre: 'Roberto',
                apellido: 'López',
                role: 'Dueño',
                createdAt: new Date().toISOString(),
            },
        ],
    };

    function readStore(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (err) {
            return fallback;
        }
    }

    function writeStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const LocalDB = {
        ensureSeedData() {
            const seeded = localStorage.getItem(STORAGE_KEYS.seeded);
            if (!seeded) {
                writeStore(STORAGE_KEYS.attractions, SeedData.attractions);
                writeStore(STORAGE_KEYS.hotels, SeedData.hotels);
                writeStore(STORAGE_KEYS.agencies, SeedData.agencies);
                writeStore(STORAGE_KEYS.events, SeedData.events);
                writeStore(STORAGE_KEYS.supportChannels, SeedData.supportChannels);
                writeStore(STORAGE_KEYS.contactRequests, SeedData.contactRequests);
                writeStore(STORAGE_KEYS.recoveryTokens, SeedData.recoveryTokens);
                writeStore(STORAGE_KEYS.recoveryAttempts, SeedData.recoveryAttempts);
                writeStore(STORAGE_KEYS.recoveryOutbox, SeedData.recoveryOutbox);
                writeStore(STORAGE_KEYS.users, SeedData.users);
                localStorage.setItem(STORAGE_KEYS.seeded, '1');
            }
            this.repairMissingCollections();
            this.migrateEventLocations();
            this.migrateHotelCommercialFields();
            this.pruneTestingLocalData();
        },
        repairMissingCollections() {
            if (!Array.isArray(readStore(STORAGE_KEYS.attractions, null))) writeStore(STORAGE_KEYS.attractions, SeedData.attractions);
            if (!Array.isArray(readStore(STORAGE_KEYS.hotels, null))) writeStore(STORAGE_KEYS.hotels, SeedData.hotels);
            if (!Array.isArray(readStore(STORAGE_KEYS.agencies, null))) writeStore(STORAGE_KEYS.agencies, SeedData.agencies);
            if (!Array.isArray(readStore(STORAGE_KEYS.events, null))) writeStore(STORAGE_KEYS.events, SeedData.events);
            if (!Array.isArray(readStore(STORAGE_KEYS.supportChannels, null))) writeStore(STORAGE_KEYS.supportChannels, SeedData.supportChannels);
            if (!Array.isArray(readStore(STORAGE_KEYS.contactRequests, null))) writeStore(STORAGE_KEYS.contactRequests, []);
            if (!Array.isArray(readStore(STORAGE_KEYS.recoveryTokens, null))) writeStore(STORAGE_KEYS.recoveryTokens, []);
            if (!Array.isArray(readStore(STORAGE_KEYS.recoveryAttempts, null))) writeStore(STORAGE_KEYS.recoveryAttempts, []);
            if (!Array.isArray(readStore(STORAGE_KEYS.recoveryOutbox, null))) writeStore(STORAGE_KEYS.recoveryOutbox, []);
            if (!Array.isArray(readStore(STORAGE_KEYS.users, null))) writeStore(STORAGE_KEYS.users, SeedData.users);
        },
        migrateEventLocations() {
            const current = this.getEvents();
            const catalog = SeedData.events;
            const byId = new Map(catalog.map((row) => [row.id, row]));
            let changed = false;

            const next = current.map((event) => {
                const seed = byId.get(event.id);
                if (!seed) return event;
                if (!event.ubicacion && seed.ubicacion) {
                    changed = true;
                    return Object.assign({}, event, { ubicacion: seed.ubicacion });
                }
                return event;
            });

            if (changed) writeStore(STORAGE_KEYS.events, next);
        },
        migrateHotelCommercialFields() {
            const current = this.getHotels();
            const catalog = SeedData.hotels;
            const byId = new Map(catalog.map((row) => [row.id, row]));
            let changed = false;

            const next = current.map((hotel) => {
                const seed = byId.get(hotel.id);
                if (!seed) return hotel;

                const patch = {};
                if (!hotel.precioDesde && seed.precioDesde) patch.precioDesde = seed.precioDesde;
                if (!hotel.destaque && seed.destaque) patch.destaque = seed.destaque;
                if (!hotel.puntuacion && seed.puntuacion) patch.puntuacion = seed.puntuacion;
                if (!hotel.imagen && seed.imagen) patch.imagen = seed.imagen;

                if (Object.keys(patch).length) {
                    changed = true;
                    return Object.assign({}, hotel, patch);
                }
                return hotel;
            });

            if (changed) writeStore(STORAGE_KEYS.hotels, next);
        },
        pruneTestingLocalData() {
            if (localStorage.getItem(STORAGE_KEYS.testingCleanupDone) === '1') return;

            const allowedByEmail = new Map(SeedData.users.map((u) => [normalizeToken(u.email), u]));
            const allowedByUsername = new Map(SeedData.users.map((u) => [normalizeToken(u.username), u]));
            const cleanUsers = SeedData.users.map((seedUser) => {
                const current = this.getUsers().find((u) => normalizeToken(u.email) === normalizeToken(seedUser.email)
                    || normalizeToken(u.username) === normalizeToken(seedUser.username));
                return Object.assign({}, seedUser, {
                    createdAt: current?.createdAt || seedUser.createdAt,
                    updatedAt: current?.updatedAt,
                });
            });

            const filteredUsers = this.getUsers().filter((u) => {
                return allowedByEmail.has(normalizeToken(u.email)) || allowedByUsername.has(normalizeToken(u.username));
            });

            if (filteredUsers.length !== cleanUsers.length) {
                this.saveUsers(cleanUsers);
            } else {
                this.saveUsers(cleanUsers);
            }

            // Limpiar artefactos temporales de pruebas.
            writeStore(STORAGE_KEYS.recoveryTokens, []);
            writeStore(STORAGE_KEYS.recoveryAttempts, []);
            writeStore(STORAGE_KEYS.recoveryOutbox, []);
            writeStore(STORAGE_KEYS.contactRequests, SeedData.contactRequests);

            const session = readStore(STORAGE_KEYS.session, null);
            if (session) {
                const validSession = cleanUsers.find((u) => u.id === session.userId);
                if (!validSession) localStorage.removeItem(STORAGE_KEYS.session);
            }

            localStorage.setItem(STORAGE_KEYS.testingCleanupDone, '1');
        },
        getAttractions() { return readStore(STORAGE_KEYS.attractions, []); },
        getHotels() { return readStore(STORAGE_KEYS.hotels, []); },
        saveHotels(hotels) { writeStore(STORAGE_KEYS.hotels, hotels); },
        getAgencies() { return readStore(STORAGE_KEYS.agencies, []); },
        saveAgencies(agencies) { writeStore(STORAGE_KEYS.agencies, agencies); },
        getEvents() { return readStore(STORAGE_KEYS.events, []); },
        saveEvents(events) { writeStore(STORAGE_KEYS.events, events); },
        getSupportChannels() { return readStore(STORAGE_KEYS.supportChannels, []); },
        getContactRequests() { return readStore(STORAGE_KEYS.contactRequests, []); },
        saveContactRequests(requests) { writeStore(STORAGE_KEYS.contactRequests, requests); },
        getRecoveryTokens() { return readStore(STORAGE_KEYS.recoveryTokens, []); },
        saveRecoveryTokens(tokens) { writeStore(STORAGE_KEYS.recoveryTokens, tokens); },
        getRecoveryAttempts() { return readStore(STORAGE_KEYS.recoveryAttempts, []); },
        saveRecoveryAttempts(attempts) { writeStore(STORAGE_KEYS.recoveryAttempts, attempts); },
        getRecoveryOutbox() { return readStore(STORAGE_KEYS.recoveryOutbox, []); },
        saveRecoveryOutbox(rows) { writeStore(STORAGE_KEYS.recoveryOutbox, rows); },
        saveContactRequest(request) {
            const current = this.getContactRequests();
            current.unshift(request);
            writeStore(STORAGE_KEYS.contactRequests, current);
        },
        getUsers() { return readStore(STORAGE_KEYS.users, []); },
        saveUsers(users) { writeStore(STORAGE_KEYS.users, users); },
    };

    function normalizeToken(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function showMessage(message, type) {
        const id = 'pc-toast';
        let toast = document.getElementById(id);
        if (!toast) {
            toast = document.createElement('div');
            toast.id = id;
            toast.style.position = 'fixed';
            toast.style.right = '20px';
            toast.style.bottom = '20px';
            toast.style.padding = '12px 16px';
            toast.style.borderRadius = '8px';
            toast.style.zIndex = '9999';
            toast.style.fontFamily = 'Montserrat, sans-serif';
            toast.style.fontSize = '12px';
            toast.style.maxWidth = '360px';
            toast.style.boxShadow = '0 10px 24px rgba(0,0,0,0.35)';
            document.body.appendChild(toast);
        }

        if (type === 'error') {
            toast.style.background = '#b42318';
            toast.style.color = '#fff';
        } else if (type === 'success') {
            toast.style.background = '#157347';
            toast.style.color = '#fff';
        } else {
            toast.style.background = '#0a2647';
            toast.style.color = '#fff';
        }
        toast.textContent = message;
        toast.hidden = false;
        window.clearTimeout(toast._timer);
        toast._timer = window.setTimeout(() => { toast.hidden = true; }, 2800);
    }

    // Permite reutilizar el toast desde scripts inline en paginas externas al modulo.
    window.showMessage = showMessage;

    function computeHash(text) {
        let hash = 0;
        const source = String(text || '');
        for (let i = 0; i < source.length; i += 1) {
            hash = ((hash << 5) - hash) + source.charCodeAt(i);
            hash |= 0;
        }
        return String(hash);
    }

    function randomRecoveryCode() {
        return String(Math.floor(100000 + Math.random() * 900000));
    }

    const RecoveryService = {
        REQUEST_WINDOW_MS: 15 * 60 * 1000,
        CODE_TTL_MS: 15 * 60 * 1000,
        MAX_REQUESTS: 3,
        MAX_CODE_TRIES: 5,

        getNormalizedEmail(email) {
            return normalizeToken(email);
        },

        registerRequestAttempt(emailNorm) {
            const attempts = LocalDB.getRecoveryAttempts();
            const now = Date.now();
            const current = attempts.find((row) => row.emailNorm === emailNorm);

            if (!current) {
                attempts.push({ emailNorm: emailNorm, count: 1, windowStart: now });
                LocalDB.saveRecoveryAttempts(attempts);
                return true;
            }

            if ((now - current.windowStart) > this.REQUEST_WINDOW_MS) {
                current.count = 1;
                current.windowStart = now;
                LocalDB.saveRecoveryAttempts(attempts);
                return true;
            }

            current.count += 1;
            LocalDB.saveRecoveryAttempts(attempts);
            return current.count <= this.MAX_REQUESTS;
        },

        clearExpiredTokens() {
            const now = Date.now();
            const active = LocalDB.getRecoveryTokens().filter((row) => !row.usedAt && row.expiresAt > now);
            LocalDB.saveRecoveryTokens(active);
        },

        createResetRequest(email) {
            const emailNorm = this.getNormalizedEmail(email);
            const allowed = this.registerRequestAttempt(emailNorm);
            const user = AuthService.findUserByEmail(email);

            if (!allowed) {
                return { accepted: true, genericMessage: 'Si existe una cuenta, enviaremos instrucciones de recuperacion.' };
            }

            if (!user) {
                return { accepted: true, genericMessage: 'Si existe una cuenta, enviaremos instrucciones de recuperacion.' };
            }

            this.clearExpiredTokens();

            const code = randomRecoveryCode();
            const now = Date.now();
            const record = {
                id: Date.now(),
                userId: user.id,
                emailNorm: emailNorm,
                codeHash: computeHash(emailNorm + ':' + code),
                expiresAt: now + this.CODE_TTL_MS,
                createdAt: now,
                triesLeft: this.MAX_CODE_TRIES,
                usedAt: null,
            };

            const tokens = LocalDB.getRecoveryTokens().filter((row) => row.emailNorm !== emailNorm || row.usedAt);
            tokens.unshift(record);
            LocalDB.saveRecoveryTokens(tokens);

            const outbox = LocalDB.getRecoveryOutbox();
            outbox.unshift({
                email: user.email,
                code: code,
                createdAt: now,
                expiresAt: record.expiresAt,
            });
            LocalDB.saveRecoveryOutbox(outbox.slice(0, 10));

            return {
                accepted: true,
                genericMessage: 'Si existe una cuenta, enviaremos instrucciones de recuperacion.',
                hasLocalCode: true,
                localCode: code,
            };
        },

        consumeCode(email, code, newPassword) {
            const emailNorm = this.getNormalizedEmail(email);
            this.clearExpiredTokens();
            const tokens = LocalDB.getRecoveryTokens();
            const token = tokens.find((row) => row.emailNorm === emailNorm && !row.usedAt);
            if (!token) return { success: false, message: 'Codigo invalido o expirado.' };

            if (token.triesLeft <= 0) {
                token.usedAt = Date.now();
                LocalDB.saveRecoveryTokens(tokens);
                return { success: false, message: 'Codigo invalido o expirado.' };
            }

            const expected = computeHash(emailNorm + ':' + String(code || '').trim());
            if (expected !== token.codeHash) {
                token.triesLeft -= 1;
                if (token.triesLeft <= 0) token.usedAt = Date.now();
                LocalDB.saveRecoveryTokens(tokens);
                return { success: false, message: 'Codigo invalido o expirado.' };
            }

            const user = AuthService.findUserByEmail(String(email || '').trim());
            if (!user) {
                token.usedAt = Date.now();
                LocalDB.saveRecoveryTokens(tokens);
                return { success: false, message: 'No fue posible completar la recuperacion.' };
            }

            const ok = AuthService.updatePasswordByEmail(user.email, newPassword);
            if (!ok) return { success: false, message: 'No fue posible completar la recuperacion.' };

            token.usedAt = Date.now();
            LocalDB.saveRecoveryTokens(tokens);
            return { success: true, message: 'Contrasena actualizada correctamente.' };
        },
    };

    const AuthService = {
        register(userData) {
            const users = LocalDB.getUsers();
            const exists = users.find((u) => u.username.toLowerCase() === userData.username.toLowerCase() || u.email.toLowerCase() === userData.email.toLowerCase());
            if (exists) {
                return { success: false, message: 'El usuario o correo ya existe.' };
            }
            const newUser = {
                id: Date.now(),
                username: userData.username,
                email: userData.email,
                password: userData.password,
                nombre: userData.nombre,
                apellido: userData.apellido,
                role: 'Usuario',
                createdAt: new Date().toISOString(),
            };
            users.push(newUser);
            LocalDB.saveUsers(users);
            this.setSession(newUser);
            return { success: true, user: newUser };
        },
        login(credentials) {
            const users = LocalDB.getUsers();
            const user = users.find((u) => (u.username.toLowerCase() === credentials.usernameOrEmail.toLowerCase() || u.email.toLowerCase() === credentials.usernameOrEmail.toLowerCase()) && u.password === credentials.password);
            if (!user) {
                return { success: false, message: 'Usuario o contraseña incorrectos.' };
            }
            this.setSession(user);
            return { success: true, user: user };
        },
        setSession(user) {
            const session = {
                userId: user.id,
                username: user.username,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                role: user.role || 'Usuario',
                loggedInAt: new Date().toISOString(),
            };
            writeStore(STORAGE_KEYS.session, session);
        },
        getSession() {
            return readStore(STORAGE_KEYS.session, null);
        },
        isAuthenticated() {
            return !!this.getSession();
        },
        logout() {
            localStorage.removeItem(STORAGE_KEYS.session);
            this.updateUI();
            return { success: true };
        },
        findUserByEmail(email) {
            return LocalDB.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
        },
        updatePasswordByEmail(email, newPassword) {
            const users = LocalDB.getUsers();
            const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
            if (idx < 0) return false;
            users[idx].password = newPassword;
            users[idx].updatedAt = new Date().toISOString();
            LocalDB.saveUsers(users);
            return true;
        },
        updateUI() {
            const loginBtn = document.querySelector('.btn-login');
            const session = this.getSession();
            if (loginBtn) {
                if (session) {
                    loginBtn.textContent = session.nombre || session.username;
                    loginBtn.href = 'mi-cuenta.html';
                } else {
                    loginBtn.textContent = 'Iniciar sesion';
                    loginBtn.href = 'perfil.html';
                }
            }

            const headerActions = document.querySelector('.navbar-actions');
            let logoutBtn = document.querySelector('.btn-logout');
            if (session && headerActions && !logoutBtn) {
                logoutBtn = document.createElement('a');
                logoutBtn.href = '#';
                logoutBtn.className = 'btn-logout';
                logoutBtn.textContent = 'Salir';
                headerActions.appendChild(logoutBtn);
            }
            if (!session && logoutBtn) {
                logoutBtn.remove();
            }

            bindLogoutButtons();
        },
    };

    window.AuthService = AuthService;
    window.LocalDB = LocalDB;

    function validateRegistration(data) {
        const errors = [];
        if (data.username.length < 4) errors.push('El usuario debe tener al menos 4 caracteres.');
        if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.push('Ingresa un correo valido.');
        if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(data.password)) {
            errors.push('La contraseña debe tener 8+ caracteres, una mayuscula y un numero.');
        }
        if (data.nombre.length < 2) errors.push('El nombre es obligatorio.');
        if (data.apellido.length < 2) errors.push('El apellido es obligatorio.');
        if (!data.acceptPrivacy || !data.acceptTerms) errors.push('Debes aceptar politicas y terminos.');
        return errors;
    }

    function initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href') || '';
                if (href.charAt(0) === '#') {
                    e.preventDefault();
                    const target = document.getElementById(href.substring(1));
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initializePasswordToggles() {
        const buttons = document.querySelectorAll('.toggle-password');
        buttons.forEach((btn) => {
            btn.addEventListener('click', function () {
                const input = this.parentElement.querySelector('input');
                if (!input) return;
                input.type = input.type === 'password' ? 'text' : 'password';
            });
        });
    }

    function initializeProfileTabs() {
        const profileTabBtns = document.querySelectorAll('.perfil-tab-btn');
        const profileTabContents = document.querySelectorAll('.perfil-tab-content');
        profileTabBtns.forEach((btn) => {
            btn.addEventListener('click', function () {
                const target = this.getAttribute('data-tab');
                profileTabBtns.forEach((b) => b.classList.remove('active'));
                profileTabContents.forEach((c) => c.classList.remove('active'));
                this.classList.add('active');
                const content = document.getElementById(target);
                if (content) content.classList.add('active');
            });
        });

        const modalTabBtns = document.querySelectorAll('.tab-btn');
        const modalTabContents = document.querySelectorAll('.tab-content');
        modalTabBtns.forEach((btn) => {
            btn.addEventListener('click', function () {
                const target = this.getAttribute('data-tab');
                modalTabBtns.forEach((b) => b.classList.remove('active'));
                modalTabContents.forEach((c) => c.classList.remove('active'));
                this.classList.add('active');
                const content = document.getElementById(target);
                if (content) content.classList.add('active');
            });
        });
    }

    function bindLogoutButtons() {
        const logoutButtons = document.querySelectorAll('#logoutBtn, .btn-logout');
        logoutButtons.forEach((btn) => {
            if (btn.dataset.bound === '1') return;
            btn.dataset.bound = '1';
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                AuthService.logout();
                showMessage('Sesion cerrada correctamente.', 'success');
                window.setTimeout(() => { window.location.href = 'index.html'; }, 500);
            });
        });
    }

    function initializeAuthForms() {
        const loginForms = document.querySelectorAll('form#loginForm');
        loginForms.forEach((form) => {
            if (form.dataset.bound === '1') return;
            form.dataset.bound = '1';
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const userInput = form.querySelector('input[type="text"], input[type="email"]');
                const passInput = form.querySelector('input[type="password"]');
                const submitBtn = form.querySelector('.perfil-btn-submit, .btn-submit');
                const usernameOrEmail = userInput ? userInput.value.trim() : '';
                const password = passInput ? passInput.value : '';

                if (!usernameOrEmail || !password) {
                    showMessage('Completa usuario/correo y contraseña.', 'error');
                    return;
                }

                if (submitBtn) {
                    submitBtn.disabled = true;
                }
                const result = AuthService.login({ usernameOrEmail: usernameOrEmail, password: password });
                if (!result.success) {
                    showMessage(result.message, 'error');
                    if (submitBtn) submitBtn.disabled = false;
                    return;
                }
                showMessage('Sesion iniciada.', 'success');
                window.location.href = 'mi-cuenta.html';
            });
        });

        const registerForms = document.querySelectorAll('form#registerForm');
        registerForms.forEach((form) => {
            if (form.dataset.bound === '1') return;
            form.dataset.bound = '1';
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const inputs = Array.from(form.querySelectorAll('input')).filter((i) => i.type !== 'checkbox');
                const checks = form.querySelectorAll('input[type="checkbox"]');
                if (inputs.length < 5) {
                    showMessage('Formulario de registro incompleto.', 'error');
                    return;
                }

                const payload = {
                    username: inputs[0].value.trim(),
                    email: inputs[1].value.trim(),
                    password: inputs[2].value,
                    nombre: inputs[3].value.trim(),
                    apellido: inputs[4].value.trim(),
                    acceptPrivacy: checks[0] ? checks[0].checked : false,
                    acceptTerms: checks[1] ? checks[1].checked : false,
                };

                const errors = validateRegistration(payload);
                if (errors.length > 0) {
                    showMessage(errors[0], 'error');
                    return;
                }

                const submitBtn = form.querySelector('.perfil-btn-submit, .btn-submit');
                if (submitBtn) submitBtn.disabled = true;

                const result = AuthService.register(payload);
                if (!result.success) {
                    showMessage(result.message, 'error');
                    if (submitBtn) submitBtn.disabled = false;
                    return;
                }

                showMessage('Registro completado. Sesion activa.', 'success');
                window.location.href = 'mi-cuenta.html';
            });
        });
    }

    function initializePasswordRecovery() {
        const searchForm = document.getElementById('recuperarForm');
        const resetForm = document.getElementById('resetPasswordForm');
        const messageBox = document.getElementById('recuperarMensaje');
        const messageText = document.getElementById('recuperarMensajeTexto');
        const testCodeBtn = document.getElementById('showLocalRecoveryCode');
        if (!searchForm) return;

        let recoveryEmail = '';
        let localTestingCode = '';

        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('recuperarEmail');
            const email = emailInput ? emailInput.value.trim() : '';
            if (!email) {
                showMessage('Ingresa un correo valido.', 'error');
                return;
            }
            recoveryEmail = email;

            const result = RecoveryService.createResetRequest(email);
            localTestingCode = result.localCode || '';

            if (resetForm) resetForm.style.display = 'flex';
            if (messageBox && messageText) {
                messageText.textContent = result.genericMessage;
                messageBox.style.display = 'block';
            }
            if (testCodeBtn) {
                testCodeBtn.style.display = result.hasLocalCode ? 'inline-block' : 'none';
            }
        });

        if (testCodeBtn) {
            testCodeBtn.addEventListener('click', function () {
                if (!localTestingCode) {
                    showMessage('No hay codigo local disponible para este correo.', 'error');
                    return;
                }
                showMessage('Codigo local de prueba: ' + localTestingCode, 'info');
            });
        }

        if (resetForm) {
            resetForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const codeInput = document.getElementById('codigoRecuperacion');
                const pass1 = document.getElementById('nuevaContrasena');
                const pass2 = document.getElementById('confirmarContrasena');
                const code = codeInput ? codeInput.value.trim() : '';
                const newPassword = pass1 ? pass1.value : '';
                const confirmPassword = pass2 ? pass2.value : '';
                if (!recoveryEmail) {
                    showMessage('Primero solicita el codigo de recuperacion.', 'error');
                    return;
                }
                if (!code) {
                    showMessage('Ingresa el codigo de recuperacion.', 'error');
                    return;
                }
                if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
                    showMessage('La nueva contraseña debe tener 8+ caracteres, una mayuscula y un numero.', 'error');
                    return;
                }
                if (newPassword !== confirmPassword) {
                    showMessage('Las contraseñas no coinciden.', 'error');
                    return;
                }
                const result = RecoveryService.consumeCode(recoveryEmail, code, newPassword);
                if (!result.success) {
                    showMessage(result.message, 'error');
                    return;
                }
                if (messageBox && messageText) {
                    messageText.textContent = 'Contrasena actualizada. Ya puedes iniciar sesion con tu nueva clave.';
                    messageBox.style.display = 'block';
                }
                resetForm.style.display = 'none';
                searchForm.style.display = 'none';
                if (testCodeBtn) testCodeBtn.style.display = 'none';
            });
        }
    }

    function renderCards(items, targetId, renderer, emptyId) {
        const container = document.getElementById(targetId);
        const empty = emptyId ? document.getElementById(emptyId) : null;
        if (!container) return;
        container.innerHTML = '';
        if (!items.length) {
            if (empty) empty.hidden = false;
            return;
        }
        if (empty) empty.hidden = true;
        items.forEach((item) => {
            const card = document.createElement('article');
            card.className = 'dynamic-card';
            card.innerHTML = renderer(item);
            container.appendChild(card);
        });
    }

    function toTitleCase(value) {
        return String(value || '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    function getInitials(text) {
        const parts = String(text || '').trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return 'PC';
        return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    }

    function getAttractionImage(item) {
        return item.imagen || 'assets/banner/desc_barranquilla.png';
    }

    function getHotelImage(item) {
        return item.imagen || 'assets/imgs/servicios_turisticos_img.jpg';
    }

    function initializeDescubreAttractions() {
        const grid = document.getElementById('atractivosGrid');
        if (!grid) return;

        const filtersBox = document.getElementById('attractionFilters');
        const all = LocalDB.getAttractions();
        const categories = ['Todos'].concat(Array.from(new Set(all.map((a) => a.categoria))));
        let activeCategory = 'Todos';

        if (filtersBox) {
            filtersBox.innerHTML = '';
            categories.forEach((cat) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'filter-badge' + (cat === 'Todos' ? ' active' : '');
                button.textContent = cat;
                button.addEventListener('click', () => {
                    activeCategory = cat;
                    filtersBox.querySelectorAll('.filter-badge').forEach((b) => b.classList.remove('active'));
                    button.classList.add('active');
                    draw();
                });
                filtersBox.appendChild(button);
            });
        }

        function draw() {
            const rows = activeCategory === 'Todos' ? all : all.filter((a) => a.categoria === activeCategory);
            renderCards(
                rows,
                'atractivosGrid',
                (a) =>
                    '<!-- Vincula la ubicacion del atractivo con el filtro de agenda -->' +
                    '<div class="dynamic-media"><img src="' + getAttractionImage(a) + '" alt="' + a.nombre + '"></div>' +
                    '<div class="dynamic-card-content">' +
                    '<p class="card-tag">' + a.categoria + ' - ' + a.ubicacion + '</p>' +
                    '<h3>' + a.nombre + '</h3>' +
                    '<p class="card-highlight">' + (a.gancho || 'Experiencia recomendada') + '</p>' +
                    '<p>' + a.descripcion + '</p>' +
                    '<a class="card-cta" href="agenda.html?ubicacion=' + encodeURIComponent(a.ubicacion || '') + '&atractivo=' + encodeURIComponent(a.nombre || '') + '">Ver plan sugerido</a>' +
                    '</div>',
                'atractivosEmpty'
            );
        }

        draw();
    }

    function initializeServicios() {
        const canales = LocalDB.getSupportChannels();
        renderCards(
            canales,
            'canalesAtencion',
            (c) =>
                '<div class="dynamic-card-content">' +
                '<h3>' + c.canal + '</h3>' +
                '<p><strong>Telefono:</strong> ' + c.telefono + '</p>' +
                '<p><strong>Correo:</strong> ' + c.correo + '</p>' +
                '<p><strong>Horario:</strong> ' + c.horario + '</p>' +
                '</div>'
        );

        const agencies = LocalDB.getAgencies();
        renderCards(
            agencies,
            'agenciasGrid',
            (a) =>
                '<div class="dynamic-card-content">' +
                '<div class="agency-head">' +
                '<div class="agency-logo-placeholder">' + getInitials(a.nombre) + '</div>' +
                '<div>' +
                '<p class="card-tag">Agencia registrada</p>' +
                '<h3>' + a.nombre + '</h3>' +
                '</div>' +
                '</div>' +
                '<p class="card-highlight">' + (a.especialidad || 'Asesoria de viaje') + '</p>' +
                '<p><strong>Telefono:</strong> ' + a.telefono + '</p>' +
                '<p><strong>Correo:</strong> ' + a.email + '</p>' +
                '<p><strong>Horario:</strong> ' + a.horario + '</p>' +
                '</div>'
        );

        const hotelForm = document.querySelector('.servicios-form');
        const zonaSelect = document.getElementById('zona');
        const tipoSelect = document.getElementById('tipo');
        const hotels = LocalDB.getHotels();
        function renderHotels(list) {
            renderCards(
                list,
                'hotelesResultados',
                (h) =>
                    '<div class="dynamic-media hotel-media"><img src="' + getHotelImage(h) + '" alt="' + h.nombre + '"></div>' +
                    '<div class="dynamic-card-content">' +
                    '<p class="card-tag">' + toTitleCase(h.zona) + ' - ' + toTitleCase(h.tipo) + '</p>' +
                    '<h3>' + h.nombre + '</h3>' +
                    '<p class="card-highlight">' + (h.destaque || 'Alojamiento recomendado') + '</p>' +
                    '<p><strong>Desde:</strong> ' + (h.precioDesde || '$0') + ' / noche</p>' +
                    '<p><strong>Puntuacion:</strong> ' + (h.puntuacion || '4.5') + ' / 5</p>' +
                    '<p><strong>Direccion:</strong> ' + h.direccion + '</p>' +
                    '<button type="button" class="card-cta hotel-contact-cta" data-hotel="' + h.nombre + '" data-zona="' + h.zona + '" data-tipo="' + h.tipo + '">Solicitar disponibilidad</button>' +
                    '</div>',
                'hotelesEmpty'
            );
        }

        function applyHotelFilters() {
            const zona = zonaSelect ? zonaSelect.value : '';
            const tipo = tipoSelect ? tipoSelect.value : '';
            const filtered = hotels.filter((h) => (!zona || h.zona === zona) && (!tipo || h.tipo === tipo));
            renderHotels(filtered);
        }

        renderHotels(hotels);

        if (hotelForm) {
            hotelForm.addEventListener('submit', function (e) {
                e.preventDefault();
                applyHotelFilters();
            });
        }

        if (zonaSelect) zonaSelect.addEventListener('change', applyHotelFilters);
        if (tipoSelect) tipoSelect.addEventListener('change', applyHotelFilters);

        const hotelesResultados = document.getElementById('hotelesResultados');
        if (hotelesResultados && hotelesResultados.dataset.bound !== '1') {
            hotelesResultados.dataset.bound = '1';
            hotelesResultados.addEventListener('click', function (e) {
                const trigger = e.target.closest('.hotel-contact-cta');
                if (!trigger) return;

                const contactoSection = document.getElementById('contactoForm');
                const temaInput = document.getElementById('contacto-tema');
                const mensajeInput = document.getElementById('contacto-mensaje');
                if (!contactoSection || !mensajeInput) return;

                const sessionData = AuthService.getSession();
                const displayName = sessionData ? ((sessionData.nombre || '') + (sessionData.apellido ? ' ' + sessionData.apellido : '')).trim() : '';
                const intro = displayName ? ('Hola, soy ' + displayName + '.') : 'Hola,';
                const hotelName = trigger.getAttribute('data-hotel') || 'este hotel';
                const hotelZona = toTitleCase(trigger.getAttribute('data-zona') || '');
                const hotelTipo = toTitleCase(trigger.getAttribute('data-tipo') || '');

                if (temaInput) temaInput.value = 'hotel';
                mensajeInput.value = intro + ' Me interesa una cotizacion para ' + hotelName + ' (' + hotelZona + ', ' + hotelTipo + ').';

                contactoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                mensajeInput.focus();
                showMessage('Te llevamos al formulario con mensaje sugerido.', 'info');
            });
        }

        const contactoForm = document.getElementById('contactoForm');

        if (contactoForm) {
            const session = AuthService.getSession();
            const nombreInput = document.getElementById('contacto-nombre');
            const emailInput = document.getElementById('contacto-email');
            const telefonoInput = document.getElementById('contacto-telefono');

            if (session) {
                if (nombreInput) {
                    nombreInput.value = (session.nombre || '') + (session.apellido ? ' ' + session.apellido : '');
                    nombreInput.readOnly = true;
                    nombreInput.classList.add('field-locked');
                }
                if (emailInput) {
                    emailInput.value = session.email || '';
                    emailInput.readOnly = true;
                    emailInput.classList.add('field-locked');
                }

                if (telefonoInput) {
                    const lastForUser = LocalDB.getContactRequests().find((r) => normalizeToken(r.email) === normalizeToken(session.email));
                    if (lastForUser && lastForUser.telefono) {
                        telefonoInput.value = lastForUser.telefono;
                    }
                }
            }

            contactoForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const sessionData = AuthService.getSession();
                const payload = {
                    id: Date.now(),
                    nombre: sessionData
                        ? ((sessionData.nombre || '') + (sessionData.apellido ? ' ' + sessionData.apellido : '')).trim()
                        : (((document.getElementById('contacto-nombre') || {}).value || '').trim()),
                    email: sessionData
                        ? (sessionData.email || '').trim()
                        : (((document.getElementById('contacto-email') || {}).value || '').trim()),
                    telefono: ((document.getElementById('contacto-telefono') || {}).value || '').trim(),
                    tema: ((document.getElementById('contacto-tema') || {}).value || '').trim(),
                    mensaje: ((document.getElementById('contacto-mensaje') || {}).value || '').trim(),
                    fecha: new Date().toLocaleString('es-CO'),
                    userId: sessionData ? sessionData.userId : null,
                };

                if (!payload.nombre || !payload.email || !payload.telefono || !payload.tema || !payload.mensaje) {
                    showMessage('Completa todos los campos del formulario de contacto.', 'error');
                    return;
                }

                LocalDB.saveContactRequest(payload);
                showMessage('Formulario enviado. Solicitud guardada localmente.', 'success');
                contactoForm.reset();

                if (sessionData) {
                    if (nombreInput) nombreInput.value = (sessionData.nombre || '') + (sessionData.apellido ? ' ' + sessionData.apellido : '');
                    if (emailInput) emailInput.value = sessionData.email || '';
                }
            });
        }
    }

    function initializeAgenda() {
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) return;

        const monthNames = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
        const allEvents = LocalDB.getEvents();
        const params = new URLSearchParams(window.location.search);
        const monthYearEl = document.querySelector('.current-month-year');
        const dateFilter = document.getElementById('eventDateFilter');
        const searchInput = document.querySelector('.filter-search');
        const locationInput = document.getElementById('eventLocationFilter');
        const filterButtons = document.querySelectorAll('.filter-badge');
        const btnPrev = document.getElementById('btn-prev-month');
        const btnNext = document.getElementById('btn-next-month');
        const btnToday = document.querySelector('.btn-today');
        const modeMonthBtn = document.getElementById('modeMonthBtn');
        const modeYearBtn = document.getElementById('modeYearBtn');
        const monthView = document.getElementById('calendarMonthView');
        const yearView = document.getElementById('calendarYearView');
        const yearGrid = document.getElementById('yearGrid');
        const selectedDateLabel = document.getElementById('selectedDateLabel');
        const eventCountBadge = document.getElementById('eventCountBadge');

        const state = {
            viewDate: new Date(),
            category: 'Todos',
            search: '',
            exactDate: '',
            location: params.get('ubicacion') || '',
            attraction: params.get('atractivo') || '',
            mode: 'month',
        };

        if (locationInput && state.location) {
            locationInput.value = state.location;
        }

        function eventsOnDate(dateStr) {
            return allEvents.filter((ev) => ev.fecha === dateStr);
        }

        function applyFilters() {
            const query = normalizeToken(state.search);
            const locationQuery = normalizeToken(state.location);
            return allEvents.filter((ev) => {
                const categoryOk = state.category === 'Todos' || normalizeToken(ev.categoria) === normalizeToken(state.category);
                const dateOk = !state.exactDate || ev.fecha === state.exactDate;
                const searchOk = !query || normalizeToken(ev.nombre + ' ' + ev.descripcion + ' ' + ev.lugar).includes(query);
                const locationOk = !locationQuery || (ev.ubicacion && normalizeToken(ev.ubicacion).includes(locationQuery));
                return categoryOk && dateOk && searchOk && locationOk;
            });
        }

        function humanDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr + 'T00:00:00');
            if (Number.isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        }

        function renderEventList() {
            const filtered = applyFilters();

            if (selectedDateLabel) {
                selectedDateLabel.textContent = state.exactDate
                    ? 'Eventos para ' + humanDate(state.exactDate)
                    : 'Eventos del mes y filtros activos';
                if (state.location) {
                    selectedDateLabel.textContent += ' - ' + state.location;
                }
            }
            if (eventCountBadge) {
                eventCountBadge.textContent = filtered.length + (filtered.length === 1 ? ' resultado' : ' resultados');
            }

            renderCards(
                filtered,
                'eventosList',
                (ev) =>
                    '<div class="dynamic-card-content">' +
                    '<p class="card-tag">' + ev.categoria + ' - ' + ev.fecha + ' ' + ev.hora + (ev.ubicacion ? ' - ' + ev.ubicacion : '') + '</p>' +
                    '<h3>' + ev.nombre + '</h3>' +
                    '<p class="card-highlight">' + ev.lugar + '</p>' +
                    '<p>' + ev.descripcion + '</p>' +
                    '</div>',
                'eventosEmpty'
            );
        }

        function renderYearView() {
            if (!yearGrid || !monthYearEl) return;
            const year = state.viewDate.getFullYear();
            monthYearEl.textContent = String(year);
            yearGrid.innerHTML = '';

            for (let month = 0; month < 12; month += 1) {
                const monthStart = new Date(year, month, 1);
                const monthEnd = new Date(year, month + 1, 0);
                const eventCount = allEvents.filter((ev) => {
                    const date = new Date(ev.fecha + 'T00:00:00');
                    return date >= monthStart && date <= monthEnd;
                }).length;

                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'year-month-card';
                card.innerHTML = '<span class="year-month-name">' + monthNames[month] + '</span>' +
                    '<span class="year-month-meta">' + eventCount + (eventCount === 1 ? ' evento' : ' eventos') + '</span>';
                card.addEventListener('click', function () {
                    state.viewDate.setMonth(month);
                    setMode('month');
                    renderCalendar();
                    renderEventList();
                });
                yearGrid.appendChild(card);
            }
        }

        function formatDate(year, month, day) {
            const mm = String(month + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            return year + '-' + mm + '-' + dd;
        }

        function dayEventHint(events) {
            if (!events || events.length === 0) return '';
            if (events.length > 1) return events.length + ' ev';
            const cat = String(events[0].categoria || '').slice(0, 4);
            return cat ? cat + '.' : '1 ev';
        }

        function renderCalendar() {
            const year = state.viewDate.getFullYear();
            const month = state.viewDate.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const startDay = firstDay === 0 ? 6 : firstDay - 1;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            calendarGrid.innerHTML = '';
            if (monthYearEl) monthYearEl.textContent = monthNames[month] + ' ' + year;

            for (let i = startDay - 1; i >= 0; i -= 1) {
                const cell = document.createElement('div');
                cell.className = 'calendar-day empty';
                cell.textContent = String(daysInPrevMonth - i);
                calendarGrid.appendChild(cell);
            }

            for (let day = 1; day <= daysInMonth; day += 1) {
                const dateStr = formatDate(year, month, day);
                const cell = document.createElement('div');
                const dayEvents = eventsOnDate(dateStr);
                const hasEvent = dayEvents.length > 0;
                cell.className = 'calendar-day' + (hasEvent ? ' has-event' : '');
                const today = new Date();
                const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
                if (dateStr === todayStr) cell.classList.add('today');

                const dayNumber = document.createElement('span');
                dayNumber.className = 'day-number';
                dayNumber.textContent = String(day);
                cell.appendChild(dayNumber);

                if (hasEvent) {
                    const hint = document.createElement('span');
                    hint.className = 'day-event-hint';
                    hint.textContent = dayEventHint(dayEvents);
                    cell.appendChild(hint);
                }

                if (state.exactDate === dateStr) cell.classList.add('selected-day');
                cell.addEventListener('click', function () {
                    state.exactDate = dateStr;
                    if (dateFilter) dateFilter.value = dateStr;
                    renderCalendar();
                    renderEventList();
                });
                calendarGrid.appendChild(cell);
            }

            const missing = 42 - calendarGrid.children.length;
            for (let k = 1; k <= missing; k += 1) {
                const cell = document.createElement('div');
                cell.className = 'calendar-day empty';
                cell.textContent = String(k);
                calendarGrid.appendChild(cell);
            }
        }

        function setMode(mode) {
            state.mode = mode;
            const isMonth = mode === 'month';
            if (monthView) monthView.hidden = !isMonth;
            if (yearView) yearView.hidden = isMonth;
            if (modeMonthBtn) modeMonthBtn.classList.toggle('active', isMonth);
            if (modeYearBtn) modeYearBtn.classList.toggle('active', !isMonth);
            if (isMonth) {
                renderCalendar();
            } else {
                renderYearView();
            }
        }

        filterButtons.forEach((btn) => {
            btn.addEventListener('click', function () {
                filterButtons.forEach((b) => b.classList.remove('active'));
                this.classList.add('active');
                state.category = this.textContent.trim();
                renderEventList();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', function () {
                state.search = this.value.trim();
                renderEventList();
            });
        }

        if (locationInput) {
            locationInput.addEventListener('input', function () {
                state.location = this.value.trim();
                renderEventList();
            });
        }

        if (dateFilter) {
            dateFilter.addEventListener('change', function () {
                state.exactDate = this.value;
                if (this.value) {
                    const selected = new Date(this.value + 'T00:00:00');
                    if (!Number.isNaN(selected.getTime())) {
                        state.viewDate = selected;
                    }
                }
                renderCalendar();
                renderEventList();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', function () {
                if (state.mode === 'year') {
                    state.viewDate.setFullYear(state.viewDate.getFullYear() - 1);
                    renderYearView();
                } else {
                    state.viewDate.setMonth(state.viewDate.getMonth() - 1);
                    renderCalendar();
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', function () {
                if (state.mode === 'year') {
                    state.viewDate.setFullYear(state.viewDate.getFullYear() + 1);
                    renderYearView();
                } else {
                    state.viewDate.setMonth(state.viewDate.getMonth() + 1);
                    renderCalendar();
                }
            });
        }
        if (btnToday) {
            btnToday.addEventListener('click', function () {
                state.viewDate = new Date();
                state.exactDate = '';
                if (dateFilter) dateFilter.value = '';
                setMode('month');
                renderEventList();
            });
        }

        if (modeMonthBtn) {
            modeMonthBtn.addEventListener('click', function () {
                setMode('month');
            });
        }
        if (modeYearBtn) {
            modeYearBtn.addEventListener('click', function () {
                setMode('year');
            });
        }

        setMode('month');
        renderEventList();

        if (state.attraction && state.location) {
            showMessage('Mostrando planes sugeridos para ' + state.attraction + ' en ' + state.location + '.', 'info');
        }
    }

    function initializeLandingSearch() {
        const searchBtn = document.querySelector('.search-btn');
        const queryInput = document.querySelector('.search-input');
        const selects = document.querySelectorAll('.search-select');
        if (!searchBtn) return;

        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const params = new URLSearchParams();
            if (queryInput && queryInput.value.trim()) params.set('q', queryInput.value.trim());
            if (selects[0] && selects[0].value) params.set('ubicacion', selects[0].value);
            if (selects[1] && selects[1].value) params.set('categoria', selects[1].value);
            const query = params.toString();
            if (!query) {
                showMessage('Ingresa al menos un criterio para buscar.', 'error');
                return;
            }
            window.location.href = 'descubre.html?' + query;
        });
    }

    function initializeMiCuenta() {
        const welcomeName = document.getElementById('welcomeUserName');
        if (!welcomeName) return;
        const session = AuthService.getSession();
        if (!session) {
            window.location.href = 'perfil.html';
            return;
        }
        welcomeName.textContent = session.nombre || session.username;
        const userBtn = document.getElementById('userNameBtn');
        if (userBtn) userBtn.textContent = session.nombre || session.username;
    }

    function initializeFooterPlaceholders() {
        const links = document.querySelectorAll('a[href="#terminos"], a[href="#politicas"]');
        links.forEach((link) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const t = this.getAttribute('href') === '#terminos' ? 'Terminos y condiciones' : 'Politica de privacidad';
                showMessage(t + ': pendiente de pagina legal dedicada.', 'info');
            });
        });
    }

    function initializeAgendaHeroParallax() {
        const hero = document.getElementById('agenda-hero');
        const parallaxImage = hero?.querySelector('.parallax-image');
        if (!hero || !parallaxImage) return;

        window.addEventListener('scroll', function () {
            const heroRect = hero.getBoundingClientRect();
            // Solo aplicar parallax mientras el hero esté cerca de la vista
            if (heroRect.bottom > 0) {
                const scrollY = window.scrollY;
                const yOffset = scrollY * 0.5;
                parallaxImage.style.transform = `translateY(${yOffset}px)`;
            }
        }, { passive: true });
    }

    function init() {
        LocalDB.ensureSeedData();
        initializeNavigation();
        initializePasswordToggles();
        initializeProfileTabs();
        initializeLandingSearch();
        initializeAuthForms();
        initializePasswordRecovery();
        initializeDescubreAttractions();
        initializeServicios();
        initializeAgenda();
        initializeMiCuenta();
        initializeFooterPlaceholders();
        initializeAgendaHeroParallax();
        AuthService.updateUI();
    }

    document.addEventListener('DOMContentLoaded', init);
})();