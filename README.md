# ADIPA · Chatbot de consultas de colaboradores

Prueba técnica PMO: diagnóstico del proceso, propuesta de mejora, planificación en dos sprints y piloto de atención implementado en n8n.

El flujo recibe una consulta, reconoce cuatro temas y devuelve una respuesta basada en los procedimientos internos. Incluye simulaciones de aviso y registro. La conexión con IA, el envío de notificaciones y el almacenamiento persistente forman parte del trabajo pendiente.

## Entregables

| Archivo | Contenido |
|---|---|
| [Informe PMO en PDF](docs/Prueba_Tecnica_PMO_ADIPA.pdf) | Diagnóstico, procesos AS-IS / TO-BE, planificación, procedimientos y evidencia del piloto |
| [Cronograma Excel](planificacion/Cronograma_ADIPA.xlsx) | Hoja de detalle y hoja **Gantt 2 Sprints**, con días de inicio y fin editables |
| [Flujo para importar en n8n](workflows/adipa-chatbot-piloto.json) | Piloto documentado, inactivo y sin credenciales |
| [Guía de instalación](docs/instalacion.md) | Importación y envío de una consulta de prueba |
| [Casos y evidencias](docs/pruebas.md) | Cuatro casos del enunciado, capturas previas y controles locales |

## Qué resuelve

| Consulta | Orientación o responsable |
|---|---|
| Anticipación para vacaciones | Mínimo de 30 días; excepciones con el líder y solicitud mediante Monday |
| Accidente durante teletrabajo | Aviso inmediato a Jefatura Directa, si las condiciones lo permiten |
| Canales de Ley Karin | Canales del protocolo, responsable y suplencia; consulta informativa |
| Acceso a Platzi | Talento y Bienestar |

Las consultas no reconocidas reciben una orientación general. Las aprobaciones y actuaciones formales corresponden a las personas responsables.

## Probar el flujo

1. Descarga el repositorio y abre tu instalación de n8n.
2. En un flujo nuevo, selecciona **Import from File** e importa `workflows/adipa-chatbot-piloto.json`.
3. Abre **Webhook**, selecciona **Listen for Test Event** y copia la **Test URL**.
4. Envía uno de los ejemplos con el comando de la [guía de instalación](docs/instalacion.md).
5. Comprueba `categoria`, `respuesta` y `ticketId` en la respuesta. Rearma la escucha antes de cada prueba con la URL de test.

No se necesitan credenciales externas para las simulaciones. La versión exacta de n8n usada para las capturas originales no se informó; la compatibilidad de importación debe confirmarse en la instalación de destino.

## Proceso propuesto

![Proceso TO-BE de atención de consultas](assets/diagramas/tobe.png)

El diagrama representa la solución propuesta. El JSON entregado conserva el alcance del piloto y las integraciones simuladas, descritas en [arquitectura y alcance](docs/arquitectura.md).

## Organización

```text
adipa-pmo-chatbot/
├── README.md
├── CHANGELOG.md
├── workflows/           # JSON importable
├── docs/                # Informe, instalación, arquitectura, pruebas y fuentes
├── planificacion/       # Cronograma Excel con Gantt
├── assets/
│   ├── diagramas/       # AS-IS y TO-BE en PNG y SVG
│   └── evidencias/      # Capturas de las ejecuciones previas del piloto v2
├── examples/            # Mensajes JSON para enviar al webhook
├── scripts/             # Validación local sin dependencias externas
└── tests/               # Casos de entrada y categorías esperadas
```

## Validación local

Con Node.js 20 o superior, desde la carpeta del repositorio:

```shell
node scripts/validar-flujo.mjs
```

El script comprueba la estructura del archivo, sus conexiones, la normalización y las reglas para nueve entradas. No ejecuta el motor de n8n ni demuestra el envío de correos, el almacenamiento o una respuesta generada por IA.

## Alcance de esta versión

Esta entrega ajusta los textos y nombres de los pasos simulados del piloto v2 para describir su comportamiento real. Conserva la clasificación y el recorrido de las ramas. Las capturas y el informe registran la versión previa; los cambios del JSON se detallan en [CHANGELOG](CHANGELOG.md).

El siguiente incremento debe priorizar mensajes urgentes cuando se mezclan temas, conectar notificaciones y registro, validar contenidos con las áreas responsables e incorporar IA si aporta valor. Véase [trabajo pendiente](docs/alcance-y-pendientes.md).

Material preparado para la evaluación técnica. Los procedimientos y contactos corresponden a la documentación interna proporcionada para la prueba. No se concede una licencia de redistribución sobre ese material.
