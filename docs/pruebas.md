# Casos de prueba y evidencia

## Ejecuciones documentadas del piloto v2

Las capturas se aportaron antes de preparar este repositorio. Muestran el recorrido de las ramas en n8n; no acreditan el envío de avisos, persistencia en una base de datos ni respuestas generadas por IA.

| Caso | Categoría esperada | Ejecución observada | Evidencia |
|---|---|---:|---|
| Anticipación para vacaciones | `vacaciones` | 164 ms | [Captura](../assets/evidencias/vacaciones-v2.png) |
| Lesión durante teletrabajo | `accidente_laboral` | 33 ms | [Captura](../assets/evidencias/accidente-v2.png) |
| Canales de Ley Karin | `ley_karin` | 31 ms | [Captura](../assets/evidencias/ley-karin-v2.png) |
| Acceso a Platzi | `accesos_platzi` | 31 ms | [Captura](../assets/evidencias/platzi-v2.png) |

Estos tiempos corresponden a ejecuciones aisladas y no representan un nivel de servicio. [Vista general del flujo v2](../assets/evidencias/flujo-v2.png).

## Controles del JSON de entrega

Ejecuta `node scripts/validar-flujo.mjs`. El script lee el JSON real y comprueba:

- Nombres e identificadores de nodos únicos y conexiones hacia nodos existentes.
- Entrada POST, flujo inactivo y respuesta configurada mediante Respond to Webhook.
- Ausencia de credenciales y metadatos de instancia en el paquete.
- Normalización y categoría esperada para los cuatro casos, una consulta no prevista, mayúsculas, tildes, mensaje vacío y una consulta con temas mixtos.
- Coherencia del texto de accidente y la orientación general con el carácter simulado del piloto.

El caso de temas mixtos documenta una limitación: «Accidente antes de mis vacaciones» selecciona vacaciones porque esa regla se evalúa primero. No representa el comportamiento deseado para producción.

Los controles locales no ejecutan los nodos IF, Set o Merge dentro del motor de n8n. La importación y la ejecución de extremo a extremo del JSON ajustado deben comprobarse en la instalación de destino.

## Validación manual de la entrega

1. Importa el JSON siguiendo [instalación](instalacion.md).
2. Ejecuta los cinco archivos de `examples/`, rearmando la escucha de prueba para cada uno.
3. Compara `categoria` con la tabla anterior; para `consulta-general.json` debe ser `sin_clasificar`.
4. Lee el texto completo de la respuesta y comprueba que se haya generado `ticketId`.
5. En el caso de accidente, confirma el paso de preparación de aviso. No se espera una notificación externa.
6. Registra la versión de n8n y captura las nuevas ejecuciones para reemplazar o complementar la evidencia previa.
