const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.split('<script>')[1].split('function calculate()')[0];
const compute=vm.runInNewContext(script+';compute');
assert.equal(JSON.stringify(compute(1000000,0).qty),'[0,5,90]');
assert.equal(JSON.stringify(compute(1000000,2000).qty),'[0,4,89]');
assert.equal(compute(1000000,2000).remaining,30000);
assert.equal(JSON.stringify(compute(0,0).qty),'[0,0,0]');
assert.throws(()=>compute(-1,0));
for(let c=0;c<2000000;c+=7777){const p=compute(c,2000);assert(p.remaining>=Math.min(c,2000));assert(p.qty.every(Number.isInteger));}
console.log('PASS: default, reserve, zero cash, invalid input and budget invariants');
