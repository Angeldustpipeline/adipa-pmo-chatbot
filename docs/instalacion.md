# Importación y ejecución en n8n

## Requisitos

- Una instalación propia de n8n o acceso a n8n Cloud.
- El archivo `workflows/adipa-chatbot-piloto.json` descargado como JSON, no como página HTML.
- PowerShell, curl o un cliente HTTP para enviar solicitudes.

El flujo utiliza nodos base de n8n. No incluye nodos comunitarios, credenciales, una base de datos ni servicios de IA. No activa automáticamente ningún flujo.

## Importar

1. Crea un flujo nuevo y abre su menú de opciones.
2. Selecciona **Import from File** y elige el JSON de `workflows/`.
3. Revisa que aparezcan Webhook, Normaliza texto, las cuatro decisiones, las respuestas y Respond to Webhook.
4. Guarda el flujo. Abre **Webhook**, comprueba el método **POST** y la respuesta mediante **Respond to Webhook**.

La importación crea una copia en tu instalación. El archivo elimina identificadores de la instancia de origen y mantiene el flujo inactivo. La versión exacta del motor de las capturas originales no está disponible.

## Enviar una consulta

En Webhook, pulsa **Listen for Test Event** y copia la **Test URL** que muestra tu instancia. En PowerShell, desde la raíz del repositorio:

```powershell
$webhookUrl = Read-Host 'Pega la Test URL de tu nodo Webhook'
$payload = Get-Content -LiteralPath './examples/vacaciones.json' -Raw -Encoding UTF8
Invoke-RestMethod -Method Post -Uri $webhookUrl `
  -ContentType 'application/json; charset=utf-8' `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($payload))
```

También puedes enviar el archivo con curl, sustituyendo la dirección por la Test URL real:

```shell
curl --request POST 'http://localhost:5678/webhook-test/adipa-chatbot' --header 'Content-Type: application/json' --data-binary '@examples/vacaciones.json'
```

La dirección localhost es un ejemplo para una instalación local. Usa siempre la URL que entregue tu nodo. Para cada siguiente caso, vuelve a habilitar la escucha de prueba y cambia el archivo por `accidente.json`, `ley-karin.json`, `platzi.json` o `consulta-general.json`.

## Entrada y salida

Entrada recomendada:

```json
{
  "mensaje": "¿Cuántos días de anticipación necesito para pedir vacaciones?",
  "colaborador": "colaborador-demo"
}
```

`mensaje` debe ser texto. La normalización también admite `body.text` o el parámetro `mensaje` de la URL, heredados del piloto; para las pruebas se recomienda JSON en el cuerpo. El identificador del colaborador es opcional y debe ser ficticio en demostraciones.

Salida:

| Campo | Significado |
|---|---|
| `categoria` | Tema seleccionado por las reglas |
| `respuesta` | Texto definido para esa ruta |
| `ticketId` | Identificador simulado que combina momento y categoría; no acredita un registro guardado |

## Si la prueba no responde

- **404 / webhook no registrado:** habilita de nuevo la escucha y usa la Test URL.
- **Método incorrecto:** envía POST con `Content-Type: application/json`.
- **Error en Normaliza texto:** comprueba que `mensaje` sea una cadena de texto.
- **Error al importar:** confirma que descargaste el JSON completo y revisa la compatibilidad de los nodos en tu versión de n8n.
- **No llega una notificación:** es el comportamiento esperado de esta versión; el paso solo prepara datos.

Para un uso permanente se requiere publicar o activar el flujo según la versión de n8n, usar su Production URL y completar las integraciones y controles descritos en [alcance y pendientes](alcance-y-pendientes.md).

## Referencias de n8n

- [Exportación e importación de flujos](https://docs.n8n.io/workflows/export-import/).
- [Nodo Webhook y URL de prueba](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/).
- [Respond to Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/).
