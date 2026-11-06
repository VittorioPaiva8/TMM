// Service worker: guarda o app no celular para abrir rápido e sem internet.
const CACHE='treino-v2';
const SHELL=['/','/index.html','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET')return;
  // login e banco do Firebase sempre direto pela rede
  if(url.pathname.startsWith('/__/auth')||url.hostname.endsWith('googleapis.com')&&!url.hostname.startsWith('fonts')||url.hostname.includes('firebaseio')||url.hostname.includes('identitytoolkit')||url.hostname.includes('securetoken'))return;
  // página: rede primeiro (pega atualizações), cache se estiver sem internet
  if(req.mode==='navigate'||url.pathname==='/__/firebase/init.json'){
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c));return r}).catch(()=>caches.match(req).then(r=>r||caches.match('/'))));
    return;
  }
  // resto (ícones, fontes, SDK do Firebase): cache primeiro, atualiza em segundo plano
  e.respondWith(caches.match(req).then(hit=>{
    const net=fetch(req).then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r}).catch(()=>hit);
    return hit||net;
  }));
});
