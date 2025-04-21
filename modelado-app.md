# 📘 Modelo Entidad-Relación de la App: Habituum

---

## 1. Entidades y Atributos

### 🧑 Usuario
- id_usuario (PK)
- nombre
- email
- contraseña_hash
- fecha_registro

### ✅ Hábito
- id_habito (PK)
- id_usuario (FK)
- nombre
- descripción
- frecuencia (diaria, semanal, personalizada)
- icono
- es_publico (booleano)
- fecha_creacion

### 📅 Registro_Hábito (seguimiento diario)
- id_registro (PK)
- id_habito (FK)
- fecha
- completado (booleano)

### 📎 Evidencia
- id_evidencia (PK)
- id_registro (FK)
- tipo_archivo
- url_archivo
- comentario

---

## 2. Relaciones

- Un Usuario puede tener muchos Hábitos.
- Un Hábito pertenece a un solo Usuario.
- Un Hábito puede tener múltiples Registros (por día).
- Cada Registro de Hábito puede tener cero o más Evidencias (como imagen o archivo).
- Un Usuario puede ver los Hábitos Públicos de otros usuarios.

---

## 3. Diagrama Relacional (versión textual)

👤 USUARIO
- id_usuario (PK)
- nombre
- email
- contraseña_hash
- fecha_registro

    └───< tiene

📌 HÁBITO
- id_habito (PK)
- id_usuario (FK)
- nombre
- descripción
- frecuencia
- icono
- es_publico
- fecha_creacion

    └───< registra

📆 REGISTRO_HÁBITO
- id_registro (PK)
- id_habito (FK)
- fecha
- completado

    └───< tiene

📁 EVIDENCIA
- id_evidencia (PK)
- id_registro (FK)
- tipo_archivo
- url_archivo
- comentario

---

📝 Notas:
- La contraseña se almacena en hash (segura).
- url_archivo puede apuntar a un archivo en Firebase Storage o Supabase Storage.
- Este modelo puede ser fácilmente adaptado a Firestore o a una base SQL (ej. PostgreSQL, SQLite, etc.).

