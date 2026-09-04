# Cambios de la entrega

## 2026-09-04 · Piloto documentado

Base: `ADIPA - Chatbot Consultas (Piloto v2 - corregido).json` proporcionado por el autor.

- Se mantienen la topología, las expresiones de clasificación, los tipos y versiones de los nodos y los cuatro casos.
- La respuesta de accidente deja de afirmar que ya se notificó a jefatura. Explica que el paso está simulado.
- La respuesta de Ley Karin incorpora la suplencia si la responsable es denunciada y evita resumir plazos de forma incompleta. Remite la gestión formal a los responsables del protocolo.
- La respuesta de Platzi se concentra en el canal responsable documentado.
- El fallback entrega una orientación real en lugar de presentar como generada una respuesta de IA inexistente.
- Los pasos de aviso, registro y fallback tienen nombres que expresan su alcance. El campo `notificadoA` pasa a `destinatarioPrevisto`.
- Se eliminan identificadores y metadatos propios de la instancia de origen. El flujo se entrega inactivo y sin credenciales.
- Se añade una hoja Gantt al cronograma, conservando la hoja de detalle.
- Se incorporan informe, diagramas, capturas previas, ejemplos y validación local.

La clasificación de mensajes mixtos y las integraciones externas siguen pendientes. Las capturas corresponden a la versión v2 anterior a estos ajustes de texto y nombres.
