# План завдань: Розробник №1 (Backend & DevOps Lead)

**Роль**: Backend & DevOps Lead (Docker Compose, PostgreSQL 16, Django 5 + DRF, SimpleJWT, 11 моделей ORM, Бізнес-логіка, Захист від Overbooking, Swagger, Django Admin)  
**Технологічний стек**: Docker, PostgreSQL 16, Python 3.11+, Django 5+, Django REST Framework (DRF), SimpleJWT, drf-spectacular (Swagger), django-filter, Pillow.

---

## 🎯 Головна мета ролі
Спроєктувати надійну інфраструктуру на Docker Compose та схему бази даних PostgreSQL на 11 моделей Django ORM, реалізувати захищений REST API з інтерактивною документацією Swagger UI, розробити систему аутентифікації на JWT токенах (`SimpleJWT`) та Google OAuth, пошуковий рушій з гнучкою фільтрацією (`django-filter`), збереження 3D-рендерів інтер'єру з 3ds Max, ядро транзакційного захисту від подвійного бронювання (`select_for_update`) та повноцінну панель **Django Admin**.

---

## 📅 Потижневий план завдань

### 🚀 Тиждень 1: Docker, 11 моделей Django ORM, Сідер даних та SimpleJWT (Фаза 0–1)
- [ ] Налаштувати `docker-compose.yml` (PostgreSQL 16 + Django 5 + Persistent Volume + Media Volume).
- [ ] Ініціалізувати Django 5 проєкт з модульними додатками: `users`, `properties`, `bookings`, `reviews`.
- [ ] Налаштувати генератор документації OpenAPI / **Swagger UI (drf-spectacular)** за адресою `/api/docs/` та ендпоінт `GET /api/health/`.
- [ ] Створити моделі Django ORM у файлах `models.py` для **11 сутностей** з UUIDv4:
  - `User` (AbstractUser), `Location`, `Property`, `PropertyImage`, `Property3DImage`, `Amenity`, `PropertyAmenity`, `Booking`, `Review`, `Favorite`, `Notification`.
- [ ] Виконати початкові міграції: `python manage.py makemigrations` та `python manage.py migrate`.
- [ ] Написати Django Management Command (`python manage.py seed_data`):
  - 4 системні ролі (`ADMIN`, `OWNER`, `USER`, `GUEST`).
  - 10 базових зручностей з іконками Lucide та 6 популярних міст України з гео-координатами.
  - Створення тестових акаунтів та об'єктів з 3D-бейджем.
- [ ] Реалізувати модуль користувачів та аутентифікації (`/api/auth/`):
  - `POST /api/auth/register/` — реєстрація, хешування паролів, валідація.
  - `POST /api/auth/token/` — аутентифікація через `SimpleJWT`, видача access/refresh токенів та даних користувача.
  - `POST /api/auth/token/refresh/` — оновлення access токена.
  - `POST /api/auth/google/` — верифікація Google OAuth ID token та видача JWT.
  - `GET /api/users/profile/` — захищений профіль користувача.
- [ ] Налаштувати базовий Django Admin для всіх моделей та відкрити PR №1 у `main`.

---

### 🔍 Тиждень 2: Пошуковий рушій, Каталог та 3D-медіа (Фаза 2)
- [ ] Створити ViewSet каталогу житла `GET /api/properties/` з підтримкою `django-filter`:
  - `city` / `country` — регістронезалежний пошук за локацією (`icontains`).
  - `check_in`, `check_out` — виключення об'єктів, які вже мають підтверджені бронювання на ці дати.
  - `guests` — фільтрація за `max_guests >= guests`.
  - `min_price`, `max_price` — діапазон вартості за ніч.
  - `amenities` — фільтрація за списком обраних зручностей (Wi-Fi, басейн тощо).
  - `ordering` — сортування за ціною (asc/desc), рейтингом або популярністю.
- [ ] Модуль збереження 3D-рендерів інтер'єру з метаданими:
  - `room_type` (Вітальня, Спальня, Кухня, Ванна).
  - `angle_name` (Вид зверху, Кутова перспектива, Панорама).
  - Збереження оптимізованих WebP файлів у `backend/media/properties/3d_renders/`.
- [ ] Реалізувати ендпоінт попередньої перевірки доступності дат для житла:
  - `POST /api/bookings/check-availability/` (приймає `property_id`, `check_in`, `check_out`).

---

### 📅 Тиждень 3: Транзакційний захист від Overbooking та Кабінети (Фаза 3)
- [ ] Реалізувати ендпоінт створення бронювання `POST /api/bookings/`:
  - Валідація дат у серіалізаторі (`check_out > check_in`, `check_in >= date.today()`).
  - Виконання створення бронювання всередині транзакції `transaction.atomic()`.
  - Блокування рядків у базі даних через `select_for_update()`.
  - Перевірка перетину інтервалів дат за SQL-умовою `check_in < :new_out AND check_out > :new_in`.
  - Імітація обробки платежу (Mock Payment) зі статусом `CONFIRMED`.
- [ ] API кабінету гостя (`GET /api/bookings/my/`, `PATCH /api/bookings/<id>/cancel/`).
- [ ] API кабінету власника житла (`GET /api/owner/properties/`, `GET /api/owner/bookings/`).

---

### ⭐ Тиждень 4: Відгуки, Обране, Адмінка та Оптимізація (Фаза 4)
- [ ] Модуль відгуків (`POST /api/properties/<id>/reviews/`):
  - Автоматичний перерахунок середнього рейтингу житла `rating` та кількості `reviews_count`.
- [ ] Модуль обраного (`/api/favorites/`).
- [ ] Оптимізація запитів ORM:
  - Використання `select_related()` та `prefetch_related()` для усунення проблеми N+1 запитів.
  - Композитні індекси Django: `Index(fields=['property', 'check_in', 'check_out'])`.
- [ ] Підготовка фінальної бази даних та захист проєкту.
