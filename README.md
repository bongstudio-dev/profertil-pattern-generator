# Profertil Pattern Generator

Tool web estática para construir patterns del sistema de marca Profertil a partir de una librería de SVGs, con preview en vivo, variables generativas, layouts modulares y exportación lista para diseño.

## Stack

- `HTML`
- `CSS`
- `JavaScript` vanilla
- `python3 -m http.server` para desarrollo local

## Correr el proyecto

Desde la carpeta del proyecto:

```bash
npm run dev
```

Abrir:

```text
http://localhost:4173
```

También se puede usar:

```bash
python3 -m http.server 4173
```

## Qué hace la herramienta

- Permite elegir una forma base desde la librería SVG de Profertil.
- Permite elegir una combinación cromática oficial e invertir figura/fondo.
- Genera patterns sobre distintos aspect ratios.
- Permite exportar en `SVG`, `PNG` y `JPG`.
- Incluye una interfaz flexible donde:
  - la sidebar puede pasar de izquierda a derecha
  - el preview puede alternar de lado dentro del layout principal
  - el dock puede ir arriba o abajo

## Estructura de la interfaz

### Sidebar

Incluye tres módulos principales:

- `Forma base`
- `Color`
- `Variables generativas`

### Preview

Muestra el pattern en la relación de aspecto seleccionada.

### Dock

Incluye dos grupos:

- selector de aspect ratio
- selector de formato de exportación + botón `Exportar`

## Aspect ratios disponibles

- `1:1`
- `16:9`
- `5:4`
- `9:16`
- `A5`
- `A4`

## Tamaños de export

La previsualización y la exportación usan la misma relación de aspecto, pero no necesariamente la misma resolución.

- `1:1` → `1080 × 1080`
- `16:9` → `1920 × 1080`
- `5:4` → `1350 × 1080`
- `9:16` → `1080 × 1920`
- `A5` → `1748 × 2480`
- `A4` → `2480 × 3508`

## Combinaciones de color

El sistema usa las combinaciones oficiales de Profertil:

- `Azul / Celeste`
- `Verde / Verde claro`
- `Amarillo / Naranja`
- `Naranja / Terra`

Además, cada combinación puede invertirse para alternar entre figura y fondo.

## Estructuras de pattern

### Grilla

Repetición regular sobre una celda fija.

Controles:

- `Escala`
- `Ritmo horizontal`
- `Ritmo vertical`
- `Dirección`
- `Solapamiento`

### Ladrillo

Repetición por filas alternadas con desfase.

Controles:

- `Escala`
- `Ritmo horizontal`
- `Ritmo vertical`
- `Dirección par`
- `Dirección impar`
- `Desfase alternado`
- `Solapamiento`

### Matriz

Construcción modular sobre una base `1x1` con bloques mayores `2x2` distribuidos por semilla.

Controles:

- `Semilla`
- `Escala`
- `Ritmo horizontal`
- `Ritmo vertical`
- `Solapamiento`

## Animaciones

La herramienta incluye:

- animaciones de entrada para los bloques principales
- transición del preview al cambiar de aspect ratio
- microtransiciones de UI en pills, preview y bloques

El lenguaje de motion fue alineado con el de `compresor.bongstudio.ar`.

## Drag + slots

La interfaz no usa drag libre. Usa un sistema de slots:

- `Sidebar`: izquierda / derecha
- `Preview`: lado ancho opuesto a la sidebar
- `Dock`: arriba / abajo

La lógica está pensada como layout flexible, no como ventanas flotantes.

## Branding

- Crédito fijo abajo a la derecha: `Desarrollado por Bong`
- Link a [https://bongstudio.ar](https://bongstudio.ar)

## Estructura de archivos

```text
.
├── index.html
├── styles.css
├── script.js
├── package.json
└── public/
    └── shapes/
```

## Archivos clave

### `/index.html`

Define la estructura general:

- sidebar
- preview
- dock
- crédito de Bong

### `/styles.css`

Define:

- sistema visual
- layout por grid
- motion
- scrollbar custom
- estados de drag y slots

### `/script.js`

Define:

- carga de SVGs
- estado global de la app
- motor generativo de patterns
- render del preview
- exportación
- sistema de drag con slots

## Assets

Los SVGs de Profertil viven en:

```text
public/shapes/
```

La app los carga dinámicamente y les aplica color en runtime.

## Exportación

### SVG

Export vectorial directo.

### PNG

Rasterización del SVG en canvas.

### JPG

Rasterización del SVG en canvas con salida JPEG.

## Próximos ajustes recomendados

- persistir la posición del layout en `localStorage`
- seguir refinando slots y respiración de layout
- ajustar más formas específicas si alguna necesita tratamiento particular
- evaluar si conviene sumar una salida adicional de impresión o vector avanzada más adelante

## Notas

- Es una app estática. No requiere build.
- Funciona mejor corriéndola sobre server local porque los SVG se cargan con `fetch()`.
- Abrir el `index.html` directo con `file://` puede romper la carga de assets.
