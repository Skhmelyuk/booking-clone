# Навчальний клон сервісу бронювання житла Booking.com 3D

Цей репозиторій містить вичерпну архітектурну та технічну документацію, декомпозицію завдань, протоколи взаємодії та план розробки функціонального навчального MVP-сервісу пошуку та бронювання житла з **інтер'єрними 3D-візуалізаціями (Autodesk 3ds Max)** згідно з вимогами [ТЗ](file:///home/skmelyuk/Documents/projects/Booking/ТЗ_Клон%20Booking%203D.docx.pdf).

---

## 👥 Склад команди проєкту (5 спеціалістів)

- **Команда розробників (2 спеціалісти)**:
  - **Розробник №1**: Backend & DevOps Lead ([Детальний план завдань](docs/team/dev1-backend-devops.md))
  - **Розробник №2**: Frontend Lead ([Детальний план завдань](docs/team/dev2-frontend-client.md))
- **Команда дизайнерів (3 спеціалісти)**:
  - **Дизайнер №1**: 3D Designer / 3ds Max (моделювання, освітлення, WebP-рендери інтер'єрів)
  - **Дизайнер №2**: UX/UI Lead Designer (User Flow, Wireframes, Figma UI Kit, клієнтські екрани)
  - **Дизайнер №3**: UX/UI + Graphic/Brand Designer (кабінет власника, адмінка, брендбук, проморолик 30–60с)
  - ([Регламент співпраці з дизайнерами](docs/team/designers-collaboration.md))

---

## 📚 Навігатор по документації

| Розділ | Посилання на Markdown | Презентаційний PDF | Опис |
| :--- | :--- | :--- | :--- |
| **Архітектура системи** | [system-overview.md](docs/architecture/system-overview.md) | [system-overview.pdf](docs/architecture/system-overview.pdf) | Модульна структура, Django 5 + DRF, пайплайн передачі 3D |
| **База даних (PostgreSQL)** | [database-schema.md](docs/architecture/database-schema.md) | [database-schema.pdf](docs/architecture/database-schema.pdf) | Схема 11 моделей Django ORM, ER-діаграма, захист від overbooking |
| **Життєвий цикл бронювання** | [booking-lifecycle.md](docs/architecture/booking-lifecycle.md) | [booking-lifecycle.pdf](docs/architecture/booking-lifecycle.pdf) | State Machine бронювань, математика цін, Mock Payment |
| **Дорожня карта (Roadmap)** | [phases-and-milestones.md](docs/roadmap/phases-and-milestones.md) | [phases-and-milestones.pdf](docs/roadmap/phases-and-milestones.pdf) | 5 фаз розробки (Фази 0–4), щотижневі спринти та критерії DoD |
| **Розробник №1** | [dev1-backend-devops.md](docs/team/dev1-backend-devops.md) | — | Роль Backend & DevOps Lead: Docker, PostgreSQL 16, Django 5, DRF, JWT |
| **Розробник №2** | [dev2-frontend-client.md](docs/team/dev2-frontend-client.md) | — | Роль Frontend Lead: React 18, 3D-галерея, календар, кабінети |
| **Співпраця з дизайнерами**| [designers-collaboration.md](docs/team/designers-collaboration.md) | [designers-collaboration.pdf](docs/team/designers-collaboration.pdf) | Протокол "Cold Start", передача 3D WebP асетів, Design QA |
| **Перша консультація (Kickoff)** | [kickoff-meeting-agenda.md](docs/team/kickoff-meeting-agenda.md) | [kickoff-meeting-agenda.pdf](docs/team/kickoff-meeting-agenda.pdf) | Сценарій 45-хвилинної установчої зустрічі для команди |
| **Фаза 0: Розробник №1** | [dev-1-backend-devops.md](docs/phase-0/dev-1-backend-devops.md) | — | Docker Compose, PostgreSQL 16, Django 5, DRF, Swagger UI, Health Check |
| **Фаза 0: Розробник №2** | [dev-2-frontend.md](docs/phase-0/dev-2-frontend.md) | — | React 18 + Vite, токени Tailwind, палітра Booking, роутинг, Axios |
| **Фаза 0: Загальний план** | [README.md](docs/phase-0/README.md) | — | Координація взаємодії, Git Flow, схема та спільний Smoke Test |
| **Фаза 1: Розробник №1** | [dev-1-backend-devops.md](docs/phase-1/dev-1-backend-devops.md) | — | 11 моделей ORM, міграції, seed_data, SimpleJWT, Google Auth |
| **Фаза 1: Розробник №2** | [dev-2-frontend.md](docs/phase-1/dev-2-frontend.md) | — | AuthContext, модалки входу/реєстрації, Wireframes SearchBar/Cards |
| **Фаза 1: Загальний план** | [README.md](docs/phase-1/README.md) | — | Координація Фази 1, суворий порядок злиття, Sprint 1 Smoke Test |
| **Фаза 2: Розробник №1** | [dev-1-backend-devops.md](docs/phase-2/dev-1-backend-devops.md) | — | Пошуковий рушій (django-filter), перевірка доступності, overbooking protection, 3D |
| **Фаза 2: Розробник №2** | [dev-2-frontend.md](docs/phase-2/dev-2-frontend.md) | — | Figma UI Kit, сторінка /search, фільтри, DateRangePicker, бронювання /booking/:id |
| **Фаза 2: Загальний план** | [README.md](docs/phase-2/README.md) | — | Координація Фази 2, схема взаємодії, Sprint 2 Smoke Test |
| **Фаза 3: Розробник №1** | [dev-1-backend-devops.md](docs/phase-3/dev-1-backend-devops.md) | — | Деталі житла з 3D, кабінет гостя, скасування броні, календар, обране, кабінет власника |
| **Фаза 3: Розробник №2** | [dev-2-frontend.md](docs/phase-3/dev-2-frontend.md) | — | Інтерактивна 3D-галерея (3ds Max), особистий кабінет /cabinet, /owner, адаптивність |
| **Фаза 3: Загальний план** | [README.md](docs/phase-3/README.md) | — | Координація Фази 3, 3D-пайплайн, Sprint 3 Smoke Test |

---

## 🛠 Технологічний стек проєкту

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Axios / TanStack Query.
- **Backend**: Python 3.11+, Django 5+, Django REST Framework (DRF), SimpleJWT, Swagger (drf-spectacular), Django Admin (`/admin/`).
- **База даних**: PostgreSQL 16 (11 моделей), Django ORM, міграції.
- **3D-візуалізація**: Autodesk 3ds Max + Corona Renderer / V-Ray (WebP/JPG оптимізація).
- **Авторизація**: SimpleJWT (Access/Refresh tokens) + безпечне хешування паролів + Google OAuth.
- **Інфраструктура**: Docker, Docker Compose, Git + GitHub.
