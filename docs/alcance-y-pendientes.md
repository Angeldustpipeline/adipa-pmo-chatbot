# Alcance y trabajo pendiente

## Incluido

El piloto clasifica consultas con reglas, prepara respuestas documentadas, simula el aviso de accidente y genera un identificador de ticket. El entregable añade documentación, ejemplos, controles locales y el cronograma de dos sprints.

## Próximos incrementos

| Prioridad | Trabajo | Criterio de término |
|---|---|---|
| Alta | Priorizar accidentes y mensajes sensibles cuando hay varios temas | Casos mixtos seleccionan la ruta urgente o requieren aclaración |
| Alta | Validar y actualizar respuestas con los responsables internos | Contenidos, responsables y enlaces confirmados |
| Alta | Conectar el aviso a Jefatura Directa | Envío real y fallo de entrega comprobados, sin afirmar éxito antes de confirmarlo |
| Alta | Conectar un registro persistente | Creación y consulta verificadas; identificadores sin colisiones y estados definidos |
| Alta | Definir controles de acceso, entrada y retención | Mensajes inválidos manejados; acceso restringido e historial adecuado a la sensibilidad |
| Media | Añadir IA y búsqueda documental para preguntas no previstas | Respuestas respaldadas por fuentes y derivación cuando no exista respaldo |
| Media | Pruebas integrales de todos los servicios | Evidencia de respuesta, registro, aviso y tratamiento de errores |
| Opcional | Reporte de volumen y tiempos | Indicadores calculados desde registros reales |

## Límites conocidos

- La clasificación depende de palabras clave. Puede producir falsos positivos, no comprender negaciones o priorizar mal mensajes mixtos.
- `mensaje` debe ser texto; falta definir una validación de entrada y una respuesta HTTP controlada para otros tipos.
- La consulta sobre Ley Karin entrega información y no inicia una denuncia.
- `requiereEscalar` se mantiene como texto en el piloto original; solo la rama de accidente prepara datos de aviso. El fallback no realiza una derivación automática.
- `ticketId` combina marca temporal y categoría; no garantiza unicidad bajo concurrencia y no se guarda en una base.
- Los datos de una ejecución pueden quedar en el historial de n8n.
- El PDF y las capturas describen la evidencia del piloto v2. La revisión de textos del JSON de entrega tiene controles locales, pero no nuevas capturas de ejecución en n8n.

Los hitos del cronograma son una planificación de implementación, no una declaración de que esas integraciones ya están terminadas.
