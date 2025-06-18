# Movie API 🎬

API REST para gestión de películas y usuarios, desarrollada con Node.js, Express y TypeScript.

## 📁 Repositorio
[URL del repositorio](https://github.com/tu-usuario/MovieAPI)

## 🗄️ Modelo Relacional de la Base de Datos

```mermaid
erDiagram
    USERS ||--o{ WATCHED_MOVIES : watches
    USERS {
        int id PK
        string name
        string email
        datetime created_at
    }
    MOVIES ||--o{ WATCHED_MOVIES : watched_by
    MOVIES {
        int id PK
        string title
        datetime release_date
        datetime created_at
    }
    CATEGORIES ||--o{ MOVIE_CATEGORIES : has
    CATEGORIES {
        int id PK
        string name
    }
    MOVIE_CATEGORIES {
        int movie_id FK
        int category_id FK
    }
    WATCHED_MOVIES {
        int user_id FK
        int movie_id FK
        datetime watched_at
    }
```

## 📝 Script SQL de la Base de Datos

```sql
-- Creación de tablas
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movie_categories (
    movie_id INTEGER REFERENCES movies(id),
    category_id INTEGER REFERENCES categories(id),
    PRIMARY KEY (movie_id, category_id)
);

CREATE TABLE watched_movies (
    user_id INTEGER REFERENCES users(id),
    movie_id INTEGER REFERENCES movies(id),
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id)
);
```

## 🚀 API REST en Heroku
[URL de la API en Heroku]()

## 📚 Documentación de la API

La documentación de la API está disponible en Swagger UI:
- URL: `https:///api/docs`

### Endpoints Principales

#### Películas
- `POST /api/movies/create` - Crear una nueva película
- `GET /api/movies` - Obtener todas las películas (con filtros)
- `GET /api/movies/newMovies` - Obtener películas nuevas
- `POST /api/movies/markAsWatched` - Marcar una película como vista

#### Usuarios
- `POST /api/users/create` - Crear un nuevo usuario
- `GET /api/users/watched` - Obtener usuarios con sus películas vistas

## 📋 Cuestionario Técnico

### Preguntas Básicas

1. **¿Cuál es el propósito de "module.exports"?**
   - 

2. **¿Qué es un middleware?**
   - 

3. **¿Cuál es la diferencia entre código bloqueante y código no bloqueante?**
   - **Código bloqueante**: 
   - **Código no bloqueante**: 

4. **¿Qué biblioteca de javascript usaría para manejar datos en tiempo real?**
   - 

### Preguntas Plus

5. **¿Cuál es la principal ventaja de trabajar un proyecto dockerizado?**
   - 

6. **¿Cuál es la diferencia entre una imagen y un volumen en Docker?**
   - Una **imagen** 
   - Un **volumen** 

7. **¿Con qué herramienta se puede orquestar un proyecto con múltiples imágenes en docker?**
   - 

8. **¿Cuál es la principal ventaja de trabajar con cluster de kubernetes?**
   - 
