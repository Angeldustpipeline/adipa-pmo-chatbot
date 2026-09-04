import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const workflow=JSON.parse(await fs.readFile(new URL('workflows/adipa-chatbot-piloto.json',root),'utf8'));
const cases=JSON.parse(await fs.readFile(new URL('tests/casos.json',root),'utf8'));
const nodes=new Map(workflow.nodes.map(n=>[n.name,n]));
assert.equal(nodes.size,workflow.nodes.length,'Hay nombres de nodos duplicados');
assert.equal(new Set(workflow.nodes.map(n=>n.id)).size,workflow.nodes.length,'Hay IDs repetidos');
assert.equal(workflow.active,false,'El piloto debe entregarse inactivo');
assert.equal(workflow.meta,undefined);assert.equal(workflow.id,undefined);
for(const n of workflow.nodes) assert.ok(!n.credentials,'No incluir credenciales');
for(const [name,ports]of Object.entries(workflow.connections)){
  assert.ok(nodes.has(name),`Origen inexistente: ${name}`);
  for(const output of ports.main||[])for(const edge of output)assert.ok(nodes.has(edge.node),`Destino inexistente: ${edge.node}`);
}
assert.equal(nodes.get('Webhook').parameters.httpMethod,'POST');
assert.equal(nodes.get('Webhook').parameters.responseMode,'responseNode');
assert.equal(nodes.get('Respond to Webhook').parameters.respondWith,'json');
const code=nodes.get('Normaliza texto').parameters.jsCode;
function normalize(message){return vm.runInNewContext(`(function(){${code}\n})()`,{$input:{first:()=>({json:{body:{mensaje:message}}})}},{timeout:1000})[0].json;}
function classify(message){
  const normalized=normalize(message);let name=workflow.connections['Normaliza texto'].main[0][0].node;
  for(let i=0;i<10;i++){
    const n=nodes.get(name);
    if(n.type==='n8n-nodes-base.set')return n.parameters.values.string.find(v=>v.name==='categoria').value;
    assert.equal(n.type,'n8n-nodes-base.if');
    const condition=n.parameters.conditions.string[0];assert.equal(condition.operation,'regex');
    const matched=new RegExp(condition.value2).test(normalized.textoNormalizado);
    name=workflow.connections[name].main[matched?0:1][0].node;
  }
  throw new Error('La clasificación no alcanzó una respuesta');
}
for(const c of cases){assert.equal(classify(c.mensaje),c.categoriaEsperada,c.nombre);console.log(`Correcto: ${c.nombre}`);}
const accident=nodes.get('Set respuesta accidente').parameters.values.string.find(v=>v.name==='respuesta').value;
assert.ok(accident.includes('no envía una notificación real'));
const fallback=nodes.get('Set orientación general (IA pendiente)').parameters.values.string.find(v=>v.name==='respuesta').value;
assert.ok(!fallback.includes('[Respuesta generada'));
assert.equal(nodes.get('Preparar aviso a Jefatura Directa (simulado)').type,'n8n-nodes-base.set');
assert.equal(nodes.get('Preparar ticket (registro simulado)').type,'n8n-nodes-base.set');
console.log(`\n${workflow.nodes.length} nodos y ${cases.length} casos verificados. No se ejecutó el motor de n8n.`);
